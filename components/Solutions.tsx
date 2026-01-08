
import React from 'react';

interface SolutionsProps {
  onAIDetailClick?: () => void;
}

const mainServices = [
  {
    title: 'AI Solutions',
    description: 'We build practical AI systems that automate workflows, analyze data, and support smarter decision-making, helping businesses save time and operate more efficiently.',
    id: 'solutions',
    isPrimary: true
  },
  {
    title: 'AI Advertising',
    description: 'We optimize and manage ad campaigns using data-driven automation to improve targeting, performance, and return on ad spend while maintaining full control and transparency.',
    id: 'ai-ads',
    isPrimary: false
  },
  {
    title: 'Web Design',
    description: 'We design modern, high-performance websites that reflect your brand, work seamlessly across devices, and are built to convert visitors into customers.',
    id: 'web-design',
    isPrimary: false
  },
  {
    title: 'Content Editing',
    description: 'We refine and enhance your content to ensure clarity, consistency, and brand alignment across marketing, social media, and digital platforms.',
    id: 'content-editing',
    isPrimary: false
  }
];

const topInfoLinks = [
  { title: 'About', id: 'about' },
  { title: 'Contact', id: 'contact' }
];

export const Solutions: React.FC<SolutionsProps> = ({ onAIDetailClick }) => {
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'solutions' && onAIDetailClick) {
      onAIDetailClick();
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-56 pb-32 px-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-end gap-12 mb-16 border-b border-white/10 pb-8">
        {topInfoLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleScroll(e, link.id)}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all hover:tracking-[0.5em] flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            {link.title}
          </a>
        ))}
      </div>

      <div className="mb-20">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 font-elegant">SERVICES</h2>
        <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Integrated intelligence modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainServices.map((item, index) => (
          <a 
            key={item.title} 
            href={`#${item.id}`}
            onClick={(e) => handleScroll(e, item.id)}
            className={`group p-10 transition-all duration-500 flex flex-col justify-between min-h-[350px] border border-white/10 ${
              item.isPrimary 
                ? 'lg:col-span-2 bg-white text-black' 
                : 'glass-morphism hover:bg-white hover:text-black'
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-10 transition-colors ${
                item.isPrimary ? 'bg-black/5' : 'bg-white/5 group-hover:bg-black/5'
              }`}>
                <span className="text-xs font-bold">{`0${index + 1}`}</span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                 <h3 className="text-4xl font-bold uppercase tracking-tight font-elegant">
                  {item.title}
                </h3>
                {item.id === 'web-design' && (
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-black/40">Powered by AI</span>
                )}
              </div>
              <p className={`leading-relaxed transition-colors ${
                item.isPrimary ? 'text-black/60' : 'text-white/50 group-hover:text-black/60'
              }`}>
                {item.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {item.isPrimary ? 'View Catalog' : 'Explore'}
              </span>
              <div className={`h-[1px] w-10 transition-all ${
                item.isPrimary ? 'bg-black/20' : 'bg-white/20 group-hover:bg-black/20'
              }`} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
