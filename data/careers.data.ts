export interface CareersPillar {
  id?: number;
  title: string;
  description: string;
  svg_code?: string | null;
  icon?: string;
  title_color?: string | null;
  title_color_hover?: string | null;
  description_color?: string | null;
  background_color?: string | null;
}

export interface CareersEmployeeTestimonial {
  id: number;
  person_name: string;
  person_designation: string;
  person_message: string;
  card_footer_bg: string | null;
}

export interface CareersJobAreaItem {
  id?: number;
  title: string;
}

export interface CareersBenefitItem {
  id?: number;
  title: string;
  description: string;
  title_color?: string | null;
  icon: string;
}

export const CAREERS_HERO_FALLBACK = {
  title: "Join our team",
  description: "Advance your career and help shape the future of connectivity.",
  tag: null as string | null,
  CTA_text: "Explore opportunities",
  CTA_url: "https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL",
  background_image: "/images/heroes/careers.png",
  background_image_position: "center center",
  max_width_title: null as string | null,
  max_width_description: null as string | null,
  imageAlt: "Arium Networks team working together",
};

export const CAREERS_CULTURE_FALLBACK = {
  title: "Why Join Arium Networks?",
  title_color: null as string | null,
  description:
    "Wireless connectivity is entering a new era, and our infrastructure is at the center of it. Across communities nationwide, we design, build, and support networks that wireless carriers rely on every day.<br/><br/>When you join our team, you're joining an organization that cares deeply about its people and you'll be contributing to the critical infrastructure that keeps people connected, informed, and safe.",
  description_color: null as string | null,
  background_color:
    "linear-gradient(135deg, rgb(245, 240, 255) 0%, rgb(237, 229, 255) 40%, rgb(221, 211, 255) 100%)",
  template_grid_columns: "b. 1.35fr 1fr",
  accordian_cards: [
    {
      id: 1,
      title: "Be Part of a Team",
      description:
        "We're building more than networks: we're building a team that takes pride and ownership in what we create together. As we grow, every teammate helps shape how we work, collaborate, and succeed. Here, culture isn't handed down—it's shaped by the people who live it every day.",
      title_color: "#ffffff",
      description_color: "#ffffff",
      svg_code: null,
      title_color_hover: "#00e8d9",
      background_color: "#162047",
    },
    {
      id: 2,
      title: "Shape the Future",
      description:
        "We're at a pivotal moment in the evolution of wireless infrastructure. New technologies are increasing demands on networks, coverage, and capacity. As part of our team, you'll help design and deliver solutions that meet these challenges while influencing how we work, innovate, and grow as an organization.",
      title_color: "#ffffff",
      description_color: "#ffffff",
      svg_code: null,
      title_color_hover: "#00e8d9",
      background_color: "#162047",
    },
    {
      id: 3,
      title: "Make an Impact",
      description:
        "As a fast-growing, privately held company, we move with purpose and make decisions focused on long-term success. Our teammates are trusted to take ownership, contribute ideas, and turn plans into execution.",
      title_color: "#ffffff",
      description_color: "#ffffff",
      svg_code: null,
      title_color_hover: "#00e8d9",
      background_color: "#162047",
    },
    {
      id: 4,
      title: "Advance Your Career",
      description:
        "Backed by EQT, a leading private equity firm, we combine the momentum of a growing organization with strong financial support. We invest in our people, systems, and infrastructure to support sustainable growth—creating opportunities for you to develop new skills, assume greater responsibility, and grow your career.",
      title_color: "#ffffff",
      description_color: "#ffffff",
      svg_code: null,
      title_color_hover: "#00e8d9",
      background_color: "#162047",
    },
    {
      id: 5,
      title: "Improve Everyday Connections",
      description:
        "Our infrastructure supports how people live, work, and stay connected. We take that responsibility seriously. Your expertise and perspective will contribute to the reliability, safety and reach of the networks communities and businesses depend on every day.",
      title_color: "#ffffff",
      description_color: "#ffffff",
      svg_code: null,
      title_color_hover: "#00e8d9",
      background_color: "#162047",
    },
  ],
};

