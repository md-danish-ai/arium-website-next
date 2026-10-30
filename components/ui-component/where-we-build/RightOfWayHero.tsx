import React from "react";
import { Typography, Button, Breadcrumbs } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { WhereSubpageHeroProps } from "./type";

export default function RightOfWayHero({
  tag,
  title,
  description,
  CTA_text,
  CTA_url,
  background_gradient,
  content_max_width,
}: WhereSubpageHeroProps) {
  const displayTag = tag || "Right of Way";

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFE8D6] to-[#FFDAC8] pt-[180px] md:pt-[200px] pb-24 md:pb-32"
      id="row-header"
      style={background_gradient ? { background: background_gradient } : undefined}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2]">
        <Container>
          <Breadcrumbs
            items={[{ label: "Where We Build", href: "/where-we-build" }, { label: displayTag }]}
          />
        </Container>
      </div>

      <Container className="relative z-[1] flex flex-col items-center text-center">
        <div
          className="flex flex-col items-center text-center max-w-[960px]"
          style={content_max_width ? { maxWidth: content_max_width } : undefined}
        >
          {displayTag && (
            <>
              <Typography
                variant="b4"
                as="p"
                weight="medium"
                uppercase
                className="reveal stagger-1 text-[#162047]/70 mb-4 tracking-widest"
              >
                {displayTag}
              </Typography>
              <div className="reveal stagger-1 w-12 h-[2px] bg-[#162047] mx-auto mb-5" />
            </>
          )}

          <Typography
            variant="h2"
            as="h1"
            uppercase
            weight="light"
            className="reveal stagger-2 text-[#162047] leading-tight mb-5"
          >
            {title}
          </Typography>

          <Typography
            variant="b1"
            as="p"
            className="reveal stagger-3 text-[#162047]/80 leading-relaxed mb-8 max-w-[760px]"
          >
            {description}
          </Typography>

          {CTA_text && CTA_url && (
            <Button
              href={CTA_url}
              color="primary"
              aria-label={`${CTA_text} - ${title}`}
              className="reveal stagger-4 self-center"
            >
              {CTA_text}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
