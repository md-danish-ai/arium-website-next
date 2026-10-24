export interface PeopleMemberItem {
  name: string;
  role: string;
  image: string;
  bio: string;
  modalBg?: string;
}

export const LEADERSHIP_HERO_FALLBACK = {
  heroTitle: "Our Leadership",
  heroDescription: "Seasoned industry leaders driving strategic growth and operational excellence.",
};

export const LEADERSHIP_MEMBERS_FALLBACK: PeopleMemberItem[] = [
  {
    name: 'Laurent "LT" Therivel',
    role: "Chief Executive Officer",
    image: "/assets/images/team/placeholder-male.png",
    bio: '<p>Laurent "LT" Therivel serves as Chief Executive Officer of Arium Networks, bringing extensive leadership experience in telecommunications and digital infrastructure. Prior to joining Arium Networks, he held senior executive roles across leading national carriers.</p><p>LT is focused on expanding Arium\'s nationwide wireless infrastructure, advancing operational excellence, and fostering long-term partnerships with mobile network operators and municipalities.</p>',
    modalBg: "#162047",
  },
  {
    name: "Jerry Karnick",
    role: "Chief Operating Officer",
    image: "/assets/images/team/placeholder-male.png",
    bio: "<p>Jerry Karnick oversees network deployment, engineering, and field operations across all Arium markets nationwide. With decades of operational telecom experience, Jerry directs the delivery of small cells and distributed antenna systems.</p><p>His leadership ensures projects are deployed safely, on schedule, and to the highest standards of reliability.</p>",
    modalBg: "#162047",
  },
  {
    name: "Karen Rohrkemper",
    role: "Chief Legal Officer",
    image: "/assets/images/team/placeholder-female.png",
    bio: "<p>Karen Rohrkemper leads legal, regulatory compliance, municipal relations, and corporate governance for Arium Networks. She brings deep expertise in telecommunications right-of-way law and federal communications regulation.</p><p>Karen works closely with state and municipal leaders to facilitate lawful, collaborative infrastructure deployment.</p>",
    modalBg: "#162047",
  },
  {
    name: "Jeffery Schott",
    role: "Chief Financial Officer",
    image: "/assets/images/team/placeholder-male.png",
    bio: "<p>Jeffery Schott manages capital allocation, financial planning, accounting, and investor relations for Arium Networks. He brings extensive financial leadership in infrastructure investment and private equity-backed enterprises.</p><p>Jeffery ensures strong financial footing to support long-term capital investments across our nationwide footprint.</p>",
    modalBg: "#162047",
  },
  {
    name: "Manjula Sriram",
    role: "Chief Information Officer",
    image: "/assets/images/team/placeholder-female.png",
    bio: "<p>Manjula Sriram leads digital transformation, enterprise systems, data architecture, and cybersecurity across Arium Networks. She drives technology initiatives that modernize internal operations and customer-facing network monitoring.</p><p>Manjula is passionate about leveraging modern technology to enhance operational agility and data security.</p>",
    modalBg: "#162047",
  },
  {
    name: "John Townsend",
    role: "Chief Commercial Officer",
    image: "/assets/images/team/placeholder-male.png",
    bio: "<p>John Townsend leads sales, commercial strategy, carrier partnerships, and real estate acquisition for Arium Networks. He brings a proven track record of scaling wireless network agreements with tier-one carriers.</p><p>John works closely with clients to understand network demand and deliver tailored connectivity solutions.</p>",
    modalBg: "#162047",
  },
];

export const LEADERSHIP_CTA_FALLBACK = {
  heading: "Interested in joining a team of industry leaders building the future of connectivity?",
  buttonText: "Explore Careers",
  buttonLink: "/careers",
};

export const LEADERSHIP_SEO_FALLBACK = {
  title: "Leadership | Arium Networks",
  description:
    "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
};
