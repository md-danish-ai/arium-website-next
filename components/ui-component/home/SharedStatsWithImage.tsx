"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";

interface StatItem {
  Number: string;
  Description: string;
  BgColor?: string;
  NumberColor?: string;
  DescriptionColor?: string;
}

interface SharedStatsWithImageProps {
  heading: string;
  statscards?: StatItem[];
  image?: any;
  HeadingColor?: string;
}

export default function SharedStatsWithImage({ heading, statscards, image, HeadingColor }: SharedStatsWithImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach((counter) => {
            const el = counter as HTMLElement;
            const target = +el.getAttribute('data-target')!;
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000;

            const startTime = performance.now();
            const updateCounter = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(easeOutQuart * target);

              el.innerText = current + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.innerText = target + suffix;
              }
            };

            requestAnimationFrame(updateCounter);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageUrl = image?.url || image?.data?.attributes?.url || "/assets/images/us-dot-map-faint.svg";
  const absoluteImageUrl = imageUrl.startsWith("/assets/") ? imageUrl : GetStrapiMediaUrl(imageUrl);

  const defaultStats: any[] = [
    { Number: "100K+", Description: "Small cells on air or under contract", BgColor: "#898cf3" },
    { Number: "300+", Description: "DAS-connected venues and buildings", BgColor: "#bcf6f2" },
    { Number: "700+", Description: "Supported municipal networks", BgColor: "#ffffff" },
    { Number: "15+", Description: "Years of expertise", BgColor: "#ffffca" },
    { Number: "24/7", Description: "Monitoring via the NOC", BgColor: "#ffdac8" }
  ];

  const cardsToRender = statscards && statscards.length > 0 ? statscards : defaultStats;

  return (
    <section className="shared-swi-section relative overflow-hidden pt-[72px] pb-[120px] bg-midnight" ref={sectionRef}>
      <div className="shared-swi-bg-gradient absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,232,217,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-[1]">
        <div className="shared-swi-header mb-16 text-center reveal">
          <h2 className="shared-swi-title font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] text-white leading-[1.45] text-center max-w-full" style={{ color: HeadingColor || undefined }}>
            {heading || "Scale and experience to match your ambition"}
          </h2>
        </div>

        <div className="shared-swi-top-grid grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 items-center">
          <div className="shared-swi-bento-grid grid grid-cols-2 gap-3 h-full reveal stagger-1">
            {cardsToRender.map((stat: any, index: number, array: any[]) => {
              const numStr = stat.Number || stat.value || "0";
              const targetMatch = numStr.match(/[\d.]+/);
              const target = targetMatch ? parseFloat(targetMatch[0]) : 0;
              const suffix = numStr.replace(target.toString(), "").trim();
              const descStr = stat.Description || stat.label || "";
              
              const defaultColors = ["bg-[#898cf3]", "bg-[#bcf6f2]", "bg-white", "bg-[#ffffca]", "bg-[#ffdac8]"];
              let colorClass = defaultColors[index % defaultColors.length];
              
              if (stat.BgColor) {
                const mappedColor = stat.BgColor.toLowerCase().replace(/[^a-z]/g, "");
                if (mappedColor.includes("purple")) colorClass = "bg-[#898cf3]";
                else if (mappedColor.includes("teal")) colorClass = "bg-[#bcf6f2]";
                else if (mappedColor.includes("white")) colorClass = "bg-white";
                else if (mappedColor.includes("yellow")) colorClass = "bg-[#ffffca]";
                else if (mappedColor.includes("orange")) colorClass = "bg-[#ffdac8]";
              }

              const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

              return (
                <div 
                  className={`shared-swi-bento-card rounded-2xl p-5 min-h-[136px] flex flex-col justify-center gap-1.5 cursor-default transition-all duration-300 border border-midnight/5 hover:-translate-y-1 hover:shadow-xl ${!stat.BgColor ? colorClass : ""} ${isLastSpan2 ? 'col-span-2 min-h-[110px] items-center text-center' : ''}`} 
                  style={{ 
                    backgroundColor: stat.BgColor || undefined, 
                  }} 
                  key={index}
                >
                  <div>
                    <span className="shared-swi-number counter font-heading text-[clamp(2rem,3vw,2.8rem)] font-extrabold text-midnight leading-none tracking-[-0.04em]" style={{ color: stat.NumberColor || undefined }} data-target={target} data-suffix={suffix}>0</span>
                  </div>
                  <p className="text-[0.82rem] font-medium text-midnight m-0 whitespace-nowrap" style={{ color: stat.DescriptionColor || undefined }}>{descStr}</p>
                </div>
              );
            })}
          </div>

          <div className="shared-swi-map-container flex items-center justify-center h-full w-full reveal stagger-2">
            <img src={absoluteImageUrl} alt={image?.alternativeText || heading || "Stats graphic"} className="w-full max-h-[480px] object-contain object-center h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
