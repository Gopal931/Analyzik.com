
import React, { useState, useEffect } from 'react';

const designReferences = [
  {
    id: 'begg',
    title: 'BEGG',
    tag: 'Liquid Egg Protocol',
    bg: 'bg-[#F9F6EE]',
    text: 'text-black',
    content: (
      <div className="absolute inset-0 flex flex-col justify-between p-8 overflow-hidden">
        <div className="flex justify-between items-start opacity-30">
          <div className="text-[8px] font-black uppercase tracking-[0.4em]">RETAIL V1.2</div>
          <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center text-[6px] font-bold">P1</div>
        </div>
        <div className="relative z-10">
          <h4 className="text-3xl font-bold uppercase leading-[0.9] tracking-tighter mb-2 opacity-90">A New Look<br />at a familiar<br />product.</h4>
          <div className="text-lg font-serif italic opacity-80">Liquid egg in a bottle</div>
        </div>
        <div className="absolute right-[-5%] bottom-[-5%] w-[70%] h-[60%] bg-white rounded-xl shadow-2xl border border-black/5 rotate-[-3deg] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[25%] bg-[#FFD700]" />
          <div className="p-4 mt-6">
             <div className="w-8 h-8 bg-black/5 rounded-full mb-3" />
             <div className="space-y-1.5">
               <div className="w-full h-[2px] bg-black/5 rounded" />
               <div className="w-2/3 h-[2px] bg-black/5 rounded" />
             </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-12 bg-[#FFD700] clip-path-drip" />
      </div>
    )
  },
  {
    id: 'ellipsus',
    title: 'Ellipsus',
    tag: 'Collaboration OS',
    bg: 'bg-[#121212]',
    text: 'text-white',
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="absolute top-8 left-8 flex gap-3 opacity-30">
           <div className="text-[6px] font-black uppercase tracking-widest">Product</div>
           <div className="text-[6px] font-black uppercase tracking-widest">About</div>
        </div>
        <h4 className="text-3xl font-serif tracking-tight mb-4">Write better together.</h4>
        <p className="max-w-[180px] text-white/30 text-[10px] leading-relaxed mb-6">
          Collaborative writing tool made for human-to-human creativity.
        </p>
        <div className="px-6 py-2 bg-white text-black rounded-full text-[8px] font-black uppercase tracking-widest">Join Beta</div>
        <div className="absolute bottom-10 left-10 w-12 h-12 border border-white/5 rounded-full" />
      </div>
    )
  },
  {
    id: 'occupy',
    title: 'Occupy',
    tag: 'Experimental UX',
    bg: 'bg-[#000]',
    text: 'text-white',
    content: (
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex justify-between items-start z-10">
          <div className="text-2xl font-light tracking-tighter uppercase font-elegant">OCCUPY</div>
          <div className="text-[6px] font-black uppercase tracking-[0.4em] opacity-30">Experience</div>
        </div>
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
           <div className="w-[200px] h-[200px] rounded-full border border-white/10 relative scale-125">
             <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20 -translate-x-1/2" />
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 -translate-y-1/2" />
           </div>
           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-600/20 to-transparent" />
        </div>
        <div className="z-10 text-[6px] font-black uppercase tracking-[0.5em] text-white/20">Experimental Protocol</div>
      </div>
    )
  },
  {
    id: 'jesko',
    title: 'Jesko Jets',
    tag: 'Luxury Aviation',
    bg: 'bg-[#1a1815]',
    text: 'text-[#e5e1d8]',
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="relative w-[85%] h-[85%] rounded-[60px] border-[12px] border-[#222] shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-white/10" />
          <div className="relative z-10 text-center">
             <div className="text-white text-xl font-elegant uppercase tracking-widest mb-1">Jesko</div>
             <div className="w-8 h-[1px] bg-white/20 mx-auto" />
          </div>
        </div>
        <div className="absolute bottom-12 right-8">
           <div className="px-4 py-2 border border-white/20 rounded-full text-[6px] font-black uppercase tracking-widest">Book Flight</div>
        </div>
      </div>
    )
  }
];

