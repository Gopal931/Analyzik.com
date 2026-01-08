
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

const concepts = [
  {
    id: 'automation',
    title: 'Automation',
    component: () => (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 opacity-100">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full transform-gpu scale-110">
            <defs>
              <filter id="glow-heavy">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <pattern id="dotGridLarge" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.25)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotGridLarge)" />

            <g filter="url(#glow-heavy)">
              <path d="M-200,500 C100,100 900,900 1200,500" fill="none" stroke="url(#streamGrad)" strokeWidth="4" strokeDasharray="30,60">
                <animate attributeName="stroke-dashoffset" from="0" to="900" dur="12s" repeatCount="indefinite" />
              </path>
              <path d="M-200,300 C400,700 600,300 1200,700" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeDasharray="15,45">
                <animate attributeName="stroke-dashoffset" from="600" to="0" dur="8s" repeatCount="indefinite" />
              </path>
            </g>

            {[...Array(15)].map((_, i) => (
              <circle key={i} r="4" fill="white" className="opacity-100">
                <animateMotion 
                  path={`M${Math.random()*1000},${Math.random()*1000} Q${Math.random()*1000},${Math.random()*1000} ${Math.random()*1000},${Math.random()*1000}`} 
                  dur={`${3 + Math.random()*4}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            ))}

            <g transform="translate(500, 860)">
              <rect x="-120" y="-50" width="240" height="100" rx="12" fill="rgba(0,0,0,0.95)" stroke="white" strokeWidth="4" filter="url(#glow-heavy)" />
              <text y="10" fill="white" fontSize="18" textAnchor="middle" fontWeight="700" letterSpacing="6" fontFamily="'Montserrat', sans-serif">AUTOMATION</text>
              <rect x="-130" y="-60" width="260" height="120" rx="16" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
              <circle r="80" fill="none" stroke="white" strokeWidth="1" strokeDasharray="20,10" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>
      </div>
    )
  },
  {
    id: 'timeline',
    title: 'Editing Timeline',
    component: () => (
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 opacity-70 flex flex-col justify-end pb-24 px-12 gap-3">
          <div className="w-full h-6 bg-white/10 rounded-t-xl border-x border-t border-white/30 flex items-center px-6">
             <div className="flex gap-2">
                {[...Array(30)].map((_, i) => <div key={i} className={`h-1.5 w-6 ${i % 5 === 0 ? 'bg-white/50' : 'bg-white/15'}`} />)}
             </div>
          </div>
          
          {[
            { label: 'VIDEO_01', clips: [{w: '25%', x: '15%', c: '#ff0055'}, {w: '35%', x: '45%', c: '#ff0055'}] },
            { label: 'OVERLAY', clips: [{w: '15%', x: '5%', c: '#00ccff'}, {w: '20%', x: '65%', c: '#00ccff'}] },
            { label: 'AUDIO_M', clips: [{w: '85%', x: '5%', c: '#00ffaa'}] },
            { label: 'SFX_SYS', clips: [{w: '10%', x: '12%', c: '#ffaa00'}, {w: '15%', x: '55%', c: '#ffaa00'}] },
          ].map((track, i) => (
            <div key={i} className="h-16 w-full bg-white/5 border border-white/20 flex items-center relative group overflow-hidden rounded-md">
              <div className="w-24 h-full border-r border-white/30 flex items-center justify-center text-[10px] font-black text-white/60 z-20 bg-black/60 tracking-widest">
                {track.label}
              </div>
              <div className="flex-1 h-full relative bg-white/[0.02]">
                {track.clips.map((clip, ci) => (
                  <div 
                    key={ci}
                    className="absolute h-12 top-2 rounded-sm border border-white/30 shadow-2xl transition-all"
                    style={{ 
                      left: clip.x, 
                      width: clip.w, 
                      backgroundColor: `${clip.c}55`,
                      borderLeft: `4px solid ${clip.c}`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="absolute inset-y-0 w-[3px] bg-red-600 shadow-[0_0_25px_rgba(220,38,38,1)] z-30" style={{ left: '38%' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-red-600 rounded-b-sm border-x border-white/20" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-bold text-[18vw] select-none pointer-events-none uppercase tracking-tight font-elegant">
          Editing
        </div>
      </div>
    )
  },
  {
    id: 'growth',
    title: 'Growth',
    component: () => (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        <div className="relative w-full h-full flex flex-col items-center justify-center opacity-90">
          <div className="flex items-end gap-4 md:gap-12 h-[70%] w-full max-w-7xl px-16">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="relative flex-1 flex flex-col items-center group h-full justify-end"
              >
                <div 
                  className="w-full bg-gradient-to-t from-white/10 via-white/30 to-white/60 border-t border-x border-white/50 rounded-t-3xl shadow-[0_-40px_100px_rgba(255,255,255,0.15)] animate-bar-rise overflow-hidden"
                  style={{ 
                    height: `${(i + 1) * 13}%`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.2s'
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.12)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />
                </div>
                
                <div 
                  className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white] animate-letter-pop"
                  style={{ 
                    bottom: `${(i + 1) * 13}%`, 
                    marginBottom: '15px',
                    animationDelay: `${(i * 0.15) + 0.6}s` 
                  }}
                />
              </div>
            ))}
          </div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path 
              d="M0,880 C300,880 600,600 1000,100" 
              stroke="white" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="2500" 
              className="animate-draw-arrow opacity-50" 
            />
            <circle cx="1000" cy="100" r="15" fill="white" className="animate-ping" />
          </svg>
        </div>
      </div>
    )
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookClick }) => {
  const [activeConcept, setActiveConcept] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveConcept((prev) => (prev + 1) % concepts.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {concepts.map((concept, idx) => (
          <div 
            key={concept.id}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              idx === activeConcept ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            {concept.component()}
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="max-w-7xl w-full text-center relative z-10 px-6 flex flex-col items-center">
        <div className="relative mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.1] max-w-5xl mx-auto mix-blend-difference selection:bg-white selection:text-black font-elegant">
            Intelligence. Automation. Growth.
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-12">
            {concepts.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveConcept(idx)}
                className="relative h-2 w-20 bg-white/10 overflow-hidden rounded-full pointer-events-auto cursor-pointer border border-white/5 shadow-lg"
              >
                <div 
                  className={`absolute inset-0 bg-white transition-transform duration-[7000ms] linear ${
                    idx === activeConcept ? 'translate-x-0' : '-translate-x-full'
                  }`}
                  style={{ transitionTimingFunction: 'linear' }}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pointer-events-auto">
          <button 
            onClick={onBookClick}
            className="w-full sm:w-auto px-20 py-8 bg-white text-black font-bold uppercase tracking-[0.3em] text-sm rounded-full hover:scale-105 transition-all shadow-[0_30px_100px_rgba(255,255,255,0.4)] active:scale-95"
          >
            Book an Appointment
          </button>
          <button 
            onClick={onExploreClick}
            className="w-full sm:w-auto px-20 py-8 border-2 border-white/40 hover:bg-white hover:text-black font-bold uppercase tracking-[0.3em] text-sm rounded-full transition-all active:scale-95 backdrop-blur-xl"
          >
            Explore Solutions
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bar-rise {
          0% { height: 0; transform: translateY(60px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-bar-rise { animation: bar-rise cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes letter-pop {
          0% { transform: scale(0); opacity: 0; filter: blur(15px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-letter-pop { animation: letter-pop cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes draw-arrow {
          from { stroke-dashoffset: 2500; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 0.5; }
        }
        .animate-draw-arrow { animation: draw-arrow 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards; }

        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shine { animation: shine 6s infinite linear; }
      `}</style>
    </section>
  );
};
