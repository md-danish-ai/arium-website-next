import type { ImageItem, LinkItem, TimelineItem } from "@types";

export interface AboutTimelineCard extends TimelineItem {
  badgeText?: string;
  titleColor?: string;
}

export interface AboutStatPillar {
  title: string;
  description: string;
  badge?: string;
  bgGradient?: string;
}

export interface CommitmentPillar {
  title: string;
  description: string;
  barColor?: string;
  headingColor?: string;
  bgColorHover?: string;
}

export interface CulturePillarItem {
  heading: string;
  description: string;
  headingColor?: string;
  descriptionColor?: string;
}

export const ABOUT_HERO_FALLBACK = {
  heading: "Building a more connected future",
  intro:
    "We're working across the country to build the infrastructure that powers your most important connections.",
  imageSrc: "/assets/images/hero-about.png",
  imageAlt: "Chicago skyline",
};

export const ABOUT_STORY_FALLBACK = {
  heading: "A story rooted in connection",
  paragraphs: [
    "Our world depends on fast, reliable connectivity—from the way we interact with loved ones, educate our children, and drive business forward. More than 15 years ago, we began building the small cell and distributed antennae system (DAS) infrastructure that ensures wireless services works effectively, even in the most challenging locations. Across the country, we're building dense networks and increasing capacity, enhancing connectivity in high-demand areas.",
    "We make the process of designing and deploying wireless networks as straightforward and predictable as possible, providing a clear path forward that supports your vision long into the future.",
  ],
  sideImageSrc: "/assets/images/live_connection-illustration.svg",
  gradient: "bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]",
};

export const ABOUT_JOURNEY_FALLBACK: {
  heading: string;
  description?: string;
  items: AboutTimelineCard[];
} = {
  heading: "A small cell leader from the beginning",
  items: [
    {
      title: "2010-2011",
      description:
        "Acquisition of NewPath and NextG establishes early leadership in DAS and small cell infrastructure.",
    },
    {
      title: "2011-2020",
      description:
        "Platform expansion and operational integration across thousands of deployed nodes.",
    },
    {
      title: "2020-2022",
      description: "Long-term carrier commitments add 50,000 small cells over five years.",
    },
    {
      title: "2026",
      description: "Formation of Arium Networks with 100K+ small cells on-air or under contract.",
      badgeText: "LIVE",
    },
  ],
};

export const ABOUT_STATS_FALLBACK: {
  heading: string;
  description?: string;
  stats: AboutStatPillar[];
} = {
  heading: "Why our infrastructure matters",
  stats: [
    {
      title: "39B",
      description: "Expected number of IoT devices by 2030",
      badge: "IoT Analytics, 2025",
    },
    {
      title: "21GB",
      description: "Average monthly mobile data consumption per capita",
      badge: "Ericsson, 2025",
    },
    {
      title: "89%",
      description: "Expected share of 5G mobile connections in North America by 2030",
      badge: "GSMA, 2025",
    },
  ],
};

export const ABOUT_COMMITMENTS_FALLBACK: {
  heading: string;
  description?: string;
  heroBannerImg: ImageItem;
  pillars: CommitmentPillar[];
} = {
  heading: "Our Commitments to Our Customers",
  heroBannerImg: {
    src: "/assets/images/live_about_commitments_panoramic.png",
    alt: "New York City skyline at sunset",
  },
  pillars: [
    {
      title: "We are customer-first",
      description:
        "We put customers at the center of every decision, delivering value through innovation, investment, and purpose-build network solutions.",
      barColor: "#00b4a0",
    },
    {
      title: "We are nimble and ready to invest",
      description:
        "We operate with speed and flexibility, putting capital to work where it can drive the most impact.",
      barColor: "#d4882e",
    },
    {
      title: "We are built for the long haul",
      description:
        "We're committed to long-term ownership and lasting partnerships, investing in the infrastructure that will power the future of connectivity.",
      barColor: "#7c5cbf",
    },
  ],
};

export const ABOUT_CULTURE_FALLBACK: {
  heading: string;
  description?: string;
  pillars: CulturePillarItem[];
  mediaUrls: string[];
  cta: LinkItem;
} = {
  heading: "Help Us Shape the Future of Connectivity",
  pillars: [
    {
      heading: "Leadership",
      description:
        "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges.",
    },
    {
      heading: "Passion",
      description:
        "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives.",
    },
    {
      heading: "Optimism",
      description:
        "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation.",
    },
  ],
  mediaUrls: ["/assets/images/culture-bg-mobile.jpg", "/assets/images/culture-bg.jpg"],
  cta: {
    label: "Explore Careers",
    url: "/careers",
  },
};

export const ABOUT_SEO_FALLBACK = {
  title: "About Us | A story rooted in connection",
  description:
    "Arium Networks builds the small cell and DAS networks that power your most important connections.",
};
