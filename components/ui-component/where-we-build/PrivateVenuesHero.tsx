import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";

interface PrivateVenuesHeroProps {
  data?: {
    heroTag?: string;
    heroTitle?: string;
    heroDescription?: string;
    heroCtas?: { label: string; url: string };
  };
}

export default function PrivateVenuesHero({ data }: PrivateVenuesHeroProps) {
  return (
    <section
      className="subpage-header relative overflow-hidden bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF] pt-[180px] md:pt-[200px] pb-24 md:pb-32 px-6"
      id="pv-header"
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <nav
        className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2] px-6 md:px-16"
        aria-label="Breadcrumb"
      >
        <Typography
          variant="b4"
          as="ol"
          className="list-none p-0 m-0 flex items-center gap-2 tracking-wider"
        >
          <li>
            <Link
              href="/where-we-build"
              className="text-[#162047]/50 hover:text-[#162047] no-underline transition-colors duration-300"
            >
              Where We Build
            </Link>
          </li>
          <li className="text-[#162047]/30 text-[0.7rem]">/</li>
          <li className="text-[#162047]/80 font-medium">{data?.heroTag || "Private Venues"}</li>
        </Typography>
      </nav>

      <div className="subpage-header-inner relative z-[1] flex flex-col items-center text-center">
        <div className="subpage-header-text flex flex-col items-center text-center max-w-[960px]">
          <Typography
            variant="b4"
            as="p"
            weight="medium"
            uppercase
            className="reveal stagger-1 text-[#162047]/70 mb-4 tracking-widest"
          >
            {data?.heroTag || "Private Venues"}
          </Typography>
          <div className="reveal stagger-1 w-12 h-[2px] bg-[#162047] mx-auto mb-5" />
          <Typography
            variant="h2"
            as="h1"
            uppercase
            weight="light"
            className="subpage-title reveal stagger-2 text-[#162047] leading-tight mb-5"
          >
            {data?.heroTitle || "Bringing advanced connectivity to your property"}
          </Typography>
          <Typography
            variant="b1"
            as="p"
            className="subpage-intro reveal stagger-3 text-[#162047]/80 max-w-2xl mx-auto"
          >
            {data?.heroDescription ||
              "Our in-building solutions help private venues keep up with advances and technology, while supporting the connectivity demands of tenants and guests."}
          </Typography>
          <div className="reveal stagger-4 mt-7">
            <Link
              href={data?.heroCtas?.url || "/contact"}
              className="pv-hero-cta group inline-flex items-center justify-center bg-[#162047] text-white border-2 border-[#162047] rounded-full px-9 py-3.5 hover:bg-transparent hover:text-[#162047] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Typography
                variant="button"
                uppercase
                weight="semibold"
                className="text-white group-hover:text-[#162047]"
              >
                {data?.heroCtas?.label || "Contact Us"}
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
