"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Mic, MicOff, RefreshCw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const M = motion as any;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  error?: boolean;
  retryable?: boolean;
}

const MAX_MESSAGES = 20; // Keep last 20 messages (10 user + 10 assistant)

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m Append, your AI infrastructure advisor. I\'m here to help you discover how AppendLabs can transform your business with intelligent automation and AI solutions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Trim messages if they exceed the limit, keeping recent ones
  useEffect(() => {
    if (messages.length > MAX_MESSAGES) {
      // Keep the first message (greeting) and the most recent messages
      const firstMessage = messages[0];
      const recentMessages = messages.slice(-(MAX_MESSAGES - 1));
      setMessages([firstMessage, ...recentMessages]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
        setRecordingTime(0);
        setSpeechError(null);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setRecordingTime(0);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }

        // User-friendly error messages
        let errorMessage = 'Speech recognition failed. Please try again.';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone not found. Please check your microphone settings.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please enable microphone permissions.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection and try again.';
            break;
          case 'aborted':
            // User stopped recording, no error needed
            return;
          default:
            errorMessage = `Speech recognition error: ${event.error}. Please try again.`;
        }
        setSpeechError(errorMessage);
        // Clear error after 5 seconds
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onstart = () => {
        setIsListening(true);
        setRecordingTime(0);
        setSpeechError(null);
        // Start recording timer
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setRecordingTime(0);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setSpeechError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setRecordingTime(0);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    } else {
      try {
        setSpeechError(null);
        recognitionRef.current.start();
      } catch (error) {
        setSpeechError('Failed to start recording. Please try again.');
        setTimeout(() => setSpeechError(null), 5000);
      }
    }
  };

  const handleSend = async (retryMessageId?: string) => {
    const messageToSend = input.trim();
    if (!messageToSend || isLoading) return;

    let userMessage: Message;
    let messageContent = messageToSend;

    // If retrying, find the original message
    if (retryMessageId) {
      const failedMessage = messages.find(m => m.id === retryMessageId);
      if (failedMessage && failedMessage.role === 'user') {
        messageContent = failedMessage.content;
        // Remove the failed message and its error response
        setMessages(prev => prev.filter(m => m.id !== retryMessageId && m.id !== `error-${retryMessageId}`));
      }
    }

    userMessage = {
      id: retryMessageId || Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
      error: false,
      retryable: false
    };

    if (!retryMessageId) {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
    } else {
      setMessages(prev => [...prev, userMessage]);
    }

    setIsLoading(true);

    try {
      const { sendChatMessage } = await import('@/lib/chatbot-api');
      // Filter out error messages and keep all valid messages (both user and assistant) 
      // to maintain full conversation context for better understanding
      const conversationHistory = messages
        .filter(m => !m.error)
        .map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }));
      
      const response = await sendChatMessage(
        userMessage.content,
        conversationHistory
      );

      const assistantMessage: Message = {
        id: `response-${userMessage.id}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        error: false,
        retryable: false
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      
      // User-friendly error messages
      let errorContent = 'Sorry, I\'m having trouble connecting right now. ';
      if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
        errorContent = 'Too many requests. Please wait a moment and try again. ';
      } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        errorContent = 'Network error. Please check your connection and try again. ';
      } else if (error?.message?.includes('401') || error?.message?.includes('403')) {
        errorContent = 'Authentication error. Please refresh the page and try again. ';
      }

      const errorMessage: Message = {
        id: `error-${userMessage.id}`,
        role: 'assistant',
        content: errorContent + 'You can also contact us directly at hello@appendlabs.com',
        timestamp: new Date(),
        error: true,
        retryable: true
      };

      // Mark the user message as retryable
      setMessages(prev => prev.map(m => 
        m.id === userMessage.id ? { ...m, error: true, retryable: true } : m
      ));

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (messageId: string) => {
    handleSend(messageId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Hidden when chat is open on mobile */}
      <M.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ delay: isOpen ? 0 : 2, type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white text-black rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105 active:scale-95 pointer-events-auto group"
        aria-label="Open chat"
      >
        <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 transition-transform group-hover:scale-110" />
      </M.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile: Full Screen Container */}
            <M.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] md:hidden bg-black flex flex-col safe-area-inset"
            >
              {/* Minimal Mobile Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-black/95 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <MessageCircle size={16} className="text-white/80" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black"></div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm leading-tight">Append</h3>
                    <p className="text-[9px] text-brand-muted font-mono leading-tight">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors -mr-1 touch-manipulation"
                  aria-label="Close chat"
                >
                  <X size={20} className="text-white/70" />
                </button>
              </div>

              {/* Messages Area - Mobile */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 overscroll-contain">
                {messages.map((message, index) => (
                  <M.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.015 }}
                    className={cn(
                      "flex w-full flex-col",
                      message.role === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm relative",
                        message.role === 'user'
                          ? "bg-white text-black font-medium rounded-br-sm"
                          : message.error
                          ? "bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-white rounded-bl-sm"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      {message.error && message.retryable && message.role === 'user' && (
                        <button
                          onClick={() => handleRetry(message.id)}
                          className="mt-2 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          <RefreshCw size={12} />
                          <span>Retry</span>
                        </button>
                      )}
                    </div>
                  </M.div>
                ))}
                {isLoading && (
                  <M.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                      <Loader2 size={14} className="text-white/60 animate-spin" />
                      <span className="text-xs text-white/60 font-mono">Thinking...</span>
                    </div>
                  </M.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Speech Error Message - Mobile */}
              {speechError && (
                <M.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-400 flex-1">{speechError}</p>
                  </div>
                </M.div>
              )}

              {/* Input Area - Mobile */}
              <div className="px-4 pb-4 pt-3.5 border-t border-white/5 bg-black/95 backdrop-blur-sm safe-area-inset-bottom">
                <div className="flex gap-2 items-center">
                  <M.button
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all touch-manipulation flex-shrink-0 relative",
                      isListening
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 border border-white/10"
                    )}
                    aria-label={isListening ? "Stop recording" : "Start voice input"}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={18} />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                      </>
                    ) : (
                      <Mic size={18} />
                    )}
                  </M.button>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isListening ? `Recording... ${recordingTime}s` : "Type a message..."}
                      disabled={isLoading || isListening}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all disabled:opacity-50"
                    />
                  </div>
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 touch-manipulation shadow-md"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </M.button>
                </div>
              </div>
            </M.div>

            {/* Desktop: Compact Window */}
            <M.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="hidden md:flex fixed bottom-5 right-5 lg:bottom-6 lg:right-6 z-[100] w-[360px] lg:w-[380px] xl:w-[400px] h-[580px] lg:h-[600px] xl:h-[620px] bg-black border border-white/10 rounded-xl lg:rounded-2xl shadow-2xl flex-col overflow-hidden backdrop-blur-xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop Header */}
              <div className="flex items-center justify-between px-4 md:px-5 lg:px-6 xl:px-7 py-3.5 md:py-4 lg:py-4.5 border-b border-white/5 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-2.5 md:gap-3 lg:gap-3.5">
                  <div className="relative">
                    <div className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center shadow-lg">
                      <MessageCircle size={18} className="md:w-5 md:h-5 lg:w-[22px] lg:h-[22px] xl:w-6 xl:h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-green-500 border-2 border-black shadow-lg shadow-green-500/50"></div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm md:text-base lg:text-lg leading-tight">Append</h3>
                    <p className="text-[9px] md:text-[10px] lg:text-[11px] text-brand-muted font-mono leading-tight">Online</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="p-2 md:p-2.5 lg:p-2.5 hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors group relative z-50 pointer-events-auto touch-manipulation"
                  aria-label="Close chat"
                  type="button"
                >
                  <X size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 text-white/70 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Messages Area - Desktop */}
              <div className="flex-1 overflow-y-auto px-4 md:px-5 lg:px-6 xl:px-7 py-4 md:py-5 lg:py-6 xl:py-7 space-y-3 md:space-y-4 lg:space-y-4.5 custom-scrollbar">
                {messages.map((message, index) => (
                  <M.div
                    key={message.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.015 }}
                    className={cn(
                      "flex w-full flex-col",
                      message.role === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] md:max-w-[82%] lg:max-w-[80%] xl:max-w-[78%] rounded-xl lg:rounded-2xl px-3.5 md:px-4 lg:px-5 py-2.5 md:py-3 lg:py-3.5 shadow-sm relative",
                        message.role === 'user'
                          ? "bg-white text-black font-medium rounded-br-sm hover:shadow-md transition-shadow"
                          : message.error
                          ? "bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-white rounded-bl-sm"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-bl-sm hover:bg-white/7 transition-colors"
                      )}
                    >
                      {message.error && (
                        <AlertCircle size={14} className="absolute top-2 right-2 text-red-400" />
                      )}
                      <p className="text-sm md:text-sm lg:text-[15px] leading-relaxed whitespace-pre-wrap break-words pr-5">{message.content}</p>
                      <div className="flex items-center justify-between mt-1.5 md:mt-2">
                        <span className="text-[9px] md:text-[10px] lg:text-[11px] text-brand-muted font-mono opacity-60">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.error && message.retryable && message.role === 'user' && (
                          <button
                            onClick={() => handleRetry(message.id)}
                            className="flex items-center gap-1 text-[9px] md:text-[10px] text-red-400 hover:text-red-300 transition-colors ml-2"
                          >
                            <RefreshCw size={11} />
                            <span>Retry</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </M.div>
                ))}
                {isLoading && (
                  <M.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl rounded-bl-sm px-3.5 md:px-4 lg:px-5 py-2.5 md:py-3 lg:py-3.5 flex items-center gap-2 md:gap-2.5">
                      <Loader2 size={13} className="md:w-[14px] md:h-[14px] lg:w-4 lg:h-4 text-white/60 animate-spin" />
                      <span className="text-[11px] md:text-xs lg:text-[13px] text-white/60 font-mono">Thinking...</span>
                    </div>
                  </M.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Speech Error Message - Desktop */}
              {speechError && (
                <M.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4 md:px-5 lg:px-6 xl:px-7"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-400 flex-1">{speechError}</p>
                  </div>
                </M.div>
              )}

              {/* Input Area - Desktop */}
              <div className="px-4 md:px-5 lg:px-6 xl:px-7 pb-4 md:pb-5 lg:pb-6 pt-3.5 md:pt-4 lg:pt-5 border-t border-white/5 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-md relative z-10">
                <div className="flex gap-2 md:gap-2.5 lg:gap-3 items-center">
                  <M.button
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center transition-all touch-manipulation flex-shrink-0 relative border",
                      isListening
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                        : "bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 border-white/10"
                    )}
                    aria-label={isListening ? "Stop recording" : "Start voice input"}
                    type="button"
                  >
                    {isListening ? (
                      <>
                        <MicOff size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full animate-ping"></span>
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full"></span>
                      </>
                    ) : (
                      <Mic size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5" />
                    )}
                  </M.button>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isListening ? `Recording... ${recordingTime}s` : "Type your message..."}
                      disabled={isLoading || isListening}
                      className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 text-white placeholder:text-white/40 text-sm md:text-sm lg:text-[15px] focus:outline-none focus:border-white/25 focus:bg-white/10 focus:shadow-lg focus:shadow-white/5 transition-all disabled:opacity-50"
                    />
                  </div>
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white text-black rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center hover:bg-white/95 hover:shadow-lg hover:shadow-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 touch-manipulation shadow-md"
                    aria-label="Send message"
                    type="button"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 animate-spin" />
                    ) : (
                      <Send size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5" />
                    )}
                  </M.button>
                </div>
              </div>
            </M.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

