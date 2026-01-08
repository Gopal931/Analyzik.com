
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface NavbarProps {
  onBookClick: () => void;
  onHomeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, onHomeClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (onHomeClick && href === '#') {
      onHomeClick();
      return;
    }

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'AI Solutions', href: '#solutions' },
    { label: 'AI Ads', href: '#ai-ads' },
    { label: 'Web Design', href: '#web-design' },
    { label: 'Content Editing', href: '#content-editing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${
        scrolled || mobileMenuOpen ? 'bg-black/95 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        {/* Brand/Logo Section - Fixed width to prevent push */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 relative z-20"
          onClick={() => onHomeClick ? onHomeClick() : window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo size={32} />
        </div>
        
        {/* Navigation Items - Centered with flexible gaps */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all whitespace-nowrap py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        
        {/* Action Button Section - Right aligned */}
        <div className="hidden md:flex flex-shrink-0">
          <button 
            onClick={onBookClick}
            className="px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 whitespace-nowrap"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex-shrink-0">
          <button 
            className="text-white p-2 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 top-[73px] bg-black/98 backdrop-blur-3xl transition-all duration-500 ease-in-out overflow-hidden ${
        mobileMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 pb-40">
          {navItems.map((item, idx) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-2xl font-black uppercase tracking-widest text-white/60 hover:text-white transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => { setMobileMenuOpen(false); onBookClick(); }}
            className={`px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all transform ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            style={{ transitionDelay: '500ms' }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
};
