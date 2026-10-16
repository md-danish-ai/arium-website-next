import React from "react";
import SharedHero from "../sections/shared/SharedHero";
import GlobeCTA from "../sections/shared/GlobeCTA";
import SharedProcess from "../sections/shared/SharedProcess";
import SharedTestimonials from "../sections/shared/SharedTestimonials";
import PeopleGlobalSection from "../sections/shared/PeopleGlobalSection";
import BackgroundFeatureSection from "../sections/shared/BackgroundFeatureSection";
import GlobalFAQ from "../sections/shared/GlobalFAQ";
import SharedInnerPageHero from "../sections/shared/SharedInnerPageHero";
import SharedIllustrationSplit from "../sections/shared/SharedIllustrationSplit";
import SharedImageCardGrid from "../sections/shared/SharedImageCardGrid";
import SharedImageSplit from "../sections/shared/SharedImageSplit";
import SharedAccordionSplit from "../sections/shared/SharedAccordionSplit";
import SharedContentWithSideGraphic from "../sections/shared/SharedContentWithSideGraphic";
import SharedJourney from "../sections/shared/SharedJourney";
import SharedStatsCards from "../sections/shared/SharedStatsCards";
import SharedCommitments from "../sections/shared/SharedCommitments";
import SharedCulture from "../sections/shared/SharedCulture";
import SharedBenefits from "../sections/shared/SharedBenefits";
import SharedHighlightList from "../sections/shared/SharedHighlightList";
import SharedCtaWithGraphic from "../sections/shared/SharedCtaWithGraphic";
import SharedCenteredImageCTA from "../sections/shared/SharedCenteredImageCTA";
import SharedImageGradientSplit from "../sections/shared/SharedImageGradientSplit";
import SharedStatsWithImage from "../sections/shared/SharedStatsWithImage";
import SharedDetailedCardGrid from "../sections/shared/SharedDetailedCardGrid";
import SharedMainHero from "../sections/shared/SharedMainHero";

interface GlobalWidgetProps {
  widget: any;
}

