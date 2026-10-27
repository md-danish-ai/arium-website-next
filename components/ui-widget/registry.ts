import React from "react";
import { SectionRendererProps } from "./helper";

// Careers Renderers
import {
  CareersBenefitsRenderer,
  CareersTestimonialsRenderer,
  CareersJobAreasRenderer,
} from "./renderers/careers";

// Community Renderers
import {
  CommunityBenefitsRenderer,
  CommunityHowWeWorkRenderer,
  CommunityTestimonialsRenderer,
  CommunityFAQRenderer,
} from "./renderers/community";

// Home Renderers
import {
  HomeHeroRenderer,
  BackgroundFeatureRenderer,
  DetailedCardGridRenderer,
  StatsWithImageRenderer,
  CommunityImpactRenderer,
} from "./renderers/home";

// About Renderers
import {
  AboutStoryRenderer,
  AboutJourneyRenderer,
  AboutStatsCardsRenderer,
  AboutCommitmentsRenderer,
  AboutCultureRenderer,
} from "./renderers/about";

// Solutions Renderers
import {
  SolutionsSmallCellsRenderer,
  SolutionsDasRenderer,
  SolutionsIndustriesRenderer,
} from "./renderers/solutions";

// Where We Build Renderers
import {
  WhereCommunitiesRenderer,
  WhereVenuesRenderer,
  ImageSplitRenderer,
} from "./renderers/where-we-build";

// Common / Global Renderers
import {
  HeroBannerRenderer,
  InnerPageHeroRenderer,
  GlobeCTARenderer,
  CenteredImageCTARenderer,
  CtaWithGraphicRenderer,
  ProcessRenderer,
  PeopleGlobalRenderer,
  IllustrationSplitRenderer,
  AccordionSplitRenderer,
} from "./renderers/common";

