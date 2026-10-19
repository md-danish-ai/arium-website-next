import React from "react";
import { SectionRendererProps } from "./helper";

import HeroBannerRenderer from "./HeroBannerRenderer";
import InnerPageHeroRenderer from "./InnerPageHeroRenderer";
import MainHeroRenderer from "./MainHeroRenderer";
import GlobeCTARenderer from "./GlobeCTARenderer";
import CenteredImageCTARenderer from "./CenteredImageCTARenderer";
import CtaWithGraphicRenderer from "./CtaWithGraphicRenderer";
import ProcessRenderer from "./ProcessRenderer";
import TestimonialsRenderer from "./TestimonialsRenderer";
import PeopleGlobalRenderer from "./PeopleGlobalRenderer";
import FAQRenderer from "./FAQRenderer";
import BackgroundFeatureRenderer from "./BackgroundFeatureRenderer";
import IllustrationSplitRenderer from "./IllustrationSplitRenderer";
import ImageSplitRenderer from "./ImageSplitRenderer";
import ImageGradientSplitRenderer from "./ImageGradientSplitRenderer";
import ContentWithSideGraphicRenderer from "./ContentWithSideGraphicRenderer";
import AccordionSplitRenderer from "./AccordionSplitRenderer";
import ImageCardGridRenderer from "./ImageCardGridRenderer";
import DetailedCardGridRenderer from "./DetailedCardGridRenderer";
import StatsCardsRenderer from "./StatsCardsRenderer";
import StatsWithImageRenderer from "./StatsWithImageRenderer";
import JourneyRenderer from "./JourneyRenderer";
import CommitmentsRenderer from "./CommitmentsRenderer";
import CultureRenderer from "./CultureRenderer";
import BenefitsRenderer from "./BenefitsRenderer";
import HighlightListRenderer from "./HighlightListRenderer";

export * from "./helper";
export {
  HeroBannerRenderer,
  InnerPageHeroRenderer,
  MainHeroRenderer,
  GlobeCTARenderer,
  CenteredImageCTARenderer,
  CtaWithGraphicRenderer,
  ProcessRenderer,
  TestimonialsRenderer,
  PeopleGlobalRenderer,
  FAQRenderer,
  BackgroundFeatureRenderer,
  IllustrationSplitRenderer,
  ImageSplitRenderer,
  ImageGradientSplitRenderer,
  ContentWithSideGraphicRenderer,
  AccordionSplitRenderer,
  ImageCardGridRenderer,
  DetailedCardGridRenderer,
  StatsCardsRenderer,
  StatsWithImageRenderer,
  JourneyRenderer,
  CommitmentsRenderer,
  CultureRenderer,
  BenefitsRenderer,
  HighlightListRenderer,
};

export const WIDGET_REGISTRY: Record<
  string,
  React.ComponentType<SectionRendererProps>
> = {
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
  "shared.main-hero": MainHeroRenderer,
  "widget.main-hero": MainHeroRenderer,

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
  "shared.testimonials": TestimonialsRenderer,
  "shared.gloabl-testimonails": TestimonialsRenderer,
  "shared.global-testimonials": TestimonialsRenderer,
  "shared.testimonails": TestimonialsRenderer,
  "shared.testimonial": TestimonialsRenderer,
  "shared.people-global-section": PeopleGlobalRenderer,
  "shared.peopleglobalsection": PeopleGlobalRenderer,
  "shared.people": PeopleGlobalRenderer,
  "shared.faq": FAQRenderer,
  "widget.faq": FAQRenderer,
  "shared.global-faq": FAQRenderer,

  // Splits & Visual Sections
  "shared.background-feature-section": BackgroundFeatureRenderer,
  "shared.backgroundfeaturesection": BackgroundFeatureRenderer,
  "shared.illustration-split": IllustrationSplitRenderer,
  "shared.media-text-split": IllustrationSplitRenderer,
  "shared.image-split": ImageSplitRenderer,
  "shared.imagesplit": ImageSplitRenderer,
  "shared.image-split-section": ImageSplitRenderer,
  "shared.image-gradient-split": ImageGradientSplitRenderer,
  "widget.image-gradient-split": ImageGradientSplitRenderer,
  "shared.content-with-side-graphic": ContentWithSideGraphicRenderer,
  "shared.contentwithsidegraphic": ContentWithSideGraphicRenderer,
  "shared.content-with-side-graphic-section": ContentWithSideGraphicRenderer,
  "shared.accordion-split": AccordionSplitRenderer,
  "shared.accordionsplit": AccordionSplitRenderer,

  // Grids & Stats
  "shared.image-card-grid": ImageCardGridRenderer,
  "shared.imagecardgrid": ImageCardGridRenderer,
  "shared.image-card": ImageCardGridRenderer,
  "shared.cards": ImageCardGridRenderer,
  "shared.detailed-card-grid": DetailedCardGridRenderer,
  "widget.detailed-card-grid": DetailedCardGridRenderer,
  "shared.stats-cards": StatsCardsRenderer,
  "shared.statscards": StatsCardsRenderer,
  "shared.stats-card": StatsCardsRenderer,
  "shared.stats-with-image": StatsWithImageRenderer,
  "widget.stats-with-image": StatsWithImageRenderer,

  // Journey & Culture
  "shared.journey": JourneyRenderer,
  "shared.timeline": JourneyRenderer,
  "shared.journey-timeline": JourneyRenderer,
  "shared.commitments": CommitmentsRenderer,
  "shared.commitment": CommitmentsRenderer,
  "widget.commitments": CommitmentsRenderer,
  "shared.culture": CultureRenderer,
  "shared.about-culture": CultureRenderer,
  "widget.culture": CultureRenderer,
  "shared.value-proposition": CultureRenderer,
  "shared.pillar-highlights": CultureRenderer,
  "shared.core-values": CultureRenderer,
  "shared.feature-showcase": CultureRenderer,
  "shared.benefits": BenefitsRenderer,
  "widget.benefits": BenefitsRenderer,
  "shared.highlight-list": HighlightListRenderer,
  "widget.highlight-list": HighlightListRenderer,
};
