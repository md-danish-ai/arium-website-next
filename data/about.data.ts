export interface TimeLineCard {
  id?: number | string;
  title: string;
  title_color?: string;
  badge_text?: string;
  description: string;
}

export interface StatCardItem {
  id?: number | string;
  title: string;
  description: string;
  badge?: string;
  background_color?: string;
}

export interface CommitmentCardItem {
  id?: number | string;
  title: string;
  description: string;
  bar_color?: string;
}

export interface PillarCardItem {
  id?: number | string;
  title: string;
  description: string;
  title_color?: string;
  description_color?: string;
}

/**
 * Widget 0: Hero Banner Fallback (shared.test-banner - Position 0)
 */
export const ABOUT_HERO_FALLBACK = {
  title: "Building a more connected future",
  description:
    "We're working across the country to build the infrastructure that powers your most important connections.",
  media: "/images/heroes/about.png",
  CTA_text: null,
  CTA_url: null,
  max_width_title: "970px",
  max_width_description: null,
  object_position: "center top",
  tag: null,
};

/**
 * Widget 1: Story with Side Graphic Fallback (shared.content-with-side-graphic - Position 1)
 */
export const ABOUT_STORY_FALLBACK = {
  title: "A story rooted in connection",
  title_color: "#162047",
  description:
    "Our world depends on fast, reliable connectivity—from the way we interact with loved ones, educate our children, and drive business forward. More than 15 years ago, we began building the small cell and distributed antennae system (DAS) infrastructure that ensures wireless services works effectively, even in the most challenging locations. Across the country, we're building dense networks and increasing capacity, enhancing connectivity in high-demand areas.\n\nWe make the process of designing and deploying wireless networks as straightforward and predictable as possible, providing a clear path forward that supports your vision long into the future.",
  description_color: undefined,
  background_color:
    "linear-gradient(135deg, rgb(245, 240, 255) 0%, rgb(237, 229, 255) 40%, rgb(221, 211, 255) 100%)",
  image: "/images/svg-images/connection-illustration.svg",
};

/**
 * Widget 2A: Journey Timeline Fallback (shared.timeline - Position 2, SubSection 0)
 */
export const ABOUT_JOURNEY_FALLBACK: {
  title: string;
  description?: string;
  TimeLineCards: TimeLineCard[];
} = {
  title: "A small cell leader from the beginning",
  description:
    "We've been building small cell and DAS networks since the technology's inception, giving us a deep expertise that is embedded throughout our organization.",
  TimeLineCards: [
    {
      id: 1,
      title: "2010-2011",
      title_color: "#009E94",
      badge_text: undefined,
      description:
        "Acquisition of NewPath and NextG establishes early leadership in DAS and small cell infrastructure.",
    },
    {
      id: 2,
      title: "2011-2020",
      title_color: "#7B6AB8",
      badge_text: undefined,
      description:
        "Platform expansion and operational integration across thousands of deployed nodes.",
    },
    {
      id: 3,
      title: "2020-2022",
      title_color: "#C48E68",
      badge_text: undefined,
      description: "Long-term carrier commitments add 50,000 small cells over five years.",
    },
    {
      id: 4,
      title: "2026",
      title_color: "#009E94",
      badge_text: "Live",
      description: "Formation of Arium Networks with 100K+ small cells on-air or under contract.",
    },
  ],
};

/**
 * Widget 2B: Infrastructure Stats Cards Fallback (shared.stats-cards - Position 2, SubSection 1)
 */
export const ABOUT_STATS_FALLBACK: {
  title: string;
  description?: string;
  Cards: StatCardItem[];
} = {
  title: "Why our infrastructure matters",
  description: undefined,
  Cards: [
    {
      id: 1,
      title: "39 B",
      description: "Expected number of IoT devices by 2030",
      badge: "IoT Analytics, 2025",
      background_color: "linear-gradient(145deg, #e6faf8 0%, #d0f5f1 40%, #c2f0eb 100%) !important",
    },
    {
      id: 2,
      title: "21 GB",
      description: "Average monthly mobile data consumption per capita",
      badge: "Ericsson, 2025",
      background_color: "linear-gradient(145deg, #eeeafc 0%, #e2dbf8 40%, #d8d0f4 100%) !important",
    },
    {
      id: 3,
      title: "89 %",
      description: "Expected share of 5G mobile connections in North America by 2030",
      badge: "GSMA, 2025",
      background_color: "linear-gradient(145deg, #fef3e8 0%, #fce9d5 40%, #f9e0c8 100%) !important",
    },
  ],
};

/**
 * Widget 2C: Commitments Fallback (shared.commitments - Position 2, SubSection 2)
 */
export const ABOUT_COMMITMENTS_FALLBACK: {
  title: string;
  description?: string;
  background_overlay: string;
  pillars_description: string;
  background_image: string;
  CommitmentCards: CommitmentCardItem[];
} = {
  title: "Our Commitments to Our Customers",
  description:
    "As part of EQT's Active Core Infrastructure fund, we have the support and financial capacity to invest with conviction. As opposed to many other private equity backed companies, we do not have any timeframe for liquidity, so we can invest and operate for the long term.",
  background_overlay: "linear-gradient(90deg, #101830eb 0%, #10183099 30%, #1018301a 60%)",
  pillars_description:
    "We are guided by a clear set of commitments that shape how we partner and deliver value:\n\n",
  background_image: "/images/backgrounds/commitments.png",
  CommitmentCards: [
    {
      id: 1,
      title: "We are customer-first",
      description:
        "We put customers at the center of every decision, delivering value through innovation, investment, and purpose-build network solutions.",
      bar_color: "#00b4a0",
    },
    {
      id: 2,
      title: "We are nimble and ready to invest",
      description:
        "We operate with speed and flexibility, putting capital to work where it can drive the most impact.",
      bar_color: "#d4882e",
    },
    {
      id: 3,
      title: "We are built for the long haul",
      description:
        "We're committed to long-term ownership and lasting partnerships, investing in the infrastructure that will power the future of connectivity.",
      bar_color: "#7c5cbf",
    },
  ],
};

/**
 * Widget 3: About Pillars / Culture Fallback (shared.pillar-highlights - Position 3)
 */
export const ABOUT_CULTURE_FALLBACK: {
  title: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  CTA_text: string;
  CTA_url: string;
  background_color: string;
  background_image_desktop: string;
  background_image_mobile: string;
  PillarCards: PillarCardItem[];
} = {
  title: "Help Us Shape the Future of Connectivity",
  title_color: "#ffffff",
  description:
    "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.",
  description_color: undefined,
  CTA_text: "Explore Careers",
  CTA_url: "/careers",
  background_color:
    "linear-gradient(to right, #0a1628eb 0%, #0a1628d9 60%, #0a162899 85%, #0000 100%)",
  background_image_desktop: "/images/backgrounds/culture.jpg",
  background_image_mobile: "/images/backgrounds/culture-mobile.jpg",
  PillarCards: [
    {
      id: 1,
      title: "Leadership",
      description:
        "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
    {
      id: 2,
      title: "Passion",
      description:
        "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
    {
      id: 3,
      title: "Optimism",
      description:
        "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation.",
      title_color: "#00e8d9",
      description_color: undefined,
    },
  ],
};

export const ABOUT_SEO_FALLBACK = {
  title: "About Us | A story rooted in connection",
  description:
    "Arium Networks builds the small cell and DAS networks that power your most important connections.",
};
