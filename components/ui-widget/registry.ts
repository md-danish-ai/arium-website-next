import React from "react";
import { SectionRendererProps } from "./helper";

import {
  HomeHeroRenderer,
  BackgroundFeatureRenderer,
  DetailedCardGridRenderer,
  StatsWithImageRenderer,
  CommunityImpactRenderer,
} from "./renderers/home";

import {
  AboutStoryRenderer,
  AboutJourneyRenderer,
  AboutStatsCardsRenderer,
  AboutCommitmentsRenderer,
} from "./renderers/about";

import { CareersJobAreasRenderer } from "./renderers/careers";

import { CommunityHowWeWorkRenderer, CommunityFAQRenderer } from "./renderers/community";

import {
  SolutionsSmallCellsRenderer,
  SolutionsDasRenderer,
  SolutionsIndustriesRenderer,
} from "./renderers/solutions";

import {
  WhereCommunitiesRenderer,
  WhereVenuesRenderer,
  ImageSplitRenderer,
} from "./renderers/where-we-build";

import {
  HeroBannerRenderer,
  SubPageHeroRenderer,
  SubPageCTARenderer,
  CenteredImageCTARenderer,
  CtaWithGraphicRenderer,
  ProcessRenderer,
  PeopleGlobalRenderer,
  IllustrationSplitRenderer,
  AccordionSplitRenderer,
  GlobalTestimonialsRenderer,
  BenefitsGridRenderer,
} from "./renderers/common";

export const WIDGET_REGISTRY: Record<string, React.ComponentType<SectionRendererProps>> = {
  // Home
  "shared.main-hero": HomeHeroRenderer,
  "shared.background-feature-section": BackgroundFeatureRenderer,
  "shared.detailed-card-grid": DetailedCardGridRenderer,
  "shared.stats-with-image": StatsWithImageRenderer,
  "shared.image-gradient-split": CommunityImpactRenderer,
  "shared.centered-image-cta": CenteredImageCTARenderer,
  "shared.cta-with-graphic": CtaWithGraphicRenderer,

  // About
  "shared.content-with-side-graphic": AboutStoryRenderer,
  "shared.timeline": AboutJourneyRenderer,
  "shared.stats-cards": AboutStatsCardsRenderer,
  "shared.commitments": AboutCommitmentsRenderer,

  // Careers
  "shared.benefits": BenefitsGridRenderer,
  "shared.highlight-list": CareersJobAreasRenderer,
  "shared.gloabl-testimonails": GlobalTestimonialsRenderer,
  "shared.global-testimonials": GlobalTestimonialsRenderer,

  // Community
  "shared.image-card-grid": BenefitsGridRenderer,
  "shared.how-we-work": CommunityHowWeWorkRenderer,
  "shared.community-testimonials": GlobalTestimonialsRenderer,
  "shared.faq": CommunityFAQRenderer,

  // Solutions
  "shared.small-cells": SolutionsSmallCellsRenderer,
  "shared.das": SolutionsDasRenderer,
  "shared.industry": SolutionsIndustriesRenderer,

  // Where We Build
  "shared.image-split": ImageSplitRenderer,
  "shared.communities": WhereCommunitiesRenderer,
  "shared.venues": WhereVenuesRenderer,

  // Shared
  "shared.hero": HeroBannerRenderer,
  "shared.hero-banner": HeroBannerRenderer,
  "shared.sub-page-hero": SubPageHeroRenderer,
  "shared.inner-page-hero": SubPageHeroRenderer,
  "shared.global-cta": SubPageCTARenderer,
  "shared.sub-page-cta": SubPageCTARenderer,
  "shared.process": ProcessRenderer,
  "shared.people-global-section": PeopleGlobalRenderer,
  "shared.illustration-split": IllustrationSplitRenderer,
  "shared.accordion-split": AccordionSplitRenderer,
};
