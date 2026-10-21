"use client";
import { useState } from "react";
import { Typography } from "@ui-element";

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
    <div className="sol-storyteller-flow bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f5f0ff_40%,#ebe2ff_75%,#dfd4ff_100%)] relative overflow-hidden">
      <div
        className="flow-bg-gradient flow-bg-1 absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="flow-bg-gradient flow-bg-2 absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <section id="faq" className="bg-transparent py-14 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-[1]">
          <div className="section-header text-center mb-16">
            {Heading && (
              <Typography
                as="h2"
                variant="h2"
                uppercase
                className="section-title reveal stagger-1 tracking-[0.06em] leading-[1.45] text-midnight"
                style={{ color: HeadingColor || undefined }}
              >
                {Heading}
              </Typography>
            )}
            {Description && (
              <Typography
                as="p"
                variant="b1"
                className="reveal stagger-2 text-midnight/75 max-w-[800px] mx-auto mt-4 leading-relaxed"
              >
                {Description}
              </Typography>
            )}
          </div>

          <div className="cm-faq-grid max-w-[900px] mx-auto flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className={`reveal stagger-${(index % 3) + 1}`}>
                  <div
                    className={`cm-faq-item bg-white rounded-2xl border border-midnight/[0.08] overflow-hidden shadow-[0_2px_12px_rgba(22,32,71,0.04)] hover:border-midnight/15 hover:shadow-md transition-all duration-350 ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="cm-faq-question w-full flex items-center justify-between gap-4 py-5 px-7 text-left leading-snug cursor-pointer transition-colors duration-300 hover:text-teal focus-visible:outline-teal"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      style={faq.QuestionColor ? { color: faq.QuestionColor } : undefined}
                    >
                      <Typography as="span" variant="h5" weight="medium" className="text-midnight">
                        {faq.Question}
                      </Typography>
                      <svg
                        className={`cm-faq-chevron shrink-0 text-midnight/40 transition-transform duration-350 ${isOpen ? "rotate-180 text-teal" : ""}`}
                        aria-hidden="true"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div
                      className={`cm-faq-answer grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      id={`faq-answer-${index}`}
                    >
                      <div className="overflow-hidden">
                        <Typography
                          as="p"
                          variant="b2"
                          className="px-7 pb-6 m-0 leading-[1.75] text-midnight/85"
                          style={{ color: faq.AnswerColor || undefined }}
                        >
                          {faq.Answer}
                        </Typography>
                      </div>
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
