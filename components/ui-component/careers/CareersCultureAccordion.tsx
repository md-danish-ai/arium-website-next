"use client";

import { useState, useEffect, useRef } from "react";
import { Typography } from "@ui-element";

interface PillarCard {
  title: string;
  description: string;
  icon?: string;
}

interface CareersSection {
  key?: string;
  title?: string;
  body?: string;
  cards?: PillarCard[];
}

interface CareersPageContent {
  title?: string;
  body?: string;
  cards?: PillarCard[];
  sections?: CareersSection[];
}

interface CareersCultureAccordionProps {
  data?: CareersPageContent;
}

const FALLBACK_PILLARS = [
  {
    title: "Be Part of a Team",
    description:
      "We're building more than networks: we're building a team that takes pride and ownership in what we create together. As we grow, every teammate helps shape how we work, collaborate, and succeed. Here, culture isn't handed down—it's shaped by the people who live it every day.",
  },
  {
    title: "Shape the Future",
    description:
      "We're at a pivotal moment in the evolution of wireless infrastructure. New technologies are increasing demands on networks, coverage, and capacity. As part of our team, you'll help design and deliver solutions that meet these challenges while influencing how we work, innovate, and grow as an organization.",
  },
  {
    title: "Make an Impact",
    description:
      "As a fast-growing, privately held company, we move with purpose and make decisions focused on long-term success. Our teammates are trusted to take ownership, contribute ideas, and turn plans into execution.",
  },
  {
    title: "Advance Your Career",
    description:
      "Backed by EQT, a leading private equity firm, we combine the momentum of a growing organization with strong financial support. We invest in our people, systems, and infrastructure to support sustainable growth—creating opportunities for you to develop new skills, assume greater responsibility, and grow your career.",
  },
  {
    title: "Improve Everyday Connections",
    description:
      "Our infrastructure supports how people live, work, and stay connected. We take that responsibility seriously. Your expertise and perspective will contribute to the reliability, safety and reach of the networks communities and businesses depend on every day.",
  },
];

export default function CareersCultureAccordion({ data }: CareersCultureAccordionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const storyData = data?.sections?.find((s) => s.key === "Why Join");
  const pillarsData = data?.sections?.find((s) => s.key === "Pillars");

  const pillars = pillarsData?.cards?.length
    ? pillarsData.cards
    : data?.cards?.length
      ? data.cards
      : FALLBACK_PILLARS;

  const title = storyData?.title || data?.title || "Why Join Arium Networks?";
  const body = storyData?.body || data?.body;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pillars.length);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pillars.length]);

  const handleMouseEnter = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      stopAutoPlay();
      setCurrentIndex(index);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    startAutoPlay();
  };

  return (
    <section
      id="careers-culture"
      className="careers-accordion-wrapper relative overflow-hidden py-20 bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF] border-y border-black/5"
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative background bubbles from old CareersStory */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-[2]">
        <div className="wj-two-col grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-16 items-start w-full">
          {/* LEFT: Section heading & description */}
          <div className="wj-col-left reveal w-full lg:max-w-[660px]">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              className="section-title text-left mb-6 text-[#162047]"
            >
              {title}
            </Typography>
            {body ? (
              <div
                className="strapi-richtext-body text-[#162047]/90 text-left text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            ) : (
              <div className="text-left space-y-5 text-[#162047]/90 leading-relaxed">
                <Typography variant="b1" as="p" className="text-[#162047]/90 m-0">
                  Wireless connectivity is entering a new era, and our infrastructure is at the
                  center of it. Across communities nationwide, we design, build, and support
                  networks that wireless carriers rely on every day.
                </Typography>
                <Typography variant="b1" as="p" className="text-[#162047]/90 m-0">
                  When you join our team, you&apos;re joining an organization that cares deeply
                  about its people and you&apos;ll be contributing to the critical infrastructure
                  that keeps people connected, informed, and safe.
                </Typography>
              </div>
            )}
          </div>

          {/* RIGHT: Pillars accordion */}
          <div className="wj-col-right w-full">
            <div className="reveal wj-interactive-list flex flex-col gap-3.5">
              {pillars.map((pillar: PillarCard, index: number) => {
                const isActive = index === currentIndex;
                const hasIcon = Boolean(pillar.icon && pillar.icon.trim() !== "");
                return (
                  <div
                    key={index}
                    className={`wj-interactive-item flex flex-col justify-start py-[14px] px-[12px] rounded-lg border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#00e8d9]/50 bg-[#162047] shadow-xl"
                        : "border-white/10 bg-[#162047] hover:border-[#00e8d9]/30 shadow-md"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="wj-item-header flex items-center gap-3 min-h-[32px]">
                      {hasIcon && (
                        <div
                          className={`wj-icon-svg w-6 h-6 flex-shrink-0 transition-colors duration-300 ${
                            isActive ? "text-[#00e8d9]" : "text-white/75"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: pillar.icon!.replace(
                              "<svg",
                              '<svg class="wj-icon-svg w-full h-full"'
                            ),
                          }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        className={`wj-interactive-title m-0 transition-colors duration-300 text-sm sm:text-base ${
                          isActive ? "text-[#00e8d9]" : "text-white"
                        }`}
                      >
                        {pillar.title}
                      </Typography>
                    </div>
                    <div
                      className={`wj-expand-desc overflow-hidden transition-all duration-300 ${
                        hasIcon ? "pl-9" : "pl-0"
                      } ${isActive ? "max-h-48 opacity-100 pt-3" : "max-h-0 opacity-0"}`}
                    >
                      <div className="wj-expand-inner">
                        <Typography
                          variant="b3"
                          as="span"
                          className="text-white/80 block text-xs sm:text-sm"
                        >
                          {pillar.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
