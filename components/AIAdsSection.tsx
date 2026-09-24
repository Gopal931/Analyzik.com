import React, { useState } from 'react';

interface AIAdsSectionProps {
  onBookClick?: () => void;
}

export const AIAdsSection: React.FC<AIAdsSectionProps> = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'video'>('calculator');
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoId = "8cVhRmknpDQ";

  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsLoading(true);
  };

  // Live ROI Calculations
  const estimatedSavings = Math.round(monthlySpend * 0.28);
  const projectedRevenueLift = Math.round(monthlySpend * 2.85);
  const hoursSaved = Math.round(monthlySpend * 0.006 + 18);

  return (
    <div className="w-full pt-40 pb-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column: Descriptions */}
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
        
        {/* Right Column: Interactive Dual Widget (ROI Simulator / Video Case Study) */}
        <div className="relative glass-morphism rounded-3xl border border-white/10 p-8 sm:p-10 shadow-[0_0_80px_rgba(255,255,255,0.03)] flex flex-col justify-between min-h-[540px]">
          {/* Top Switcher Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-6 mb-8">
            <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'calculator' 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                ROI Simulator
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'video' 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Case Study
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Live Model</span>
            </div>
          </div>

          {activeTab === 'calculator' ? (
            /* Interactive ROI Simulator View */
            <div className="space-y-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 font-mono">
                    Monthly Ad Budget
                  </label>
                  <span className="text-2xl sm:text-3xl font-bold font-elegant text-white">
                    ${monthlySpend.toLocaleString()}
                  </span>
                </div>
                
                {/* Custom Range Slider */}
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[9px] font-mono text-white/30 mt-2">
                  <span>$1,000/mo</span>
                  <span>$25,000/mo</span>
                  <span>$50,000/mo</span>
                </div>
              </div>

              {/* Calculated Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">
                    Ad Waste Saved
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-elegant text-emerald-400">
                    +${estimatedSavings.toLocaleString()}
                  </div>
                  <div className="text-[8px] text-white/30 mt-1">Via real-time pruning</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">
                    Projected Return
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-elegant text-white">
                    +${projectedRevenueLift.toLocaleString()}
                  </div>
                  <div className="text-[8px] text-white/30 mt-1">2.8x neural targeting</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">
                    Hours Saved
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-elegant text-white">
                    ~{hoursSaved} hrs
                  </div>
                  <div className="text-[8px] text-white/30 mt-1">Creative testing auto</div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
                >
                  <span>Verify Potential in Strategy Audit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* Video Case Study Trigger View */
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="flex-1 flex flex-col items-center justify-center relative cursor-pointer group py-12"
            >
              <div className="text-white font-black text-8xl sm:text-9xl tracking-tighter opacity-10 group-hover:opacity-25 transition-all uppercase select-none font-elegant">
                ROI+
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-2xl">
                  <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors mt-8">
                Click To Play Case Study (9:16)
              </span>
            </div>
          )}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
