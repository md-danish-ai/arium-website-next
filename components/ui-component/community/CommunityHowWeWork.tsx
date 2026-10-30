"use client";

import React from "react";
import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunityHowWeWorkProps } from "./type";

export default function CommunityHowWeWork({
  id = "how-we-work",
  title,
  title_color,
  description,
  description_color,
  CTA_text,
  CTA_url,
  background_image_desktop,
}: CommunityHowWeWorkProps) {
  const isHtml = Boolean(description && description.includes("<") && description.includes(">"));

  return (
    <section id={id} className="relative overflow-hidden p-0">
      {background_image_desktop && (
        <div className="absolute inset-0 z-0">
          <Image
            src={background_image_desktop}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center block"
          />
        </div>
      )}

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0d1224]/80 via-[#0d1224]/50 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-[200px] z-[1] bg-gradient-to-t from-[#0d1224]/50 to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-[150px] z-[1] bg-gradient-to-b from-[#0d1224]/40 to-transparent" />

      <Container className="relative z-[2] py-20 md:py-32 lg:py-40">
        <div className="max-w-[560px]">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="reveal text-white leading-tight mb-6"
            style={title_color ? { color: title_color } : undefined}
          >
            {title}
          </Typography>

          {isHtml ? (
            <div
              className="reveal stagger-1 text-white/85 leading-relaxed mb-9 flex flex-col gap-5 [&>p]:m-0 [&>p]:mb-0 [&>p+p]:mt-4"
              style={description_color ? { color: description_color } : undefined}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <div
              className="text-white/85 leading-relaxed mb-9 space-y-5"
              style={description_color ? { color: description_color } : undefined}
            >
              <Typography as="p" variant="b1" className="m-0">
                {description}
              </Typography>
            </div>
          )}

          {CTA_text && CTA_url && (
            <div className="reveal stagger-3">
              <Button
                href={CTA_url}
                color="secondary"
                aria-label={`${CTA_text} about how we work in your community`}
              >
                {CTA_text}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
