
import React, { useEffect } from 'react';

interface AISolutionsDetailProps {
  onBack: () => void;
  onBookClick: () => void;
}

const products = [
  {
    title: 'AI Voice Agent',
    description: 'Human-like voice interactions powered by neural synthesis for high-fidelity customer support and sales automation.',
  },
  {
    title: 'Automate WhatsApp Message',
    description: 'End-to-end conversational workflows for WhatsApp, enabling 24/7 engagement and seamless transactional updates.',
  },
  {
    title: 'Automate Instagram Message',
    description: 'Turn DMs and comments into conversions with intelligent engagement bots that manage your social inbox at scale.',
  },
  {
    title: 'Lead Generation',
    description: 'Machine learning algorithms that identify, score, and qualify high-intent prospects across multiple data streams.',
  },
  {
    title: 'Automate Social Posts',
    description: 'Dynamic brand presence management with AI-generated visual and textual content scheduled across all major platforms.',
  },
  {
    title: 'LinkedIn Brand Automation',
    description: 'B2B authority building through automated thought leadership posts and targeted network engagement.',
  },
  {
    title: 'Product Analysis',
    description: 'Deep-dive business intelligence that analyzes market performance and customer sentiment to guide product roadmap decisions.',
  },
  {
    title: 'Custom Agent Builder',
    description: 'We design custom AI agents tailored to your business needs to automate repetitive tasks, reduce manual work, and save valuable time. These agents integrate into your existing processes, helping teams work more efficiently and focus on higher-value activities.',
  }
];

export const AISolutionsDetail: React.FC<AISolutionsDetailProps> = ({ onBack, onBookClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-40 pb-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20 group cursor-pointer" onClick={onBack}>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Return to Home</span>
        </div>

        <div className="mb-32 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-8 selection:bg-white selection:text-black font-elegant">
            AI PRODUCTS
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed">
            Intelligent agents and workflows, working together to power smarter business operations.
          </p>
          <div className="h-[1px] w-24 bg-white/10 mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => {
            const isLast = index === products.length - 1;
            return (
              <div 
                key={product.title}
                className={`group p-12 border border-white/10 hover:border-white/40 transition-all duration-500 flex flex-col justify-between min-h-[400px] ${
                  isLast ? 'md:col-span-2 bg-gradient-to-br from-white/5 to-transparent' : 'glass-morphism'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold text-white/20 mb-12 tracking-[0.5em] uppercase">Module 0{index + 1}</div>
                  <h3 className="text-4xl font-bold uppercase tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500 font-elegant">
                    {product.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-lg group-hover:text-white/60 transition-colors">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-12">
                  <button 
                    onClick={onBookClick}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] py-4 px-8 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all"
                  >
                    Deploy Integration
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-40 text-center">
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-12 font-elegant">Ready to scale your intelligence?</h2>
            <button 
                onClick={onBookClick}
                className="px-20 py-8 bg-white text-black font-bold uppercase tracking-[0.3em] text-sm rounded-full hover:scale-105 transition-all shadow-[0_30px_100px_rgba(255,255,255,0.2)]"
            >
                Schedule Architecture Audit
            </button>
        </div>
      </div>
    </div>
  );
};
