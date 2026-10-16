"use client";

import Link from "next/link";
import { useEffect } from "react";

interface PanelsCard {
  Title: string;
  Description: string;
  CtaText?: string;
  CtaLink?: string;
  ContentColor?: string;
  IllustatioSvgCode?: string;
}

interface SharedDetailedCardGridProps {
  heading: string;
  description: string;
  bgColor?: string;
  panelsCards?: PanelsCard[];
}

export default function SharedDetailedCardGrid({ heading, description, bgColor, panelsCards }: SharedDetailedCardGridProps) {
  useEffect(() => {
    const svgs = document.querySelectorAll('.draw-svg');
    if (!svgs.length) return;

    const DRAW = 1.5, TOTAL_SPREAD = 2.5, FILL_DELAY = 0.3, FILL_DUR = 0.5, COLOR = '#00E8D9';

    // Hide all paths initially
    for (let s = 0; s < svgs.length; s++) {
      const svgEl = svgs[s] as HTMLElement;
      svgEl.removeAttribute('data-done');

      const paths = svgs[s].querySelectorAll('path[data-i]');
      for (let p = 0; p < paths.length; p++) {
        const path = paths[p] as SVGPathElement;
        const len = path.getTotalLength();
        path.style.fill = 'transparent';
        path.style.stroke = 'transparent';
        path.style.strokeWidth = path.getAttribute('data-circle') ? '1.5' : '0.6';
        path.style.strokeDasharray = len.toString();
        path.style.strokeDashoffset = len.toString();
      }
    }

    const animate = (svg: Element) => {
      const paths = svg.querySelectorAll('path[data-i]');
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j] as SVGPathElement;
        p.style.stroke = COLOR;
      }
      
      const stagger = paths.length > 1 ? TOTAL_SPREAD / (paths.length - 1) : 0;
      let lastDelay = 0;
      for (let k = 0; k < paths.length; k++) {
        const p2 = paths[k] as SVGPathElement;
        const delay = k * stagger;
        p2.style.transition = `stroke-dashoffset ${DRAW}s ease ${delay}s`;
        p2.style.strokeDashoffset = '0';
        lastDelay = delay;
      }
      
      const fillStart = (lastDelay + DRAW + FILL_DELAY) * 1000;
      setTimeout(() => {
        const circles = svg.querySelectorAll('path[data-circle="1"]');
        for (let c = 0; c < circles.length; c++) {
          const circle = circles[c] as SVGPathElement;
          circle.style.transition = `fill ${FILL_DUR}s ease`;
          circle.style.fill = COLOR;
        }
      }, fillStart);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const svg = entry.target.querySelector('.draw-svg') as HTMLElement;
          if (svg && !svg.dataset.done) {
            svg.dataset.done = '1';
            animate(svg);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const cards = document.querySelectorAll('.shared-dcg-panel-card');
    cards.forEach((c) => observer.observe(c));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="shared-dcg-section" id="infrastructure" style={bgColor ? { background: bgColor } : undefined}>
      <div className="shared-dcg-grid-bg"></div>
      
      <div className="shared-dcg-particles" id="shared-dcg-particles"></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "64px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontSize: "2.4rem", fontWeight: 400, letterSpacing: "0.06em", lineHeight: 1.45 }}>
            {heading || "The infrastructure that powers advanced connectivity"}
          </h2>
          <p className="section-description reveal stagger-2" style={{ maxWidth: "960px", margin: "20px auto 0" }}>
            {description || "For over 15 years, we've been building and maintaining the infrastructure the wireless industry relies on."}
          </p>
          
        </div>

        <div className="shared-dcg-panels">
          {panelsCards && panelsCards.length > 0 ? (
            panelsCards.map((item, index) => {
              
              const rawSvg = item.IllustatioSvgCode || '';
              // Strip inline animation styles injected by JS on the source page
              // so paths aren't invisible when first rendered here
              const cleanSvg = rawSvg
                .replace(/style="[^"]*stroke-dashoffset[^"]*"/gi, '')
                .replace(/style="[^"]*stroke-dasharray[^"]*"/gi, '')
                .replace(/data-done="1"/gi, '');

              return (
              <div className="shared-dcg-panel reveal stagger-3" key={index}>
                <div className="shared-dcg-panel-card" style={item.ContentColor ? { borderColor: item.ContentColor } : undefined}>
                  {cleanSvg ? (
                    <div dangerouslySetInnerHTML={{ __html: cleanSvg }} style={{ width: "100%", display: "flex", justifyContent: "center" }} />
                  ) : null}
                  <div className="shared-dcg-panel-text">
                    <h3 className="shared-dcg-panel-heading">{item.Title}</h3>
                    <p className="shared-dcg-panel-desc">{item.Description}</p>
                    {item.CtaLink && (
                      <Link href={item.CtaLink} aria-label={`${item.CtaText || "Explore more"} about ${item.Title}`} className="shared-dcg-panel-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", marginTop: "auto", whiteSpace: "nowrap" }}>
                      <span className="shared-dcg-panel-link-text" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.85)", fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1, transition: "color 0.3s ease", display: "inline-block", whiteSpace: "nowrap" }}>
                          {item.CtaText || "Explore more"}
                      </span>
                        <svg className="shared-dcg-panel-link-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e8d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", transition: "transform 0.3s ease" }}>
                          <polyline points="8 17 13 12 8 7"></polyline>
                          <polyline points="14 17 19 12 14 7"></polyline>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              );
            })
          ) : null}
        </div>
      </div>
    </section>
  );
}
