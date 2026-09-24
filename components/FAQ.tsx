import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Deployment',
    question: 'How fast can an ANALYZIK AI solution be deployed?',
    answer: 'Standard workflows (such as Automated WhatsApp/Instagram agents and ad optimization protocols) can be integrated within 3 to 7 business days. Complex custom agent builders and multi-platform neural architectures typically undergo a 2-week structured sprint including staging, testing, and team onboarding.'
  },
  {
    category: 'Security & Privacy',
    question: 'How is proprietary business and customer data protected?',
    answer: 'Security is engineered at the protocol level. We utilize isolated, enterprise-tier API instances with zero data retention for model retraining. All data in transit is encrypted using TLS 1.3, and data at rest utilizes AES-256 encryption. We never share, sell, or expose your private company workflows.'
  },
  {
    category: 'Integration',
    question: 'Can your AI agents integrate with our existing CRM and software stack?',
    answer: 'Yes. ANALYZIK solutions connect natively or via custom webhooks and REST/GraphQL APIs with major platforms including HubSpot, Salesforce, Shopify, WooCommerce, Notion, Slack, and Google Workspace, preserving your existing operations with zero friction.'
  },
  {
    category: 'Operations',
    question: 'Do we need an internal technical or engineering team to maintain this?',
    answer: 'No. Every solution is delivered turnkey with intuitive executive dashboards and automated health monitoring. Our team handles ongoing latency optimization, security patches, and model upgrades, ensuring your systems remain fast and accurate without burdening your internal staff.'
  },
  {
    category: 'ROI & Value',
    question: 'What kind of measurable ROI can our business anticipate?',
    answer: 'Clients typically experience an immediate 60% to 80% reduction in repetitive operational hours within the first 30 days. In ad campaigns, automated real-time bidding and creative optimization frequently lower Customer Acquisition Costs (CAC) by 25% to 40% while lifting conversions.'
  }
];

interface FAQProps {
  onBookClick?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onBookClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 block mb-4">
          Direct Answers • Protocol Clarifications
        </span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight font-elegant mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
          Transparent details on integration timelines, enterprise data protection, and operational impact.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-white/[0.04] border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-6 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest shrink-0">
                    0{idx + 1} // {faq.category}
                  </span>
                  <span className="text-base sm:text-lg font-bold font-elegant text-white/90">
                    {faq.question}
                  </span>
                </div>
                <div 
                  className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-white text-black border-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out px-6 sm:px-8 overflow-hidden ${
                  isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-sm sm:text-base text-white/60 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl font-bold uppercase font-elegant text-white mb-1">Have a specific architectural query?</h3>
          <p className="text-xs text-white/40 uppercase tracking-wider font-mono">Speak directly with our AI integration specialists.</p>
        </div>
        {onBookClick && (
          <button
            onClick={onBookClick}
            className="px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] shrink-0"
          >
            Schedule Briefing
          </button>
        )}
      </div>
    </div>
  );
};
