"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface IndustryFallback {
  title: string;
  description: string;
  theme: string;
  bgImage: string;
  icon?: string;
}

const INDUSTRIES: IndustryFallback[] = [
  {
    title: "Stadiums & Arenas",
    description: "We enable reliable wireless service for a better guest experience including enhanced fan engagement, public safety, mobile ticketing, concessions, and event operations.",
    theme: "teal",
    bgImage: "/assets/images/industry-stadiums.png"
  },
  {
    title: "Amusement Parks, Hospitality & Entertainment",
    description: "Our solutions provide high-quality wireless coverage for your guests, improving experience satisfaction, operational efficiency, and smart property technologies.",
    theme: "purple",
    bgImage: "/assets/images/industry-amusement.png"
  },
  {
    title: "Higher Education",
    description: "Our solutions enable digital learning and enhance campus safety by keeping faculty and students connected.",
    theme: "amber",
    bgImage: "/assets/images/industry-education.png"
  },
  {
    title: "Commercial Real Estate",
    description: "We can help you improve connectivity on your property while accommodating the technologies that make your building more functional, efficient, and tenant friendly.",
    theme: "amber",
    bgImage: "/assets/images/industry-realestate.png"
  },
  {
    title: "Healthcare",
    description: "Our solutions improve connectivity for staff, patients, and medical professionals.",
    theme: "blue",
    bgImage: "/assets/images/industry-healthcare.png"
  },
  {
    title: "State & Local Government",
    description: "Municipalities can improve connectivity for their constituents and help agencies better serve their residents and first responders.",
    theme: "teal",
    bgImage: "/assets/images/industry-government.png"
  },
  {
    title: "Airports",
    description: "We enable connectivity that supports the high data demand for travelers, busy staff and back-of-house operations, and mobile ticketing, providing a better guest experience and enhanced safety.",
    theme: "purple",
    bgImage: "/assets/images/industry-airports.png"
  }
];

interface IndustryCard {
  title: string;
  description: string;
  icon?: string;
  image?: { url: string }[];
}

interface SolutionsIndustriesProps {
  data?: {
    title?: string;
    body?: string;
    cards?: IndustryCard[];
  };
}

export default function SolutionsIndustries({ data }: SolutionsIndustriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Merge dynamic data from Strapi with fallback themes/images
  const displayIndustries = data?.cards?.length ? data.cards.map((item, index) => {
    const fallback = INDUSTRIES.find(ind => ind.title.toLowerCase() === item.title.toLowerCase()) || INDUSTRIES[index % INDUSTRIES.length];
    return {
      title: item.title,
      description: item.description,
      icon: item.icon,
      theme: fallback.theme,
      bgImage: item.image?.[0]?.url || fallback.bgImage
    };
  }) : INDUSTRIES;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayIndustries.length);
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
      id="industries"
      style={{ overflow: "hidden", position: "relative", padding: "80px 0", background: "var(--color-midnight-blue)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images wrapper (Split: left portion only) */}
      <div className="ind-bg-wrapper">
        {displayIndustries.map((industry, index) => (
          <Image
            key={index}
            className={`ind-bg-img ${index === currentIndex ? 'active' : ''}`}
            src={industry.bgImage || "/assets/images/industry-stadiums.png"}
            alt={industry.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
              transition: "opacity 1s ease"
            }}
          />
        ))}
        {/* Gradient overlay inside wrapper */}
        <div className="ind-bg-overlay"></div>
      </div>

      {/* Two-column layout: heading left, pillars right */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div className="ind-two-col">
          {/* LEFT: Section heading & description */}
          <div className="ind-col-left reveal">
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "24px", fontWeight: 300 }}>
              {data?.title || "Industries That Require Advanced Connectivity"}
            </h2>
            {data?.body ? (
              <div
                className="section-description strapi-richtext-body"
                style={{ textAlign: "left", margin: 0 }}
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <p className="section-description" style={{ textAlign: "left", margin: 0 }}>We partner with industries like yours, designing the right mix of small cells and DAS to meet performance, aesthetic, and operational requirements, all while leveraging our long-standing relationships with MNOs, utilities, public safety agencies, and more.</p>
            )}
          </div>

          {/* RIGHT: Industry pillars */}
          <div className="ind-col-right">
            <div className="reveal ind-accordion-container" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {displayIndustries.map((industry, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={index}
                    className={`ind-interactive-item ${isActive ? 'active' : ''}`}
                    data-theme={industry.theme}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="ind-item-header">
                      {industry.icon && (
                        <span dangerouslySetInnerHTML={{ __html: industry.icon }} />
                      )}
                      <h3 className="ind-interactive-title">{industry.title}</h3>
                    </div>
                    <div className="ind-expand-desc">
                      <span>{industry.description}</span>
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
