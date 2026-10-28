import type { StatItem, FeatureCardItem, StrapiMediaLike } from "@types";

export interface InfrastructureCard {
  id?: string | number;
  title: string;
  description: string;
  CTA_text?: string;
  CTA_url?: string;
  content_color?: string;
  svg_code?: string;
  svgType?: "small-cells" | "das";
  image?: string | StrapiMediaLike | null;
}

export interface SectionPointerItem {
  id?: string | number;
  title: string;
  description: string;
  title_color?: string;
  description_color?: string;
}

/**
 * Widget 1: Main Hero Fallback (shared.main-hero - Position 0)
 */
export const HOME_HERO_FALLBACK = {
  title: "Build with clarity. connect with confidence",
  description:
    "We are the country's largest small cell provider, bringing densification and capacity services to the wireless industry. With a focus on clarity and precision, we design, build, and deploy the essential infrastructure that powers today's most advanced wireless networks.",
  font_color: "#ffffff",
  background_color: "#162047",
  scroll_text: "Scroll to explore",
};

/**
 * Widget 2: Network Challenges Fallback (shared.background-feature-section - Position 1)
 */
export const NETWORK_CHALLENGES_FALLBACK: {
  title: string;
  description: string;
  background_image_desktop: string;
  background_image_mobile: string;
  title_color?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  FeatureCards: FeatureCardItem[];
} = {
  title: "Solve network challenges with a trusted partner",
  description:
    "Whether you're densifying an existing network, improving coverage in high-traffic areas, or preparing for next-generation connectivity, we deliver custom infrastructure solutions engineered for reliability and scale.",
  background_image_desktop: "/images/backgrounds/challenges.png",
  background_image_mobile: "/images/backgrounds/challenges.png",
  title_color: "#ffffff",
  description_color: undefined,
  CTA_text: undefined,
  CTA_url: undefined,
  FeatureCards: [
    {
      title: "Design",
      description:
        "We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.",
      title_color: undefined,
      text_color: undefined,
    },
    {
      title: "Implement",
      description:
        "We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.",
      title_color: undefined,
      text_color: undefined,
    },
    {
      title: "Optimize",
      description:
        "We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected.",
      title_color: undefined,
      text_color: undefined,
    },
  ],
};

/**
 * Widget 3: Our Infrastructure Fallback (shared.detailed-card-grid - Position 2)
 */
export const INFRASTRUCTURE_FALLBACK: {
  title: string;
  description: string;
  background_color?: string;
  PanelCards: InfrastructureCard[];
} = {
  title: "The infrastructure that powers advanced connectivity",
  description:
    "For over 15 years, we've been building and maintaining the infrastructure the wireless industry relies on.",
  background_color: undefined,
  PanelCards: [
    {
      title: "Small Cells",
      description:
        "Small cells are discreet, low-powered, fiber-connected antennas that enhance connectivity by providing targeted wireless coverage and capacity in public spaces—especially in dense populations or high-traffic areas like cities and suburbs.",
      CTA_text: "Explore more",
      CTA_url: "/our-solutions",
      svgType: "small-cells",
      svg_code: undefined,
      image: undefined,
    },
    {
      title: "Distributed Antenna Systems",
      description:
        "Distributed Antenna Systems (DAS) use small, strategically placed connection points, also called nodes, to meet the unique coverage and capacity needs of venues and indoor spaces like high-rises, hospitals, campuses, stadiums, resorts, and theme parks.",
      CTA_text: "Explore more",
      CTA_url: "/our-solutions",
      svgType: "das",
      svg_code: undefined,
      image: undefined,
    },
  ],
};

/**
 * Widget 4: Scale and Experience Fallback (shared.stats-with-image - Position 3)
 */
export const STATS_FALLBACK: {
  title: string;
  title_color?: string;
  image: string;
  StatsCard: StatItem[];
} = {
  title: "Scale and experience to match your ambition",
  title_color: "#ffffff",
  image: "/images/svg-images/us-dot-map-faint.svg",
  StatsCard: [
    {
      number: "100K+",
      description: "Small cells on air or under contract",
      background_color: "#898cf3",
      number_color: "#162047",
      description_color: "#162047",
    },
    {
      number: "300+",
      description: "DAS-connected venues and buildings",
      background_color: "#bcf6f2",
      number_color: "#162047",
      description_color: "#162047",
    },
    {
      number: "700+",
      description: "Supported municipal networks",
      background_color: "#ffffff",
      number_color: "#162047",
      description_color: "#162047",
    },
    {
      number: "15+",
      description: "Years of expertise",
      background_color: "#ffffca",
      number_color: "#162047",
      description_color: "#162047",
    },
    {
      number: "24/7",
      description: "Monitoring via the NOC",
      background_color: "#ffdac8",
      number_color: "#162047",
      description_color: "#162047",
    },
  ],
};

/**
 * Widget 5: Community Impact Fallback (shared.image-gradient-split - Position 4)
 */
export const COMMUNITY_IMPACT_FALLBACK: {
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  CTA_text: string;
  CTA_url: string;
  background_image_desktop: string;
  background_image_mobile: string;
  SectionPointers: SectionPointerItem[];
} = {
  title: "Keeping communities safe and connected",
  title_color: "#ffffff",
  description:
    "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes.",
  description_color: undefined,
  CTA_text: "Learn More",
  CTA_url: "/community",
  background_image_desktop: "/images/backgrounds/arena.jpg",
  background_image_mobile: "/images/backgrounds/arena-mobile.jpg",
  SectionPointers: [
    {
      title: "Reliability",
      title_color: "#00e8d9",
      description:
        "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps, and data they depend on.",
      description_color: undefined,
    },
    {
      title: "Opportunity",
      title_color: "#00e8d9",
      description:
        "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
      description_color: undefined,
    },
    {
      title: "Safety",
      title_color: "#00e8d9",
      description:
        "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters, and other first responders can access the essential data they need to do their jobs effectively.",
      description_color: undefined,
    },
  ],
};

/**
 * Widget 6: Careers Image CTA Fallback (shared.centered-image-cta - Position 5)
 */
export const CAREERS_FALLBACK = {
  title: "Help us shape the future of connectivity",
  title_color: "#ffffff",
  description:
    "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.",
  description_color: "#ffffff",
  background_image: "/images/backgrounds/careers.jpg",
  CTA_text: "Join Us",
  CTA_url: "/careers",
};

/**
 * Widget 7: Final Contact CTA Fallback (shared.cta-with-graphic - Position 6)
 */
export const CONTACT_FALLBACK = {
  title: "Where can we take your network?",
  title_color: "#162047",
  description:
    "Building a new network? Densifying an existing one? Looking to improve coverage in a high-traffic venue or building? Let's talk about how we can help solve your infrastructure needs.",
  description_color: "#162047",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  image_desktop: "/images/svg-images/connection-cta.svg",
  image_mobile: "/images/svg-images/connection-cta.svg",
  background_color: "#d2c7ff",
};

export const HOME_SEO_FALLBACK = {
  title: "Arium Networks",
  description: "Build with clarity—connect with confidence",
};
