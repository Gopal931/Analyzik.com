import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { Solutions } from './components/Solutions';
import { AIAdsSection } from './components/AIAdsSection';
import { WebDesignSection } from './components/WebDesignSection';
import { ContentEditingSection } from './components/ContentEditingSection';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookingModal } from './components/BookingModal';
import { AISolutionsDetail } from './components/AISolutionsDetail';
import { LegalModal } from './components/LegalModal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [view, setView] = useState<'home' | 'ai-detail'>('home');
  const [legalView, setLegalView] = useState<'privacy' | 'terms' | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Ambient Cursor Spotlight tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth appearance observer
  useEffect(() => {
    if (view === 'home') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-20');
          }
        });
      }, { threshold: 0.05 });

      document.querySelectorAll('section > div').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-20');
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, [view]);

  const navigateToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAIDetail = () => {
    setView('ai-detail');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (view === 'ai-detail') {
    return (
      <div className="bg-black min-h-screen selection:bg-white selection:text-black relative">
        {/* Ambient Cursor Spotlight Glow */}
        <div 
          className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] blur-2xl z-[35] transition-opacity duration-300 hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />

        <Navbar onBookClick={() => setIsBookingOpen(true)} onHomeClick={navigateToHome} />
        <AISolutionsDetail onBack={navigateToHome} onBookClick={() => setIsBookingOpen(true)} />
        <Footer onLegalClick={setLegalView} />
        <WhatsAppButton />
        {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
        {legalView && <LegalModal type={legalView} onClose={() => setLegalView(null)} />}
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black scroll-smooth relative">
      {/* Ambient Cursor Spotlight Glow */}
      <div 
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] blur-2xl z-[35] transition-opacity duration-300 hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      
      <main className="relative">
        <Hero 
          onExploreClick={() => {
            const elem = document.getElementById('solutions');
            if (elem) {
               window.scrollTo({
                 top: elem.offsetTop - 80,
                 behavior: 'smooth'
               });
            }
          }} 
          onBookClick={() => setIsBookingOpen(true)} 
        />

        {/* Enterprise Client & Ecosystem Infinite Marquee */}
        <Clients />
        
        <section id="solutions" className="relative z-10 min-h-screen flex items-start">
          <Solutions onAIDetailClick={openAIDetail} />
        </section>

        <section id="ai-ads" className="relative z-10 min-h-screen flex items-start">
          <AIAdsSection />
        </section>

        <section id="web-design" className="relative z-10 min-h-screen flex items-start border-t border-white/5">
          <WebDesignSection />
        </section>

        <section id="content-editing" className="relative z-10 min-h-screen flex items-start">
          <ContentEditingSection />
        </section>

        <section id="about" className="relative z-10 min-h-screen flex items-start border-t border-white/5">
          <About />
        </section>

        <section id="faq" className="relative z-10 min-h-screen flex items-start border-t border-white/5">
          <FAQ onBookClick={() => setIsBookingOpen(true)} />
        </section>

        <section id="contact" className="relative z-10 min-h-screen flex items-start border-t border-white/5 bg-gradient-to-b from-transparent to-white/5">
          <Contact onBookClick={() => setIsBookingOpen(true)} />
        </section>
      </main>

      <Footer onLegalClick={setLegalView} />
      
      <WhatsAppButton />
      
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
      {legalView && <LegalModal type={legalView} onClose={() => setLegalView(null)} />}
    </div>
  );
};

export default App;
