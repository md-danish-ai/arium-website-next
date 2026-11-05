"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Typography, Button, Breadcrumbs } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { cn } from "@lib/utils";

export interface SubPageHeroBannerProps {
  id?: string;
  title?: string;
  description?: string;
  tag?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  background_color?: string | null;
  content_max_width?: string | null;
  showBreadcrumbs?: boolean;
}

export default function SubPageHeroBanner({
  id = "sub-page-hero",
  title,
  description,
  CTA_text,
  CTA_url,
  background_gradient,
  background_color,
  content_max_width,
  showBreadcrumbs = true,
}: SubPageHeroBannerProps) {
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
  const isPeoplePage = pathname.includes("/leadership") || pathname.includes("/board-of-directors");

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-24 sm:pt-28 md:pt-32",
        isPeoplePage ? "pb-[135px] sm:pb-[145px] md:pb-[150px]" : "pb-16 sm:pb-20"
      )}
      id={id}
      style={{
        background:
          background_color ||
          background_gradient ||
          (pathname.includes("/leadership")
            ? "linear-gradient(135deg, rgb(184, 169, 240) 0%, rgb(210, 199, 255) 40%, rgb(196, 181, 247) 70%, rgb(221, 213, 255) 100%)"
            : "linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 40%, #FFDAC8 100%)"),
      }}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full [background:radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full [background:radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <Container className="relative z-[1] flex flex-col items-center text-center">
        {showBreadcrumbs && parentLabel && (
          <div className="reveal w-full text-left mb-6 sm:mb-8 md:mb-9">
            <Breadcrumbs items={[{ label: parentLabel, href: parentUrl }, { label: cleanTitle }]} />
          </div>
        )}

        <div
          className="flex flex-col items-center text-center w-full mx-auto"
          style={{ maxWidth: content_max_width || "960px" }}
        >
          {/* {tag && (
            <>
              <Typography
                variant="eyebrow"
                uppercase
                className="reveal stagger-1 text-midnight/70 mb-4 tracking-[0.18em]"
              >
                {tag}
              </Typography>
              <div className="reveal stagger-1 w-12 h-0.5 bg-midnight mx-auto mb-5" />
            </>
          )} */}

          <Typography
            variant="subpage-title"
            uppercase
            className="reveal stagger-2 text-center text-midnight"
            weight="light"
            dangerouslySetInnerHTML={{
              __html:
                title ||
                (pathname.includes("/leadership")
                  ? "Our Leadership"
                  : pathname.includes("/board-of-directors")
                    ? "Board of Directors"
                    : cleanTitle),
            }}
          />

          {(description ||
            pathname.includes("/leadership") ||
            pathname.includes("/board-of-directors")) && (
            <Typography
              variant="subpage-intro"
              className="reveal stagger-3 text-center text-midnight/80 mx-auto mt-4"
              dangerouslySetInnerHTML={{
                __html:
                  description ||
                  (pathname.includes("/leadership")
                    ? "Seasoned industry leaders driving strategic growth and operational excellence."
                    : "Guiding our vision with extensive governance and telecommunications expertise."),
              }}
            />
          )}

          {CTA_text && CTA_url && (
            <div className="reveal stagger-4 mt-7">
              <Button href={CTA_url} color="primary">
                {CTA_text}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
