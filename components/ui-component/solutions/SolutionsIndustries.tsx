"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@ui-element";

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
    description:
      "We enable reliable wireless service for a better guest experience including enhanced fan engagement, public safety, mobile ticketing, concessions, and event operations.",
    theme: "teal",
    bgImage: "/assets/images/industry-stadiums.png",
  },
  {
    title: "Amusement Parks, Hospitality & Entertainment",
    description:
      "Our solutions provide high-quality wireless coverage for your guests, improving experience satisfaction, operational efficiency, and smart property technologies.",
    theme: "purple",
    bgImage: "/assets/images/industry-amusement.png",
  },
  {
    title: "Higher Education",
    description:
      "Our solutions enable digital learning and enhance campus safety by keeping faculty and students connected.",
    theme: "amber",
    bgImage: "/assets/images/industry-education.png",
  },
  {
    title: "Commercial Real Estate",
    description:
      "We can help you improve connectivity on your property while accommodating the technologies that make your building more functional, efficient, and tenant friendly.",
    theme: "amber",
    bgImage: "/assets/images/industry-realestate.png",
  },
  {
    title: "Healthcare",
    description:
      "Our solutions improve connectivity for staff, patients, and medical professionals.",
    theme: "blue",
    bgImage: "/assets/images/industry-healthcare.png",
  },
  {
    title: "State & Local Government",
    description:
      "Municipalities can improve connectivity for their constituents and help agencies better serve their residents and first responders.",
    theme: "teal",
    bgImage: "/assets/images/industry-government.png",
  },
  {
    title: "Airports",
    description:
      "We enable connectivity that supports the high data demand for travelers, busy staff and back-of-house operations, and mobile ticketing, providing a better guest experience and enhanced safety.",
    theme: "purple",
    bgImage: "/assets/images/industry-airports.png",
  },
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
  const displayIndustries = data?.cards?.length
    ? data.cards.map((item, index) => {
        const fallback =
          INDUSTRIES.find((ind) => ind.title.toLowerCase() === item.title.toLowerCase()) ||
          INDUSTRIES[index % INDUSTRIES.length];
        return {
          title: item.title,
          description: item.description,
          icon: item.icon,
          theme: fallback.theme,
          bgImage: item.image?.[0]?.url || fallback.bgImage,
        };
      })
    : INDUSTRIES;
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
      className="relative overflow-hidden py-20 bg-[#101830] border-y border-white/5"
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images wrapper (Split: left portion only) */}
      <div className="ind-bg-wrapper absolute left-0 top-0 bottom-0 w-3/4 z-0 pointer-events-none overflow-hidden">
        {displayIndustries.map((industry, index) => (
          <Image
            key={index}
            className={`ind-bg-img absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-0" : "opacity-0"}`}
            src={industry.bgImage || "/assets/images/industry-stadiums.png"}
            alt={industry.title}
            fill
          />
        ))}
        {/* Gradient overlay inside wrapper */}
        <div className="ind-bg-overlay absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0e20]/80 via-[#0a0e20]/50 to-[#101830]" />
      </div>

      {/* Two-column layout: heading left, pillars right */}
      <div className="max-w-[1440px] mx-auto px-6 relative z-[2]">
        <div className="ind-two-col grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-12 lg:gap-20 items-start">
          {/* LEFT: Section heading & description */}
          <div className="ind-col-left reveal lg:sticky lg:top-36 max-w-[540px]">
            <Typography
              variant="h2"
              as="h2"
              uppercase
              weight="light"
              className="text-left text-white mb-6"
            >
              {data?.title || "Industries That Require Advanced Connectivity"}
            </Typography>
            {data?.body ? (
              <div
                className="section-description strapi-richtext-body text-white/80 text-base md:text-lg leading-relaxed text-left m-0"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <Typography variant="b1" as="p" className="text-white/80 text-left m-0">
                We partner with industries like yours, designing the right mix of small cells and
                DAS to meet performance, aesthetic, and operational requirements, all while
                leveraging our long-standing relationships with MNOs, utilities, public safety
                agencies, and more.
              </Typography>
            )}
          </div>

          {/* RIGHT: Industry pillars */}
          <div className="ind-col-right w-full flex flex-col justify-center lg:relative lg:left-6">
            <div className="reveal ind-accordion-container flex flex-col gap-2">
              {displayIndustries.map((industry, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={index}
                    className={`ind-interactive-item group flex flex-col justify-start p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-white/30 bg-[#0d1224]/90 shadow-lg"
                        : "border-white/10 bg-[#0d1224]/75 hover:border-white/20 hover:bg-[#0d1224]/85"
                    }`}
                    data-theme={industry.theme}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="ind-item-header relative flex items-center min-h-[48px] pl-16 gap-0">
                      {industry.icon && (
                        <span
                          className={`ind-icon-svg absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "text-teal stroke-teal"
                              : "text-white/60 stroke-white/60 group-hover:text-teal group-hover:stroke-teal"
                          }`}
                          dangerouslySetInnerHTML={{ __html: industry.icon }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        className="text-white m-0 transition-colors duration-300 group-hover:text-teal"
                      >
                        {industry.title}
                      </Typography>
                    </div>
                    <div
                      className={`ind-expand-desc overflow-hidden transition-all duration-300 ${isActive ? "max-h-40 opacity-100 pt-2 pl-16" : "max-h-0 opacity-0"}`}
                    >
                      <Typography variant="b3" as="span" className="text-white/70 block">
                        {industry.description}
                      </Typography>
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
