"use client";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunityHowWeWorkProps } from "./type";

export default function CommunityHowWeWork({
  title,
  contentHtml,
  paragraphs = [],
  bgImageUrl = "/assets/images/how-we-work-community.png",
  cta,
}: CommunityHowWeWorkProps) {
  return (
    <section id="how-we-work" className="relative overflow-hidden p-0">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center block"
        />
      </div>

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
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="reveal stagger-1 text-white/85 text-base md:text-lg leading-relaxed mb-9 flex flex-col gap-5"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <div className="text-white/85 text-base md:text-lg leading-relaxed mb-9 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  as="p"
                  variant="b1"
                  className={`reveal stagger-${index + 1} m-0`}
                >
                  {paragraph}
                </Typography>
              ))}
            </div>
          )}
          {cta && (
            <Link
              href={cta.url}
              aria-label={`${cta.label} about how we work in your community`}
              className="reveal stagger-3 inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-semibold bg-[#00e8d9] text-[#162047] border-2 border-[#00e8d9] rounded-full px-10 py-3.5 hover:bg-transparent hover:text-[#00e8d9] transition-all duration-300 hover:-translate-y-0.5"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
