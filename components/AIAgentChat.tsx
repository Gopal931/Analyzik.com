import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAgent, ChatMessage } from './ai-agent/geminiService';
import { LogoIcon } from './Logo';

interface AIAgentChatProps {
  onBookClick?: () => void;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

export const AIAgentChat: React.FC<AIAgentChatProps> = ({ 
  onBookClick,
  isOpen: controlledIsOpen,
  onToggleOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    setInternalIsOpen(val);
    if (onToggleOpen) onToggleOpen(val);
  };
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am the official AI assistant of Analyzik. How can I help you today with our AI solutions, services, or technology questions?",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load custom API key from localStorage if saved
  useEffect(() => {
    const savedKey = localStorage.getItem('analyzik_gemini_key');
    if (savedKey) setCustomApiKey(savedKey);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle mobile hardware/gesture Back button & remove focus
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ analyzikChatOpen: true }, '');

      const handlePopState = () => {
        // When user presses mobile back button, remove focus and close chat
        inputRef.current?.blur();
        setIsOpen(false);
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    inputRef.current?.blur();
    setIsOpen(false);
    if (window.history.state?.analyzikChatOpen) {
      window.history.back();
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Keep pointer focus active so mobile keyboard does not dismiss after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 15);

    try {
      const response = await askGeminiAgent(query, messages, customApiKey);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date(),
        isOffTopic: response.isOffTopic
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to reach the intelligence network right now. Please email **teamanalyzik@gmail.com** or chat with us on WhatsApp.',
          timestamp: new Date(),
          isOffTopic: true
        }
      ]);
    } finally {
      setIsLoading(false);
      // Re-affirm focus after response arrives
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('analyzik_gemini_key', customApiKey.trim());
    setShowSettings(false);
  };

  const starterPrompts = [
    'What AI solutions do you offer?',
    'How does AI Ads optimization work?',
    'What are your deployment timelines?',
    'How is company data protected?'
  ];

  // Helper to parse simple markdown (bold, links, bullet points)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold rendering
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        // Link rendering [text](url)
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [fullMatch, linkText, linkUrl] = linkMatch;
          const pre = part.split(fullMatch)[0];
          const post = part.split(fullMatch)[1];
          return (
            <React.Fragment key={pIdx}>
              {pre}
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 font-bold hover:text-emerald-400 transition-colors"
              >
                {linkText}
              </a>
              {post}
            </React.Fragment>
          );
        }
        return part;
      });

      return (
        <div key={i} className={line.trim() === '' ? 'h-2' : 'min-h-[1.25rem]'}>
          {formattedLine}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Trigger (Bottom-Right) */}
      <div className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-[100]">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#0a0a0a]/90 hover:bg-[#121212] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/15 hover:border-white/35 transition-all duration-300 hover:scale-[1.03] active:scale-95 backdrop-blur-2xl"
            aria-label="Open AI Assistant"
          >
            {/* Sparkle / Agent Icon */}
            <div className="relative w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] font-elegant text-white group-hover:text-emerald-400 transition-colors">
                ANALYZIK AI
              </span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Assistant
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Luxury Compact Chat Window - Fullscreen Below Navbar on Mobile, Floating Drawer on Desktop */}
      {isOpen && (
        <div className="fixed top-16 inset-x-0 bottom-0 sm:top-auto sm:inset-auto sm:bottom-8 sm:right-8 z-[150] w-full sm:w-[360px] md:w-[380px] h-[calc(100dvh-4rem)] sm:h-[500px] sm:max-h-[82vh] bg-[#070707] border-t sm:border border-white/15 sm:border-white/20 rounded-none sm:rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-scaleIn backdrop-blur-3xl relative">
          
          {/* Subtle Ambient Decorative Lighting */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/[0.07] rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-16 left-0 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl pointer-events-none -z-0" />

          {/* Header Bar */}
          <div className="px-4 py-3 sm:py-3.5 border-b border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center p-1 shadow-inner">
                <LogoIcon size={18} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] font-elegant text-white">
                    ANALYZIK AI
                  </h3>
                  <span className="text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Enterprise Intelligence</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Settings / API Key */}
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full border transition-all ${
                  showSettings 
                    ? 'bg-white text-black border-white' 
                    : 'text-white/50 hover:text-white border-white/10 bg-white/5 hover:bg-white/10'
                }`}
                title="Gemini API Key Settings"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Close ("Cut") Button */}
              <button
                type="button"
                onClick={handleClose}
                className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all border border-white/20 shadow-sm"
                aria-label="Close Chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Settings Drawer (Gemini Key Config) */}
          {showSettings && (
            <div className="p-3.5 bg-white/[0.04] border-b border-white/10 animate-fadeIn text-xs relative z-10">
              <label className="block text-[9px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
                Gemini API Key (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="AIzaSy... (leave blank for local RAG)"
                  className="flex-1 bg-black border border-white/20 rounded-xl px-2.5 py-1.5 text-white text-[10px] focus:border-white/60 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="px-3.5 py-1.5 bg-white text-black font-bold uppercase tracking-wider text-[8px] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed custom-scrollbar relative z-10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-semibold rounded-tr-sm shadow-[0_4px_15px_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.05] border border-white/10 text-white/90 rounded-tl-sm shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>

                {/* Quick Action Chips for Off-Topic / Direct Contact */}
                {msg.isOffTopic && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[88%]">
                    <a
                      href="https://wa.me/9779766116618"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-[#25D366] rounded-full text-[8.5px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>WhatsApp Support</span>
                    </a>
                    <a
                      href="mailto:teamanalyzik@gmail.com"
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-[8.5px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>Email Us</span>
                    </a>
                    {onBookClick && (
                      <button
                        type="button"
                        onClick={() => { handleClose(); onBookClick(); }}
                        className="px-3 py-1.5 bg-white text-black rounded-full text-[8.5px] font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md"
                      >
                        <span>Book Audit</span>
                      </button>
                    )}
                  </div>
                )}

                <span className="text-[7.5px] font-mono text-white/25 mt-1 px-1.5">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-white/[0.05] border border-white/10 rounded-2xl w-20 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2.5 pt-1 relative z-10">
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block mb-1.5">
                Suggested Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-[8.5px] px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-white/75 hover:text-white transition-all text-left active:scale-95"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-3.5 border-t border-white/10 bg-[#080808]/95 backdrop-blur-2xl flex items-center gap-2.5 shrink-0 relative z-10"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI solutions, ads, or web design..."
              className="flex-1 bg-white/[0.06] hover:bg-white/[0.08] focus:bg-white/[0.1] border border-white/15 focus:border-emerald-400/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              onMouseDown={(e) => e.preventDefault()}
              onTouchEnd={() => {
                setTimeout(() => inputRef.current?.focus(), 20);
              }}
              className="p-2.5 bg-white text-black rounded-xl hover:scale-105 active:scale-95 disabled:opacity-25 disabled:scale-100 transition-all shrink-0 shadow-md flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send Message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
