
import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  
  // User's provided Calendly URL
  // Added theme parameters to match the dark premium aesthetic
  const calendlyUrl = "https://calendly.com/teamanalyzic?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=ffffff";

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-3xl transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-[#000] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_150px_rgba(255,255,255,0.05)] animate-scaleIn flex flex-col">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-black z-30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Secure Sync Session</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight font-elegant">Schedule Your Audit</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area - Calendly Integration */}
        <div className="flex-1 relative bg-black">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
              <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-6" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 animate-pulse">Establishing Secure Link...</p>
            </div>
          )}
          
          <iframe
            src={calendlyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling"
            onLoad={() => setLoading(false)}
            className="relative z-10"
          ></iframe>
        </div>
        
        {/* Footer info to reassure the user */}
        <div className="px-8 py-4 bg-black border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] text-white/10 uppercase font-black tracking-[0.6em]">
            Automated via Calendly Protocol • End-to-End Encrypted
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">Target ID: teamanalyzic</span>
            <div className="w-2 h-2 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
