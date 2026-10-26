import type { StatItem, FeatureCardItem } from "@types";

export interface InfrastructureCard {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  svgType?: "small-cells" | "das";
  svgCode?: string;
  imageUrl?: string;
}

export interface SectionPointerItem {
  id?: string | number;
  heading: string;
  description: string;
}

export const HOME_HERO_FALLBACK = {
  heading: "Build with clarity—connect with confidence",
  description:
    "We are the country's largest small cell provider, bringing densification and capacity services to the wireless industry. With a focus on clarity and precision, we design, build, and deploy the essential infrastructure that powers today's most advanced wireless networks.",
  scrollText: "Scroll to explore",
};

export const NETWORK_CHALLENGES_FALLBACK: {
  heading: string;
  description: string;
  desktopBg: string;
  mobileBg: string;
  cards: FeatureCardItem[];
} = {
  heading: "Solve network challenges with a trusted partner",
  description:
    "Whether you're densifying an existing network, improving coverage in high-traffic areas, or preparing for next-generation connectivity, we deliver custom infrastructure solutions engineered for reliability and scale.",
  desktopBg: "/images/backgrounds/challenges.png",
  mobileBg: "/images/backgrounds/challenges.png",
  cards: [
    {
      heading: "Design",
      description:
        "We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.",
    },
    {
      heading: "Implement",
      description:
        "We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.",
    },
    {
      heading: "Optimize",
      description:
        "We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected.",
    },
  ],
};

export const INFRASTRUCTURE_FALLBACK: {
  heading: string;
  description: string;
  cards: InfrastructureCard[];
} = {
  heading: "The infrastructure that powers advanced connectivity",
  description:
    "For over 15 years, we've been building and maintaining the infrastructure the wireless industry relies on.",
  cards: [
    {
      title: "Small Cells",
      description:
        "Small cells are discreet, low-powered, fiber-connected antennas that enhance connectivity by providing targeted wireless coverage and capacity in public spaces—especially in dense populations or high-traffic areas like cities and suburbs.",
      ctaText: "Explore more",
      ctaLink: "/our-solutions",
      svgType: "small-cells",
    },
    {
      title: "Distributed Antenna Systems",
      description:
        "Distributed Antenna Systems (DAS) use small, strategically placed connection points, also called nodes, to meet the unique coverage and capacity needs of venues and indoor spaces like high-rises, hospitals, campuses, stadiums, resorts, and theme parks.",
      ctaText: "Explore more",
      ctaLink: "/our-solutions",
      svgType: "das",
    },
  ],
};

export const STATS_FALLBACK: {
  heading: string;
  mapImage: string;
  stats: StatItem[];
} = {
  heading: "Scale and experience to match your ambition",
  mapImage: "/images/svg-images/us-dot-map-faint.svg",
  stats: [
    { number: "100K+", description: "Small cells on air or under contract", bgColor: "#898cf3" },
    { number: "300+", description: "DAS-connected venues and buildings", bgColor: "#bcf6f2" },
    { number: "700+", description: "Supported municipal networks", bgColor: "#ffffff" },
    { number: "15+", description: "Years of expertise", bgColor: "#ffffca" },
    { number: "24/7", description: "Monitoring via the NOC", bgColor: "#ffdac8" },
  ],
};

export const COMMUNITY_IMPACT_FALLBACK: {
  heading: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  ctaText: string;
  ctaUrl: string;
  pointers: SectionPointerItem[];
} = {
  heading: "Keeping communities safe and connected",
  description:
    "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes.",
  desktopImg: "/images/backgrounds/arena.jpg",
  mobileImg: "/images/backgrounds/arena-mobile.jpg",
  ctaText: "Learn about our community impact",
  ctaUrl: "/your-community",
  pointers: [
    {
      heading: "Reliability",
      description:
        "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps, and data they depend on.",
    },
    {
      heading: "Opportunity",
      description:
        "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
    },
    {
      heading: "Safety",
      description:
        "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters, and other first responders can access the essential data they need to do their jobs effectively.",
    },
  ],
};

export const CAREERS_FALLBACK = {
  heading: "Help us shape the future of connectivity",
  text: "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.",
  ctaLabel: "Join Us",
  ctaUrl: "/careers",
  bgImage: "/images/backgrounds/careers.jpg",
};

export const CONTACT_FALLBACK = {
  heading: "Where can we take your network?",
  description:
    "Building a new network? Densifying an existing one? Looking to improve coverage in a high-traffic venue or building? Let's talk about how we can help solve your infrastructure needs.",
  ctaText: "Contact Us",
  ctaLink: "/contact",
};

export const HOME_SEO_FALLBACK = {
  title: "Arium Networks",
  description: "Build with clarity—connect with confidence",
};
