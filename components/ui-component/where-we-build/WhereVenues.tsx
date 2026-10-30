import React from "react";
import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { ArrowRightSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";
import { resolveStrapiImage } from "@utils";
import type { WhereImageSplitProps } from "./type";

export default function WhereVenues({
  title,
  title_color,
  description,
  description_color,
  image,
  background_color,
  CTA_text,
  CTA_url,
}: WhereImageSplitProps) {
  const imageUrl = resolveStrapiImage(image, "/images/gallery/venue-hero.png");
  const isHtml = description.includes("<") && description.includes(">");

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#E4FAF8] via-[#BCF6F2] to-[#E8FBF9]"
      id="venues-feature"
      style={background_color ? { background: background_color } : undefined}
    >
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.18)_0%,transparent_60%)] -top-[180px] -left-[150px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_65%)] -bottom-[180px] -right-[120px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(210,199,255,0.08)_0%,transparent_70%)] top-[30%] right-[20%] pointer-events-none" />

      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-[1]">
        <div className="reveal flex flex-col gap-5 lg:order-2">
          <Typography
            variant="h2"
            as="h2"
            uppercase
            weight="light"
            className="leading-tight m-0"
            style={title_color ? { color: title_color } : { color: "#162047" }}
          >
            {title}
          </Typography>

          {isHtml ? (
            <div
              className="strapi-richtext-body leading-relaxed m-0"
              style={
                description_color
                  ? { color: description_color }
                  : { color: "rgba(22, 32, 71, 0.85)" }
              }
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="m-0 leading-relaxed"
              style={
                description_color
                  ? { color: description_color }
                  : { color: "rgba(22, 32, 71, 0.85)" }
              }
            >
              {description}
            </Typography>
          )}

          {CTA_text && CTA_url && (
            <Button
              href={CTA_url}
              color="primary"
              rightIcon={
                <ArrowRightSvg className="transition-transform duration-300 group-hover:translate-x-1" />
              }
              aria-label={`${CTA_text} about private venues`}
              className="reveal stagger-2 self-start mt-2"
            >
              {CTA_text}
            </Button>
          )}
        </div>

        <div className="reveal stagger-1 lg:order-1">
          <div className="aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative w-full">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={typeof title === "string" ? title : "Venues illustration"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
