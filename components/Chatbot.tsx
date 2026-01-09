"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Mic, MicOff, RefreshCw } from 'lucide-react';
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

const MAX_MESSAGES = 20;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! 👋 I\'m AppendAI, your friendly AI assistant for AppendLabs. I\'m here to help you discover how we can transform your business with intelligent automation and AI solutions. What would you like to know?',
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

  useEffect(() => {
    if (messages.length > MAX_MESSAGES) {
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
        setIsListening(false);
        setRecordingTime(0);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }

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
        }
        setSpeechError(errorMessage);
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onstart = () => {
        setIsListening(true);
        setRecordingTime(0);
        setSpeechError(null);
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

    if (retryMessageId) {
      const failedMessage = messages.find(m => m.id === retryMessageId);
      if (failedMessage && failedMessage.role === 'user') {
        messageContent = failedMessage.content;
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
      let errorContent = 'Sorry, I\'m having trouble connecting right now. ';
      let isRetryable = true;
      
      if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
        errorContent = 'Too many requests. Please wait a moment and try again. ';
      } else if (error?.isNetworkError || error?.message?.includes('Network error')) {
        errorContent = 'Network error. Please check your internet connection and try again. ';
      } else if (error?.message?.includes('401') || error?.message?.includes('403') || error?.message?.includes('Invalid API key')) {
        errorContent = 'Authentication error. The API key may be missing or invalid. Please contact support. ';
        isRetryable = false;
      } else if (error?.message?.includes('not configured') || error?.message?.includes('VITE_OPENAI_API_KEY')) {
        errorContent = 'Service configuration error. Please contact support at hello@appendlabs.com. ';
        isRetryable = false;
      } else if (error?.message?.includes('Empty response')) {
        errorContent = 'Received empty response. Please try again. ';
      } else if (error?.message?.includes('timeout')) {
        errorContent = 'Request timed out. Please try again. ';
      }

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: errorContent + (isRetryable ? 'You can also contact us directly at hello@appendlabs.com.' : ''),
        timestamp: new Date(),
        error: true,
        retryable: isRetryable
      };

      setMessages(prev => prev.map(m => 
        m.id === userMessage.id ? { ...m, error: true, retryable: isRetryable } : m
      ));

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async (messageId: string) => {
    const failedMessage = messages.find(m => m.id === messageId);
    if (!failedMessage || failedMessage.role !== 'user') return;
    
    setMessages(prev => prev.filter(m => {
      if (m.error && m.role === 'assistant') return false;
      if (m.id === messageId && m.error) return false;
      return true;
    }));
    
    setTimeout(() => {
      handleSend(messageId);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile: Full Screen */}
            <M.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] md:hidden bg-black flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-black/95 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <MessageCircle size={16} className="text-white/80" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black"></div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm leading-tight">AppendAI</h3>
                    <p className="text-[9px] text-brand-muted font-mono leading-tight">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors -mr-1"
                  aria-label="Close chat"
                >
                  <X size={20} className="text-white/70" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
                {messages.map((message) => (
                  <M.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex w-full flex-col",
                      message.role === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm relative",
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

              {speechError && (
                <M.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    <p className="text-xs text-red-400">{speechError}</p>
                  </div>
                </M.div>
              )}

              <div className="px-4 pb-4 pt-3.5 border-t border-white/5 bg-black/95 backdrop-blur-sm">
                <div className="flex gap-2 items-center">
                  <M.button
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 relative",
                      isListening
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 border border-white/10"
                    )}
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
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? `Recording... ${recordingTime}s` : "Type a message..."}
                    disabled={isLoading || isListening}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all disabled:opacity-50"
                  />
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-md"
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

            {/* Desktop: Modal Window */}
            <M.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="hidden md:flex fixed bottom-5 right-5 lg:bottom-6 lg:right-6 z-[100] w-[360px] lg:w-[380px] xl:w-[400px] h-[580px] lg:h-[600px] xl:h-[620px] bg-black border border-white/10 rounded-xl lg:rounded-2xl shadow-2xl flex-col overflow-hidden backdrop-blur-xl pointer-events-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center shadow-lg">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-black shadow-lg shadow-green-500/50"></div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base leading-tight">AppendAI</h3>
                    <p className="text-[10px] text-brand-muted font-mono leading-tight">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 custom-scrollbar">
                {messages.map((message) => (
                  <M.div
                    key={message.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex w-full flex-col",
                      message.role === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl px-4 py-3 shadow-sm relative",
                        message.role === 'user'
                          ? "bg-white text-black font-medium rounded-br-sm hover:shadow-md transition-shadow"
                          : message.error
                          ? "bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-white rounded-bl-sm"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-bl-sm hover:bg-white/7 transition-colors"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      {message.error && message.retryable && message.role === 'user' && (
                        <button
                          onClick={() => handleRetry(message.id)}
                          className="mt-2 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          <RefreshCw size={11} />
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
                    <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                      <Loader2 size={14} className="text-white/60 animate-spin" />
                      <span className="text-xs text-white/60 font-mono">Thinking...</span>
                    </div>
                  </M.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {speechError && (
                <M.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-5"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    <p className="text-xs text-red-400">{speechError}</p>
                  </div>
                </M.div>
              )}

              <div className="px-5 pb-5 pt-4 border-t border-white/5 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-md">
                <div className="flex gap-2.5 items-center">
                  <M.button
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center transition-all flex-shrink-0 relative border",
                      isListening
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                        : "bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 border-white/10"
                    )}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={18} />
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                      </>
                    ) : (
                      <Mic size={18} />
                    )}
                  </M.button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? `Recording... ${recordingTime}s` : "Type your message..."}
                    disabled={isLoading || isListening}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/25 focus:bg-white/10 transition-all disabled:opacity-50"
                  />
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-white text-black rounded-xl flex items-center justify-center hover:bg-white/95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-md"
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
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

