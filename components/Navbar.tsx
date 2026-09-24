
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

  // Lock body scroll when mobile menu is open and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

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
    <>
      {/* Main Top Header Bar */}
      <header 
        className={`fixed top-0 left-0 w-full z-[160] transition-all duration-300 ${
          mobileMenuOpen 
            ? 'bg-black py-4 border-b border-white/10' 
            : scrolled 
              ? 'bg-black/95 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' 
              : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
          {/* Brand / Logo */}
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={() => {
              if (mobileMenuOpen) setMobileMenuOpen(false);
              if (onHomeClick) {
                onHomeClick();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Logo size={32} />
          </div>
          
          {/* Navigation Items (Desktop) */}
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
          
          {/* Action Button Section (Desktop) */}
          <div className="hidden md:flex flex-shrink-0">
            <button 
              onClick={onBookClick}
              className="px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 whitespace-nowrap"
            >
              Book Appointment
            </button>
          </div>

          {/* Standard Animated Mobile Hamburger Button */}
          <div className="md:hidden flex-shrink-0">
            <button 
              type="button"
              className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {/* Top Bar */}
              <span 
                className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              {/* Middle Bar */}
              <span 
                className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`} 
              />
              {/* Bottom Bar */}
              <span 
                className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Standard Full-Screen Mobile Drawer (Independent of Header backdrop-filter) */}
      <div 
        id="mobile-navigation"
        style={{ backgroundColor: '#000000' }}
        className={`md:hidden fixed inset-0 z-[150] bg-black transition-all duration-300 ease-in-out flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Navigation Links Area */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-1 my-auto">
          {navItems.map((item, idx) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`group flex items-center justify-between py-3.5 border-b border-white/5 transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${mobileMenuOpen ? idx * 40 + 80 : 0}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/30 tracking-widest">
                  0{idx + 1}
                </span>
                <span className="text-xl font-bold uppercase tracking-widest text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all font-elegant">
                  {item.label}
                </span>
              </div>
              <svg 
                className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Action Button & Contact Footer inside Mobile Menu */}
        <div 
          className={`max-w-md mx-auto w-full pt-6 space-y-6 transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: `${mobileMenuOpen ? 380 : 0}ms` }}
        >
          <button 
            onClick={() => { setMobileMenuOpen(false); onBookClick(); }}
            className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
          >
            <span>Book Appointment</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Quick Contact Links */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <a 
              href="mailto:teamanalyzik@gmail.com" 
              className="hover:text-white transition-colors"
            >
              teamanalyzik@gmail.com
            </a>
            <a 
              href="tel:+919124843858" 
              className="hover:text-white transition-colors font-semibold"
            >
              +91 91248 43858
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
