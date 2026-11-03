export interface RightOfWaysHeroData {
  title: string;
  description: string;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export interface RightOfWaysTestimonialCard {
  id: number | string;
  person_name: string;
  person_message: string;
  person_designation: string;
  card_footer_bg?: string | null;
}

export interface RightOfWaysTestimonialsData {
  title: string;
  cards: RightOfWaysTestimonialCard[];
}

export interface RightOfWaysTimelineItem {
  label: string;
  desc: string;
  backgroundColor?: string;
}

export interface RightOfWaysProcessPillarItem {
  id: string;
  title: string;
  themeColor: string;
  background_color?: string;
  steps: string[];
  timelineItems: RightOfWaysTimelineItem[];
  icon?: string;
  icon_svg?: string | null;
}

export interface RightOfWaysProcessData {
  title: string;
  description: string;
  background_color?: string | null;
  pillars: RightOfWaysProcessPillarItem[];
  maxWidthTitle?: string;
}

export interface RightOfWaysCtaData {
  prompt_to_cta: string;
  CTA_text: string;
  CTA_url: string;
  background_gradient?: string | null;
  globe_illustration?: string | null;
}

export interface RightOfWaysSeoData {
  title: string;
  description: string;
}

// Right of Way fallback data
export const ROW_HERO_FALLBACK: RightOfWaysHeroData = {
  title: "Connectivity that moves communities forward",
  description: "As technology advances, small cells keep your community connected to what matters.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 245, 238) 0%, rgb(255, 232, 214) 40%, rgb(255, 218, 200) 100%)",
  content_max_width: null,
};

export const ROW_TESTIMONIALS_FALLBACK: RightOfWaysTestimonialsData = {
  title: "What community leaders are saying",
  cards: [
    {
      id: 1,
      person_name: "Kurt Woehr",
      person_designation: "Director of RAN Engineering, AT&T",
      person_message:
        'Arium Networks has been a great partner. They understand how important it is to be collaborative and get the right inputs, so that we have a great design."',
      card_footer_bg: "#bcf6f2",
    },
    {
      id: 2,
      person_name: "Joe Slowik",
      person_designation: "Director of Operations, Verizon",
      person_message:
        'Arium Networks has the skills and the techniques to work hand-in-hand with the city and implement a project of this scale."',
      card_footer_bg: "#d2c7ff",
    },
  ],
};

export const ROW_PROCESS_FALLBACK: RightOfWaysProcessData = {
  title: "Our structured process for building small cells",
  description:
    "Every community is different, but we have a proven process for navigating complexities and designing infrastructure to meet your wireless connectivity needs.",
  pillars: [
    {
      id: "assessment",
      title: "Assessment",
      themeColor: "#FBCBB5",
      background_color: "#FBCBB5",
      steps: ["Evaluate Needs", "Identify Sites", "Assess Regulations", "Minimizing Disruption"],
      timelineItems: [
        {
          label: "Evaluate Needs",
          desc: "Wireless providers identify areas of need for residents, business owners, and first responders.",
        },
        {
          label: "Identify Sites",
          desc: "We evaluate existing sites we can use and work with wireless providers to strategically select the best locations to install new small cells.",
        },
        {
          label: "Assess Regulations",
          desc: "We conduct a thorough assessment of local codes, regulations, and expected impact on the community.",
        },
        {
          label: "Minimizing Disruption",
          desc: "We have CLEC status in most states, which means we can often install on existing assets in the public right of way, like utility poles and streetlights.",
        },
      ],
    },
    {
      id: "planning",
      title: "Planning",
      themeColor: "#FBCBB5",
      background_color: "#FBCBB5",
      steps: [
        "Work Together",
        "Follow Regulations",
        "Submit Applications",
        "Stakeholder Engagement",
      ],
      timelineItems: [
        {
          label: "Work Together",
          desc: "We collaborate with your public works and utilities departments to finalize small cell site locations and designs.",
        },
        {
          label: "Follow Regulations",
          desc: "We have experience navigating state, local, and federal processes and regulations and will take care to ensure they are properly followed.",
        },
        {
          label: "Submit Applications",
          desc: "We work with you to submit information, permits, and applications to align with municipal guidelines and state and federally mandated timeframes.",
        },
        {
          label: "Stakeholder Engagement",
          desc: "We coordinate with government officials and stakeholders to provide information about deployments, staying aligned with local processes and requirements.",
        },
      ],
    },
    {
      id: "construction",
      title: "Construction",
      themeColor: "#FBCBB5",
      background_color: "#FBCBB5",
      steps: ["Secure Permits", "Work with Vendors", "Follow Codes", "Complete Installation"],
      timelineItems: [
        {
          label: "Secure Permits",
          desc: "We apply for additional permits, including traffic control permits, and we support the local utility in applying for any necessary authorizations.",
        },
        {
          label: "Work with Vendors",
          desc: "When possible, we prioritize working with local vendors in the community for materials and installation.",
        },
        {
          label: "Follow Codes",
          desc: "We ensure all work follows local, state, and federal codes, including building, public works, electrical, and FCC guidelines.",
        },
        {
          label: "Complete Installation",
          desc: "We work with the right officials to oversee construction, secure certificates of completion and occupancy, and plan future installations.",
        },
      ],
    },
  ],
};

export const ROW_CTA_FALLBACK: RightOfWaysCtaData = {
  prompt_to_cta:
    "To see how we can support your infrastructure needs, reach out to our dedicated municipal team.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient: null,
  globe_illustration: "/images/svg-images/connection-globe.svg",
};

export const ROW_SEO_FALLBACK: RightOfWaysSeoData = {
  title: "Right of Way | Arium Networks",
  description:
    "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
};
