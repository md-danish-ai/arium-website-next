"use client";

import React, { useState } from "react";
import { Typography } from "@ui-element";
import { FaqChevronSvg } from "@ui-svg";
import FlowBackground from "@ui-animations/FlowBackground";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunityFAQProps } from "./type";

export default function CommunityFAQ({ title, title_color, faq_data = [] }: CommunityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f5f0ff_40%,#ebe2ff_75%,#dfd4ff_100%)]">
      <FlowBackground />

      <section id="faq" className="bg-transparent py-14 md:py-24 lg:py-32 relative overflow-hidden">
        <Container className="relative z-[1]">
          <div className="text-center mb-16">
            <Typography
              as="h2"
              variant="h2"
              uppercase
              className="section-title reveal stagger-1 tracking-wide text-[#162047] leading-snug"
              style={title_color ? { color: title_color } : undefined}
            >
              {title}
            </Typography>
          </div>

          <div className="max-w-[900px] mx-auto flex flex-col gap-3.5">
            {faq_data.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id ?? index} className={`reveal stagger-${(index % 3) + 1}`}>
                  <div
                    className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
                      isOpen ? "border-[#162047]/20 shadow-md" : "border-[#162047]/10"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer transition-colors"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <Typography
                        as="span"
                        variant="h5"
                        weight="medium"
                        className="text-[#162047]"
                        style={faq.question_color ? { color: faq.question_color } : undefined}
                      >
                        {faq.question}
                      </Typography>
                      <FaqChevronSvg isOpen={isOpen} className="flex-shrink-0 text-[#162047]" />
                    </button>
                    <div
                      className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                      }`}
                      id={`faq-answer-${index}`}
                    >
                      <Typography
                        as="p"
                        variant="b2"
                        className="text-[#162047]/75 leading-relaxed m-0"
                        style={faq.answer_color ? { color: faq.answer_color } : undefined}
                      >
                        {faq.answer}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
