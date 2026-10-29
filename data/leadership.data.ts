export interface PeopleMemberItem {
  name: string;
  role: string;
  image: string;
  description: string;
  modal_upper_section_background?: string;
}

export const LEADERSHIP_HERO_FALLBACK = {
  title: "Our Leadership",
  description: "Seasoned industry leaders driving strategic growth\nand operational excellence.",
  tag: null,
  CTA_text: null,
  CTA_url: null,
  background_gradient:
    "linear-gradient(135deg, rgb(184, 169, 240) 0%, rgb(210, 199, 255) 40%, rgb(196, 181, 247) 70%, rgb(221, 213, 255) 100%)",
  content_max_width: "960px",
};

export const LEADERSHIP_MEMBERS_FALLBACK: PeopleMemberItem[] = [
  {
    name: 'Laurent "LT" Therivel',
    role: "Chief Executive Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>Laurent Therivel is a seasoned industry executive with a proven track record of driving strategic growth, operational excellence, and shareholder value. As previous President and CEO of UScellular, he led with a strong focus on customer experience and financial results.</p><p>Before joining UScellular, LT served as CEO of AT&T Mexico and CFO of AT&T Business. Over his 12-year career at AT&T, he advanced through key leadership roles spanning commercial operations, corporate strategy, and general management.</p><p>His leadership journey began in the United States Marine Corps, where he served as a Communications Officer in Southeast Asia, earning the Naval Commendation Medal for leadership. LT left the Marines after achieving the rank of Captain. He holds a bachelor's degree in Marketing from Texas A&M University and an MBA from Harvard Business School.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Jerry Karnick",
    role: "Chief Operating Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>Jerry Karnick oversees network deployment, engineering, and field operations across all Arium markets nationwide. With decades of operational telecom experience, Jerry directs the delivery of small cells and distributed antenna systems.</p><p>His leadership ensures projects are deployed safely, on schedule, and to the highest standards of reliability.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Karen Rohrkemper",
    role: "Chief Legal Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Karen Rohrkemper leads legal, regulatory compliance, municipal relations, and corporate governance for Arium Networks. She brings deep expertise in telecommunications right-of-way law and federal communications regulation.</p><p>Karen works closely with state and municipal leaders to facilitate lawful, collaborative infrastructure deployment.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Jeffery Schott",
    role: "Chief People Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Jeffery Schott has spent more than 20 years leading talent and human resources across global organizations. He leads the people strategy and execution for numerous enterprise-wide transformation initiatives.</p><p>Jeffery holds a bachelor's degree in computer science with a focus on human-computer interaction from DePaul University and a master's degree in Human Resources from Cornell University.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Manjula Sriram",
    role: "Chief Information Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Manjula Sriram has over 20 years of experience spanning supply chain, telecommunications and financial services. Throughout her career, she's led various technology organizations through mergers and acquisitions, integrations, and large-scale modernization initiatives.</p><p>She previously served as Chief Information Officer at Iridium Communications where she was responsible for global enterprise technology, cybersecurity, and data strategy.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "John Townsend",
    role: "Chief Financial Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>John Townsend has years of financial experience in the telecommunications industry. Before joining Arium Networks, he was the CFO of Ribbon Communications, Group CFO of Digicel Group, and held multiple CFO positions with Verizon, including Verizon Wireline, Verizon Wireless, Verizon Consumer, and Verizon Business.</p><p>Early in his career, John spent almost 20 years with the Vodafone Group where his roles included CFO for its Swedish, Australian and Pacific, and UK operations.</p>",
    modal_upper_section_background: "#162047",
  },
];

export const LEADERSHIP_CTA_FALLBACK = {
  prompt_to_cta:
    "Interested in joining a team of industry leaders building the future of connectivity? ",
  CTA_text: "Explore Careers",
  CTA_url: "/careers",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)",
  globe_illustration: "https://d2919ce8l80osk.cloudfront.net/connection_globe_blue_b0853202f4.svg",
};

export const LEADERSHIP_SEO_FALLBACK = {
  title: "Leadership | Arium Networks",
  description:
    "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
};
