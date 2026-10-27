import type { LinkItem } from "@types";

export interface CareersPillar {
  title: string;
  description: string;
  icon?: string;
}

export interface CareersEmployeeTestimonial {
  title: string;
  badge: string;
  description: string;
}

export interface CareersJobAreaItem {
  title: string;
}

export interface CareersBenefitItem {
  title: string;
  description: string;
  titleColor?: string;
  iconSrc: string;
}

export const CAREERS_HERO_FALLBACK = {
  heading: "Join our team",
  intro: "Advance your career and help shape the future of connectivity.",
  imageSrc: "/images/heroes/careers.png",
  imageAlt: "Arium Networks team working together",
  ctaText: "Explore opportunities",
  ctaLink: "https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL",
  isExternalLink: true,
  ctaColor: "secondary" as const,
  ctaVariant: "outlined" as const,
};

export const CAREERS_CULTURE_FALLBACK: {
  title: string;
  paragraphs: string[];
  pillars: CareersPillar[];
} = {
  title: "Why Join Arium Networks?",
  paragraphs: [
    "Wireless connectivity is entering a new era, and our infrastructure is at the center of it. Across communities nationwide, we design, build, and support networks that wireless carriers rely on every day.",
    "When you join our team, you're joining an organization that cares deeply about its people and you'll be contributing to the critical infrastructure that keeps people connected, informed, and safe.",
  ],
  pillars: [
    {
      title: "Be Part of a Team",
      description:
        "We're building more than networks: we're building a team that takes pride and ownership in what we create together. As we grow, every teammate helps shape how we work, collaborate, and succeed. Here, culture isn't handed down—it's shaped by the people who live it every day.",
    },
    {
      title: "Shape the Future",
      description:
        "We're at a pivotal moment in the evolution of wireless infrastructure. New technologies are increasing demands on networks, coverage, and capacity. As part of our team, you'll help design and deliver solutions that meet these challenges while influencing how we work, innovate, and grow as an organization.",
    },
    {
      title: "Make an Impact",
      description:
        "As a fast-growing, privately held company, we move with purpose and make decisions focused on long-term success. Our teammates are trusted to take ownership, contribute ideas, and turn plans into execution.",
    },
    {
      title: "Advance Your Career",
      description:
        "Backed by EQT, a leading private equity firm, we combine the momentum of a growing organization with strong financial support. We invest in our people, systems, and infrastructure to support sustainable growth—creating opportunities for you to develop new skills, assume greater responsibility, and grow your career.",
    },
    {
      title: "Improve Everyday Connections",
      description:
        "Our infrastructure supports how people live, work, and stay connected. We take that responsibility seriously. Your expertise and perspective will contribute to the reliability, safety and reach of the networks communities and businesses depend on every day.",
    },
  ],
};

export const CAREERS_TESTIMONIALS_FALLBACK: {
  title: string;
  testimonials: CareersEmployeeTestimonial[];
} = {
  title: "Meet the Arium Networks Team",
  testimonials: [
    {
      title: "Gabe Villalobos",
      badge: "Project Manager",
      description:
        "At Arium Networks, you're surrounded by individuals who are experts in their respective fields that push you to want to grow and excel. You are heard and your opinions hold value.\"",
    },
    {
      title: "Emily Cates",
      badge: "Permitting Specialist",
      description:
        "Working here, I've been able to learn, grow, and feel truly valued. It has been incredibly rewarding—and thanks to the benefits, it even helped make starting my family possible.\"",
    },
    {
      title: "Anthony Price",
      badge: "Client Services Manager",
      description:
        'Working at Arium Networks is energizing because of the strong sense of ownership and accountability across the team. I get to move fast, solve challenges, and deliver outcomes that truly matter."',
    },
    {
      title: "Jessica Fernandez",
      badge: "Senior External Affairs Manager",
      description:
        'The best part of my role is being surrounded by accomplished people across the organization, working toward the same shared goal of building better connectivity. That makes the work especially rewarding."',
    },
  ],
};

export const CAREERS_JOB_AREAS_FALLBACK: {
  title: string;
  description: string;
  jobAreas: CareersJobAreaItem[];
  cta: LinkItem;
  imageSrc: string;
  imageAlt: string;
} = {
  title: "Our Core Job Areas",
  description:
    "Our teams work cross-functionally to design, build, and support wireless infrastructure. These core job types include:",
  jobAreas: [
    { title: "Network Engineering & Deployment" },
    { title: "Construction & Field Operations" },
    { title: "Technology, Systems & Data" },
    { title: "Corporate & Shared Services" },
    { title: "Commercial, Strategy & Project Management" },
  ],
  cta: {
    label: "Explore opportunities",
    url: "https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL",
    isExternal: true,
  },
  imageSrc: "/images/team/team.png",
  imageAlt: "Arium Networks team collaborating in a modern office",
};

export const CAREERS_BENEFITS_FALLBACK: {
  title: string;
  description: string;
  benefits: CareersBenefitItem[];
} = {
  title: "Our Total Benefits Package",
  description:
    "We offer competitive compensation and benefits designed to support you at work and in life. Full-time team members are eligible for a comprehensive benefits package that includes:",
  benefits: [
    {
      title: "Healthcare",
      description: "Full medical coverage, including dental and vision plans and telehealth",
      titleColor: "#009886",
      iconSrc: "/images/svg-images/healthcare-benefit.svg",
    },
    {
      title: "Financial Security",
      description:
        "Competitive 401(k), tuition reimbursement, financial counseling and funded healthcare savings accounts",
      titleColor: "#7c5cbf",
      iconSrc: "/images/svg-images/financial-security.svg",
    },
    {
      title: "Time Off",
      description:
        "Flexible paid time off for vacations, holidays, leaves of absence, or personal needs",
      titleColor: "#e8935a",
      iconSrc: "/images/svg-images/time-off.svg",
    },
    {
      title: "Family Support",
      description: "Paid maternity and paternity leave, adoption benefits, and milk shipping",
      titleColor: "#009886",
      iconSrc: "/images/svg-images/family-support.svg",
    },
  ],
};

export const CAREERS_EEO_FALLBACK = {
  statementText:
    "We are an equal opportunity employer. We recruit, hire and promote without regard to race, color, religion, creed, national origin or ancestry, ethnicity, sex (including pregnancy or pregnancy related conditions), gender (including gender identity and expression, and status as a transgender individual), sexual orientation, age, physical or mental disability, citizenship, past, current or prospective service in the uniformed services, genetic information, marital status or any other characteristic protected under applicable federal, state or local law.",
};

export const CAREERS_SEO_FALLBACK = {
  title: "Careers | Arium Networks",
  description:
    "Explore job opportunities with Arium Networks and help us build the next era of wireless connectivity. Discover more about our company, culture, and benefits.",
};
