export interface SolutionStatItem {
  value: string;
  label: string;
}

export interface IndustryItem {
  title: string;
  description: string;
  theme?: string;
  bgImage?: string;
  iconKey?: string;
}

export const SOLUTIONS_HERO_FALLBACK = {
  heading: "Infrastructure for tomorrow's wireless data demands",
  intro:
    "As new technologies emerge, we're building and scaling wireless networks that will support evolving demand—today and what comes next.",
  imageSrc: "/images/heroes/solutions.png",
  imageAlt: "People gathered in an outdoor plaza",
  ctaText: "Contact Us",
  ctaLink: "/contact",
};

export const SOLUTIONS_SMALL_CELLS_FALLBACK = {
  title: "Small Cells",
  paragraphs: [
    "For more than 15 years, we've partnered with mobile network operators (MNOs) to design and deploy small cells that add targeted coverage and capacity. Our discrete antennas help communities and wireless carriers keep pace with growing demand.",
    "Our small cell networks strengthen everyday connectivity and critical communication—supporting faster speeds and more reliable service.",
  ],
  stats: [
    { value: "100K+", label: "small cells on air or under contract" },
    { value: "700+", label: "municipalities served" },
  ],
  illustrationSrc: "/images/svg-images/small-cells-illustration.svg",
  illustrationAlt: "Small cells network illustration",
};

export const SOLUTIONS_DAS_FALLBACK = {
  title: "Distributed Antenna Systems",
  paragraphs: [
    "Our distributed antenna systems (DAS) deliver the coverage and capacity needed in complex indoor and venue environments—arenas, stadiums, theme parks, hospitals, airports, campuses, and more—so visitors, staff, and operations stay connected.",
    "We take the lead in building and managing the network, leveraging our longstanding relationships with wireless carriers, vendors, and government agencies.",
  ],
  stats: [{ value: "300+", label: "premier venues across the country" }],
  illustrationSrc: "/images/svg-images/das-illustration.svg",
  illustrationAlt: "Distributed antenna system illustration",
};

export const SOLUTIONS_INDUSTRIES_FALLBACK: {
  title: string;
  description: string;
  industries: IndustryItem[];
} = {
  title: "Industries That Require Advanced Connectivity",
  description:
    "We partner with industries like yours, designing the right mix of small cells and DAS to meet performance, aesthetic, and operational requirements, all while leveraging our long-standing relationships with MNOs, utilities, public safety agencies, and more.",
  industries: [
    {
      title: "Stadiums & Arenas",
      description:
        "We enable reliable wireless service for a better guest experience including enhanced fan engagement, public safety, mobile ticketing, concessions, and event operations.",
      theme: "teal",
      bgImage: "/images/industries/stadiums.png",
      iconKey: "stadiums & arenas",
    },
    {
      title: "Amusement Parks, Hospitality & Entertainment",
      description:
        "Our solutions provide high-quality wireless coverage for your guests, improving experience satisfaction, operational efficiency, and smart property technologies.",
      theme: "purple",
      bgImage: "/images/industries/amusement.png",
      iconKey: "amusement parks, hospitality & entertainment",
    },
    {
      title: "Higher Education",
      description:
        "Our solutions enable digital learning and enhance campus safety by keeping faculty and students connected.",
      theme: "amber",
      bgImage: "/images/industries/education.png",
      iconKey: "higher education",
    },
    {
      title: "Commercial Real Estate",
      description:
        "We can help you improve connectivity on your property while accommodating the technologies that make your building more functional, efficient, and tenant friendly.",
      theme: "amber",
      bgImage: "/images/industries/real-estate.png",
      iconKey: "commercial real estate",
    },
    {
      title: "Healthcare",
      description:
        "Our solutions improve connectivity for staff, patients, and medical professionals.",
      theme: "blue",
      bgImage: "/images/industries/healthcare.png",
      iconKey: "healthcare",
    },
    {
      title: "State & Local Government",
      description:
        "Municipalities can improve connectivity for their constituents and help agencies better serve their residents and first responders.",
      theme: "teal",
      bgImage: "/images/industries/government.png",
      iconKey: "state & local government",
    },
    {
      title: "Airports",
      description:
        "We enable connectivity that supports the high data demand for travelers, busy staff and back-of-house operations, and mobile ticketing, providing a better guest experience and enhanced safety.",
      theme: "purple",
      bgImage: "/images/industries/airports.png",
      iconKey: "airports",
    },
  ],
};

export const SOLUTIONS_APPROACH_FALLBACK = {
  heading: "A Balanced Approach",
  description:
    "We work closely with you to find the solution that meets your connectivity needs, while considering your priorities like the surrounding physical aesthetics.",
  buttonText: "Learn more",
  buttonLink: "/where-we-build",
};

export const SOLUTIONS_SEO_FALLBACK = {
  title: "Our Solutions | Arium Networks",
  description:
    "Learn how our small cell and DAS networks are increasing capacity and enhancing connectivity in high-demand areas.",
};
