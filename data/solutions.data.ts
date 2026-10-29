export interface SolutionStatItem {
  stat: string;
  description: string;
  stat_color?: string;
}

export interface IndustryAccordionCard {
  title: string;
  description: string;
  svg_code?: string;
  title_color?: string | null;
  title_color_hover?: string | null;
  description_color?: string | null;
  background_color?: string | null;
}

export const INDUSTRY_BG_IMAGES = [
  "/images/industries/stadiums.png",
  "/images/industries/amusement.png",
  "/images/industries/education.png",
  "/images/industries/real-estate.png",
  "/images/industries/healthcare.png",
  "/images/industries/government.png",
  "/images/industries/airports.png",
];

// 1. Solutions Hero Fallback
export const SOLUTIONS_HERO_FALLBACK = {
  title: "Infrastructure for tomorrow's wireless data demands",
  description:
    "As new technologies emerge, we're building and scaling wireless networks that will support evolving demand—today and what comes next.",
  background_image: "/images/heroes/solutions.png",
  background_image_position: "center top",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  max_width_title: "1400px",
  max_width_description: "920px",
  tag: null,
};

// 2. Small Cells Fallback
export const SOLUTIONS_SMALL_CELLS_FALLBACK = {
  title: "Small Cells",
  title_color: "#162047",
  description:
    "For more than 15 years, we've partnered with mobile network operators (MNOs) to design and deploy small cells that add targeted coverage and capacity. Our discrete antennas help communities and wireless carriers keep pace with growing demand.\n\nOur small cell networks strengthen everyday connectivity and critical communication—supporting faster speeds and more reliable service.",
  description_color: "#162047",
  illustration_image: "/images/svg-images/small-cells-illustration.svg",
  illustration_image_alignment: "Right" as const,
  show_bottom_divider: true,
  statistics: [
    { stat: "100K+", description: "small cells on air or under contract", stat_color: "#7c5cbf" },
    { stat: "700+", description: "municipalities served", stat_color: "#7c5cbf" },
  ],
};

// 3. DAS Fallback
export const SOLUTIONS_DAS_FALLBACK = {
  title: "Distributed Antenna Systems",
  title_color: "#162047",
  description:
    "Our distributed antenna systems (DAS) deliver the coverage and capacity needed in complex indoor and venue environments—arenas, stadiums, theme parks, hospitals, airports, campuses, and more—so visitors, staff, and operations stay connected.\n\nWe take the lead in building and managing the network, leveraging our longstanding relationships with wireless carriers, vendors, and government agencies.",
  description_color: "#162047",
  illustration_image: "/images/svg-images/das-illustration.svg",
  illustration_image_alignment: "Left" as const,
  show_bottom_divider: true,
  statistics: [
    { stat: "300+", description: "premier venues across the country", stat_color: "#7c5cbf" },
  ],
};

// 4. Industries Accordion Fallback
export const SOLUTIONS_INDUSTRIES_FALLBACK: {
  title: string;
  title_color: string | null;
  description: string;
  description_color: string | null;
  background_color: string | null;
  template_grid_columns: string | null;
  accordian_cards: IndustryAccordionCard[];
} = {
  title: "Industries That Require Advanced Connectivity",
  title_color: null,
  description:
    "We partner with industries like yours, designing the right mix of small cells and DAS to meet performance, aesthetic, and operational requirements, all while leveraging our long-standing relationships with MNOs, utilities, public safety agencies, and more.",
  description_color: null,
  background_color: null,
  template_grid_columns: "a. 1.4fr .9fr",
  accordian_cards: [
    {
      title: "Stadiums & Arenas",
      description:
        "We enable reliable wireless service for a better guest experience including enhanced fan engagement, public safety, mobile ticketing, concessions, and event operations.",
      title_color: null,
      title_color_hover: "#00e8d9",
      description_color: null,
      background_color: null,
    },
    {
      title: "Amusement Parks, Hospitality & Entertainment",
      description:
        "Our solutions provide high-quality wireless coverage for your guests, improving experience satisfaction, operational efficiency, and smart property technologies.",
      title_color: null,
      title_color_hover: "#00e8d9",
      description_color: null,
      background_color: null,
    },
    {
      title: "Higher Education",
      description:
        "Our solutions enable digital learning and enhance campus safety by keeping faculty and students connected.",
      title_color: null,
      title_color_hover: "#00e8d9",
      description_color: null,
      background_color: null,
    },
    {
      title: "Commercial Real Estate",
      description:
        "We can help you improve connectivity on your property while accommodating the technologies that make your building more functional, efficient, and tenant friendly.",
      title_color: null,
      title_color_hover: "#ffffff",
      description_color: null,
      background_color: null,
    },
    {
      title: "Healthcare",
      description:
        "Our solutions improve connectivity for staff, patients, and medical professionals.",
      title_color: null,
      title_color_hover: "#00e8d9",
      description_color: null,
      background_color: null,
    },
    {
      title: "State & Local Government",
      description:
        "Municipalities can improve connectivity for their constituents and help agencies better serve their residents and first responders.",
      title_color: null,
      title_color_hover: "#00e8d9",
      description_color: "#ffffff",
      background_color: null,
    },
    {
      title: "Airports",
      description:
        "We enable connectivity that supports the high data demand for travelers, busy staff and back-of-house operations, and mobile ticketing, providing a better guest experience and enhanced safety.",
      title_color: "#ffffff",
      title_color_hover: "#00e8d9",
      description_color: "#ffffff",
      background_color: null,
    },
  ],
};

// 5. Solutions CTA Fallback
export const SOLUTIONS_CTA_FALLBACK = {
  title: "A Balanced Approach",
  title_color: null,
  description:
    "We work closely with you to find the solution that meets your connectivity needs, while considering your priorities like the surrounding physical aesthetics.",
  description_color: null,
  CTA_text: "Learn more",
  CTA_url: "/where-we-build",
  background_color: "#d2c7ff",
  globe_illustration_desktop: "/images/svg-images/connection-cta.svg",
  globe_illustration_mobile: "/images/svg-images/connection-cta-mobile.svg",
};

// 6. SEO Fallback
export const SOLUTIONS_SEO_FALLBACK = {
  title: "Our Solutions | Arium Networks",
  description:
    "Learn how our small cell and DAS networks are increasing capacity and enhancing connectivity in high-demand areas.",
};
