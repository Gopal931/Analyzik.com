
import React, { useState, useEffect } from 'react';

export const AIAdsSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoId = "8cVhRmknpDQ";

  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsLoading(true);
  };

  return (
    <div className="w-full pt-40 pb-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-[0.9] mb-2 font-elegant">
              AI<br />ADS
            </h2>
            <div className="h-1 w-20 bg-white/20 mt-6" />
          </div>
          
          <div className="space-y-10">
            <div className="border-t border-white/5 pt-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-white font-elegant">01. Dynamic Optimization</h4>
              <p className="text-white/50 leading-relaxed text-sm">
                Your campaigns are continuously monitored and adjusted in real time. Budgets, bids, and placements adapt automatically based on performance, ensuring your spend is focused where it delivers the strongest results, day and night.
              </p>
            </div>
            
            <div className="border-t border-white/5 pt-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-white font-elegant">02. Creative Scalability</h4>
              <p className="text-white/50 leading-relaxed text-sm">
                Generate and test multiple ad variations designed for different audience segments. This allows you to scale creative output without losing relevance, helping improve click-through rates and engagement while maintaining brand consistency.
              </p>
            </div>
            
            <div className="border-t border-white/5 pt-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-white font-elegant">03. Predictive ROI</h4>
              <p className="text-white/50 leading-relaxed text-sm">
                Make informed decisions before launching a campaign. Our forecasting models analyze historical data and market signals to estimate performance and return, helping you allocate budget with greater confidence and reduced risk.
              </p>
            </div>
          </div>
        </div>
        
        {/* ROI Box / Video Trigger */}
        <div 
          onClick={() => setIsVideoOpen(true)}
          className="relative aspect-square glass-morphism flex items-center justify-center overflow-hidden rounded-3xl group cursor-pointer transition-all hover:border-white/20 active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.03)]"
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-32 h-[1px] bg-white/10 animate-[move_5s_infinite_linear]" />
            <div className="absolute top-[40%] right-[10%] w-48 h-[1px] bg-white/10 animate-[move_7s_infinite_linear_reverse]" />
            <div className="absolute bottom-[30%] left-[20%] w-24 h-[1px] bg-white/10 animate-[move_4s_infinite_linear]" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <div className="text-white font-black text-8xl md:text-9xl tracking-tighter opacity-5 group-hover:opacity-20 transition-all uppercase select-none font-elegant">
              ROI+
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors duration-500 mt-32">
              Watch Ad Case Study
            </div>
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
          <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.08)] border border-white/10 animate-scaleIn">
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 tracking-widest">Establishing Link</span>
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
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1`} 
              title="ANALYZIK AI Ad Reference"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            ></iframe>
            
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none z-20">
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1 font-elegant">ANALYZIK AI Ads</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Scaling Business with Data-Driven Intelligence</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes move {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(300%); opacity: 0; }
        }
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
