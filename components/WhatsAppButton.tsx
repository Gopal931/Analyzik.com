
import React from 'react';

interface WhatsAppButtonProps {
  isChatOpen?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ isChatOpen = false }) => {
  const whatsappNumber = '+9779766116618';
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-[5rem] right-4 sm:bottom-[6.25rem] sm:right-8 z-[100] group flex items-center gap-3 bg-[#0a0a0a]/90 hover:bg-[#121212] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/15 hover:border-[#25D366]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 backdrop-blur-2xl ${
        isChatOpen ? 'opacity-0 pointer-events-none translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
      }`}
      aria-label="Chat on WhatsApp"
    >
      {/* Ambient Green Glow on Hover */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
      
      {/* WhatsApp Icon Badge */}
      <div className="relative w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shrink-0">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03a11.77 11.77 0 001.583 5.961L0 24l6.135-1.61a11.754 11.754 0 005.912 1.586h.005c6.634 0 12.032-5.394 12.036-12.03a11.813 11.813 0 00-3.514-8.497z"/>
        </svg>
      </div>

      {/* Label and Status (Hidden on Mobile, Visible on Desktop) */}
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] font-elegant text-white group-hover:text-emerald-400 transition-colors">
          WHATSAPP
        </span>
        <span className="text-[9px] font-mono text-[#25D366] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          Direct Support
        </span>
      </div>
    </a>
  );
};
