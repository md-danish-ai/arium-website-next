import React from "react";
import Link from "next/link";

interface CulturePillar {
  title: string;
  description: string;
}

interface CtaItem {
  label: string;
  url: string;
}

interface AboutCultureProps {
  data?: {
    title?: string;
    body?: string;
    cards?: CulturePillar[];
    cta?: CtaItem[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function AboutCulture({ data }: AboutCultureProps) {
  const defaultPillars = [
    { title: "Leadership", description: "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges." },
    { title: "Passion", description: "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives." },
    { title: "Optimism", description: "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation." }
  ];

  const pillars = (data?.cards && data.cards.length > 0 ? data.cards : null) || defaultPillars;
  const cta = data?.cta?.[0] || { label: "Explore Careers", url: "/careers" };
  return (
    <section id="culture" className="relative overflow-hidden py-20 mt-[-1px] border-none bg-midnight">
      <div className="culture-bg absolute top-0 right-0 bottom-0 w-full md:w-[60%] z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)] md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          <source media="(max-width: 768px)" srcSet={data?.media?.[0]?.url || "/assets/images/culture-bg-mobile.jpg"} />
          <img src={data?.media?.[1]?.url || "/assets/images/culture-bg.jpg"} alt={data?.media?.[1]?.alternativeText || "Team collaborating in modern office"} className="culture-bg-img w-full h-full object-cover block" />
        </picture>
      </div>

      <div className="culture-veil absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1628]/50 to-transparent pointer-events-none" />

      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.06)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-[2]">
        <div className="culture-content-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="culture-left-column reveal max-w-[640px] text-left">
            <h2 className="culture-hero-heading font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] text-white leading-[1.35] uppercase mb-4">
              {data?.title || "Help Us Shape the Future of Connectivity"}
            </h2>

            {data?.body ? (
              <div
                className="culture-hero-desc strapi-richtext-body text-[1.05rem] leading-[1.8] text-white/80 mb-8 flex flex-col gap-4 [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <p className="culture-hero-desc text-[1.05rem] leading-[1.8] text-white/80 mb-8">
                Our infrastructure powers the connected world we all rely on. By joining our team, you&apos;ll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.
              </p>
            )}

            <div className="culture-pillars-container mt-9 max-w-[585px] flex flex-col gap-0">
              {pillars.map((pillar, index) => (
                <React.Fragment key={index}>
                  <div className={`culture-mobile-pillar pillar-${index + 1} ${index === 0 ? "pb-6" : index === pillars.length - 1 ? "pt-6" : "py-6"}`}>
                    <div className="culture-mobile-pillar-title font-heading text-base font-bold text-teal leading-tight tracking-[0.06em] mb-1.5 uppercase">{pillar.title}</div>
                    <p className="culture-mobile-pillar-desc text-[0.9rem] leading-[1.65] text-white/80 m-0">{pillar.description}</p>
                  </div>
                  {index < pillars.length - 1 && (
                    <div className="culture-pillar-divider w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="reveal stagger-2 mt-9">
              <Link href={cta.url} className="culture-cta-btn inline-block px-10 py-3.5 rounded-full bg-teal text-midnight font-heading text-sm font-semibold tracking-wider uppercase no-underline transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
                {cta.label}
              </Link>
            </div>
          </div>

          <div />
        </div>
      </div>
    </section>
  );
}
