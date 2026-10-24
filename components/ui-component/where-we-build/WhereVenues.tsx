import Link from "next/link";
import Image from "next/image";
import { Typography } from "@ui-element";
import { ArrowRightSvg } from "@ui-svg";
import type { WhereVenuesProps } from "./type";

export default function WhereVenues({
  title,
  description,
  cta,
  images,
  isHtmlDescription,
}: WhereVenuesProps) {
  const displayImage = images[0];

  return (
    <section
      className="ov-feature ov-feature--flip ov-feature--teal relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#E4FAF8] via-[#BCF6F2] to-[#E8FBF9]"
      id="venues-feature"
    >
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.18)_0%,transparent_60%)] -top-[180px] -left-[150px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_65%)] -bottom-[180px] -right-[120px] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(210,199,255,0.08)_0%,transparent_70%)] top-[30%] right-[20%] pointer-events-none" />

      <div className="container ov-feature-inner grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-[1]">
        <div className="ov-feature-text reveal flex flex-col gap-5 lg:order-2">
          <Typography
            variant="h2"
            as="h2"
            uppercase
            weight="light"
            className="ov-feature-heading text-[#162047] leading-tight m-0"
          >
            {title}
          </Typography>

          {isHtmlDescription ? (
            <div
              className="ov-feature-desc strapi-richtext-body text-[#162047]/85 text-base md:text-lg leading-relaxed m-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <Typography variant="b1" as="p" className="ov-feature-desc text-[#162047]/85 m-0">
              {description}
            </Typography>
          )}

          <Link
            href={cta.url}
            aria-label={`${cta.label} about private venues`}
            className="ov-feature-cta reveal stagger-2 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#162047] bg-[#162047] text-white hover:bg-transparent hover:text-[#162047] transition-all duration-300 hover:-translate-y-0.5 self-start mt-2 group"
          >
            <Typography
              variant="button"
              uppercase
              weight="semibold"
              className="text-white group-hover:text-[#162047]"
            >
              {cta.label}
            </Typography>
            <ArrowRightSvg className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="ov-showcase reveal stagger-1 lg:order-1">
          <div className="ov-showcase-stage aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative w-full">
            {displayImage && (
              <Image
                src={displayImage.src}
                alt={displayImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
