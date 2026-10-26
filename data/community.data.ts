import type { LinkItem, FAQItem } from "@types";

export interface CommunityTestimonialItem {
  title: string;
  badge: string;
  description: string;
}

export interface CommunityBenefitCard {
  title: string;
  description: string;
  image: string;
}

export const COMMUNITY_HERO_FALLBACK = {
  heading: "Building the connections your community depends on",
  intro: "We work in communities like yours to ensure you stay on the cutting edge.",
  imageSrc: "/assets/images/hero-community.png",
  imageAlt: "Community members enjoying a park",
};

export const COMMUNITY_SMALL_CELLS_FALLBACK = {
  title: "What is a small cell?",
  paragraphs: [
    "When you are driving on a major highway, you can see large cell towers along the road. These towers manage the wireless traffic for miles around them. As wireless traffic grows, the signal becomes strained — much like a traffic jam on a highway.",
    "Small cells are compact, discreet antennas often mounted on streetlights or utility poles. They boost wireless coverage and capacity in the areas that need it most. Most people don't even notice them.",
    "Think of small cells as adding extra lanes to the wireless highway — reducing congestion and helping everyone stay connected.",
  ],
  illustrationSrc: "/assets/svg-images/small-cells-illustration.svg",
  illustrationAlt: "Small cells illustration",
};

export const COMMUNITY_WHY_MATTER_FALLBACK: {
  title: string;
  cards: CommunityBenefitCard[];
} = {
  title: "Why small cells matter",
  cards: [
    {
      title: "Reliability",
      description:
        "More targeted coverage in hard-to-reach areas minimizes dead spots and ensures consistent connectivity across your community.",
      image: "/assets/images/ov-venue-commercial.png",
    },
    {
      title: "Innovation",
      description:
        "Increased speeds and capacity ensure people get the most from the latest wireless devices and technologies.",
      image: "/assets/images/ov-venue-crowd.png",
    },
    {
      title: "Safety",
      description:
        "Stronger coverage keeps first responders connected to critical information and increases 911 call availability.",
      image: "/assets/images/ov-venue-themepark.png",
    },
  ],
};

export const COMMUNITY_HOW_WE_WORK_FALLBACK: {
  title: string;
  paragraphs: string[];
  bgImageUrl: string;
  cta: LinkItem;
} = {
  title: "How we work in your community",
  paragraphs: [
    "We are expanding our small cell network across every major U.S. market. We use a structured, collaborative process that balances the needs of local communities, municipalities, and wireless carriers.",
    "This means building the vital connectivity that meets current needs while being ready for future technologies and growth.",
  ],
  bgImageUrl: "/assets/images/how-we-work-community.png",
  cta: {
    label: "Learn More",
    url: "/right-of-ways",
  },
};

export const COMMUNITY_TESTIMONIALS_FALLBACK: {
  title: string;
  testimonials: CommunityTestimonialItem[];
} = {
  title: "Communities support advanced connectivity",
  testimonials: [
    {
      title: "Dewitt",
      badge: "President & CEO, Downtown Austin Alliance",
      description:
        "Wireless connectivity is so critically important in today's economy. It's like roadways. It's infrastructure that we have to have.\"",
    },
    {
      title: "Rob",
      badge: "City Sustainability Director",
      description:
        "It's not just the technology and the connectivity, but it's how we work, too.\"",
    },
    {
      title: "Kari",
      badge: "Real Estate Agent",
      description: 'I use my phone as my lifeline to get my job done."',
    },
  ],
};

export const COMMUNITY_FAQS_FALLBACK: {
  title: string;
  faqs: FAQItem[];
} = {
  title: "Frequently Asked Questions",
  faqs: [
    {
      id: 1,
      question: "Why is Arium Networks building in my neighborhood?",
      answer:
        "When a road gets too congested, you can't just keep adding cars — you have to add more lanes. Similarly, when there are too many wireless devices in an area, the existing network gets overloaded. Small cells add more capacity and bandwidth to support the growing demand for wireless connectivity in your neighborhood.",
    },
    {
      id: 2,
      question: "I have full bars on my mobile phone. Why do we need more infrastructure?",
      answer:
        "Full bars indicate signal strength, not network capacity. Even with a strong signal, you may experience slow speeds in crowded areas. Small cells provide additional capacity to ensure fast, reliable connectivity for everyone.",
    },
    {
      id: 3,
      question: "Why is Arium permitted in the public right of way?",
      answer:
        "Arium Networks holds CLEC (Competitive Local Exchange Carrier) status in most states, which provides us with the legal right to install telecommunications equipment on existing infrastructure in the public right of way, such as utility poles and streetlights.",
    },
    {
      id: 4,
      question: "How does Arium Networks get approval to work in my community?",
      answer:
        "We follow a structured process that includes working with local government, submitting permit applications, and ensuring compliance with all local, state, and federal regulations. We coordinate closely with municipal officials throughout the entire process.",
    },
    {
      id: 5,
      question: "What are the RF emission levels of your equipment?",
      answer:
        "Our equipment operates well within the safety limits established by the FCC. Small cells emit significantly lower RF energy than traditional cell towers because they cover smaller areas and use less power.",
    },
    {
      id: 6,
      question: "Should I be worried about RF emissions?",
      answer:
        "Small cells comply with all FCC regulations for radio frequency emissions. The FCC's safety standards incorporate significant safety margins and are based on decades of research. Small cells operate at a fraction of the power levels used by traditional cell towers.",
    },
  ],
};

export const COMMUNITY_SEO_FALLBACK = {
  title: "Your Community | Arium Networks",
  description:
    "Arium Networks builds wireless small cell infrastructure in communities across the country, keeping you connected to what matters.",
};
