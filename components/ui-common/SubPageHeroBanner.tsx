"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Typography, Button, Breadcrumbs } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface SubPageHeroBannerProps {
  id?: string;
  title?: string;
  description?: string;
  tag?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export default function SubPageHeroBanner({
  id = "sub-page-hero",
  title,
  description,
  tag,
  CTA_text,
  CTA_url,
  background_gradient,
  content_max_width,
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

  return (
    <section
      className="relative overflow-hidden"
      id={id}
      style={{
        background:
          background_gradient ||
          (pathname.includes("/leadership") || pathname.includes("/board-of-directors")
            ? "linear-gradient(135deg, #B8A9F0 0%, #D2C7FF 50%, #DDD5FF 100%)"
            : "linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 40%, #FFDAC8 100%)"),
        padding: `${pathname.includes("/leadership") || pathname.includes("/board-of-directors") ? "200px 0 180px" : "200px 0 80px"}`,
      }}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full [background:radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full [background:radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      {parentLabel && (
        <div className="reveal absolute top-[140px] inset-x-0 z-[2]">
          <Container>
            <Breadcrumbs
              items={[{ label: parentLabel, href: parentUrl }, { label: cleanTitle }]}
              uppercase
            />
          </Container>
        </div>
      )}

      <Container className="relative z-[1] flex flex-col items-center text-center">
        <div
          className="flex flex-col items-center text-center w-full mx-auto"
          style={{ maxWidth: content_max_width || "960px" }}
        >
          {tag && (
            <>
              <Typography
                variant="b4"
                uppercase
                className="reveal stagger-1 text-midnight/70 mb-4 tracking-[0.12em]"
              >
                {tag}
              </Typography>
              <div className="reveal stagger-1 w-12 h-0.5 bg-midnight mx-auto mb-5" />
            </>
          )}

          <Typography
            variant="h2"
            uppercase
            className="reveal stagger-2 text-center text-midnight"
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
              variant="b1"
              className="reveal stagger-3 text-center text-midnight/80 max-w-[800px] mx-auto mt-4"
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
