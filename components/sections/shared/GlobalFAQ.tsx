"use client";
import { useState } from "react";

interface FAQItem {
  Question: string;
  Answer: string;
  QuestionColor?: string;
  QuestionColorHover?: string;
  AnswerColor?: string;
}

interface GlobalFAQProps {
  Heading?: string;
  HeadingColor?: string;
  Description?: string;
  FaqData?: FAQItem[];
}

export default function GlobalFAQ({ Heading, HeadingColor, Description, FaqData }: GlobalFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const faqs = FaqData || [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs.length) return null;

  return (
    <div className="sol-storyteller-flow" style={{ background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f5f0ff 40%, #ebe2ff 75%, #dfd4ff 100%)", position: "relative", overflow: "hidden" }}>
      <div className="flow-bg-gradient flow-bg-1" aria-hidden="true"></div>
      <div className="flow-bg-gradient flow-bg-2" aria-hidden="true"></div>
      <div className="flow-bg-gradient flow-bg-3" aria-hidden="true"></div>

      <section id="faq" style={{ background: "transparent !important", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-header text-center">
            {Heading && (
              <h2
                className="section-title reveal stagger-1"
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  fontSize: "2.4rem",
                  lineHeight: 1.45,
                  color: HeadingColor || "#162047",
                  textTransform: "uppercase"
                }}
              >
                {Heading}
              </h2>
            )}
            {Description && (
              <p className="reveal stagger-2" style={{ color: "rgba(22, 32, 71, 0.75)", maxWidth: "800px", margin: "16px auto 0", fontSize: "1.1rem" }}>
                {Description}
              </p>
            )}
          </div>

          <div className="cm-faq-grid">
            {faqs.map((faq, index) => {
              const isHovered = hoveredIndex === index;
              const isOpen = openIndex === index;

              // Determine current question color (fallback to default CSS handling if not provided)
              const questionColorStyle = isHovered
                ? (faq.QuestionColorHover ? { color: faq.QuestionColorHover } : {})
                : (faq.QuestionColor ? { color: faq.QuestionColor } : {});

              return (
                <div key={index} className={`reveal stagger-${(index % 3) + 1}`}>
                  <div className={`cm-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="cm-faq-question"
                      onClick={() => toggleFAQ(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      style={questionColorStyle}
                    >
                      <span>{faq.Question}</span>
                      <svg className="cm-faq-chevron" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </button>
                    <div className="cm-faq-answer" id={`faq-answer-${index}`}>
                      <p style={{ color: faq.AnswerColor || 'inherit' }}>{faq.Answer}</p>
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