export const CAREERS_TESTIMONIALS_FALLBACK = {
  title: "Meet the Arium Networks Team",
  cards: [
    {
      id: 1,
      person_name: "Gabe Villalobos",
      person_designation: "Project Manager",
      person_message:
        "At Arium Networks, you're surrounded by individuals who are experts in their respective fields that push you to want to grow and excel. You are heard and your opinions hold value.",
      card_footer_bg: "#bcf6f2",
    },
    {
      id: 2,
      person_name: "Emily Cates",
      person_designation: "Permitting Specialist",
      person_message:
        "Working here, I've been able to learn, grow, and feel truly valued. It has been incredibly rewarding—and thanks to the benefits, it even helped make starting my family possible.",
      card_footer_bg: "#d2c7ff",
    },
    {
      id: 3,
      person_name: "Anthony Price",
      person_designation: "Client Services Manager",
      person_message:
        "Working at Arium Networks is energizing because of the strong sense of ownership and accountability across the team. I get to move fast, solve challenges, and deliver outcomes that truly matter.",
      card_footer_bg: "#ffdac8",
    },
    {
      id: 4,
      person_name: "Jessica Fernandez",
      person_designation: "Senior External Affairs Manager",
      person_message:
        "The best part of my role is being surrounded by accomplished people across the organization, working toward the same shared goal of building better connectivity. That makes the work especially rewarding.",
      card_footer_bg: "#ffffca",
    },
  ],
};

export const CAREERS_JOB_AREAS_FALLBACK = {
  title: "Our Core Job Areas",
  description:
    "Our teams work cross-functionally to design, build, and support wireless infrastructure. These core job types include:",
  CTA_text: "Explore opportunities",
  CTA_url: "https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL",
  image: "/images/team/team.png",
  imageAlt: "Arium Networks team collaborating in a modern office",
  items: [
    { id: 1, title: "Network Engineering & Deployment" },
    { id: 2, title: "Construction & Field Operations" },
    { id: 3, title: "Technology, Systems & Data" },
    { id: 4, title: "Corporate & Shared Services" },
    { id: 5, title: "Commercial, Strategy & Project Management" },
  ],
};

export const CAREERS_BENEFITS_FALLBACK = {
  title: "Our Total Benefits Package",
  description:
    "We offer competitive compensation and benefits designed to support you at work and in life. Full-time team members are eligible for a comprehensive benefits package that includes:",
  bottom_message:
    "We are an equal opportunity employer. We recruit, hire and promote without regard to race, color, religion, creed, national origin or ancestry, ethnicity, sex (including pregnancy or pregnancy related conditions), gender (including gender identity and expression, and status as a transgender individual), sexual orientation, age, physical or mental disability, citizenship, past, current or prospective service in the uniformed services, genetic information, marital status or any other characteristic protected under applicable federal, state or local law.",
  benefits_card: [
    {
      id: 1,
      title: "Healthcare",
      description: "Full medical coverage, including dental and vision plans and telehealth",
      title_color: "#009886",
      icon: "/images/svg-images/healthcare-benefit.svg",
    },
    {
      id: 2,
      title: "Financial Security",
      description:
        "Competitive 401(k), tuition reimbursement, financial counseling and funded healthcare savings accounts",
      title_color: "#009886",
      icon: "/images/svg-images/financial-security.svg",
    },
    {
      id: 3,
      title: "Time Off",
      description:
        "Flexible paid time off for vacations, holidays, leaves of absence, or personal needs",
      title_color: "#009886",
      icon: "/images/svg-images/time-off.svg",
    },
    {
      id: 4,
      title: "Family Support",
      description: "Paid maternity and paternity leave, adoption benefits, and milk shipping",
      title_color: "#009886",
      icon: "/images/svg-images/family-support.svg",
    },
  ],
};

export const CAREERS_EEO_FALLBACK = {
  bottom_message:
    "We are an equal opportunity employer. We recruit, hire and promote without regard to race, color, religion, creed, national origin or ancestry, ethnicity, sex (including pregnancy or pregnancy related conditions), gender (including gender identity and expression, and status as a transgender individual), sexual orientation, age, physical or mental disability, citizenship, past, current or prospective service in the uniformed services, genetic information, marital status or any other characteristic protected under applicable federal, state or local law.",
};

export const CAREERS_SEO_FALLBACK = {
  title: "Careers | Arium Networks",
  description:
    "Explore job opportunities with Arium Networks and help us build the next era of wireless connectivity. Discover more about our company, culture, and benefits.",
};