const renderHeroBanner = (section: any, index: number) => {
  const heading = section.heroTitle || section.bannerText || section.heading;
  const intro = section.heroDescription || section.intro;

  const mediaObj = section.heroMedia?.[0] || section.media || section.bannerImage;

  const mediaUrl = mediaObj?.url
    ? (mediaObj.url.startsWith("http")
      ? mediaObj.url
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${mediaObj.url}`)
    : undefined;

  const isVideo = mediaObj?.mime?.startsWith('video/');
  const objectPosition = section.objectPosition || section.ObjectPosition || section.object_position;

  return (
    <SharedHero
      key={index}
      id={`widget-hero-${index}`}
      heading={heading}
      intro={intro}
      imageSrc={!isVideo ? mediaUrl : undefined}
      videoSrc={isVideo ? mediaUrl : undefined}
      imageAlt={mediaObj?.alternativeText || heading || "Hero image"}
      ctaText={section.heroCtasLabel || section.ctaText}
      ctaLink={section.heroCtasUrl || section.ctaLink}
      isExternalLink={false}
      maxWidthTitle={section.MaxWidthTitle}
      maxWidthDescription={section.MaxWidthDescription}
      objectPosition={objectPosition}
    />
  );
};

const renderInnerPageHero = (section: any, index: number) => {
  return (
    <SharedInnerPageHero
      key={index}
      id={`widget-inner-hero-${index}`}
      heroTag={section.heroTag}
      heroTitle={section.heroTitle}
      heroDescription={section.heroDescription}
      heroCtasLabel={section.heroCtasLabel}
      heroCtasUrl={section.heroCtasUrl}
      backgroundGradient={section.BackgroundGradient}
      contentMaxWidth={section.ContentMaxWidth}
    />
  );
};


const renderGlobeCTA = (section: any, index: number) => {
  return (
    <GlobeCTA
      key={index}
      title={section.title || section.heading}
      heading={section.heading}
      description={section.description || section.body}
      buttonText={section.ctaLabel || section.buttonText || section.ctaText || "Contact Us"}
      buttonLink={section.ctaUrl || section.buttonLink || section.ctaLink || "/contact"}
    />
  );
};

const renderProcess = (section: any, index: number) => {
  const title = section.ProcessSectionTitle || section.title || "Our Process";
  const description = section.ProcessSectionDescription || section.description || "";

  const pillars = (section.ProcessStep || []).map((step: any, idx: number) => {
    let iconNode: React.ReactNode = null;
    
    // Some endpoints may return lowercase 'img' or camelCase 'Img', so check both
    const iconImg = step.StepNameIconimg || step.StepNameIconImg;
    if (iconImg && iconImg.url) {
      const mediaUrl = iconImg.url.startsWith("http") 
        ? iconImg.url 
        : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${iconImg.url}`;
      iconNode = <img src={mediaUrl} alt={step.Stepname || `Step ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
    } else if (step.StepNameIcon) {
      iconNode = <div dangerouslySetInnerHTML={{ __html: step.StepNameIcon }} />;
    }

    return {
      id: step.Stepname?.toLowerCase().replace(/\s+/g, '-') || `pillar-${idx}`,
      title: step.Stepname || `Step ${idx + 1}`,
      iconSvg: iconNode,
      themeColor: step.ThemeColor || step.themeColor || step.Theme || (step.ProcessCard?.[0]?.BackgroundColor) || "#FBCBB5",
      steps: (step.ProcessCard || []).map((card: any) => card.Name || ""),
      timelineItems: (step.ProcessCard || []).map((card: any) => ({
        label: card.Name || "",
        desc: card.Description || "",
        backgroundColor: card.BackgroundColor || undefined
      }))
    };
  });

  return (
    <SharedProcess
      key={`process-${index}`}
      title={title}
      description={description}
      pillars={pillars}
      maxWidthTitle={section.MaxWidthTitle}
    />
  );
};

const renderTestimonials = (section: any, index: number) => {
  const heading = section.Heading || section.heading || "";
  const description = section.Description || section.description || "";
  const cards = (section.cards || []).map((t: any) => ({
    personName: t.personName || "",
    personMessage: t.personMessage || "",
    personDesignation: t.personDesignation || "",
    cardfooterBg: t.cardfooterBg || undefined,
  }));

  return (
    <SharedTestimonials
      key={`testimonials-${index}`}
      heading={heading}
      description={description}
      cards={cards}
    />
  );
};

const renderPeopleGlobal = (section: any, index: number) => {
  return (
    <PeopleGlobalSection
      key={`people-${index}`}
      cards={section.Peoplecard || section.peoplecard || []}
    />
  );
};

const renderBackgroundFeatureSection = (section: any, index: number) => {
  return (
    <BackgroundFeatureSection
      key={`bg-feature-${index}`}
      Heading={section.Heading || section.heading}
      Description={section.Description || section.description}
      BackgroundImage={section.BackgroundImage || section.backgroundImage}
      CTALabel={section.CTALabel || section.ctaLabel}
      CTALink={section.CTALink || section.ctaLink}
      FeatureCards={section.FeatureCards || section.featureCards || []}
      FontColorHeading={section.FontColorHeading}
      FontColorDescription={section.FontColorDescription}
      MaxWidthText={section.MaxWidthText || section.maxWidthText || section.maxWidth || section.MaxWidth}
    />
  );
};

const renderFAQ = (section: any, index: number) => {
  return (
    <GlobalFAQ
      key={index}
      Heading={section.Heading || section.heading || section.title}
      HeadingColor={section.HeadingColor}
      Description={section.Description || section.description || section.body}
      FaqData={section.FaqData || section.faqData || section.cards || []}
    />
  );
};

export default function GlobalWidgetRenderer({ widget }: GlobalWidgetProps) {
  if (!widget) return null;

  if (widget.Sections && Array.isArray(widget.Sections)) {
    const storytellerComponents = [
      'shared.journey', 'shared.timeline', 'shared.journey-timeline',
      'shared.stats-cards', 'shared.statscards', 'shared.stats-card',
      'shared.commitments', 'shared.commitment', 'widget.commitments',
      'shared.illustration-split', 'shared.media-text-split'
    ];

    const renderNode = (section: any, index: number) => {
      if (
        section.__component === 'shared.test-banner' ||
        section.__component === 'shared.shared-banner' ||
        section.__component === 'shared.hero-banner' ||
        section.__component === 'shared.sharedbanner' ||
        section.__component === 'shared.banner' ||
        section.__component === 'shared.hero'
      ) {
        return renderHeroBanner(section, index);
      }

      if (
        section.__component === 'shared.inner-page-hero' ||
        section.__component === 'shared.innerpagehero' ||
        section.__component === 'shared.inner-hero'
      ) {
        return renderInnerPageHero(section, index);
      }

      if (
        section.__component === 'shared.globe-cta' ||
        section.__component === 'shared.globo-cta' ||
        section.__component === 'shared.global-cta' ||
        section.__component === 'shared.cta' ||
        section.__component === 'shared.calltoaction' ||
        section.__component === 'shared.call-to-action'
      ) {
        return renderGlobeCTA(section, index);
      }

      if (section.__component === 'shared.process') {
        return renderProcess(section, index);
      }

      if (
        section.__component === 'shared.testimonials' ||
        section.__component === 'shared.gloabl-testimonails' ||
        section.__component === 'shared.global-testimonials' ||
        section.__component === 'shared.testimonails' ||
        section.__component === 'shared.testimonial'
      ) {
        return renderTestimonials(section, index);
      }

      if (
        section.__component === 'shared.people-global-section' ||
        section.__component === 'shared.peopleglobalsection' ||
        section.__component === 'shared.people'
      ) {
        return renderPeopleGlobal(section, index);
      }

      if (
        section.__component === 'shared.background-feature-section' ||
        section.__component === 'shared.backgroundfeaturesection'
      ) {
        return renderBackgroundFeatureSection(section, index);
      }

      if (
        section.__component === 'shared.faq' ||
        section.__component === 'widget.faq' ||
        section.__component === 'shared.global-faq'
      ) {
        return renderFAQ(section, index);
      }

      if (
        section.__component === 'shared.illustration-split' ||
        section.__component === 'shared.media-text-split'
      ) {
        return (
          <SharedIllustrationSplit
            key={`illustration-split-${index}`}
            id={`widget-illustration-split-${index}`}
            heading={section.heading || section.Heading}
            description={section.description || section.Description}
            media={section.media || section.Media}
            mediaAlignment={section.mediaAlignment || section.MediaAlignment}
            statistics={section.statistics || section.Statistics}
            showBottomDivider={section.showBottomDivider || section.ShowBottomDivider}
            HeadingColor={section.HeadingColor}
            DescriptionColor={section.DescriptionColor}
          />
        );
      }

      if (
        section.__component === 'shared.image-card-grid' ||
        section.__component === 'shared.imagecardgrid' ||
        section.__component === 'shared.image-card' ||
        section.__component === 'shared.cards'
      ) {
        const cards = (section.cardgrid || section.cards || []).map((card: any) => ({
          title: card.title,
          description: card.description,
          image: card.image,
          TitleColor: card.TitleColor || card.titleColor,
          DescriptionColor: card.DescriptionColor || card.descriptionColor
        }));

        const data = {
          title: section.Heading || section.heading || section.title,
          cards: cards.length > 0 ? cards : undefined,
          HeadingColor: section.HeadingColor
        };

        return (
          <SharedImageCardGrid
            key={`image-card-grid-${index}`}
            data={data}
          />
        );
      }

      if (
        section.__component === 'shared.image-split' ||
        section.__component === 'shared.imagesplit' ||
        section.__component === 'shared.image-split-section'
      ) {
        return (
          <SharedImageSplit
            key={`image-split-${index}`}
            data={section}
          />
        );
      }

      if (
        section.__component === 'shared.accordion-split' ||
        section.__component === 'shared.accordionsplit'
      ) {
        return (
          <SharedAccordionSplit
            key={`accordion-split-${index}`}
            Heading={section.Heading || section.heading}
            Description={section.Description || section.description}
            HeadingTextColor={section.HeadingTextColor || section.headingTextColor}
            DescriptionTextColor={section.DescriptionTextColor || section.descriptionTextColor}
            BgGradient={section.BgGradient || section.bgGradient}
            TemplateGridColumns={section.TemplateGridColumns || section.templateGridColumns}
            Accordian={section.Accordian || section.accordian || section.Accordion}
          />
        );
      }

      if (
        section.__component === 'shared.content-with-side-graphic' ||
        section.__component === 'shared.contentwithsidegraphic' ||
        section.__component === 'shared.content-with-side-graphic-section'
      ) {
        return (
          <SharedContentWithSideGraphic
            key={`content-side-graphic-${index}`}
            Heading={section.Heading || section.heading}
            Description={section.Description || section.description || section.body || section.Body}
            Image={section.Image || section.image || section.media || section.Media}
            Gradient={section.Gradient || section.gradient || section.BgGradient}
            HeadingColor={section.HeadingColor}
            DescriptionColor={section.DescriptionColor}
          />
        );
      }

      if (
        section.__component === 'shared.journey' ||
        section.__component === 'shared.timeline' ||
        section.__component === 'shared.journey-timeline'
      ) {
        return (
          <SharedJourney
            key={`journey-${index}`}
            Heading={section.Heading || section.heading || section.title}
            Description={section.Description || section.description || section.body || section.Body}
            TimeCards={section.TimeCards || section.timeCards || section.Cards}
          />
        );
      }

      // StatsCards Component
      if (section.__component === 'shared.stats-cards' || section.__component === 'shared.statscards' || section.__component === 'shared.stats-card') {
        return (
          <SharedStatsCards
            key={`stats-cards-${index}`}
            Heading={section.Heading || section.heading || section.title}
            Description={section.Description || section.description || section.body || section.Body}
            CradColorful={section.CradColorful || section.cradColorful || section.cards}
          />
        );
      }

      // Commitments Component
      if (
        section.__component === 'shared.commitments' ||
        section.__component === 'shared.commitment' ||
        section.__component === 'widget.commitments'
      ) {
        return (
          <SharedCommitments
            key={`commitments-${index}`}
            Heading={section.Heading || section.heading || section.title}
            Description={section.Description || section.description || section.body}
            BgImage={section.BgImage || section.bgImage || section.image || section.media}
            BgOverlay={section.BgOverlay || section.bgOverlay}
            PillarsDescription={section.PillarsDescription || section.pillarsDescription}
            PillarCard={section.PillarCard || section.pillarCard || section.cards}
          />
        );
      }

      // Culture / Value Proposition Component
      if (
        section.__component === 'shared.culture' ||
        section.__component === 'shared.about-culture' ||
        section.__component === 'widget.culture' ||
        section.__component === 'shared.value-proposition' ||
        section.__component === 'shared.pillar-highlights' ||
        section.__component === 'shared.core-values' ||
        section.__component === 'shared.feature-showcase'
      ) {
        return (
          <SharedCulture
            key={`culture-${index}`}
            Heading={section.Heading || section.heading || section.title}
            Description={section.Description || section.description || section.body}
            Pillarcard={section.Pillarcard || section.pillarcard || section.Cards || section.cards}
            CtaButton={section.CtaButton || section.ctaButton || (section.Cta?.[0]?.label)}
            CTALink={section.CTALink || section.ctaLink || (section.Cta?.[0]?.url)}
            BgImage={section.BgImage || section.bgImage || section.Media || section.media || section.image}
            BgGradient={section.BgGradient || section.bgGradient}
            HeadingColor={section.HeadingColor}
            DescriptionColor={section.DescriptionColor}
          />
        );
      }

      // Benefits Component
      if (
        section.__component === 'shared.benefits' ||
        section.__component === 'widget.benefits'
      ) {
        return (
          <SharedBenefits
            key={`benefits-${index}`}
            heading={section.Heading || section.heading || section.title}
            description={section.Description || section.description || section.body}
            cards={section.BenefitsCard || section.benefitsCard || section.cards || section.Cards}
            footerText={section.BottomMessage || section.bottomMessage || section.FooterText || section.footerText}
          />
        );
      }

      // Highlight List Component
      if (
        section.__component === 'shared.highlight-list' ||
        section.__component === 'widget.highlight-list'
      ) {
        return (
          <SharedHighlightList
            key={`highlight-list-${index}`}
            heading={section.Heading || section.heading || section.title}
            description={section.Description || section.description || section.body}
            image={section.Image || section.image || section.Media || section.media}
            ctaLabel={section.ctaLabel || section.CtaLabel || section.ctaText}
            ctaUrl={section.ctaUrl || section.CtaUrl || section.ctaLink}
            listItems={section.Name || section.name || section.ListItems || section.listItems}
          />
        );
      }

      // CTA With Graphic Component
      if (
        section.__component === 'shared.cta-with-graphic' ||
        section.__component === 'widget.cta-with-graphic'
      ) {
        return (
          <SharedCtaWithGraphic
            key={`cta-graphic-${index}`}
            heading={section.Heading || section.heading || section.title}
            description={section.Description || section.description || section.body}
            ctaText={section.CtaText || section.ctaText || section.ctaLabel}
            ctaLink={section.CtaLink || section.ctaLink || section.ctaUrl}
            graphic={section.Graphic || section.graphic || section.Image || section.image}
            bgColor={section.BgColor || section.bgColor}
            HeadingColor={section.HeadingColor}
            DescriptionColor={section.DescriptionColor}
          />
        );
      }

      // Centered Image CTA Component
      if (
        section.__component === 'shared.centered-image-cta' ||
        section.__component === 'widget.centered-image-cta'
      ) {
        return (
          <SharedCenteredImageCTA
            key={`centered-image-cta-${index}`}
            heading={section.Heading || section.heading || section.title}
            text={section.Text || section.text || section.description || section.body}
            ctaLabel={section.ctaLabel || section.CtaLabel || section.ctaText}
            ctaUrl={section.ctaUrl || section.CtaUrl || section.ctaLink}
            bgImage={section.BgImage || section.bgImage || section.Image || section.image}
            HeadingColor={section.HeadingColor}
            DescriptionColor={section.DescriptionColor}
          />
        );
      }

      // ── Main Hero ──────────────────────────────────────────────────────────
      if (
        section.__component === 'shared.main-hero' ||
        section.__component === 'widget.main-hero'
      ) {
        return (
          <SharedMainHero
            key={`main-hero-${index}`}
            heading={section.Heading || section.heading}
            description={section.Description || section.description}
            fontColor={section.FontColor || section.fontColor}
            bgColor={section.BgColor || section.bgColor}
            scrollText={section.ScrollText || section.scrollText}
          />
        );
      }

      // ── Image Gradient Split ─────────────────────────────────────────────
      if (
        section.__component === 'shared.image-gradient-split' ||
        section.__component === 'widget.image-gradient-split'
      ) {
        return (
          <SharedImageGradientSplit
            key={`image-gradient-split-${index}`}
            heading={section.Heading || section.heading || section.title}
            description={section.Description || section.description || section.body}
            sectionPointers={section.sectionPointers || section.SectionPointers}
            ctaText={section.CtaText || section.ctaText || section.ctaLabel}
            ctaUrl={section.CtaUrl || section.ctaUrl || section.ctaLink}
            bgImage={section.BgImage || section.bgImage || section.Image || section.image}
            HeadingColor={section.HeadingColor}
            DescriptionTextColor={section.DescriptionTextColor}
          />
        );
      }

      // Stats With Image Component
      if (
        section.__component === 'shared.stats-with-image' ||
        section.__component === 'widget.stats-with-image'
      ) {
        return (
          <SharedStatsWithImage
            key={`stats-with-image-${index}`}
            heading={section.Heading || section.heading || section.title}
            statscards={section.Statscard || section.statscards}
            image={section.Image || section.image || section.Media || section.media}
            HeadingColor={section.HeadingColor}
          />
        );
      }

      // Detailed Card Grid Component
      if (
        section.__component === 'shared.detailed-card-grid' ||
        section.__component === 'widget.detailed-card-grid'
      ) {
        return (
          <SharedDetailedCardGrid
            key={`detailed-card-grid-${index}`}
            heading={section.Headings || section.Heading || section.heading}
            description={section.Description || section.description}
            bgColor={section.BgColor || section.bgColor}
            panelsCards={section.PanelsCards || section.panelsCards}
          />
        );
      }

      return null;
    };

    const groupedSections: any[] = [];
    let currentFlowGroup: any[] = [];

    widget.Sections.forEach((section: any, index: number) => {
      if (storytellerComponents.includes(section.__component)) {
        currentFlowGroup.push({ section, index });
      } else {
        if (currentFlowGroup.length > 0) {
          groupedSections.push({ type: 'storyteller-flow', items: currentFlowGroup });
          currentFlowGroup = [];
        }
        groupedSections.push({ type: 'single', section, index });
      }
    });

    if (currentFlowGroup.length > 0) {
      groupedSections.push({ type: 'storyteller-flow', items: currentFlowGroup });
    }

    return (
      <div className={`widget-sections ${widget.CustomCssClass || ''}`}>
        {groupedSections.map((group, groupIndex) => {
          if (group.type === 'storyteller-flow') {
            const hasIllustration = group.items.some((item: any) =>
              item.section.__component === 'shared.illustration-split' ||
              item.section.__component === 'shared.media-text-split'
            );
            const flowClass = hasIllustration ? "sol-storyteller-flow" : "about-storyteller-flow";

            return (
              <div key={`flow-group-${groupIndex}`} className={flowClass} style={{ marginTop: "-1px", border: "none" }}>
                <div className="flow-bg-gradient flow-bg-1" aria-hidden="true"></div>
                <div className="flow-bg-gradient flow-bg-2" aria-hidden="true"></div>
                <div className="flow-bg-gradient flow-bg-3" aria-hidden="true"></div>
                {group.items.map((item: any) => renderNode(item.section, item.index))}
              </div>
            );
          }
          return renderNode(group.section, group.index);
        })}
      </div>
    );
  }

  return null;
}
