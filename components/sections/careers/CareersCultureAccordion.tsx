"use client";

import { useState, useEffect, useRef } from "react";

interface PillarCard {
  title: string;
  description: string;
  icon?: string;
}

interface CareersCultureAccordionProps {
  data?: {
    title?: string;
    body?: string;
    cards?: PillarCard[];
  };
}

const FALLBACK_PILLARS = [
  {
    title: "Be Part of a Team",
    description: "We're building more than networks: we're building a team that takes pride and ownership in what we create together. As we grow, every teammate helps shape how we work, collaborate, and succeed. Here, culture isn't handed down—it's shaped by the people who live it every day."
  },
  {
    title: "Shape the Future",
    description: "We're at a pivotal moment in the evolution of wireless infrastructure. New technologies are increasing demands on networks, coverage, and capacity. As part of our team, you'll help design and deliver solutions that meet these challenges while influencing how we work, innovate, and grow as an organization."
  },
  {
    title: "Make an Impact",
    description: "As a fast-growing, privately held company, we move with purpose and make decisions focused on long-term success. Our teammates are trusted to take ownership, contribute ideas, and turn plans into execution."
  },
  {
    title: "Advance Your Career",
    description: "Backed by EQT, a leading private equity firm, we combine the momentum of a growing organization with strong financial support. We invest in our people, systems, and infrastructure to support sustainable growth—creating opportunities for you to develop new skills, assume greater responsibility, and grow your career."
  },
  {
    title: "Improve Everyday Connections",
    description: "Our infrastructure supports how people live, work, and stay connected. We take that responsibility seriously. Your expertise and perspective will contribute to the reliability, safety and reach of the networks communities and businesses depend on every day."
  }
];

export default function CareersCultureAccordion({ data }: CareersCultureAccordionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const storyData = (data as any)?.sections?.find((s: any) => s.key === "Why Join");
  const pillarsData = (data as any)?.sections?.find((s: any) => s.key === "Pillars");

  const pillars = pillarsData?.cards?.length ? pillarsData.cards : FALLBACK_PILLARS;

  const title = storyData?.title || "Why Join Arium Networks?";
  const body = storyData?.body;
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
  }, []);

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
      className="careers-accordion-wrapper"
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "80px 0",
        background: "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative background bubbles from old CareersStory */}
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", left: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div className="wj-two-col">
          {/* LEFT: Section heading & description */}
          <div className="wj-col-left reveal">
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "24px", fontWeight: 400, fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", letterSpacing: "0.06em", lineHeight: 1.35, color: "var(--color-midnight-blue)", textTransform: "uppercase", textShadow: "none" }}>
              {title}
            </h2>
            {(data as any)?.body ? (
              <div
                className="strapi-richtext-body"
                style={{ color: "rgba(22,32,71,0.88)", textAlign: "left", fontSize: "1.15rem", lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: (data as any).body }}
              />
            ) : (
              <>
                <p className="section-description" style={{ textAlign: "left", margin: "0 0 20px", color: "rgba(22,32,71,0.88)", fontSize: "1.15rem", lineHeight: 1.7, textShadow: "none" }}>
                  Wireless connectivity is entering a new era, and our infrastructure is at the center of it. Across communities nationwide, we design, build, and support networks that wireless carriers rely on every day.
                </p>
                <p className="section-description" style={{ textAlign: "left", margin: 0, color: "rgba(22,32,71,0.88)", fontSize: "1.15rem", lineHeight: 1.7, textShadow: "none" }}>
                  When you join our team, you&apos;re joining an organization that cares deeply about its people and you&apos;ll be contributing to the critical infrastructure that keeps people connected, informed, and safe.
                </p>
              </>
            )}
          </div>

          {/* RIGHT: Pillars accordion */}
          <div className="wj-col-right">
            <div className="reveal wj-interactive-list">
              {pillars.map((pillar: PillarCard, index: number) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={index}
                    className={`wj-interactive-item ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="wj-item-header">
                      {pillar.icon ? (
                        <div 
                          className="wj-icon-svg"
                          dangerouslySetInnerHTML={{ __html: pillar.icon.replace('<svg', '<svg class="wj-icon-svg"') }}
                        />
                      ) : (
                        <svg viewBox="0 0 24 24" className="wj-icon-svg"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                      )}
                      <h3 className="wj-interactive-title">
                        {pillar.title}
                      </h3>
                    </div>
                    <div className="wj-expand-desc">
                      <div className="wj-expand-inner">
                        <span>{pillar.description}</span>
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
