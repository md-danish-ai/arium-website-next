"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

interface InnerPageHeroProps {
  id?: string;
  heroTag?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroCtasLabel?: string;
  heroCtasUrl?: string;
  backgroundGradient?: string;
  contentMaxWidth?: string;
}

export default function InnerPageHero({
  id = "inner-hero",
  heroTag,
  heroTitle,
  heroDescription,
  heroCtasLabel,
  heroCtasUrl,
  backgroundGradient,
  contentMaxWidth,
}: InnerPageHeroProps) {
  const pathname = usePathname() || "";

  let parentLabel = "";
  let parentUrl = "";

  if (
    pathname.includes("/leadership") ||
    pathname.includes("/board-of-directors") ||
    pathname.includes("/about")
  ) {
    parentLabel = "Our Company";
    parentUrl = "/about";
  } else if (pathname.includes("/right-of-ways") || pathname.includes("/private-venues")) {
    parentLabel = "Where We Build";
    parentUrl = "/where-we-build";
  } else if (
    pathname.includes("/solutions") ||
    pathname.includes("/small-cells") ||
    pathname.includes("/das")
  ) {
    parentLabel = "Our Solutions";
    parentUrl = "/our-solutions";
  } else if (pathname.includes("/community")) {
    parentLabel = "Your Community";
    parentUrl = "/community";
  } else if (pathname.includes("/careers")) {
    parentLabel = "Careers";
    parentUrl = "/careers";
  }

  const formatPageName = (path: string) => {
    const segment = path.split("/").filter(Boolean).pop() || "";
    if (segment === "right-of-ways") return "Right of Way";
    if (segment === "board-of-directors") return "Board of Directors";
    if (segment === "das") return "Distributed Antenna Systems";

    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const cleanTitle = formatPageName(pathname);

  return (
    <section
      className="subpage-header relative overflow-hidden"
      id={id}
      style={{
        background:
          backgroundGradient ||
          (pathname.includes("/leadership") || pathname.includes("/board-of-directors")
            ? "linear-gradient(135deg, #B8A9F0 0%, #D2C7FF 50%, #DDD5FF 100%)"
            : "linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 40%, #FFDAC8 100%)"),
        padding: `${pathname.includes("/leadership") || pathname.includes("/board-of-directors") ? "200px 0 180px" : "200px 0 80px"}`,
      }}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full [background:radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full [background:radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      {parentLabel && (
        <nav className="reveal absolute top-[140px] inset-x-0 z-[2]" aria-label="Breadcrumb">
          <Container>
            <ol className="list-none p-0 m-0 flex items-center gap-2 font-body text-[0.78rem] tracking-[0.04em]">
              <li>
                <Link
                  href={parentUrl}
                  className="text-midnight/50 no-underline hover:text-midnight/80 transition-opacity"
                >
                  {parentLabel}
                </Link>
              </li>
              <li className="text-midnight/30 text-[0.7rem]">/</li>
              <li>
                <Typography variant="b4" uppercase className="text-midnight/80 font-medium">
                  {cleanTitle}
                </Typography>
              </li>
            </ol>
          </Container>
        </nav>
      )}

      <Container className="relative z-[1] flex flex-col items-center text-center">
        <div
          className="flex flex-col items-center text-center w-full mx-auto"
          style={{ maxWidth: contentMaxWidth || "960px" }}
        >
          {heroTag && (
            <>
              <Typography
                variant="b4"
                uppercase
                className="reveal stagger-1 text-midnight/70 mb-4 tracking-[0.12em]"
              >
                {heroTag}
              </Typography>
              <div className="reveal stagger-1 w-12 h-0.5 bg-midnight mx-auto mb-5" />
            </>
          )}

          <Typography
            variant="h2"
            uppercase
            className="subpage-title reveal stagger-2 text-center text-midnight"
            dangerouslySetInnerHTML={{
              __html:
                heroTitle ||
                (pathname.includes("/leadership")
                  ? "Our Leadership"
                  : pathname.includes("/board-of-directors")
                    ? "Board of Directors"
                    : cleanTitle),
            }}
          />

          {(heroDescription ||
            pathname.includes("/leadership") ||
            pathname.includes("/board-of-directors")) && (
            <Typography
              variant="b1"
              className="subpage-intro reveal stagger-3 text-center text-midnight/80 max-w-[800px] mx-auto mt-4"
              dangerouslySetInnerHTML={{
                __html:
                  heroDescription ||
                  (pathname.includes("/leadership")
                    ? "Seasoned industry leaders driving strategic growth and operational excellence."
                    : "Guiding our vision with extensive governance and telecommunications expertise."),
              }}
            />
          )}

          {heroCtasLabel && heroCtasUrl && (
            <div className="reveal stagger-4 mt-7">
              <Link
                href={heroCtasUrl}
                className="group inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-semibold bg-[#162047] !text-white border-2 border-[#162047] rounded-full px-9 py-3.5 hover:bg-transparent hover:!text-[#162047] transition-all duration-300 hover:-translate-y-0.5 no-underline shadow-sm cursor-pointer"
                style={{ color: "#ffffff" }}
              >
                <span
                  className="!text-white group-hover:!text-[#162047] transition-colors duration-300"
                  style={{ color: "#ffffff" }}
                >
                  {heroCtasLabel}
                </span>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
