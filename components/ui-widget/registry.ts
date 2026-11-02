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
  "widget.main-hero": HomeHeroRenderer,
  "widget.background-feature-section": BackgroundFeatureRenderer,
  "widget.detailed-card-grid": DetailedCardGridRenderer,
  "widget.stats-with-image": StatsWithImageRenderer,
  "widget.image-gradient-split": CommunityImpactRenderer,
  "widget.centered-image-cta": CenteredImageCTARenderer,
  "widget.cta-with-graphic": CtaWithGraphicRenderer,

  // About
  "widget.content-with-side-graphic": AboutStoryRenderer,
  "widget.timeline": AboutJourneyRenderer,
  "widget.stats-cards": AboutStatsCardsRenderer,
  "widget.commitments": AboutCommitmentsRenderer,

  // Careers
  "widget.benefits": BenefitsGridRenderer,
  "widget.highlight-list": CareersJobAreasRenderer,
  "widget.gloabl-testimonails": GlobalTestimonialsRenderer,

  // Community
  "widget.image-card-grid": BenefitsGridRenderer,
  "widget.how-we-work": CommunityHowWeWorkRenderer,
  "widget.community-testimonials": GlobalTestimonialsRenderer,
  "widget.faq": CommunityFAQRenderer,

  // Solutions
  "widget.small-cells": SolutionsSmallCellsRenderer,
  "widget.das": SolutionsDasRenderer,
  "widget.industry": SolutionsIndustriesRenderer,

  // Where We Build
  "widget.image-split": ImageSplitRenderer,
  "widget.communities": WhereCommunitiesRenderer,
  "widget.venues": WhereVenuesRenderer,

  // Shared
  "widget.hero": HeroBannerRenderer,
  "widget.sub-page-hero": SubPageHeroRenderer,
  "widget.inner-page-hero": SubPageHeroRenderer,
  "widget.global-cta": SubPageCTARenderer,
  "widget.sub-page-cta": SubPageCTARenderer,
  "widget.process": ProcessRenderer,
  "widget.people-global-section": PeopleGlobalRenderer,
  "widget.illustration-split": IllustrationSplitRenderer,
  "widget.accordion-split": AccordionSplitRenderer,
};
