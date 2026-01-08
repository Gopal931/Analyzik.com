
import React, { useState } from 'react';

export const ContentEditingSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoId = "tR_Qfmslwj0";

  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsLoading(true);
  };

  return (
    <div className="pt-56 pb-32 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 font-elegant">Master the Narrative</h2>
        <p className="max-w-xl text-white/50 text-sm tracking-widest uppercase font-bold">AI-Powered Content Creation & Optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Creation Card */}
        <div className="p-10 glass-morphism flex flex-col justify-center min-h-[350px]">
          <div className="text-[10px] font-black text-white/20 mb-8 tracking-[0.4em] uppercase">01. Production</div>
          <h3 className="text-3xl font-bold uppercase mb-6 tracking-tighter font-elegant">Creation</h3>
          <p className="text-white/40 leading-relaxed mb-8 text-sm">
            Generating high-fidelity marketing copy, scripts, and business documents that resonate with your specific brand voice.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Blog Posts', 'Social Copy', 'Video Scripts', 'Whitepapers'].map(tag => (
              <span key={tag} className="px-4 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">{tag}</span>
            ))}
          </div>
        </div>

        {/* Video Showcase Card */}
        <div 
          onClick={() => setIsVideoOpen(true)}
          className="group relative p-10 bg-white text-black flex flex-col justify-between min-h-[400px] cursor-pointer overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.05)]"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="text-[10px] font-black text-black/20 mb-8 tracking-[0.4em] uppercase">Portfolio Highlight</div>
            <h3 className="text-4xl font-black uppercase tracking-tight mb-4 font-elegant leading-[0.9]">
              Visual<br />Editing<br />Reference
            </h3>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Watch Video</span>
            </div>
            <div className="text-[10px] font-bold text-black/40 italic">Client Project</div>
          </div>

          {/* Abstract visual elements */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 border-8 border-black/5 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
        </div>

        {/* Optimization Card */}
        <div className="p-10 glass-morphism flex flex-col justify-center min-h-[350px]">
          <div className="text-[10px] font-black text-white/20 mb-8 tracking-[0.4em] uppercase">02. Performance</div>
          <h3 className="text-3xl font-bold uppercase mb-6 tracking-tighter font-elegant">Optimization</h3>
          <p className="text-white/40 leading-relaxed mb-8 text-sm">
            Refining existing content for SEO, readability, and conversion. Our AI analyzes data to tell you exactly what works.
          </p>
          <div className="flex flex-wrap gap-2">
            {['SEO Audit', 'Tone Analysis', 'Grammar Plus', 'Sentiment'].map(tag => (
              <span key={tag} className="px-4 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-fadeIn" 
            onClick={closeVideo} 
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.08)] border border-white/10 animate-scaleIn">
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 tracking-widest">Loading Portfolio</span>
              </div>
            )}

            <button 
              onClick={closeVideo}
              className="absolute top-6 right-6 z-[60] p-3 bg-black/50 text-white hover:bg-white hover:text-black rounded-full transition-all backdrop-blur-xl border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&enablejsapi=1`} 
              title="ANALYZIK Content Editing Reference"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
