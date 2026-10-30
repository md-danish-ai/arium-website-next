export interface CommunityBenefitCard {
  id: number;
  title: string;
  description: string;
  image: string;
  title_color?: string | null;
  description_color?: string | null;
}

export interface CommunityFaqItem {
  id: number;
  question: string;
  answer: string;
  question_color?: string | null;
  answer_color?: string | null;
  question_color_hover?: string | null;
}

export const COMMUNITY_HERO_FALLBACK = {
  title: "Building the connections your community depends on",
  description: "We work in communities like yours to ensure you stay on the cutting edge.",
  imageSrc: "/images/heroes/community.png",
  imageAlt: "Community members enjoying a park",
  tag: null,
  CTA_text: null,
  CTA_url: null,
  background_image_position: "center center",
  max_width_title: "1100px",
  max_width_description: "800px",
};

export const COMMUNITY_SMALL_CELLS_FALLBACK = {
  title: "What is a small cell?",
  title_color: null,
  description:
    "<p>When you are driving on a major highway, you can see large cell towers along the road. These towers manage the wireless traffic for miles around them. As wireless traffic grows, the signal becomes strained — much like a traffic jam on a highway.</p><p>Small cells are compact, discreet antennas often mounted on streetlights or utility poles. They boost wireless coverage and capacity in the areas that need it most. Most people don't even notice them.</p><p>Think of small cells as adding extra lanes to the wireless highway — reducing congestion and helping everyone stay connected.</p>",
  description_color: null,
  illustration_image: "/images/svg-images/small-cells-illustration.svg",
  illustration_image_alignment: "Right" as const,
  show_bottom_divider: false,
  statistics: [],
};

export const COMMUNITY_WHY_MATTER_FALLBACK: {
  title: string;
  title_color: string | null;
  icon_card: CommunityBenefitCard[];
} = {
  title: "Why small cells matter",
  title_color: null,
  icon_card: [
    {
      id: 1,
      title: "Reliability",
      description:
        "More targeted coverage in hard-to-reach areas minimizes dead spots and ensures consistent connectivity across your community.",
      image: "/images/icon-card-grid/check-icon.webp",
      title_color: null,
      description_color: null,
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "Increased speeds and capacity ensure people get the most from the latest wireless devices and technologies.",
      image: "/images/icon-card-grid/nodes-icon.webp",
      title_color: null,
      description_color: null,
    },
    {
      id: 3,
      title: "Safety",
      description:
        "Stronger coverage keeps first responders connected to critical information and increases 911 call availability.",
      image: "/images/icon-card-grid/shield-icon.webp",
      title_color: null,
      description_color: null,
    },
  ],
};

export const COMMUNITY_HOW_WE_WORK_FALLBACK = {
  title: "How we work in your community",
  title_color: null,
  description:
    "<p>We are expanding our small cell network across every major U.S. market. We use a structured, collaborative process that balances the needs of local communities, municipalities, and wireless carriers.</p><p>This means building the vital connectivity that meets current needs while being ready for future technologies and growth.</p>",
  description_color: null,
  CTA_text: "Learn More",
  CTA_url: "/right-of-ways",
  background_image_desktop: "/images/backgrounds/how-we-work.png",
  background_image_mobile: null as string | null,
  FeatureCards: null,
};

export const COMMUNITY_TESTIMONIALS_FALLBACK = {
  title: "Communities support advanced connectivity",
  cards: [
    {
      id: 1,
      person_name: "Dewitt",
      person_designation: "President & CEO, Downtown Austin Alliance",
      person_message:
        "Wireless connectivity is so critically important in today's economy. It's like roadways. It's infrastructure that we have to have.\"",
      card_footer_bg: "#bcf6f2",
    },
    {
      id: 2,
      person_name: "Rob",
      person_designation: "City Sustainability Director",
      person_message:
        "It's not just the technology and the connectivity, but it's how we work, too.\"",
      card_footer_bg: "#ffdac8",
    },
    {
      id: 3,
      person_name: "Kari",
      person_designation: "Real Estate Agent",
      person_message: 'I use my phone as my lifeline to get my job done."',
      card_footer_bg: "#d2c7ff",
    },
  ],
};

export const COMMUNITY_FAQS_FALLBACK: {
  title: string;
  title_color: string | null;
  faq_data: CommunityFaqItem[];
} = {
  title: "Frequently Asked Questions",
  title_color: null,
  faq_data: [
    {
      id: 1,
      question: "Why is Arium Networks building in my neighborhood?",
      answer:
        "When a road gets too congested, you can't just keep adding cars — you have to add more lanes. Similarly, when there are too many wireless devices in an area, the existing network gets overloaded. Small cells add more capacity and bandwidth to support the growing demand for wireless connectivity in your neighborhood.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
    {
      id: 2,
      question: "I have full bars on my mobile phone. Why do we need more infrastructure?",
      answer:
        "Full bars indicate signal strength, not network capacity. Even with a strong signal, you may experience slow speeds in crowded areas. Small cells provide additional capacity to ensure fast, reliable connectivity for everyone.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
    {
      id: 3,
      question: "Why is Arium permitted in the public right of way?",
      answer:
        "Arium Networks holds CLEC (Competitive Local Exchange Carrier) status in most states, which provides us with the legal right to install telecommunications equipment on existing infrastructure in the public right of way, such as utility poles and streetlights.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
    {
      id: 4,
      question: "How does Arium Networks get approval to work in my community?",
      answer:
        "We follow a structured process that includes working with local government, submitting permit applications, and ensuring compliance with all local, state, and federal regulations. We coordinate closely with municipal officials throughout the entire process.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
    {
      id: 5,
      question: "What are the RF emission levels of your equipment?",
      answer:
        "Our equipment operates well within the safety limits established by the FCC. Small cells emit significantly lower RF energy than traditional cell towers because they cover smaller areas and use less power.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
    {
      id: 6,
      question: "Should I be worried about RF emissions?",
      answer:
        "Small cells comply with all FCC regulations for radio frequency emissions. The FCC's safety standards incorporate significant safety margins and are based on decades of research. Small cells operate at a fraction of the power levels used by traditional cell towers.",
      question_color: null,
      answer_color: null,
      question_color_hover: null,
    },
  ],
};

export const COMMUNITY_SEO_FALLBACK = {
  title: "Your Community | Arium Networks",
  description:
    "Arium Networks builds wireless small cell infrastructure in communities across the country, keeping you connected to what matters.",
};
