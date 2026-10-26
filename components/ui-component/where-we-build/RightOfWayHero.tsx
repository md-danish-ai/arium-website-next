import React from "react";
import { Typography, Button, Breadcrumbs } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface RightOfWayHeroProps {
  tag?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
  breadcrumbParent?: string;
  breadcrumbParentUrl?: string;
}

export default function RightOfWayHero({
  tag = "Right of Way",
  title,
  description,
  ctaLabel = "Contact Us",
  ctaUrl = "/contact",
  breadcrumbParent = "Where We Build",
  breadcrumbParentUrl = "/where-we-build",
}: RightOfWayHeroProps) {
  return (
    <section
      className="subpage-header relative overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFE8D6] to-[#FFDAC8] pt-[180px] md:pt-[200px] pb-24 md:pb-32"
      id="row-header"
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2]">
        <Container>
          <Breadcrumbs
            items={[{ label: breadcrumbParent, href: breadcrumbParentUrl }, { label: tag }]}
          />
        </Container>
      </div>

      <Container className="subpage-header-inner relative z-[1] flex flex-col items-center text-center">
        <div className="subpage-header-text flex flex-col items-center text-center max-w-[960px]">
          <Typography
            variant="b4"
            as="p"
            weight="medium"
            uppercase
            className="reveal stagger-1 text-[#162047]/70 mb-4 tracking-widest"
          >
            {tag}
          </Typography>
          <div className="reveal stagger-1 w-12 h-[2px] bg-[#162047] mx-auto mb-5" />
          <Typography
            variant="h2"
            as="h1"
            uppercase
            weight="light"
            className="subpage-title reveal stagger-2 text-[#162047] leading-tight mb-5"
          >
            {title}
          </Typography>
          <Typography
            variant="b1"
            as="p"
            className="subpage-intro reveal stagger-3 text-[#162047]/80 max-w-2xl mx-auto"
          >
            {description}
          </Typography>
          {ctaLabel && (
            <div className="reveal stagger-4 mt-7">
              <Button href={ctaUrl} color="primary">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
