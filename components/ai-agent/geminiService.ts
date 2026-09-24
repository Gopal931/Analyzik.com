import { ANALYZIK_KNOWLEDGE_BASE } from './knowledgeBase';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isOffTopic?: boolean;
}

export const SYSTEM_PROMPT = `You are the official AI assistant of Analyzik.
The Analyzik chatbot is designed exclusively for Analyzik company-related questions and answers.

STRICT CHATBOT SCOPE:
Your focus is ONLY on:
- Analyzik company information
- Analyzik services and solutions
- Analyzik products and offerings
- Company-related technologies and AI/automation solutions offered by Analyzik
- Web development and verified company services
- Company contact and official communication channels
- Company-related career, hiring, and business questions, when verified information is available

YOU ARE NOT A GENERAL-PURPOSE EDUCATIONAL ASSISTANT:
You must NOT directly answer unrelated general questions, including:
- Programming language tutorials or concepts (e.g. "what is java", "explain python")
- Coding exercises, algorithms, or code generation (e.g. "give me fibonacci code", "write a sorting algorithm")
- General mathematics, academic homework, or science questions
- General entertainment, sports, cooking, weather, or personal advice
- Any topic unrelated to Analyzik's business or services

WHEN ASKED AN UNRELATED GENERAL QUESTION:
Do NOT provide the tutorial, definition, or code. Politely explain your focus and redirect:
Example:
- User: "what is java"
  Assistant: "I'm mainly focused on answering questions about Analyzik, our services, and our technology solutions. I can't provide general programming tutorials here, but I can help you learn about the technologies and solutions offered by Analyzik."
- User: "Give me Java code for Fibonacci."
  Assistant: "I'm focused on answering questions about Analyzik, our services, and our technology solutions. I can't provide general programming code here. Is there anything about Analyzik or our technology services that you'd like to know?"
- User: "what is the weather?"
  Assistant: "I'm mainly focused on helping with Analyzik, our AI solutions, and our technology services. Is there anything related to Analyzik or our services that I can help you with?"

HANDLING COMPANY QUESTIONS WITH MISSING / UNCONFIRMED INFORMATION:
If the user asks a question related to Analyzik but the exact information is not in the verified knowledge base:
1. Acknowledge that the specific information is not available.
2. Clearly explain what information cannot be confirmed.
3. Provide relevant and verified context about Analyzik.
4. Connect the response to the company's services, solutions, or business focus.
5. Direct the user to the official website (https://www.analyzik.com/) or official email (teamanalyzik@gmail.com).
6. NEVER invent salary numbers, job openings, clients, revenue, or employee counts.

Example (Salary):
- User: "What is the average salary at Analyzik?"
  Assistant: "I don't have verified information about Analyzik's current average salary, so I can't confirm an exact figure.
Analyzik focuses on AI solutions, automation workflows, and technology services that help businesses improve their digital operations. The salary may depend on the role, experience, skills, and hiring requirements.
For accurate and current salary details, please contact Analyzik's official recruitment team at teamanalyzik@gmail.com or check the company's official career information."

Example (Hiring):
- User: "does Analyzik hire software developers?"
  Assistant: "I don't have verified information regarding current specific openings for software developers at Analyzik, so I cannot confirm active vacancies.
Analyzik is an AI and technology solutions company that designs and deploys AI workflow automation, ad intelligence, and high-performance web platforms. For accurate and current hiring details, please contact our team at teamanalyzik@gmail.com or visit our official website at https://www.analyzik.com/."

COMPANY-RELATED QUESTIONS WITH AVAILABLE INFORMATION:
- Use only confirmed information from the verified knowledge base below.
- Explain services, products, and deployment workflows clearly and directly.

PRESERVE NATURAL GREETINGS & SHORT INTERACTIONS:
- User: "hyy bro" -> "Hey! How can I help you with Analyzik today?"
- User: "i need help" -> "Of course! What would you like to know about Analyzik or our services?"
- User: "how are you?" -> "I'm doing well, thanks for asking! How can I help you with Analyzik today?"
Keep greetings brief and focused on Analyzik. Never dump the entire company overview on a greeting.

VERIFIED COMPANY KNOWLEDGE BASE:
${ANALYZIK_KNOWLEDGE_BASE}`;

