export interface WhereImageSplitData {
  title: string;
  title_color?: string | null;
  description: string;
  description_color?: string | null;
  image: string;
  image_alignment: "Left" | "Right";
  background_color?: string | null;
  CTA_text: string;
  CTA_url: string;
}

export const WHERE_HERO_FALLBACK = {
  title: "Connected communities, connected lives",
  description:
    "We build wireless networks in the public right of way and inside private venues, helping keep communities connected, safe, and ready for what's next.",
  background_image: "/images/backgrounds/challenges.png",
  background_image_position: "center top",
  CTA_text: "Contact Us",
  CTA_url: "/contact",
  max_width_title: "1400px",
  max_width_description: "920px",
  tag: null,
};

export const COMMUNITIES_FALLBACK: WhereImageSplitData = {
  title: "Communities",
  title_color: "#162047",
  description:
    "We're installing small cells along roadways, sidewalks, and the public right of way to expand wireless coverage and capacity. As technology advances and connectivity needs grow, our solutions help communities by improving service in busy neighborhoods, increasing data speeds, and supporting the latest tech residents rely on.",
  description_color: "#162047",
  image: "/images/gallery/community-hero.png",
  image_alignment: "Right",
  background_color:
    "linear-gradient(135deg, rgb(255, 245, 239) 0%, rgb(255, 218, 200) 40%, rgb(255, 240, 232) 100%)",
  CTA_text: "Learn more",
  CTA_url: "/right-of-ways",
};

export const VENUES_FALLBACK: WhereImageSplitData = {
  title: "Buildings and Venues",
  title_color: "#162047",
  description:
    "Our distributed antenna systems (DAS) and small cell networks bring advanced connectivity to in-building environments. We partner with large stadiums, commercial buildings, theme parks, campuses, and other private venues, helping customers stay connected in even the most crowded or hard-to-reach areas.",
  description_color: "#162047",
  image: "/images/gallery/venue-hero.png",
  image_alignment: "Left",
  background_color:
    "linear-gradient(135deg, rgb(228, 250, 248) 0%, rgb(188, 246, 242) 40%, rgb(232, 251, 249) 100%)",
  CTA_text: "Learn more",
  CTA_url: "/private-venues",
};

export const WHERE_WE_BUILD_SEO_FALLBACK = {
  title: "Where We Build | Arium Networks",
  description:
    "Discover how our small cell and DAS networks enable the wireless coverage and capacity needed in the public right of way and in buildings and venues.",
};