export const WebDesignSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % designReferences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-56 pb-32 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Interactive Showcase Box */}
        <div className="order-2 lg:order-1 relative group/box h-[500px] md:h-[600px]">
          {/* Main Box Container */}
          <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/5 bg-white/5 transition-all duration-700 shadow-[0_0_100px_rgba(255,255,255,0.02)] group-hover/box:border-white/20 group-hover/box:shadow-[0_0_120px_rgba(255,255,255,0.05)]">
            
            {/* Design Collage Layers */}
            {designReferences.map((ref, i) => {
              const isActive = activeIdx === i;
              const isNext = (activeIdx + 1) % designReferences.length === i;
              
              return (
                <div
                  key={ref.id}
                  className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-3xl cursor-pointer
                    ${isActive 
                      ? 'inset-6 z-20 opacity-100 scale-100 rotate-0' 
                      : isNext 
                        ? 'inset-12 z-10 opacity-40 scale-95 translate-x-8 translate-y-8 rotate-3 grayscale' 
                        : 'inset-20 z-0 opacity-0 scale-90 translate-x-16 translate-y-16 rotate-6 blur-md'
                    }
                    ${ref.bg} ${ref.text}
                  `}
                >
                  {/* Visual Content */}
                  <div className="w-full h-full transform transition-transform duration-700 group-hover/box:scale-110 group-hover/box:brightness-110 group-hover/box:contrast-110">
                    {ref.content}
                  </div>

                  {/* Quality Enhance Scanline Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/box:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30 animate-scanline" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, rgba(255,255,255,0.02) 50%)', backgroundSize: '100% 4px' }} />
                  </div>
                </div>
              );
            })}

            {/* Quality Status Badge */}
            <div className="absolute bottom-12 right-12 z-30 opacity-0 group-hover/box:opacity-100 translate-y-4 group-hover/box:translate-y-0 transition-all duration-500">
               <div className="flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Fidelity Enhanced</span>
               </div>
            </div>

            {/* Reference Dots */}
            <div className="absolute bottom-12 left-12 z-30 flex gap-2">
              {designReferences.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 transition-all duration-500 rounded-full ${activeIdx === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20 mb-6 block">Module 03</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8 font-elegant leading-[0.9]">
            AI-Driven<br />Web Design
          </h2>
          <div className="text-white/50 text-lg leading-relaxed mb-12 max-w-xl space-y-6">
            <p>
              We design websites that balance strong visual identity with practical business needs. Using intelligent design systems and proven UX principles, we create digital experiences that are clean, fast, and built to convert.
            </p>
            <p className="text-base text-white/40">
              Whether you run a restaurant, hotel, fashion brand, car showroom, hospital, or any service-based business, your website is designed to reflect your brand, communicate clearly, and guide customers toward action. Every project is optimized for performance, accessibility, and long-term growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 glass-morphism rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-white/100 transition-colors">Neural Aesthetics</h4>
              <p className="text-xs text-white/30 leading-relaxed group-hover:text-white/40 transition-colors">Visual languages generated by models trained on the world's most awarded design portfolios.</p>
            </div>
            <div className="space-y-4 p-6 glass-morphism rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-white/100 transition-colors">Dynamic Fidelity</h4>
              <p className="text-xs text-white/30 leading-relaxed group-hover:text-white/40 transition-colors">Assets that enhance and detail themselves based on display density and user interaction.</p>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Touch display to enhance quality</div>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
        </div>
      </div>

      <style>{`
        .clip-path-drip {
          clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 85% 60%, 75% 90%, 60% 70%, 45% 100%, 30% 60%, 15% 90%, 0% 70%);
        }
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline { animation: scanline 4s linear infinite; }
      `}</style>
    </div>
  );
};
