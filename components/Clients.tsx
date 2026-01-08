
import React from 'react';

const clients = [
  {
    name: 'GoLogin',
    logo: (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
            <path d="M50 20C33.4 20 20 33.4 20 50s13.4 30 30 30c8.3 0 15.8-3.4 21.2-8.8L60 60c-2.7 2.7-6.4 4.4-10.5 4.4-8.3 0-15-6.7-15-15s6.7-15 15-15c4.1 0 7.8 1.7 10.5 4.4l11.2-11.2C65.8 23.4 58.3 20 50 20z" />
            <path d="M80 50c0-16.6-13.4-30-30-30-8.3 0-15.8 3.4-21.2 8.8L40 40c2.7-2.7 6.4-4.4 10.5-4.4 8.3 0 15 6.7 15 15s-6.7 15-15 15c-4.1 0-7.8-1.7-10.5-4.4L28.8 71.2C34.2 76.6 41.7 80 50 80c16.6 0 30-13.4 30-30z" opacity="0.5" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-[0.1em] uppercase font-elegant">GoLogin</span>
      </div>
    )
  },
  {
    name: 'Aiworldx',
    logo: (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Aiworldx Logo Recreation based on reference image */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
             {/* Background Diamond patterns */}
             <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
             <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
             
             {/* Main Icon Shape (Simplified Hex/Diamond) */}
             <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
             
             {/* Center Stylized "A" or symbol element */}
             <path d="M40 65 L50 35 L60 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
             <path d="M42 55 H58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-[0.1em] uppercase font-elegant">Aiworldx</span>
      </div>
    )
  }
];

export const Clients: React.FC = () => {
  return (
    <div className="w-full py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 whitespace-nowrap">
            Strategic Partnerships
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24">
            {clients.map((client) => (
              <div 
                key={client.name} 
                className="group flex items-center transition-all duration-500 hover:scale-110"
                title={client.name}
              >
                <div className="filter grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500">
                  {client.logo}
                </div>
              </div>
            ))}
            
            {/* Maintaining slots if needed */}
            {clients.length < 2 && (
              <div className="hidden md:flex items-center text-[10px] font-bold text-white/5 uppercase tracking-[0.3em] border border-dashed border-white/5 px-8 py-4 rounded-full">
                Incoming Partners
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
