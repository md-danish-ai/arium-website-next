import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface PrivateVenuesHeroProps {
  tag?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
  breadcrumbParent?: string;
  breadcrumbParentUrl?: string;
}

export default function PrivateVenuesHero({
  tag = "Private Venues",
  title,
  description,
  ctaLabel = "Contact Us",
  ctaUrl = "/contact",
  breadcrumbParent = "Where We Build",
  breadcrumbParentUrl = "/where-we-build",
}: PrivateVenuesHeroProps) {
  return (
    <section
      className="subpage-header relative overflow-hidden bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF] pt-[180px] md:pt-[200px] pb-24 md:pb-32"
      id="pv-header"
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <nav
        className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2]"
        aria-label="Breadcrumb"
      >
        <Container>
          <Typography
            variant="b4"
            as="ol"
            className="list-none p-0 m-0 flex items-center gap-2 tracking-wider"
          >
            <li>
              <Link
                href={breadcrumbParentUrl}
                className="text-[#162047]/50 hover:text-[#162047] no-underline transition-colors duration-300"
              >
                {breadcrumbParent}
              </Link>
            </li>
            <li className="text-[#162047]/30 text-[0.7rem]">/</li>
            <li className="text-[#162047]/80 font-medium">{tag}</li>
          </Typography>
        </Container>
      </nav>

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
              <Link
                href={ctaUrl}
                className="pv-hero-cta group inline-flex items-center justify-center bg-[#162047] text-white border-2 border-[#162047] rounded-full px-9 py-3.5 hover:bg-transparent hover:text-[#162047] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Typography
                  variant="button"
                  uppercase
                  weight="semibold"
                  className="text-white group-hover:text-[#162047]"
                >
                  {ctaLabel}
                </Typography>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