export const WIDGET_REGISTRY: Record<string, React.ComponentType<SectionRendererProps>> = {
  // Hero & Banners
  "shared.test-banner": HeroBannerRenderer,
  "shared.shared-banner": HeroBannerRenderer,
  "shared.hero-banner": HeroBannerRenderer,
  "shared.sharedbanner": HeroBannerRenderer,
  "shared.banner": HeroBannerRenderer,
  "shared.hero": HeroBannerRenderer,
  "shared.inner-page-hero": InnerPageHeroRenderer,
  "shared.innerpagehero": InnerPageHeroRenderer,
  "shared.inner-hero": InnerPageHeroRenderer,
  "shared.main-hero": HomeHeroRenderer,
  "widget.main-hero": HomeHeroRenderer,

  // CTAs
  "shared.globe-cta": GlobeCTARenderer,
  "shared.globo-cta": GlobeCTARenderer,
  "shared.global-cta": GlobeCTARenderer,
  "shared.cta": GlobeCTARenderer,
  "shared.calltoaction": GlobeCTARenderer,
  "shared.call-to-action": GlobeCTARenderer,
  "shared.centered-image-cta": CenteredImageCTARenderer,
  "widget.centered-image-cta": CenteredImageCTARenderer,
  "shared.cta-with-graphic": CtaWithGraphicRenderer,
  "widget.cta-with-graphic": CtaWithGraphicRenderer,

  // Process, Team & Social Proof
  "shared.process": ProcessRenderer,
  "shared.testimonials": CareersTestimonialsRenderer,
  "shared.gloabl-testimonails": CareersTestimonialsRenderer,
  "shared.global-testimonials": CareersTestimonialsRenderer,
  "shared.testimonails": CareersTestimonialsRenderer,
  "shared.testimonial": CareersTestimonialsRenderer,
  "shared.community-testimonials": CommunityTestimonialsRenderer,
  "widget.community-testimonials": CommunityTestimonialsRenderer,
  "shared.people-global-section": PeopleGlobalRenderer,
  "shared.peopleglobalsection": PeopleGlobalRenderer,
  "shared.people": PeopleGlobalRenderer,
  "shared.faq": CommunityFAQRenderer,
  "widget.faq": CommunityFAQRenderer,
  "shared.global-faq": CommunityFAQRenderer,
  "shared.how-we-work": CommunityHowWeWorkRenderer,
  "shared.howwework": CommunityHowWeWorkRenderer,
  "widget.how-we-work": CommunityHowWeWorkRenderer,

  // Splits & Visual Sections
  "shared.background-feature-section": BackgroundFeatureRenderer,
  "shared.backgroundfeaturesection": BackgroundFeatureRenderer,
  "shared.illustration-split": IllustrationSplitRenderer,
  "shared.media-text-split": IllustrationSplitRenderer,
  "shared.small-cells": SolutionsSmallCellsRenderer,
  "widget.small-cells": SolutionsSmallCellsRenderer,
  "shared.das": SolutionsDasRenderer,
  "widget.das": SolutionsDasRenderer,
  "shared.image-split": ImageSplitRenderer,
  "shared.imagesplit": ImageSplitRenderer,
  "shared.image-split-section": ImageSplitRenderer,
  "shared.communities": WhereCommunitiesRenderer,
  "widget.communities": WhereCommunitiesRenderer,
  "shared.image-gradient-split": CommunityImpactRenderer,
  "widget.image-gradient-split": CommunityImpactRenderer,
  "shared.content-with-side-graphic": AboutStoryRenderer,
  "shared.contentwithsidegraphic": AboutStoryRenderer,
  "shared.content-with-side-graphic-section": AboutStoryRenderer,
  "shared.accordion-split": AccordionSplitRenderer,
  "shared.accordionsplit": AccordionSplitRenderer,
  "shared.industry": SolutionsIndustriesRenderer,
  "shared.industries": SolutionsIndustriesRenderer,
  "widget.industry": SolutionsIndustriesRenderer,
  "widget.industries": SolutionsIndustriesRenderer,
  "shared.venues": WhereVenuesRenderer,
  "shared.where-venues": WhereVenuesRenderer,
  "widget.venues": WhereVenuesRenderer,

  // Grids & Stats
  "shared.image-card-grid": CommunityBenefitsRenderer,
  "shared.imagecardgrid": CommunityBenefitsRenderer,
  "shared.image-card": CommunityBenefitsRenderer,
  "shared.cards": CommunityBenefitsRenderer,
  "shared.detailed-card-grid": DetailedCardGridRenderer,
  "widget.detailed-card-grid": DetailedCardGridRenderer,
  "shared.stats-cards": AboutStatsCardsRenderer,
  "shared.statscards": AboutStatsCardsRenderer,
  "shared.stats-card": AboutStatsCardsRenderer,
  "shared.stats-with-image": StatsWithImageRenderer,
  "widget.stats-with-image": StatsWithImageRenderer,

  // Journey, Culture & Benefits
  "shared.journey": AboutJourneyRenderer,
  "shared.timeline": AboutJourneyRenderer,
  "shared.journey-timeline": AboutJourneyRenderer,
  "shared.commitments": AboutCommitmentsRenderer,
  "shared.commitment": AboutCommitmentsRenderer,
  "widget.commitments": AboutCommitmentsRenderer,
  "shared.culture": AboutCultureRenderer,
  "shared.about-culture": AboutCultureRenderer,
  "widget.culture": AboutCultureRenderer,
  "shared.value-proposition": AboutCultureRenderer,
  "shared.pillar-highlights": AboutCultureRenderer,
  "shared.core-values": AboutCultureRenderer,
  "shared.feature-showcase": AboutCultureRenderer,
  "shared.benefits": CareersBenefitsRenderer,
  "widget.benefits": CareersBenefitsRenderer,
  "shared.highlight-list": CareersJobAreasRenderer,
  "widget.highlight-list": CareersJobAreasRenderer,
};
