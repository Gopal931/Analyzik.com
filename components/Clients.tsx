import React from 'react';

const partners = [
  {
    name: 'GoLogin',
    category: 'Strategic Partner',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 text-white fill-current">
        <path d="M50 20C33.4 20 20 33.4 20 50s13.4 30 30 30c8.3 0 15.8-3.4 21.2-8.8L60 60c-2.7 2.7-6.4 4.4-10.5 4.4-8.3 0-15-6.7-15-15s6.7-15 15-15c4.1 0 7.8 1.7 10.5 4.4l11.2-11.2C65.8 23.4 58.3 20 50 20z" />
        <path d="M80 50c0-16.6-13.4-30-30-30-8.3 0-15.8 3.4-21.2 8.8L40 40c2.7-2.7 6.4-4.4 10.5-4.4 8.3 0 15 6.7 15 15s-6.7 15-15 15c-4.1 0-7.8-1.7-10.5-4.4L28.8 71.2C34.2 76.6 41.7 80 50 80c16.6 0 30-13.4 30-30z" opacity="0.5" />
      </svg>
    )
  },
  {
    name: 'Aiworldx',
    category: 'Ecosystem Partner',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 text-white">
        <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
        <path d="M40 65 L50 35 L60 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 55 H58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>
    )
  },
  {
    name: 'Meta Ads API',
    category: 'Ad Infrastructure',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
      </svg>
    )
  },
  {
    name: 'WhatsApp Cloud',
    category: 'Automated CRM',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03a11.77 11.77 0 001.583 5.961L0 24l6.135-1.61a11.754 11.754 0 005.912 1.586h.005c6.634 0 12.032-5.394 12.036-12.03a11.813 11.813 0 00-3.514-8.497z"/>
      </svg>
    )
  },
  {
    name: 'OpenAI Stack',
    category: 'Neural Models',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2 text-white">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
        <path d="M12 6v12M6 12h12M7.75 7.75l8.5 8.5M16.25 7.75l-8.5 8.5" strokeOpacity="0.8" />
      </svg>
    )
  },
  {
    name: 'Vercel Edge',
    category: 'Hosting & Latency',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    )
  }
];

export const Clients: React.FC = () => {
  return (
    <div className="w-full py-16 bg-black border-y border-white/5 overflow-hidden relative">
      {/* Side gradient fades for seamless marquee */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
            Enterprise Integrations & Partners
          </span>
        </div>
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest hidden sm:inline-block">
          Production Grade Infrastructure
        </span>
      </div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden group select-none">
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`} 
              className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.05] cursor-default"
            >
              <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase font-elegant text-white/90">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
