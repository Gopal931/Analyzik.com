
import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onLegalClick?: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  const socialLinks = [
    { name: 'Twitter', url: 'https://x.com/aiworldx0' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sasikant-hathi-59b316279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Instagram', url: 'https://www.instagram.com/aiworld_x?igsh=MWZhNGk1dHdhbHp1' }
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id.replace('#', ''));
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="py-20 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <Logo size={36} className="mb-6" />
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Leading the charge in business-centric artificial intelligence.
            Designed for those who build the future.
          </p>
          <div className="flex flex-wrap gap-4">
             {socialLinks.map(social => (
               <a 
                 key={social.name} 
                 href={social.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="px-5 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-black hover:bg-white hover:border-white transition-all duration-300"
               >
                 {social.name}
               </a>
             ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Navigation</span>
            <a href="#" onClick={(e) => handleScroll(e, '#')} className="text-xs font-bold hover:text-white/60">Home</a>
            <a href="#solutions" onClick={(e) => handleScroll(e, '#solutions')} className="text-xs font-bold hover:text-white/60">Solutions</a>
            <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="text-xs font-bold hover:text-white/60">About</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Legal</span>
            <button 
              onClick={() => onLegalClick?.('privacy')}
              className="text-xs font-bold hover:text-white/60 text-left"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onLegalClick?.('terms')}
              className="text-xs font-bold hover:text-white/60 text-left"
            >
              Terms of Use
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Contact</span>
            <span className="text-xs font-bold">+91 91248 43858</span>
            <a href="mailto:teamanalyzik@gmail.com" className="text-xs font-bold text-white/60 italic lowercase hover:text-white transition-colors">teamanalyzik@gmail.com</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">© 2024 ANALYZIK Solutions. All Rights Reserved.</p>
        <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Designed By ANALYZIK Ai solution and Data Company</p>
      </div>
    </footer>
  );
};
