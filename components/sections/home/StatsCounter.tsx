"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

interface StatsCounterProps {
  data?: {
    title?: string;
    stats?: StatItem[];
    media?: any;
  };
}

export default function StatsCounter({ data }: StatsCounterProps) {
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

  const mediaUrl = data?.media ? (Array.isArray(data.media) ? data.media[0]?.url : data.media?.data?.attributes?.url || data.media?.url) : null;
  let imageUrl = mediaUrl || "/assets/images/us-dot-map-faint.svg";
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    imageUrl = `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imageUrl}`;
  }

  return (
    <section id="stats" ref={sectionRef} className="relative overflow-hidden py-[120px] bg-midnight">
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] [background:radial-gradient(circle,rgba(0,232,217,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container relative z-[1]">
        <div className="section-header text-center mb-16">
          <h2 className="section-title reveal text-white text-[2.4rem] font-normal tracking-[0.06em] mx-auto leading-[1.45] text-center max-w-full whitespace-normal">
            {data?.title || "Scale and experience to match your ambition"}
          </h2>
        </div>

        <div className="stats-top-grid">
          <div className="stats-bento-grid reveal">
            {data?.stats && data.stats.length > 0 ? (
              data.stats.map((stat, index, array) => {
                const target = parseFloat(stat.value) || 0;
                const suffix = stat.value.replace(target.toString(), "").trim();
                
                const colors = ["bg-purple", "bg-teal", "bg-white", "bg-yellow", "bg-orange"];
                const colorClass = colors[index % colors.length];
                const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

                return (
                  <div className={`stats-bento-card ${colorClass} ${isLastSpan2 ? 'span-2 !items-center !text-center' : ''}`} key={index}>
                    <div>
                      <span className="stats-number counter" data-target={target} data-suffix={suffix}>0</span>
                    </div>
                    <p>{stat.label}</p>
                  </div>
                );
              })
            ) : (
              <>
                <div className="stats-bento-card bg-purple">
                  <div>
                    <span className="stats-number counter" data-target="100" data-suffix="K+">0</span>
                  </div>
                  <p>Small cells on air or under contract</p>
                </div>

                <div className="stats-bento-card bg-teal">
                  <div>
                    <span className="stats-number counter" data-target="300" data-suffix="+">0</span>
                  </div>
                  <p>DAS-connected venues and buildings</p>
                </div>

                <div className="stats-bento-card bg-white">
                  <div>
                    <span className="stats-number counter" data-target="700" data-suffix="+">0</span>
                  </div>
                  <p>Supported municipal networks</p>
                </div>

                <div className="stats-bento-card bg-yellow">
                  <div>
                    <span className="stats-number counter" data-target="15" data-suffix="+">0</span>
                  </div>
                  <p>Years of expertise</p>
                </div>

                <div className="stats-bento-card bg-orange span-2 !items-center !text-center">
                  <div>
                    <span className="stats-number counter" data-target="24" data-suffix="/7">0</span>
                  </div>
                  <p>Monitoring via the NOC</p>
                </div>
              </>
            )}
          </div>

          <div className="stats-map-container reveal stagger-1">
            <img src={imageUrl} alt="Arium network coverage map" />
          </div>
        </div>
      </div>
    </section>
  );
}
