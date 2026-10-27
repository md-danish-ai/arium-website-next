import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { ChevronsRightSvg } from "@ui-svg";
import type { CareersJobAreasProps } from "./type";

export default function CareersJobAreas({
  title,
  contentHtml,
  description,
  jobAreas = [],
  cta,
  imageSrc = "/images/team/team.png",
  imageAlt = "Arium Networks team collaborating in a modern office",
}: CareersJobAreasProps) {
  return (
    <section
      id="job-areas"
      className="section-light bg-white py-20 md:py-28 relative overflow-hidden !border-none"
    >
      <Container className="relative z-[2]">
        {/* Centered Header */}
        <div className="text-center mb-14">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047] tracking-[0.06em]"
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="reveal stagger-1 text-[#162047]/80 leading-relaxed max-w-[800px] mx-auto mt-5"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="reveal stagger-1 text-[#162047]/80 max-w-[800px] mx-auto mt-5"
            >
              {description}
            </Typography>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT: Job list + CTA */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col flex-1 divide-y divide-[#162047]/10">
              {jobAreas.map((area, index) => {
                return (
                  <div
                    key={index}
                    className={`reveal stagger-${(index % 5) + 1} py-5 flex items-center`}
                  >
                    <Typography
                      variant="h5"
                      as="h3"
                      weight="medium"
                      uppercase
                      className="inline-flex items-center gap-3 text-[#162047] m-0 text-left tracking-[0.06em] text-[0.95rem] md:text-[1rem]"
                    >
                      <ChevronsRightSvg className="w-5 h-5 shrink-0 text-[#7C5CBF]" />
                      {area.title}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {cta && (
              <div className="reveal stagger-5 mt-9">
                <Button href={cta.url} isExternal={cta.isExternal}>
                  {cta.label}
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT: Image */}
          <div className="reveal">
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl h-[320px] lg:h-full min-h-[320px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 rounded-[20px] border border-[#162047]/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
