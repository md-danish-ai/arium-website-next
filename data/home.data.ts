import type { FeatureCardItem, StatItem, StrapiMediaLike } from "@types";

export interface InfrastructureCard {
  id?: string | number;
  title: string;
  description: string;
  CTA_text?: string;
  CTA_url?: string;
  text_color?: string;
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
 * Widget 1: Main Hero Fallback (widget.main-hero - Position 0)
 */
export const HOME_HERO_FALLBACK = {
  title: "Build with clarity. <br/> Connect with confidence.",
  description:
    "We are the country's largest small cell provider, bringing densification and capacity services to the wireless industry. With a focus on clarity and precision, we design, build, and deploy the essential infrastructure that powers today's most advanced wireless networks.",
  font_color: "#ffffff",
  background_color: "#162047",
  scroll_text: " Scroll to explore",
};

/**
 * Widget 2: Network Challenges Fallback (widget.background-feature-section - Position 1)
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
      id: 45,
      title: "Design",
      description:
        "We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
    {
      id: 46,
      title: "Implement",
      description:
        "We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
    {
      id: 47,
      title: "Optimize",
      description:
        "We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
  ],
};

/**
 * Widget 3: Our Infrastructure Fallback (widget.detailed-card-grid - Position 2)
 */
export const INFRASTRUCTURE_FALLBACK: {
  title: string;
  description: string;
  background_color?: string;
  panel_cards: InfrastructureCard[];
} = {
  title: "The infrastructure that powers advanced connectivity ",
  description:
    "For over 15 years, we've been building and maintaining the infrastructure the wireless industry relies on. ",
  background_color: undefined,
  panel_cards: [
    {
      id: 43,
      title: "Small Cells",
      description:
        "Small cells are discreet, low-powered, fiber-connected antennas that enhance connectivity by providing targeted wireless coverage and capacity in public spaces—especially in dense populations or high-traffic areas like cities and suburbs.",
      CTA_text: "Explore more",
      CTA_url: "/solutions",
      text_color: "#ffffff",
      svgType: "small-cells",
      svg_code: undefined,
      image: undefined,
    },
    {
      id: 44,
      title: "Distributed Antenna Systems",
      description:
        "Distributed antenna systems (DAS) use small, strategically placed connection points, also called nodes, to meet the unique coverage and capacity needs of venues and indoor spaces like high-rises, hospitals, campuses, stadiums, resorts, and theme parks.",
      CTA_text: "Learn more",
      CTA_url: "/solutions",
      text_color: "#ffffff",
      svgType: "das",
      svg_code: undefined,
      image: undefined,
    },
  ],
};

/**
 * Widget 4: Scale and Experience Fallback (widget.stats-with-image - Position 3)
 */
export const STATS_FALLBACK: {
  title: string;
  title_color?: string;
  stat_illustration: string;
  stats_card: StatItem[];
} = {
  title: "Scale and experience to match your ambition ",
  title_color: "#ffffff",
  stat_illustration: "/images/svg-images/us-dot-map-faint.svg",
  stats_card: [
    {
      id: 88,
      stat: "100K+",
      stat_color: "#162047",
      description: "Small cells on air or under contract",
      description_color: undefined,
      background_color: "#898cf3",
    },
    {
      id: 89,
      stat: "300+",
      stat_color: undefined,
      description: "DAS-connected venues and buildings",
      description_color: undefined,
      background_color: "#bcf6f2",
    },
    {
      id: 90,
      stat: "700+",
      stat_color: undefined,
      description: "Supported municipal networks",
      description_color: undefined,
      background_color: "#ffffff",
    },
    {
      id: 91,
      stat: "15+",
      stat_color: undefined,
      description: "Years of expertise",
      description_color: undefined,
      background_color: "#ffffca",
    },
    {
      id: 92,
      stat: "24/7",
      stat_color: undefined,
      description: "Monitoring via the NOC",
      description_color: undefined,
      background_color: "#ffdac8",
    },
  ],
};

/**
 * Widget 5: Community Impact Fallback (widget.image-gradient-split - Position 4)
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
  section_pointers: SectionPointerItem[];
} = {
  title: "Keeping communities safe and connected ",
  title_color: "#ffffff",
  description:
    "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes.",
  description_color: undefined,
  CTA_text: "Learn More",
  CTA_url: "/community",
  background_image_desktop: "/images/backgrounds/arena.jpg",
  background_image_mobile: "/images/backgrounds/arena-mobile.jpg",
  section_pointers: [
    {
      id: 55,
      title: "Reliability",
      title_color: "#00e8d9",
      description:
        "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps and data they depend on.",
      description_color: undefined,
    },
    {
      id: 56,
      title: "Opportunity",
      title_color: "#00e8d9",
      description:
        "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
      description_color: undefined,
    },
    {
      id: 57,
      title: "Safety",
      title_color: "#00e8d9",
      description:
        "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters and other first responders can access the essential data they need to do their jobs effectively.",
      description_color: undefined,
    },
  ],
};

/**
 * Widget 6: Careers Image CTA Fallback (widget.centered-image-cta - Position 5)
 */
export const CAREERS_FALLBACK = {
  title: "Help us shape the future of connectivity ",
  title_color: "#ffffff",
  description:
    "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.",
  description_color: "#ffffff",
  background_image: "/images/backgrounds/careers.jpg",
  CTA_text: "Join Us",
  CTA_url: "/careers",
};

/**
 * Widget 7: Final Contact CTA Fallback (widget.cta-with-graphic - Position 6)
 */
export const CONTACT_FALLBACK = {
  title: "Where can we take your network?",
  title_color: "#162047",
  description:
    "Building a new network? Densifying an existing one? Looking to improve coverage in a high-traffic venue or building? Let's talk about how we can help solve your infrastructure needs.",
  description_color: "#162047",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  globe_illustration_desktop: "/images/svg-images/connection-cta.svg",
  globe_illustration_mobile: "/images/svg-images/connection-cta.svg",
  background_color: "#d2c7ff",
};

export const HOME_SEO_FALLBACK = {
  title: "Arium Networks",
  description: "Build with clarity. Connect with confidence.",
};