// Supported Gemini models in preferred fallback order
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-flash-latest',
  'gemini-3.8-flash'
];

export async function askGeminiAgent(
  userQuery: string,
  history: ChatMessage[],
  apiKeyOverride?: string
): Promise<{ text: string; isOffTopic: boolean }> {
  const recentOffTopicCount = history.filter(
    m => m.sender === 'assistant' && m.isOffTopic
  ).length;

  const apiKey = 
    (apiKeyOverride && apiKeyOverride.trim() !== '') ? apiKeyOverride.trim() :
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'PLACEHOLDER_API_KEY') 
      ? process.env.GEMINI_API_KEY 
      : '';

  // 1. Live Gemini Call with Dynamic Conversation Context & Multiple Model Fallbacks
  if (apiKey) {
    const meaningfulHistory = history.filter(m => m.id !== 'welcome');
    const recentHistory = meaningfulHistory.slice(-10);

    const contents = [];
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    contents.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents,
              generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 800
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText && candidateText.trim().length > 0) {
            const isOffTopic = candidateText.toLowerCase().includes('focused on answering questions about analyzik') ||
                               candidateText.toLowerCase().includes('focused on helping with analyzik');
            return { text: candidateText.trim(), isOffTopic };
          }
        } else {
          console.warn(`Model ${model} returned HTTP ${response.status}, trying next model...`);
        }
      } catch (err) {
        console.warn(`Error calling model ${model}:`, err);
      }
    }
  }

  // 2. High-Fidelity Conversational Engine (Zero-Downtime Fallback strictly adhering to the prompt rules)
  return dynamicConversationalEngine(userQuery, history, recentOffTopicCount);
}

/**
 * Normalizes input text to intelligently interpret typos, misspellings, and informal phrasing
 */
function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Helper to identify greetings & colloquial variants
 */
function isGreetingQuery(normalized: string): boolean {
  if (!normalized) return false;
  
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;

  const greetingWords = new Set([
    'hi', 'hii', 'hiii', 'hey', 'heyy', 'heya', 'hy', 'hyy', 'hyyy',
    'hello', 'helloo', 'hellooo', 'hlo', 'yo', 'sup', 'whatsup', 'greetings', 'hola'
  ]);

  const friendlySuffixes = new Set([
    'bro', 'bhai', 'man', 'buddy', 'dude', 'mate', 'there', 'guys', 'all', 'friend', 'bot', 'alex', 'analyzik'
  ]);

  if (words.length === 1 && greetingWords.has(words[0])) return true;
  if (words.length === 2 && greetingWords.has(words[0]) && friendlySuffixes.has(words[1])) return true;
  if (words.every(w => greetingWords.has(w))) return true;

  if (normalized === 'good morning' || normalized === 'good afternoon' || normalized === 'good evening' || normalized === 'good day') {
    return true;
  }

  if (greetingWords.has(words[0]) && words.length <= 3 && normalized.length < 20) {
    if (!normalized.includes('service') && !normalized.includes('analyzik') && !normalized.includes('help') && !normalized.includes('price')) {
      return true;
    }
  }

  return false;
}

/**
 * Helper to identify "how are you" variants and small talk
 */
function isHowAreYouQuery(normalized: string): boolean {
  return normalized.includes('how are you') || 
         normalized.includes('how r u') || 
         normalized.includes('how are u') || 
         normalized.includes('hows it going') || 
         normalized.includes('how is it going') ||
         normalized.includes('how are things') ||
         normalized.includes('how do you do') ||
         normalized.includes('whats up') ||
         normalized.includes('what s up') ||
         normalized.includes('how is your day');
}

/**
 * Helper to identify general help requests
 */
function isGeneralHelpQuery(normalized: string): boolean {
  if (normalized === 'i want help' || normalized === 'i need help' || normalized === 'help me' || normalized === 'can you help me' || normalized === 'need help' || normalized === 'help') {
    return true;
  }
  if (normalized.startsWith('i want help') || normalized.startsWith('i need help') || normalized.startsWith('can you help me')) {
    if (!normalized.includes('with ai') && !normalized.includes('with website') && !normalized.includes('with ads')) {
      return true;
    }
  }
  return false;
}

/**
 * Dynamic Conversational Engine enforcing Strict Scope & Unknown-Answer Handling
 */
