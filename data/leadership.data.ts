export interface PeopleMemberItem {
  name: string;
  role: string;
  image: string;
  modal_image?: string;
  background_image_mobile?: string;
  description: string;
  modal_upper_section_background?: string;
}

export const LEADERSHIP_HERO_FALLBACK = {
  title: "Our Leadership",
  description:
    "Seasoned industry leaders driving strategic growth </br> and operational excellence.",
  tag: null,
  CTA_text: null,
  CTA_url: null,
  background_gradient:
    "linear-gradient(135deg, rgb(184, 169, 240) 0%, rgb(210, 199, 255) 40%, rgb(196, 181, 247) 70%, rgb(221, 213, 255) 100%)",
  content_max_width: "960px",
};

export const LEADERSHIP_SECTION_BACKGROUND =
  "linear-gradient(180deg, #EDE9FF 0%, #F3F0FF 50%, #F8F7FF 100%)";

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
    name: "Ed Alfonso",
    role: "Chief Commercial Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>Ed Alfonso brings more than two decades of experience in the telecommunications industry, with experience leading teams in both sales and operations. Before joining Arium Networks, he most recently served as the Market Head of Mobile Networks for Nokia Americas where he held, among other roles, overall financial and operational responsibility for Nokia’s Mobile Networks business across the Americas.</p><p>Prior to his time at Nokia, Ed spent the earlier part of his career at Ericsson, where he held various leadership and management positions spanning 13 years. He also spent several years with defense contractor, Lockheed Martin, in a multitude of roles, including research and development, systems engineering, and systems test. He earned his Bachelor of Science in Electrical Engineering and Master of Science in Engineering Management from the University of Central Florida.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Jerry Karnick",
    role: "Chief Legal Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>Jerry Karnick has nearly three decades in the telecom industry. Before joining Arium Networks, Jerry spent more than 26 years at Verizon where he held multiple senior legal and business positions, including General Counsel of Verizon Wireless and Senior Vice President for Sourcing and Corporate Assets. Most recently, Jerry served as Executive Vice President and Chief Legal Officer for Victra, Verizon's largest authorized retailer. Prior to joining Verizon, Jerry was a commercial litigator at Kirkland & Ellis.</p><p>Jerry is also a lecturer in law at the University of Pennsylvania Carey School of Law. He holds a BBA in accounting from the University of Miami, a JD from Harvard Law School, and an MBA from the University of Chicago Booth School of Business.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Karen Rohrkemper",
    role: "Chief Operating Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Karen Rohrkemper is a telecommunications executive with more than 25 years of experience leading wireless, fiber, broadband, and infrastructure businesses. As Chief Operating Officer of Arium Networks, she oversees operations, delivery, and execution across the nation's largest small cell deployment portfolios. Prior to Arium Networks, Karen served as Senior Vice President of Implementation and Operations at Crown Castle, where she led the delivery of small cell and fiber solutions for wireless carriers and enterprise customers nationwide.</p><p>Earlier in her career at Cincinnati Bell, she held leadership roles spanning wireless operations, product management, network deployment, and broadband services, including responsibility for the company's fiber-to-the- home expansion and strategic growth initiatives. Karen serves on the board of Warriors4Wireless and holds a Bachelor of Arts degree from Northern Kentucky University.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Jeffery Schott",
    role: "Chief Human Resources Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Jeffery Schott has more than 25 years of experience in both Human Resources and Operations roles. With his passion for people-focused work, he’s led teams across Corporate Communications, HR Business Partners, Employee Relations, HR Shared Services, and Inclusion Strategies.</p><p>Before joining Arium Networks, Jeffery held a distinguished career at UScellular, where he most recently served as Senior Director of Human Resources. In this role, he led the people strategy and execution for numerous enterprise-wide transformation initiatives. Jeffery holds a bachelor’s degree in computer science with a focus on human-computer interaction from DePaul University and a master's degree in Human Resources from Cornell University.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "Manjula Sriram",
    role: "Chief Information Officer",
    image: "/images/team/placeholder-female.png",
    description:
      "<p>Manjula Sriram has over 20 years of experience that spanning supply chain, telecommunications and financial services. Throughout her career, she's led various technology organizations through mergers and acquisitions, integrations, and large-scale modernization initiatives</p><p>She previously served as Chief Information Officer at Iridium Communications where she was responsible for global enterprise technology, cybersecurity, and data strategy. With experience leading multi-year transformations across B/OSS platforms, cloud and data architecture, and AI-enabled capabilities, her focus is on delivering measurable improvements in cost structure, scalability, and customer experience.</p><p>Manjula holds a Bachelor's degree in Computer Science from UW-Milwaukee, an MBA from Keller graduate school of Management, and is currently pursuing a Masters in AI from Arizona State University.</p>",
    modal_upper_section_background: "#162047",
  },
  {
    name: "John Townsend",
    role: "Chief Financial Officer",
    image: "/images/team/placeholder-male.png",
    description:
      "<p>John Townsend has years of financial experience in the telecommunications industry. Before joining Arium Networks, he was the CFO of Ribbon Communications, Group CFO of Digicel Group, and held multiple CFO positions with Verizon, including Verizon Wireline, Verizon Wireless, Verizon Consumer, and Verizon Business. While at Verizon, John also held roles responsible for Business Transformation and Carrier Relations.</p><p>Early in his career, John spent almost 20 years with the Vodafone Group where his roles included CFO for its Swedish, Australian and Pacific, and UK operations. He spent six years as CFO for Verizon Wireless—at the time, a partnership between Vodafone and Verizon—and was also Regional CFO for Vodafone’s 14 European businesses. Before joining Vodafone, John spent a number of years with KPMG in the UK and Hong Kong. John holds a bachelor’s degree in Economics and Business Finance from Manchester University in the UK and is a Chartered Accountant.</p>",
    modal_upper_section_background: "#162047",
  },
];

export const LEADERSHIP_CTA_FALLBACK = {
  prompt_to_cta:
    "Interested in joining a team of industry leaders building the future of connectivity?",
  CTA_text: "Explore Careers",
  CTA_url: "/careers",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)",
  globe_illustration: "/images/svg-images/connection-globe.svg",
};

export const LEADERSHIP_SEO_FALLBACK = {
  title: "Leadership | Arium Networks",
  description:
    "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
};
