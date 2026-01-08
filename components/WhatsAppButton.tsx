
import React from 'react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '+9779766116618';
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 left-10 z-[100] group flex items-center gap-4 bg-white text-[#25D366] p-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 transition-all hover:scale-110 active:scale-95 overflow-hidden"
      aria-label="Chat on WhatsApp"
    >
      {/* Background Highlight Effect */}
      <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
      
      <div className="w-8 h-8 flex items-center justify-center transition-colors duration-300 group-hover:text-white">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03a11.77 11.77 0 001.583 5.961L0 24l6.135-1.61a11.754 11.754 0 005.912 1.586h.005c6.634 0 12.032-5.394 12.036-12.03a11.813 11.813 0 00-3.514-8.497z"/>
        </svg>
      </div>
      <span className="hidden group-hover:block pr-2 text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
};
