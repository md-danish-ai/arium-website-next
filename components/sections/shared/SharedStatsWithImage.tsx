"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

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
  const absoluteImageUrl = imageUrl.startsWith("http") || imageUrl.startsWith("/") 
    ? imageUrl 
    : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imageUrl}`;

  return (
    <section className="shared-swi-section" ref={sectionRef}>
      <div className="shared-swi-bg-gradient"></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="shared-swi-header reveal">
          <h2 className="shared-swi-title" style={{ color: HeadingColor || undefined }}>
            {heading || "Scale and experience to match your ambition"}
          </h2>
        </div>

        <div className="shared-swi-top-grid">
          <div className="shared-swi-bento-grid reveal stagger-1">
            {statscards && statscards.length > 0 ? (
              statscards.map((stat, index, array) => {
                const targetMatch = stat.Number.match(/[\d.]+/);
                const target = targetMatch ? parseFloat(targetMatch[0]) : 0;
                const suffix = stat.Number.replace(target.toString(), "").trim();
                
                // If a background color isn't provided, cycle through defaults
                const defaultColors = ["shared-swi-bg-purple", "shared-swi-bg-teal", "shared-swi-bg-white", "shared-swi-bg-yellow", "shared-swi-bg-orange"];
                let colorClass = defaultColors[index % defaultColors.length];
                
                // If user specifies a generic string in Strapi like "purple", map it
                if (stat.BgColor) {
                  const mappedColor = stat.BgColor.toLowerCase().replace(/[^a-z]/g, "");
                  if (mappedColor.includes("purple")) colorClass = "shared-swi-bg-purple";
                  else if (mappedColor.includes("teal")) colorClass = "shared-swi-bg-teal";
                  else if (mappedColor.includes("white")) colorClass = "shared-swi-bg-white";
                  else if (mappedColor.includes("yellow")) colorClass = "shared-swi-bg-yellow";
                  else if (mappedColor.includes("orange")) colorClass = "shared-swi-bg-orange";
                }

                const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

                return (
                  <div 
                    className={`shared-swi-bento-card ${!stat.BgColor ? colorClass : ""} ${isLastSpan2 ? 'span-2' : ''}`} 
                    style={{ 
                      backgroundColor: stat.BgColor || undefined, 
                      alignItems: isLastSpan2 ? "center" : undefined, 
                      textAlign: isLastSpan2 ? "center" : undefined 
                    }} 
                    key={index}
                  >
                    <div>
                      <span className="shared-swi-number counter" style={{ color: stat.NumberColor || undefined }} data-target={target} data-suffix={suffix}>0</span>
                    </div>
                    <p style={{ color: stat.DescriptionColor || undefined }}>{stat.Description}</p>
                  </div>
                );
              })
            ) : null}
          </div>

          <div className="shared-swi-map-container reveal stagger-2">
            <img src={absoluteImageUrl} alt={image?.alternativeText || heading || "Stats graphic"} />
          </div>
        </div>
      </div>
    </section>
  );
}
