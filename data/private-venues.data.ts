export interface PrivateVenuesHeroData {
  title: string;
  description: string;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export interface PrivateVenuesTestimonialCard {
  id: number | string;
  person_name: string;
  person_message: string;
  person_designation: string;
  card_footer_bg?: string | null;
}

export interface PrivateVenuesTestimonialsData {
  title: string;
  cards: PrivateVenuesTestimonialCard[];
}

export interface PrivateVenuesTimelineItem {
  label: string;
  desc: string;
  backgroundColor?: string;
}

export interface PrivateVenuesProcessPillarItem {
  id: string;
  title: string;
  themeColor: string;
  background_color?: string;
  steps: string[];
  timelineItems: PrivateVenuesTimelineItem[];
  icon?: string;
  icon_svg?: string | null;
}

export interface PrivateVenuesProcessData {
  title: string;
  description: string;
  background_color?: string | null;
  pillars: PrivateVenuesProcessPillarItem[];
  maxWidthTitle?: string;
}

export interface PrivateVenuesCtaData {
  prompt_to_cta: string;
  CTA_text: string;
  CTA_url: string;
  background_gradient?: string | null;
  globe_illustration?: string | null;
}

export interface PrivateVenuesSeoData {
  title: string;
  description: string;
}

// Private Venues fallback data
export const PV_HERO_FALLBACK: PrivateVenuesHeroData = {
  title: "Bringing advanced connectivity to your property",
  description:
    "Our in-building solutions help private venues keep up with advances and technology, while supporting the connectivity demands of tenants and guests.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(245, 240, 255) 0%, rgb(237, 229, 255) 40%, rgb(221, 211, 255) 100%)",
  content_max_width: "960px",
};

export const PV_TESTIMONIALS_FALLBACK: PrivateVenuesTestimonialsData = {
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

export const PV_PROCESS_FALLBACK: PrivateVenuesProcessData = {
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

export const PV_CTA_FALLBACK: PrivateVenuesCtaData = {
  prompt_to_cta:
    "To see how we can support your connectivity needs, reach out to our dedicated venues team.",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  background_gradient:
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)",
  globe_illustration: "/images/svg-images/connection-globe.svg",
};

export const PV_SEO_FALLBACK: PrivateVenuesSeoData = {
  title: "Private Venues | Arium Networks",
  description:
    "Our small cell and DAS in-building solutions enable the wireless coverage and capacity private venues need to support the demands of tenants and guests.",
};
