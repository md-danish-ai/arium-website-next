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
    <div className="sol-storyteller-flow" style={{ background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f5f0ff 40%, #ebe2ff 75%, #dfd4ff 100%)", position: "relative", overflow: "hidden" }}>
      <div className="flow-bg-gradient flow-bg-1" aria-hidden="true"></div>
      <div className="flow-bg-gradient flow-bg-2" aria-hidden="true"></div>
      <div className="flow-bg-gradient flow-bg-3" aria-hidden="true"></div>

      <section id="faq" style={{ background: "transparent !important", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-header text-center">
            <h2
              className="section-title reveal stagger-1"
              style={{
                fontWeight: 400,
                letterSpacing: "0.06em",
                fontSize: "2.4rem",
                lineHeight: 1.45,
                color: "#162047",
                textTransform: "uppercase"
              }}
            >
              {data?.title || "Frequently asked questions"}
            </h2>
          </div>

        <div className="cm-faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className={`reveal stagger-${(index % 3) + 1}`}>
              <div className={`cm-faq-item ${openIndex === index ? 'open' : ''}`}>
                <button 
                  className="cm-faq-question" 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.title}</span>
                  <svg className="cm-faq-chevron" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="cm-faq-answer" id={`faq-answer-${index}`}>
                  <p>{faq.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
