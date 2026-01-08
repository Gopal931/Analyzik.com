
import React, { useState } from 'react';

interface ContactProps {
  onBookClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onBookClick }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const socials = [
    { name: 'Twitter', url: 'https://x.com/aiworldx0' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sasikant-hathi-59b316279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Instagram', url: 'https://www.instagram.com/aiworld_x?igsh=MWZhNGk1dHdhbHp1' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Updated with the Formspree ID provided
      const response = await fetch('https://formspree.io/f/mbdlvvlq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-56 pb-32 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-8 font-elegant leading-[0.9]">
            Get in <br /> Touch
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black mb-16 max-w-sm">
            Connect with our integration specialists to deploy custom AI protocols for your business.
          </p>
          
          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-3">Direct Channel</h4>
              <div className="flex flex-col gap-4">
                <a href="mailto:teamanalyzik@gmail.com" className="text-xl md:text-2xl font-bold hover:text-white/70 transition-colors tracking-tight">teamanalyzik@gmail.com</a>
                <a href="tel:+919124843858" className="text-xl md:text-2xl font-bold hover:text-white/70 transition-colors tracking-tight">+91 91248 43858</a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-3">Social Intelligence</h4>
              <div className="flex flex-wrap gap-4">
                {socials.map(s => (
                  <a 
                    key={s.name} 
                    href={s.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={onBookClick}
                className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>

        <div className="glass-morphism p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group min-h-[600px] flex flex-col">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          
          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 font-elegant">Transmission Successful</h3>
              <p className="text-white/40 text-sm tracking-widest uppercase font-bold mb-10 max-w-[280px]">
                Your data has been securely routed to our specialists.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all underline underline-offset-8"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="relative z-10 space-y-8 h-full flex flex-col" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="bg-white/[0.03] border border-white/10 p-5 rounded-xl focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm" 
                    placeholder="Your name" 
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 ml-1">Company</label>
                  <input 
                    type="text" 
                    name="company"
                    className="bg-white/[0.03] border border-white/10 p-5 rounded-xl focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm" 
                    placeholder="Enterprise Inc." 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 ml-1">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="bg-white/[0.03] border border-white/10 p-5 rounded-xl focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm" 
                  placeholder="User@company.com" 
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 ml-1">Inquiry Type</label>
                <div className="relative">
                  <select 
                    name="type"
                    className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-xl focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all appearance-none text-sm cursor-pointer"
                  >
                    <option className="bg-[#111]" value="Solutions">AI Solutions Architecture</option>
                    <option className="bg-[#111]" value="Ads">AI Ads Optimization</option>
                    <option className="bg-[#111]" value="Web">Web Design Protocol</option>
                    <option className="bg-[#111]" value="Content">Content Scaling & Editing</option>
                    <option className="bg-[#111]" value="Partnership">Strategic Partnership</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 ml-1">Project Brief</label>
                <textarea 
                  name="message"
                  rows={4} 
                  required
                  className="bg-white/[0.03] border border-white/10 p-5 rounded-xl focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm resize-none" 
                  placeholder="Tell us about your objectives..."
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center animate-pulse">
                  Error during transmission. Please try again.
                </p>
              )}

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-6 bg-white/5 border border-white/10 hover:bg-white hover:text-black font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 rounded-xl group-hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'submitting' ? 'Transmitting Data...' : 'Transmit Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
