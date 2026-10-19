"use client";
import { useState } from "react";

interface FAQItem {
  title: string;
  description: string;
}

interface CommunityFAQProps {
  data?: {
    title?: string;
    cards?: FAQItem[];
  };
}

const FALLBACK_FAQS = [
  {
    title: "Why is Arium Networks building in my neighborhood?",
    description: "When a road gets too congested, you can't just keep adding cars — you have to add more lanes. Similarly, when there are too many wireless devices in an area, the existing network gets overloaded. Small cells add more capacity and bandwidth to support the growing demand for wireless connectivity in your neighborhood."
  },
  {
    title: "I have full bars on my mobile phone. Why do we need more infrastructure?",
    description: "Full bars indicate signal strength, not network capacity. Even with a strong signal, you may experience slow speeds in crowded areas. Small cells provide additional capacity to ensure fast, reliable connectivity for everyone."
  },
  {
    title: "Why is Arium permitted in the public right of way?",
    description: "Arium Networks holds CLEC (Competitive Local Exchange Carrier) status in most states, which provides us with the legal right to install telecommunications equipment on existing infrastructure in the public right of way, such as utility poles and streetlights."
  },
  {
    title: "How does Arium Networks get approval to work in my community?",
    description: "We follow a structured process that includes working with local government, submitting permit applications, and ensuring compliance with all local, state, and federal regulations. We coordinate closely with municipal officials throughout the entire process."
  },
  {
    title: "What are the RF emission levels of your equipment?",
    description: "Our equipment operates well within the safety limits established by the FCC. Small cells emit significantly lower RF energy than traditional cell towers because they cover smaller areas and use less power."
  },
  {
    title: "Should I be worried about RF emissions?",
    description: "Small cells comply with all FCC regulations for radio frequency emissions. The FCC's safety standards incorporate significant safety margins and are based on decades of research. Small cells operate at a fraction of the power levels used by traditional cell towers."
  }
];

export default function CommunityFAQ({ data }: CommunityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = data?.cards?.length ? data.cards : FALLBACK_FAQS;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };



  return (
    <div className="sol-storyteller-flow relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f5f0ff_40%,#ebe2ff_75%,#dfd4ff_100%)]">
      <div className="flow-bg-gradient flow-bg-1 pointer-events-none" aria-hidden="true" />
      <div className="flow-bg-gradient flow-bg-2 pointer-events-none" aria-hidden="true" />
      <div className="flow-bg-gradient flow-bg-3 pointer-events-none" aria-hidden="true" />

      <section id="faq" className="bg-transparent py-24 md:py-32 relative overflow-hidden">
        <div className="container relative z-[1]">
          <div className="section-header text-center mb-16">
            <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-wide text-3xl md:text-4xl text-[#162047] uppercase leading-snug">
              {data?.title || "Frequently asked questions"}
            </h2>
          </div>

          <div className="cm-faq-grid max-w-[900px] mx-auto flex flex-col gap-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`reveal stagger-${(index % 3) + 1}`}>
                  <div className={`cm-faq-item bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${isOpen ? 'border-[#162047]/20 shadow-md' : 'border-[#162047]/10'}`}>
                    <button 
                      className="cm-faq-question w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer transition-colors" 
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-heading font-medium text-base md:text-lg text-[#162047]">{faq.title}</span>
                      <svg 
                        className={`cm-faq-chevron flex-shrink-0 text-[#162047] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        aria-hidden="true" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    <div 
                      className={`cm-faq-answer px-5 md:px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`} 
                      id={`faq-answer-${index}`}
                    >
                      <p className="text-sm md:text-base text-[#162047]/75 leading-relaxed m-0">{faq.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
