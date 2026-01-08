
import React from 'react';

interface LegalModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We may collect the following information to operate and improve our services:\n\n• Account information such as name, email address, company name, and contact details\n• Usage data including feature usage, interaction logs, and performance metrics\n• Technical data such as IP address, browser type, device information, and cookies\n• Customer content that you submit or process through the ANALYZIK platform\n\nANALYZIK does not sell or rent your personal data.'
        },
        {
          heading: 'How We Use Your Information',
          body: 'Your information is used to:\n\n• Deliver and maintain ANALYZIK’s services\n• Power automation, analytics, and optimization features requested by you\n• Improve platform performance, reliability, and user experience\n• Communicate service updates, support responses, and important notices\n• Meet legal and regulatory requirements'
        },
        {
          heading: 'Data Security',
          body: 'We apply industry-standard technical and organizational safeguards to protect your data. While no system can guarantee absolute security, we continuously enhance our security practices to reduce risk.'
        },
        {
          heading: 'Data Sharing',
          body: 'We share data only when necessary:\n\n• With trusted service providers who help us operate the platform\n• When required by law or to protect the rights and safety of ANALYZIK and its users\n• With your explicit consent\n\nWe do not share data for advertising or resale purposes.'
        },
        {
          heading: 'Data Retention',
          body: 'We retain personal data only as long as necessary to provide our services or comply with legal obligations. You may request data deletion at any time, subject to applicable laws.'
        },
        {
          heading: 'Your Rights',
          body: 'Depending on your jurisdiction, you may have the right to access, update, or delete your personal information, object to or restrict certain data processing, or request a copy of your data. Requests can be made by contacting us at teamanalyzik@gmail.com.'
        },
        {
          heading: 'Updates to This Policy',
          body: 'We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised date.'
        }
      ]
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        {
          heading: 'Use of the Platform',
          body: 'You agree to use ANALYZIK only for lawful business purposes and in compliance with applicable laws and regulations. You may not use the platform for illegal activities, interfere with platform security, or violate intellectual property rights.'
        },
        {
          heading: 'Account Responsibility',
          body: 'You are responsible for safeguarding your account credentials and for all activity conducted under your account.'
        },
        {
          heading: 'AI-Powered Services',
          body: 'ANALYZIK provides automated tools for messaging, advertising, content generation, analytics, and optimization. While these tools are designed to support business decisions, outputs should be reviewed before deployment. Final responsibility for content, campaigns, and compliance remains with you.'
        },
        {
          heading: 'Intellectual Property',
          body: 'All platform software, designs, and proprietary materials are owned by ANALYZIK or its licensors. Unauthorized copying, modification, or distribution is prohibited. You retain ownership of all data and content you submit to the platform.'
        },
        {
          heading: 'Service Availability',
          body: 'We strive to provide consistent access to ANALYZIK, but uninterrupted availability is not guaranteed. We may modify, suspend, or discontinue features to improve performance, security, or compliance.'
        },
        {
          heading: 'Limitation of Liability',
          body: 'To the maximum extent permitted by law, ANALYZIK is not liable for indirect, incidental, or consequential damages, including loss of revenue or business opportunities, arising from use of the platform.'
        },
        {
          heading: 'Termination',
          body: 'We reserve the right to suspend or terminate access if these terms are violated or if the platform is misused.'
        },
        {
          heading: 'Governing Law',
          body: 'These Terms are governed by the laws of Nepal.'
        },
        {
          heading: 'Contact',
          body: 'For questions regarding these Terms, contact us at teamanalyzik@gmail.com'
        }
      ]
    }
  };

  const activeDoc = content[type];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-fadeIn" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.05)] animate-scaleIn flex flex-col">
        <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-10">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight font-elegant">{activeDoc.title}</h2>
            <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">ANALYZIK Legal Protocol</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all border border-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="space-y-12">
            {activeDoc.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{section.heading}</h3>
                <div className="text-white/60 leading-relaxed text-base whitespace-pre-line font-medium">
                  {section.body}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 uppercase font-black tracking-[0.3em] text-center">
            Last Updated: October 2024
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
