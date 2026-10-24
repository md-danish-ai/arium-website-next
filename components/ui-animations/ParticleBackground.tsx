"use client";

import React, { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  id: string;
  colors?: string[];
  count?: number;
}

export default function ParticleBackground({
  id,
  colors = ["#00e8d9", "#D2C7FF", "#FFDAC8", "#BCF6F2"],
  count = 35,
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const styleId = `particle-styles-${id}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    let cssText = "";

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = Math.random() * 12 + 8;
      const delay = Math.random() * -20;
      const driftX = (Math.random() - 0.5) * 80;
      const driftY = (Math.random() - 0.5) * 80;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const animationName = `${id}-drift-${i}`;

      dot.style.cssText = `
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${color};
        box-shadow: 0 0 ${size * 3}px ${color};
        opacity: ${Math.random() * 0.35 + 0.15};
        animation: ${animationName} ${dur}s ease-in-out ${delay}s infinite alternate;
      `;

      cssText += `
        @keyframes ${animationName} {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${driftX}px, ${driftY}px); }
        }
      `;

      container.appendChild(dot);
    }

    styleEl.innerHTML = cssText;

    return () => {
      container.innerHTML = "";
    };
  }, [id, colors, count]);

  return <div className="infra-particles" id={id} ref={containerRef} />;
}