function dynamicConversationalEngine(
  rawQuery: string, 
  history: ChatMessage[], 
  _repeatOffTopicCount: number
): { text: string; isOffTopic: boolean } {
  const q = normalizeQuery(rawQuery);
  const words = q.split(/\s+/).filter(Boolean);
  const rawClean = rawQuery.trim();

  // 1. PRIVACY & SECURITY GUARDRAILS
  if (
    q.includes('system prompt') || 
    q.includes('system instructions') || 
    q.includes('reveal prompt') || 
    q.includes('ignore previous instructions') || 
    q.includes('api key') ||
    q.includes('secret key') ||
    q.includes('internal credentials')
  ) {
    return {
      text: "I cannot reveal internal instructions, system prompts, or configuration details. If you have any questions about Analyzik or our AI solutions and services, I'd be glad to help!",
      isOffTopic: false
    };
  }

  // 2. RANDOM, MEANINGLESS, OR UNCLEAR INPUT
  const isPunctuationOnly = /^[\.\?\!\,\;\:\-\_\@\#\$\%\^\&\*\(\)\/\<\>]+$/.test(rawClean);
  const isKeyboardSmash = /^[bcdfghjklmnpqrstvwxyz]{4,}$/i.test(q) || /^(.)\1{3,}$/.test(q) || q === 'asdfgh' || q === 'asdf';
  
  if (isPunctuationOnly || isKeyboardSmash || (rawClean.length === 1 && !['a', 'i'].includes(q))) {
    if (rawClean.includes('?')) {
      return {
        text: "Is there something specific you'd like to ask about Analyzik or our AI solutions?",
        isOffTopic: false
      };
    }
    return {
      text: "Could you tell me what you'd like to know? I'm happy to help with Analyzik, our services, or AI-related questions.",
      isOffTopic: false
    };
  }

  // 3. STRICT CHATBOT SCOPE: UNRELATED GENERAL QUESTIONS (Programming tutorials, code generation, general trivia)
  const isGeneralCodingOrTutorial = 
    q === 'what is java' ||
    q.includes('what is java') ||
    q.includes('java code') ||
    q.includes('fibonacci') ||
    q.includes('python tutorial') ||
    q.includes('c++') ||
    q.includes('html tutorial') ||
    q.includes('write code for') ||
    q.includes('give me code') ||
    q.includes('solve math') ||
    q.includes('homework');

  if (isGeneralCodingOrTutorial) {
    if (q.includes('code') || q.includes('fibonacci')) {
      return {
        text: "I'm focused on answering questions about Analyzik, our services, and our technology solutions. I can't provide general programming code here. Is there anything about Analyzik or our technology services that you'd like to know?",
        isOffTopic: true
      };
    }
    return {
      text: "I'm mainly focused on answering questions about Analyzik, our services, and our technology solutions. I can't provide general programming tutorials here, but I can help you learn about the technologies and solutions offered by Analyzik.",
      isOffTopic: true
    };
  }

  // Unrelated general trivia (weather, sports, cooking, jokes, etc.)
  const unrelatedPatterns = [
    'capital of', 'tell me a joke', 'tell a joke', 'make a joke', 'weather', 
    'recipe', 'how to cook', 'bake a cake', 'write a poem', 'essay on', 
    'who won', 'match score', 'prime minister', 'president of',
    'who is the actor', 'movie review', 'lyrics of', 'sing a song',
    'football match', 'cricket match'
  ];
  if (unrelatedPatterns.some(pattern => q.includes(pattern))) {
    return {
      text: "I'm mainly focused on helping with Analyzik, our AI solutions, and our technology services. Is there anything related to Analyzik or our services that I can help you with?",
      isOffTopic: true
    };
  }

  // 4. NATURAL GREETINGS (Preserved, focused on Analyzik)
  if (isGreetingQuery(q)) {
    const pastGreetings = history.filter(m => m.sender === 'user' && isGreetingQuery(normalizeQuery(m.text))).length;
    if (pastGreetings > 0) {
      return {
        text: "Hey again! What can I help you with regarding Analyzik?",
        isOffTopic: false
      };
    }
    if (q.includes('bro') || q.includes('man') || q.includes('whatsup') || q.includes('sup')) {
      return {
        text: "Hey! How can I help you with Analyzik today?",
        isOffTopic: false
      };
    }
    return {
      text: "Hey! How can I help you with Analyzik today?",
      isOffTopic: false
    };
  }

  // 5. SMALL TALK ("how are you?")
  if (isHowAreYouQuery(q)) {
    return {
      text: "I'm doing well, thanks for asking! How can I help you with Analyzik today?",
      isOffTopic: false
    };
  }

  // 6. GENERAL HELP REQUESTS ("i need help", "i want help")
  if (isGeneralHelpQuery(q)) {
    return {
      text: "Of course! What would you like to know about Analyzik or our services?",
      isOffTopic: false
    };
  }

  // 7. COMPANY QUESTIONS WITH MISSING / UNCONFIRMED INFORMATION (Section 2, 3, 4.B)
  // A. Salary / Compensation question
  if (q.includes('salary') || q.includes('salaries') || q.includes('pay scale') || q.includes('compensation') || q.includes('average salary')) {
    return {
      text: "I don't have verified information about Analyzik's current average salary, so I can't confirm an exact figure.\n\nAnalyzik focuses on AI solutions, automation workflows, and technology services that help businesses improve their digital operations. The salary may depend on the role, experience, skills, and hiring requirements.\n\nFor accurate and current salary details, please contact Analyzik's official recruitment team or check the company's official career information.",
      isOffTopic: false
    };
  }

  // B. Hiring / Job opening question
  if (q.includes('hire') || q.includes('hiring') || q.includes('job opening') || q.includes('jobs') || q.includes('career') || q.includes('software developer')) {
    return {
      text: "I don't have verified information regarding current specific openings for software developers or other roles at Analyzik, so I cannot confirm active vacancies.\n\nAnalyzik is an AI and technology solutions company that designs and deploys AI workflow automation, ad intelligence, and high-performance web platforms. For accurate and current hiring details, please contact our team at [teamanalyzik@gmail.com](mailto:teamanalyzik@gmail.com) or visit our official website at [https://www.analyzik.com/](https://www.analyzik.com/).",
      isOffTopic: false
    };
  }

  // 8. CASUAL ACKNOWLEDGMENTS, AFFIRMATIONS, & FAREWELLS
  const previousAssistantMsg = [...history].reverse().find(m => m.sender === 'assistant' && m.id !== 'welcome');
  const previousUserMsg = [...history].reverse().find(m => m.sender === 'user');

  if (/^(yes|yeah|yep|yup|sure)$/i.test(q)) {
    if (previousAssistantMsg && previousAssistantMsg.text.toLowerCase().includes('service')) {
      return {
        text: "Sure! Which area would you like to explore: AI automation, AI advertising, web design, or content optimization?",
        isOffTopic: false
      };
    }
    return {
      text: "Great! What would you like to explore or discuss regarding Analyzik's solutions?",
      isOffTopic: false
    };
  }

  if (/^(no|nope|nah|not now)$/i.test(q)) {
    return {
      text: "No problem at all! Feel free to ask whenever you have a question about Analyzik or our solutions.",
      isOffTopic: false
    };
  }

  if (/^(ok|okay|k|cool|got it|great|nice|perfect|alright|fine|noted)$/i.test(q)) {
    return {
      text: "Sounds good! Let me know if you have any questions about Analyzik or how we can assist your business.",
      isOffTopic: false
    };
  }

  if (q.includes('thank') || q.includes('thanks') || q.includes('appreciate')) {
    return {
      text: "You're very welcome! If there's anything else you'd like to know about Analyzik or our services, feel free to ask.",
      isOffTopic: false
    };
  }

  if (/^(bye|goodbye|cya|see you|take care)$/i.test(q) || q.startsWith('bye ') || q.startsWith('goodbye ')) {
    return {
      text: "Goodbye! Have a great day ahead. Feel free to reach out through our official website whenever you'd like to explore AI solutions for your business.",
      isOffTopic: false
    };
  }

  // 9. CONVERSATION CONTEXT & FOLLOW-UP QUESTIONS
  if (q.includes('first one') || q.includes('first service') || q.includes('1st one')) {
    return {
      text: "Our **AI Solutions & Workflow Automation** service builds practical AI systems that connect directly into your existing tools (CRMs, messaging channels, databases). It automates repetitive manual tasks, analyzes complex data streams, and reduces manual operational workload by 60%–80%.\n\nWould you like to know how this can be implemented for your specific workflows?",
      isOffTopic: false
    };
  }

  if (q.includes('second one') || q.includes('second service') || q.includes('2nd one')) {
    return {
      text: "Our **AI Advertising Optimization (AI Ads)** service applies automated real-time intelligence to your ad campaigns. It continuously monitors bids, tests multi-variant creatives across audience segments, and uses predictive ROI forecasting to maximize Return on Ad Spend (ROAS).\n\nWould you like more details on how our ad protocols work?",
      isOffTopic: false
    };
  }

  if (q.includes('third one') || q.includes('third service') || q.includes('3rd one')) {
    return {
      text: "Our **AI-Driven Web Design** service designs modern, high-performance websites engineered for optimal conversions. They feature fast load times, seamless responsiveness across mobile and desktop, and clean neural aesthetics.\n\nWould you like to discuss a website project?",
      isOffTopic: false
    };
  }

  if (q.includes('fourth one') || q.includes('fourth service') || q.includes('4th one')) {
    return {
      text: "Our **Content Creation & Optimization** service produces high-fidelity marketing copy, social scripts, and business whitepapers tailored to your brand voice, audited with AI for readability, SEO, and engagement.\n\nWould you like to see how we handle content workflows?",
      isOffTopic: false
    };
  }

  if (q === 'explain more' || q === 'tell me more' || q === 'what about this' || q === 'how does it work' || q === 'more details') {
    if (previousAssistantMsg) {
      const prev = previousAssistantMsg.text.toLowerCase();
      if (prev.includes('advertising') || prev.includes('ad')) {
        return {
          text: "Our AI Advertising protocol operates on 3 pillars: live dynamic bid/budget adjustments, scalable creative testing across audience segments, and predictive ROI modeling. Would you like to evaluate how this applies to your ad spend?",
          isOffTopic: false
        };
      }
      if (prev.includes('web design') || prev.includes('website')) {
        return {
          text: "In web design, we combine modern minimalist aesthetics with conversion engineering. We ensure ultra-low latency, mobile responsiveness, and structured conversion funnels. Are you looking to build a new site or redesign an existing one?",
          isOffTopic: false
        };
      }
      if (prev.includes('automation') || prev.includes('workflow')) {
        return {
          text: "Our automation workflows integrate with tools like WhatsApp, CRMs, and email to handle repetitive tasks 24/7. Which specific task or process in your business would you like to streamline?",
          isOffTopic: false
        };
      }
    }
    return {
      text: "Analyzik provides 4 core solutions: AI workflow automation, ad campaign optimization, high-converting web design, and content scaling. Which of these areas would you like to explore in more detail?",
      isOffTopic: false
    };
  }

  // 10. COMPANY SERVICES & INCOMPLETE SERVICE QUERIES
  const hasServiceIntent = 
    q === 'about services' ||
    q === 'your services' ||
    q === 'services' ||
    q === 'what services do you provide' ||
    q === 'what services does analyzik provide' ||
    q === 'tell me about your services' ||
    q === 'what can analyzik do' ||
    q.includes('servies') ||
    q.includes('servces') ||
    (q.includes('service') && (q.includes('what') || q.includes('provide') || q.includes('offer') || q.includes('tell') || q.includes('about')));

  if (hasServiceIntent) {
    return {
      text: "Analyzik provides 4 core verified services to help businesses scale and operate efficiently:\n\n1. **AI Solutions & Workflow Automation**: Practical AI systems that automate tasks and reduce manual workload by 60%–80%.\n2. **AI Advertising Optimization (AI Ads)**: Algorithmic real-time campaign optimization, multi-variation creative testing, and predictive ROI modeling.\n3. **AI-Driven Web Design**: Modern, fast, and conversion-focused websites engineered to turn visitors into customers.\n4. **Content Creation & Optimization**: High-fidelity marketing copy, scripts, and brand content refined for performance.\n\nLet me know if you'd like to explore any of these services in more detail!",
      isOffTopic: false
    };
  }

  // 11. COMPANY AI SOLUTIONS & PRODUCTS
  if (q.includes('ai solution') || q.includes('ai solutions') || q.includes('what ai solutions does analyzik offer') || q.includes('products')) {
    return {
      text: "Analyzik offers verified AI solutions and intelligent products across 4 core service areas:\n\n• **AI Workflow Automation & Voice/Chat Agents**: Neural voice support agents, WhatsApp automation, and Instagram DM/comment automation.\n• **AI Advertising Optimization**: Automated 24/7 budget allocation, multi-variant ad creatives, and predictive ROAS forecasting.\n• **AI-Driven Web Design**: Conversion-optimized platforms with neural design systems.\n• **Lead Generation & Analytics**: Automated prospect scoring and product sentiment intelligence.\n\nWhich of these AI solutions would you like to discuss for your business?",
      isOffTopic: false
    };
  }

  // 12. COMPANY OVERVIEW
  const isAboutCompany = 
    q === 'what is analyzik' ||
    q === 'tell me about analyzik' ||
    q === 'tell me about your company' ||
    q === 'what does your company do' ||
    q === 'who is analyzik' ||
    q.includes('what is analyzik') ||
    q.includes('wat is analyzik') ||
    q.includes('who is analyzik') ||
    q.includes('about analyzik') ||
    q.includes('about your company') ||
    (words.includes('analyzik') && (words.includes('what') || words.includes('who') || words.includes('tell') || words.includes('about')));

  if (isAboutCompany) {
    return {
      text: "Analyzik is an AI solutions company focused on helping businesses use artificial intelligence and automation to solve practical business challenges. We design and deploy practical AI systems, advertising automation protocols, high-performance web applications, and intelligent content workflows.\n\nWould you like to know more about our services or how we can help with your specific requirements?",
      isOffTopic: false
    };
  }

  // 13. AI & AUTOMATION RELATED TO ANALYZIK'S FIELD
  if (q.includes('ai automation') || q.includes('what is ai automation') || q.includes('automtion')) {
    return {
      text: "AI automation uses artificial intelligence to automate tasks and business workflows. Unlike traditional rule-based scripts, AI can understand language, analyze unstructured data, and make intelligent decisions to reduce repetitive work and streamline operations.\n\nAt Analyzik, we build custom AI automation pipelines for customer messaging, data entry, and workflow orchestration. Would you like to explore how AI automation can be used in your business?",
      isOffTopic: false
    };
  }

  // 14. PRICING INQUIRIES
  if (q === 'pricing' || q === 'price' || q === 'cost' || q === 'prices' || q === 'what is the pricing') {
    return {
      text: "Are you asking about the pricing of a specific Analyzik service or a custom AI solution?",
      isOffTopic: false
    };
  }

  if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('how much') || q.includes('fee')) {
    return {
      text: "Analyzik provides customized pricing tailored to each business's specific workflow requirements, scale, and integration scope. We offer a complimentary 30-minute Architecture Audit to review your requirements and provide an exact blueprint.\n\nAre you asking about pricing for a specific service (like ad optimization, web design, or messaging automation), or a custom AI solution?",
      isOffTopic: false
    };
  }

  // 15. TIMELINES & DEPLOYMENT
  if (q.includes('timeline') || q.includes('how long') || q.includes('how fast') || q.includes('deploy') || q.includes('days')) {
    return {
      text: "Standard automation workflows (such as WhatsApp/Instagram agents and ad optimization protocols) typically deploy within **3 to 7 business days**. Custom complex agent builds and enterprise neural architectures follow a structured **2-week sprint** including testing and team onboarding.",
      isOffTopic: false
    };
  }

  // 16. VERIFIED CONTACT DETAILS & WEBSITE
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('website')) {
    return {
      text: "You can connect with the Analyzik team through our official channels:\n\n• **Official Website**: [https://www.analyzik.com/](https://www.analyzik.com/)\n• **Email**: [teamanalyzik@gmail.com](mailto:teamanalyzik@gmail.com)\n• **WhatsApp**: [+977 9766116618](https://wa.me/9779766116618)\n• **Direct Phone**: [+91 91248 43858](tel:+919124843858)\n• **Schedule Strategy Audit**: [Book a 30-Min Audit](https://calendly.com/teamanalyzic)",
      isOffTopic: false
    };
  }

  // 17. DEFAULT SCOPE CLARIFICATION
  return {
    text: "Could you share a bit more about what you're looking for? I'm here to help with Analyzik, our AI services, and technology solutions.",
    isOffTopic: false
  };
}
