"use client";
import { useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

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

export interface ProcessSectionProps {
  title: string;
  description: string;
  pillars: PillarData[];
  maxWidthTitle?: string;
}

export default function ProcessSection({
  title,
  description,
  pillars,
  maxWidthTitle,
}: ProcessSectionProps) {
  const pathname = usePathname();
  const isRightOfWays = pathname?.includes("right-of-way");
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    if (activeTab === index) return;
    setActiveTab(index);
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
        <Container className="relative z-[2]">
          <div className="text-center mb-14">
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

          {/* ─── TAB NAVIGATION (Desktop only >= 1024px) ─── */}
          <div
            className="reveal stagger-3 hidden lg:grid items-center mx-auto mb-10 w-full"
            role="tablist"
            aria-label="Service delivery process"
            style={
              isRightOfWays
                ? {
                    gridTemplateColumns: `repeat(${pillars.length}, 1fr)`,
                    maxWidth: "1320px",
                    gap: "24px",
                  }
                : {
                    gridTemplateColumns: `repeat(${pillars.length}, 1fr)`,
                    maxWidth: "1188px",
                    gap: "24px",
                  }
            }
          >
            {pillars.map((pillar, index) => {
              const accentColor =
                pillar.timelineItems?.[0]?.backgroundColor || pillar.themeColor || "#FBCBB5";
              const isActive = activeTab === index;
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${pillar.id}`}
                  id={`tab-${pillar.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className="group relative flex flex-col items-center justify-center p-3 cursor-pointer outline-none bg-transparent border-none transition-opacity duration-200"
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(e) => {
                    let newIndex = activeTab;
                    if (e.key === "ArrowRight") {
                      newIndex = (activeTab + 1) % pillars.length;
                    } else if (e.key === "ArrowLeft") {
                      newIndex = (activeTab - 1 + pillars.length) % pillars.length;
                    }
                    if (newIndex !== activeTab) {
                      e.preventDefault();
                      handleTabClick(newIndex);
                      const nextTab = document.getElementById(`tab-${pillars[newIndex].id}`);
                      if (nextTab) nextTab.focus();
                    }
                  }}
                  style={
                    {
                      "--accent-color": accentColor,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={`w-16 h-16 rounded-[16px] flex items-center justify-center text-[#162047] mb-2 transition-all duration-200 border border-transparent [&_svg]:w-10 [&_svg]:h-10 lg:[&_svg]:w-11 lg:[&_svg]:h-11 [&_img]:w-12 [&_img]:h-12 lg:[&_img]:w-14 lg:[&_img]:h-14 [&_img]:object-contain ${
                      isActive
                        ? "bg-[var(--accent-color)] shadow-[0_10px_20px_-6px_var(--accent-color)] -translate-y-0.5"
                        : "group-hover:bg-[var(--accent-color)] group-hover:shadow-[0_10px_20px_-6px_var(--accent-color)] group-hover:-translate-y-0.5"
                    }`}
                  >
                    {pillar.iconSvg}
                  </span>
                  <span className="font-heading text-lg lg:text-xl font-semibold uppercase tracking-[0.08em] text-[#162047] pb-1.5 inline-block relative">
                    {pillar.title}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--accent-color)] transition-transform duration-200 origin-center ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* ─── TAB PANELS (STEP CARDS) ─── */}
          <div className="reveal stagger-4 w-full max-w-[1360px] mx-auto overflow-hidden p-0 lg:py-3 lg:px-5">
            <div className="flex flex-col gap-10 w-full lg:block">
              {pillars.map((pillar, index) => {
                const isActive = activeTab === index;

                return (
                  <div
                    key={`panel-${pillar.id}`}
                    id={`panel-${pillar.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${pillar.id}`}
                    aria-hidden={!isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`w-full transition-opacity duration-300 ${
                      isActive ? "block" : "block lg:hidden"
                    }`}
                  >
                    {/* Mobile/Tablet Phase Header (shown only on < 1024px) */}
                    <div className="flex lg:hidden items-center gap-3.5 mx-4 mb-4 font-heading text-xl md:text-2xl font-bold text-[#162047]">
                      <div
                        className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[#162047] shrink-0 [&_svg]:w-7 [&_svg]:h-7 [&_img]:w-9 [&_img]:h-9 [&_img]:object-contain"
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

                    {/* Step Cards (Mobile/Tablet swipe track, Desktop grid >= 1024px) */}
                    <div
                      className={`flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 pb-5 px-4 justify-start items-stretch scrollbar-none [webkit-overflow-scrolling:touch] max-w-full ${
                        isRightOfWays
                          ? "lg:grid lg:grid-cols-4 lg:gap-5 lg:max-w-[1320px] lg:mx-auto lg:p-0 lg:overflow-visible"
                          : "lg:flex lg:justify-center lg:gap-6 lg:max-w-[1188px] lg:mx-auto lg:p-0 lg:overflow-visible"
                      }`}
                    >
                      {pillar.timelineItems.map((item, idx) => {
                        const cardBg = item.backgroundColor || pillar.themeColor || "#FBCBB5";
                        return (
                          <div
                            key={idx}
                            className={`shrink-0 snap-start w-[280px] sm:w-[320px] min-w-[270px] max-w-[340px] min-h-[260px] p-6 sm:p-7 rounded-[20px] shadow-[0_4px_16px_rgba(22,32,71,0.04)] hover:shadow-[0_16px_36px_rgba(22,32,71,0.09)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start justify-start text-left lg:w-full lg:min-w-0 lg:shrink lg:p-8 lg:min-h-[310px] ${
                              isRightOfWays
                                ? "lg:max-w-[303px]"
                                : "lg:max-w-[380px] lg:aspect-[1.05/1]"
                            }`}
                            style={{
                              backgroundColor: cardBg,
                            }}
                          >
                            <span className="self-start inline-flex items-center justify-center py-1.5 px-3.5 rounded-full bg-[#162047] text-white font-heading text-xs font-bold tracking-[0.06em] uppercase mb-4 leading-none select-none w-fit">
                              Step {idx + 1}
                            </span>
                            <h4 className="font-heading text-lg lg:text-xl font-bold text-[#162047] m-0 mb-2.5 leading-[1.3] normal-case">
                              {item.label}
                            </h4>
                            <p className="text-[15px] lg:text-base leading-[1.58] text-[#162047]/90 font-normal m-0">
                              {item.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
