"use client";
import { useState, useRef } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { Typography } from "@ui-element";

export interface TimelineItem {
  label: string;
  desc: string;
  backgroundColor?: string;
}

export interface PillarData {
  id: string;
  title: string;
  iconSvg: React.ReactNode;
  themeColor: string;
  steps: string[];
  timelineItems: TimelineItem[];
}

interface SharedProcessProps {
  title: string;
  description: string;
  pillars: PillarData[];
  maxWidthTitle?: string;
}

export default function SharedProcess({
  title,
  description,
  pillars,
  maxWidthTitle,
}: SharedProcessProps) {
  const pathname = usePathname();
  const isRightOfWays = pathname?.includes("right-of-way");
  const [activeTab, setActiveTab] = useState(0);
  const [rollingOutTab, setRollingOutTab] = useState<number | null>(null);
  const isAnimating = useRef(false);

  const handleTabClick = (index: number) => {
    if (activeTab === index || isAnimating.current) return;

    isAnimating.current = true;
    setRollingOutTab(activeTab);
    setActiveTab(index);

    setTimeout(() => {
      setRollingOutTab(null);
      isAnimating.current = false;
    }, 700);
  };

  // The V6.1 html hardcodes rgba(0, 232, 217, 0.15).

  return (
    <div className="border-none mt-[-1px] bg-white">
      <section className="relative overflow-hidden py-20 bg-white" id="process">
        <div
          className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="infra-particles pointer-events-none absolute inset-0"
          id="process-particles"
        />
        <div className="container mx-auto px-4 sm:px-6 relative z-[2] max-w-[1440px]">
          <div className="section-header text-center mb-14">
            <Typography
              as="h2"
              variant="h2"
              uppercase
              className="section-title reveal stagger-1 tracking-[0.06em] leading-[1.45] text-midnight mx-auto"
              style={
                maxWidthTitle || isRightOfWays
                  ? { maxWidth: isRightOfWays ? maxWidthTitle || "880px" : maxWidthTitle }
                  : undefined
              }
            >
              {title}
            </Typography>
            <Typography
              as="p"
              variant="b1"
              className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-4 text-midnight leading-relaxed"
            >
              {description}
            </Typography>
          </div>

          {/* ─── TAB NAVIGATION ─── */}
          <div
            className="process-tabs reveal stagger-3 hidden md:grid max-[1079px]:gap-8 max-[1280px]:max-w-[800px] mx-auto"
            role="tablist"
            aria-label="Service delivery process"
            style={
              isRightOfWays
                ? {
                    gridTemplateColumns: `repeat(${pillars.length}, 1fr)`,
                    maxWidth: "1320px",
                    gap: "20px",
                  }
                : {
                    gridTemplateColumns: `repeat(${pillars.length}, 1fr)`,
                    maxWidth: "1188px",
                    gap: "24px",
                  }
            }
          >
            {pillars.map((pillar, index) => (
              <button
                key={pillar.id}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${pillar.id}`}
                id={`tab-${pillar.id}`}
                tabIndex={activeTab === index ? 0 : -1}
                className={`process-tab-btn ${activeTab === index ? "active" : ""}`}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => {
                  let newIndex = activeTab;
                  if (e.key === "ArrowRight") {
                    newIndex = (activeTab + 1) % pillars.length;
                  } else if (e.key === "ArrowLeft") {
                    newIndex = (activeTab - 1 + pillars.length) % pillars.length;
                  }
                  if (newIndex !== activeTab && !isAnimating.current) {
                    e.preventDefault();
                    handleTabClick(newIndex);
                    const nextTab = document.getElementById(`tab-${pillars[newIndex].id}`);
                    if (nextTab) nextTab.focus();
                  }
                }}
                style={
                  {
                    "--accent-color":
                      pillar.timelineItems?.[0]?.backgroundColor || pillar.themeColor || "#FBCBB5",
                    "--accent-shadow": "rgba(251, 203, 181, 0.4)",
                  } as React.CSSProperties
                }
              >
                <span className="icon-wrap">{pillar.iconSvg}</span>
                <span className="tab-name">{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* ─── TAB PANELS (STEP CARDS GRID) ─── */}
          <div className="process-tab-content reveal stagger-4 max-md:p-0 max-md:overflow-visible">
            <div className="process-slider-track max-md:flex max-md:flex-col max-md:gap-8">
              {pillars.map((pillar, index) => {
                const isActive = activeTab === index;
                const isRollingOut = rollingOutTab === index;
                const panelClass = isActive ? "active" : isRollingOut ? "rolling-out" : "";

                return (
                  <div
                    key={`panel-${pillar.id}`}
                    id={`panel-${pillar.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${pillar.id}`}
                    aria-hidden={!isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`row-detail-panel hz-phase-panel ${panelClass} max-md:relative max-md:w-full max-md:opacity-100 max-md:pointer-events-auto max-md:transform-none max-md:p-0`}
                  >
                    <div className="mobile-phase-label hidden max-md:flex items-center gap-2.5 mx-4 mb-3.5 font-heading text-xl font-bold text-midnight">
                      <div
                        className="mobile-phase-icon w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-midnight shrink-0"
                        style={{
                          background:
                            pillar.timelineItems?.[0]?.backgroundColor ||
                            pillar.themeColor ||
                            "#FBCBB5",
                        }}
                      >
                        {pillar.iconSvg}
                      </div>
                      {pillar.title}
                    </div>
                    <div
                      className="hz-steps-grid max-[1079px]:flex max-[1079px]:flex-row max-[1079px]:overflow-x-auto max-[1079px]:snap-x max-[1079px]:snap-mandatory max-[1079px]:gap-4 max-[1079px]:px-4 max-[1079px]:pb-5 max-[1079px]:justify-start max-[1079px]:items-stretch"
                      style={
                        isRightOfWays
                          ? {
                              display: "grid",
                              gridTemplateColumns: `repeat(${pillar.timelineItems.length}, 1fr)`,
                              gap: "20px",
                              width: "100%",
                              maxWidth: "1320px",
                              margin: "0 auto",
                            }
                          : {
                              display: "flex",
                              justifyContent: "center",
                              gap: "24px",
                              width: "100%",
                              margin: "0 auto",
                            }
                      }
                    >
                      {pillar.timelineItems.map((item, idx) => {
                        const cardBg = item.backgroundColor || pillar.themeColor || "#FBCBB5";
                        return (
                          <div
                            key={idx}
                            className="process-step-card max-[1079px]:shrink-0 max-[1079px]:snap-start max-[1079px]:w-[280px] max-[1079px]:min-w-[270px] max-[1079px]:max-w-[290px] max-[1079px]:min-h-[300px] max-[1079px]:p-6"
                            style={
                              {
                                width: "100%",
                                maxWidth: isRightOfWays ? "303px" : "380px",
                                aspectRatio: isRightOfWays ? undefined : "1.05 / 1",
                                background: cardBg,
                              } as React.CSSProperties
                            }
                          >
                            <span className="process-step-badge">Step {idx + 1}</span>
                            <h4>{item.label}</h4>
                            <p>{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
