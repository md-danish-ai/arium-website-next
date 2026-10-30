export interface SubpageHeroData {
  title: string;
  description: string;
  tag?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export interface SubpageTestimonialCard {
  id: number | string;
  person_name: string;
  person_message: string;
  person_designation: string;
  card_footer_bg?: string | null;
}

export interface SubpageTestimonialsData {
  title: string;
  cards: SubpageTestimonialCard[];
}

export interface ProcessTimelineItem {
  label: string;
  desc: string;
  backgroundColor?: string;
}

export interface ProcessPillarItem {
  id: string;
  title: string;
  themeColor: string;
  background_color?: string;
  steps: string[];
  timelineItems: ProcessTimelineItem[];
  icon?: string;
}

export interface ProcessSectionData {
  title: string;
  description: string;
  background_color?: string | null;
  pillars: ProcessPillarItem[];
  maxWidthTitle?: string;
}

export interface SubpageCtaData {
  prompt_to_cta: string;
  CTA_text: string;
  CTA_url: string;
  background_gradient?: string | null;
  globe_illustration?: string | null;
}

export interface SubpageSeoData {
  title: string;
  description: string;
}

// ==========================================
// Right of Ways Defaults
// ==========================================

export const ROW_HERO_FALLBACK: SubpageHeroData = {
  tag: "Right of Way",
  title: "Connectivity that moves communities forward",
  description: "As technology advances, small cells keep your community connected to what matters.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 245, 238) 0%, rgb(255, 232, 214) 40%, rgb(255, 218, 200) 100%)",
  content_max_width: null,
};

export const ROW_TESTIMONIALS_FALLBACK: SubpageTestimonialsData = {
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

export const ROW_PROCESS_FALLBACK: ProcessSectionData = {
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

export const ROW_CTA_FALLBACK: SubpageCtaData = {
  prompt_to_cta:
    "To see how we can support your infrastructure needs, reach out to our dedicated municipal team.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient: null,
  globe_illustration: "/images/svg-images/connection-globe-blue.svg",
};

export const ROW_SEO_FALLBACK: SubpageSeoData = {
  title: "Right of Way | Arium Networks",
  description:
    "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
};

// ==========================================
// Private Venues Defaults
// ==========================================

export const PV_HERO_FALLBACK: SubpageHeroData = {
  tag: "Private Venues",
  title: "Bringing advanced connectivity to your property",
  description:
    "Our in-building solutions help private venues keep up with advances and technology, while supporting the connectivity demands of tenants and guests.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(245, 240, 255) 0%, rgb(237, 229, 255) 40%, rgb(221, 211, 255) 100%)",
  content_max_width: "960px",
};

export const PV_TESTIMONIALS_FALLBACK: SubpageTestimonialsData = {
  title: "What venue operators are saying",
  cards: [
    {
      id: 183,
      person_name: "David L.",
      person_designation: "Director of Operations, Major Sports Arena",
      person_message:
        "Fans today want to share their experiences in real-time. Without reliable in-building connectivity, it doesn't matter how great the event is; they feel disconnected. Adding a dedicated small cell network transformed our venue.",
      card_footer_bg: "#bcf6f2",
    },
    {
      id: 184,
      person_name: "Maria C.",
      person_designation: "Commercial Real Estate Developer",
      person_message:
        "Our property is a mixed-use development, and tenants expect seamless cellular coverage from the parking garage to the top floor. Custom wireless solutions proved to be the key differentiator for leasing.",
      card_footer_bg: "#D2C7FF",
    },
  ],
};

export const PV_PROCESS_FALLBACK: ProcessSectionData = {
  title: "Our proven service delivery process",
  description:
    "Whether you operate a large stadium, commercial building, theme park, campus, or other private venue, we can work with you to design a distributed antenna system (DAS) or small cell network (SCN) that meets your unique connectivity needs.",
  pillars: [
    {
      id: "design",
      title: "Design",
      themeColor: "#D2C7FF",
      background_color: "#D2C7FF",
      steps: ["Select Partners", "Plan Integration", "Finalize RF Design"],
      timelineItems: [
        {
          label: "Select Partners",
          desc: "We have local relationships with wireless service providers, vendors, and municipal officials, allowing us to select the architecture, engineering, and construction partners that are best suited to the unique needs of your venue.",
          backgroundColor: "#D2C7FF",
        },
        {
          label: "Plan Integration",
          desc: "We coordinate with your design teams to carefully integrate the DAS or SCN into the architecture of your space, following all venue safety, training, and construction requirements.",
          backgroundColor: "#D2C7FF",
        },
        {
          label: "Finalize RF Design",
          desc: "Our radio frequency (RF) engineering team develops the network design in partnership with the original equipment manufacturers (OEMs) and wireless service providers.",
          backgroundColor: "#D2C7FF",
        },
      ],
    },
    {
      id: "construction",
      title: "Construction",
      themeColor: "#D2C7FF",
      background_color: "#D2C7FF",
      steps: ["Work With Contractors", "Manage Project"],
      timelineItems: [
        {
          label: "Work With Contractors",
          desc: "We select qualified contractors with DAS experience related to your specific type of venue and coordinate closely with your own general contractor and sub-contractors.",
          backgroundColor: "#D2C7FF",
        },
        {
          label: "Manage Project",
          desc: "We oversee the construction progress, perform ongoing design reviews, and address challenges to ensure a seamless project experience.",
          backgroundColor: "#D2C7FF",
        },
      ],
    },
    {
      id: "optimization",
      title: "Optimization",
      themeColor: "#D2C7FF",
      background_color: "#D2C7FF",
      steps: ["Testing", "Fine Tuning"],
      timelineItems: [
        {
          label: "Testing",
          desc: "We partner with experienced testing firms, with oversight from our RF engineering team, to test the completed DAS or SCN.",
          backgroundColor: "#D2C7FF",
        },
        {
          label: "Fine Tuning",
          desc: "We adjust and optimize the network as needed and plan for any future updates.",
          backgroundColor: "#D2C7FF",
        },
      ],
    },
  ],
};

export const PV_CTA_FALLBACK: SubpageCtaData = {
  prompt_to_cta:
    "To see how we can support your connectivity needs, reach out to our dedicated venues team.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)",
  globe_illustration: "/images/svg-images/connection-globe-blue.svg",
};

export const PV_SEO_FALLBACK: SubpageSeoData = {
  title: "Private Venues | Arium Networks",
  description:
    "Our small cell and DAS in-building solutions enable the wireless coverage and capacity private venues need to support the demands of tenants and guests.",
};
