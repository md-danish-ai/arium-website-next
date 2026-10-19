"use client";

import React, { useEffect, useRef, useState } from "react";

interface SvgDrawProps {
  src: string;
  className?: string;
}

export default function SvgDraw({ src, className = "" }: SvgDrawProps) {
  const [svgData, setSvgData] = useState<{
    viewBox: string;
    width: string;
    height: string;
    paths: string[];
    defs: string | null;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const resp = await fetch(src);
        const text = await resp.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const origSvg = doc.querySelector("svg");
        if (!origSvg) return;

        const origPath = origSvg.querySelector("path");
        if (!origPath) return;

        const pathData = origPath.getAttribute("d") || "";
        

        const parts = [];
        let buf = "";
        for (let i = 0; i < pathData.length; i++) {
          if (pathData[i] === "M" && buf.trim()) {
            parts.push(buf.trim());
            buf = "M";
          } else {
            buf += pathData[i];
          }
        }
        if (buf.trim()) parts.push(buf.trim());

        const defs = origSvg.querySelector("defs");

        setSvgData({
          viewBox: origSvg.getAttribute("viewBox") || "0 0 240 240",
          width: origSvg.getAttribute("width") || "240",
          height: origSvg.getAttribute("height") || "240",
          paths: parts,
          defs: defs ? defs.innerHTML : null,
        });
      } catch (err) {
        console.error("Failed to load SVG for drawing:", err);
      }
    };

    fetchSvg();
  }, [src]);

  useEffect(() => {
    if (!svgData || isAnimated || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [svgData, isAnimated]);

  useEffect(() => {
    if (!isAnimated || !containerRef.current) return;

    const DRAW_DURATION = 1.5;
    const STAGGER = 0.03;
    const FILL_DELAY = 0.4;
    const FILL_DURATION = 0.5;
    const STROKE_COLOR = "#00E8D9";

    const paths = containerRef.current.querySelectorAll("path");
    
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      
      const delay = i * STAGGER;
      
      path.style.transition = `stroke-dashoffset ${DRAW_DURATION}s ease ${delay}s, fill ${FILL_DURATION}s ease ${delay + DRAW_DURATION + FILL_DELAY}s`;
      

      void path.getBoundingClientRect();
      
      path.style.strokeDashoffset = "0";
      path.style.fill = STROKE_COLOR;
    });
  }, [isAnimated]);

  if (!svgData) {
    return <div className={`infra-panel-svg w-[240px] h-[240px] ${className}`} />;
  }

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      <svg
        viewBox={svgData.viewBox}
        width={svgData.width}
        height={svgData.height}
        fill="none"
        className="infra-panel-svg"
      >
        {svgData.defs && (
          <defs dangerouslySetInnerHTML={{ __html: svgData.defs }} />
        )}
        <g>
          {svgData.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="transparent"
              stroke="#00E8D9"
              strokeWidth="0.6"
              data-index={i}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
