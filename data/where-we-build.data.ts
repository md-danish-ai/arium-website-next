import type { ImageItem, LinkItem } from "@types";

export interface WhereFeatureSectionData {
  title: string;
  description: string;
  cta: LinkItem;
  images: ImageItem[];
}

export const WHERE_HERO_FALLBACK = {
  heading: "Building the wireless networks we rely on",
  intro:
    "We build wireless infrastructure in two main places: out in communities and inside buildings and venues. Each environment has unique needs, so we design each network to fit the space and people that use them.",
  imageSrc: "/assets/images/backgrounds/challenges.png",
  imageAlt: "Connected community background",
};

export const COMMUNITIES_FALLBACK: WhereFeatureSectionData = {
  title: "Communities",
  description:
    "We're installing small cells along roadways, sidewalks, and the public right of way to expand wireless coverage and capacity. As technology advances and connectivity needs grow, our solutions help communities by improving service in busy neighborhoods, increasing data speeds, and supporting the latest tech residents rely on.",
  cta: {
    label: "Learn More",
    url: "/community",
  },
  images: [
    { src: "/assets/images/gallery/community-hero.png", alt: "Community neighborhood" },
    { src: "/assets/images/gallery/community-park.png", alt: "Families in a park" },
    { src: "/assets/images/gallery/community-street.png", alt: "People on a street" },
    { src: "/assets/images/gallery/community-family.png", alt: "Connected family" },
  ],
};

export const VENUES_FALLBACK: WhereFeatureSectionData = {
  title: "Buildings and Venues",
  description:
    "Our distributed antenna systems (DAS) and small cell networks bring advanced connectivity to in-building environments. We partner with large stadiums, commercial buildings, theme parks, campuses, and other private venues, helping customers stay connected in even the most crowded or hard-to-reach areas.",
  cta: {
    label: "Learn more",
    url: "/private-venues",
  },
  images: [
    { src: "/assets/images/gallery/venue-hero.png", alt: "Fans at a venue" },
    { src: "/assets/images/gallery/venue-campus.png", alt: "University campus" },
    { src: "/assets/images/gallery/venue-themepark.png", alt: "Theme park visitors" },
    { src: "/assets/images/gallery/venue-commercial.png", alt: "Commercial building" },
  ],
};

export const WHERE_WE_BUILD_SEO_FALLBACK = {
  title: "Where We Build | Arium Networks",
  description:
    "Discover how our small cell and DAS networks enable the wireless coverage and capacity needed in the public right of way and in buildings and venues.",
};
