import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { ArrowRightSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";
import type { WhereCommunitiesProps } from "./type";

export default function WhereCommunities({
  title,
  description,
  cta,
  images,
  isHtmlDescription,
}: WhereCommunitiesProps) {
  const displayImage = images[0];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#FFF5EF] via-[#FFDAC8] to-[#FFF0E8]"
      id="communities-feature"
    >
      <div className="absolute w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.12)_0%,transparent_65%)] -top-[250px] -right-[150px] pointer-events-none" />
      <div className="absolute w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.35)_0%,transparent_65%)] -bottom-[200px] -left-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(210,199,255,0.1)_0%,transparent_70%)] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-[1]">
        <div className="reveal flex flex-col gap-5">
          <Typography
            variant="h2"
            as="h2"
            uppercase
            weight="light"
            className="text-[#162047] leading-tight m-0"
          >
            {title}
          </Typography>

          {isHtmlDescription ? (
            <div
              className="strapi-richtext-body text-[#162047]/85 leading-relaxed m-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <Typography variant="b1" as="p" className="text-[#162047]/85 m-0">
              {description}
            </Typography>
          )}

          <Button
            href={cta.url}
            color="primary"
            rightIcon={
              <ArrowRightSvg className="transition-transform duration-300 group-hover:translate-x-1" />
            }
            aria-label={`${cta.label} about our work in communities`}
            className="reveal stagger-2 self-start mt-2"
          >
            {cta.label}
          </Button>
        </div>

        <div className="reveal stagger-1">
          <div className="aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative w-full">
            {displayImage && (
              <Image
                src={displayImage.src}
                alt={displayImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
