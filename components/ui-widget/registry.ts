import React from "react";
import { SectionRendererProps } from "./helper";

// 1. Home Renderers
import {
  HomeHeroRenderer,
  BackgroundFeatureRenderer,
  DetailedCardGridRenderer,
  StatsWithImageRenderer,
  CommunityImpactRenderer,
} from "./renderers/home";

// 2. About Renderers
import {
  AboutStoryRenderer,
  AboutJourneyRenderer,
  AboutStatsCardsRenderer,
  AboutCommitmentsRenderer,
} from "./renderers/about";

// 3. Careers Renderers
import {
  CareersBenefitsRenderer,
  CareersTestimonialsRenderer,
  CareersJobAreasRenderer,
} from "./renderers/careers";

// 4. Community Renderers
import {
  CommunityBenefitsRenderer,
  CommunityHowWeWorkRenderer,
  CommunityTestimonialsRenderer,
  CommunityFAQRenderer,
} from "./renderers/community";

// 5. Solutions Renderers
import {
  SolutionsSmallCellsRenderer,
  SolutionsDasRenderer,
  SolutionsIndustriesRenderer,
} from "./renderers/solutions";

// 6. Where We Build Renderers
import {
  WhereCommunitiesRenderer,
  WhereVenuesRenderer,
  ImageSplitRenderer,
} from "./renderers/where-we-build";

// 7. Common / Shared Global Renderers
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
} from "./renderers/common";

export const WIDGET_REGISTRY: Record<string, React.ComponentType<SectionRendererProps>> = {
  // ==========================================
  // 1. Home Page Widgets
  // ==========================================
  "widget.main-hero": HomeHeroRenderer,
  "widget.background-feature-section": BackgroundFeatureRenderer,
  "widget.detailed-card-grid": DetailedCardGridRenderer,
  "widget.stats-with-image": StatsWithImageRenderer,
  "widget.image-gradient-split": CommunityImpactRenderer,
  "widget.centered-image-cta": CenteredImageCTARenderer,
  "widget.cta-with-graphic": CtaWithGraphicRenderer,

  // ==========================================
  // 2. About Page Widgets
  // ==========================================
  "widget.content-with-side-graphic": AboutStoryRenderer,
  "widget.timeline": AboutJourneyRenderer,
  "widget.stats-cards": AboutStatsCardsRenderer,
  "widget.commitments": AboutCommitmentsRenderer,

  // ==========================================
  // 3. Careers Page Widgets
  // ==========================================
  "widget.benefits": CareersBenefitsRenderer,
  "widget.highlight-list": CareersJobAreasRenderer,
  "widget.gloabl-testimonails": CareersTestimonialsRenderer,

  // ==========================================
  // 4. Community Page Widgets
  // ==========================================
  "widget.image-card-grid": CommunityBenefitsRenderer,
  "widget.how-we-work": CommunityHowWeWorkRenderer,
  "widget.community-testimonials": CommunityTestimonialsRenderer,
  "widget.faq": CommunityFAQRenderer,

  // ==========================================
  // 5. Solutions Page Widgets
  // ==========================================
  "widget.small-cells": SolutionsSmallCellsRenderer,
  "widget.das": SolutionsDasRenderer,
  "widget.industry": SolutionsIndustriesRenderer,

  // ==========================================
  // 6. Where We Build Page Widgets
  // ==========================================
  "widget.image-split": ImageSplitRenderer,
  "widget.communities": WhereCommunitiesRenderer,
  "widget.venues": WhereVenuesRenderer,

  // ==========================================
  // 7. Common / Shared Global Widgets
  // ==========================================
  "widget.hero-banner": HeroBannerRenderer,
  "widget.test-banner": HeroBannerRenderer,
  "widget.sub-page-hero": SubPageHeroRenderer,
  "widget.inner-page-hero": SubPageHeroRenderer,
  "widget.global-cta": SubPageCTARenderer,
  "widget.sub-page-cta": SubPageCTARenderer,
  "widget.process": ProcessRenderer,
  "widget.people-global-section": PeopleGlobalRenderer,
  "widget.illustration-split": IllustrationSplitRenderer,
  "widget.accordion-split": AccordionSplitRenderer,
};
