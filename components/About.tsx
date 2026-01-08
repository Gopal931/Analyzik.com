
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="pt-56 pb-32 px-6 bg-[#0a0a0a] w-full">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20 mb-8 block">The Protocol</span>
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-12 font-elegant">Building the future of business intelligence.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-white/60 leading-relaxed font-medium">
          <div className="space-y-8">
            <p>
              ANALYZIK was created to solve a practical problem: businesses collect more data than ever, but turning that data into clear, actionable insight remains difficult. We help close that gap by using advanced AI to analyze information, identify patterns, and support better decision-making.
            </p>
          </div>
          <div className="space-y-8">
            <p>
              Our platform is designed to fit into existing workflows with minimal friction. From automation and analytics to performance optimization, ANALYZIK helps teams operate more efficiently and make decisions with greater confidence.
            </p>
            <p>
              Whether you are a growing startup or an established enterprise, ANALYZIK provides the tools needed to scale intelligently, reduce manual effort, and focus on outcomes that matter.
            </p>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-end border-t border-white/5 pt-12">
          {[
            { label: 'Successful Clients', val: '15+' },
            { label: 'AI Models Deployed', val: '50+' },
            { label: 'Efficiency Gain', val: '80%' },
            { label: 'Team Experts', val: '7+' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-bold mb-1">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}

          {/* Key Partner: GoLogin */}
          <div className="flex flex-col gap-2 group transition-all">
            <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M50 20C33.4 20 20 33.4 20 50s13.4 30 30 30c8.3 0 15.8-3.4 21.2-8.8L60 60c-2.7 2.7-6.4 4.4-10.5 4.4-8.3 0-15-6.7-15-15s6.7-15 15-15c4.1 0 7.8 1.7 10.5 4.4l11.2-11.2C65.8 23.4 58.3 20 50 20z" />
                  <path d="M80 50c0-16.6-13.4-30-30-30-8.3 0-15.8 3.4-21.2 8.8L40 40c2.7-2.7 6.4-4.4 10.5-4.4 8.3 0 15 6.7 15 15s-6.7 15-15 15c-4.1 0-7.8-1.7-10.5-4.4L28.8 71.2C34.2 76.6 41.7 80 50 80c16.6 0 30-13.4 30-30z" opacity="0.5" />
                </svg>
              </div>
              <span className="text-sm font-black uppercase tracking-widest font-elegant">GoLogin</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Strategic Partner</div>
          </div>

          {/* Key Partner: Aiworldx */}
          <div className="flex flex-col gap-2 group transition-all">
            <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white stroke-current fill-none">
                   <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" strokeWidth="2" opacity="0.5" />
                   <path d="M40 65 L50 35 L60 65" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-black uppercase tracking-widest font-elegant">Aiworldx</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Strategic Partner</div>
          </div>
        </div>
      </div>
    </div>
  );
};
