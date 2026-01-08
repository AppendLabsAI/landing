"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const M = motion as any;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { sendChatMessage } = await import('@/lib/chatbot-api');
      const response = await sendChatMessage(
        userMessage.content,
        messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again or contact us at hello@appendlabs.com',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-white text-black rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105 active:scale-95 pointer-events-auto group"
        aria-label="Open chat"
      >
        <MessageCircle size={18} className="sm:w-[20px] sm:h-[20px] md:w-5 md:h-5 transition-transform group-hover:scale-110" />
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
                      "flex w-full",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                        message.role === 'user'
                          ? "bg-white text-black font-medium rounded-br-sm"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
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

              {/* Input Area - Mobile */}
              <div className="px-4 pb-4 pt-3.5 border-t border-white/5 bg-black/95 backdrop-blur-sm safe-area-inset-bottom">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      disabled={isLoading || isListening}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={toggleVoiceInput}
                      disabled={isLoading}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all touch-manipulation",
                        isListening
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "text-white/40 hover:text-white/70 hover:bg-white/10"
                      )}
                      aria-label={isListening ? "Stop recording" : "Start voice input"}
                    >
                      {isListening ? (
                        <MicOff size={16} />
                      ) : (
                        <Mic size={16} />
                      )}
                    </button>
                  </div>
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-white text-black rounded-xl flex items-center justify-center hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 touch-manipulation"
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
              className="hidden md:flex fixed bottom-5 right-5 lg:bottom-6 lg:right-6 z-[100] w-[400px] lg:w-[440px] xl:w-[460px] h-[660px] lg:h-[700px] xl:h-[720px] bg-black border border-white/10 rounded-xl lg:rounded-2xl shadow-2xl flex-col overflow-hidden backdrop-blur-xl pointer-events-auto"
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
              <div className="flex-1 overflow-y-auto px-5 lg:px-6 xl:px-7 py-5 lg:py-6 xl:py-7 space-y-4 lg:space-y-4.5 custom-scrollbar">
                {messages.map((message, index) => (
                  <M.div
                    key={message.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.015 }}
                    className={cn(
                      "flex w-full",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[82%] lg:max-w-[80%] xl:max-w-[78%] rounded-xl lg:rounded-2xl px-4 lg:px-5 py-3 lg:py-3.5 shadow-sm",
                        message.role === 'user'
                          ? "bg-white text-black font-medium rounded-br-sm hover:shadow-md transition-shadow"
                          : "bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-bl-sm hover:bg-white/7 transition-colors"
                      )}
                    >
                      <p className="text-sm lg:text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      <span className="text-[10px] lg:text-[11px] text-brand-muted mt-2 block font-mono opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </M.div>
                ))}
                {isLoading && (
                  <M.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl rounded-bl-sm px-4 lg:px-5 py-3 lg:py-3.5 flex items-center gap-2.5">
                      <Loader2 size={14} className="lg:w-4 lg:h-4 text-white/60 animate-spin" />
                      <span className="text-xs lg:text-[13px] text-white/60 font-mono">Thinking...</span>
                    </div>
                  </M.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Desktop */}
              <div className="px-5 lg:px-6 xl:px-7 pb-5 lg:pb-6 pt-4 lg:pt-5 border-t border-white/5 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-md">
                <div className="flex gap-2 lg:gap-2.5 items-end">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading || isListening}
                      className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl px-4 lg:px-5 py-3 lg:py-3.5 pr-10 lg:pr-12 text-white placeholder:text-white/40 text-sm lg:text-[15px] focus:outline-none focus:border-white/25 focus:bg-white/10 focus:shadow-lg focus:shadow-white/5 transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={toggleVoiceInput}
                      disabled={isLoading}
                      className={cn(
                        "absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 p-1.5 lg:p-2 rounded-lg transition-all",
                        isListening
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "text-white/40 hover:text-white/70 hover:bg-white/10"
                      )}
                      aria-label={isListening ? "Stop recording" : "Start voice input"}
                    >
                      {isListening ? (
                        <MicOff size={16} className="lg:w-4 lg:h-4" />
                      ) : (
                        <Mic size={16} className="lg:w-4 lg:h-4" />
                      )}
                    </button>
                  </div>
                  <M.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 lg:w-12 lg:h-12 bg-white text-black rounded-xl lg:rounded-2xl flex items-center justify-center hover:bg-white/95 hover:shadow-lg hover:shadow-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="lg:w-5 lg:h-5 animate-spin" />
                    ) : (
                      <Send size={18} className="lg:w-5 lg:h-5" />
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

