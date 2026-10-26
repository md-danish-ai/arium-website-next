import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersJobAreasProps } from "./type";

const JOB_AREA_ACCENTS = ["#00e8d9", "#8B6FE6", "#E8935A"];

export default function CareersJobAreas({
  title,
  contentHtml,
  description,
  jobAreas = [],
  cta,
  imageSrc = "/assets/images/team.png",
  imageAlt = "Arium Networks team collaborating in a modern office",
}: CareersJobAreasProps) {
  return (
    <section
      id="job-areas"
      className="section-light bg-transparent py-24 md:py-32 relative overflow-hidden"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-[2]">
        {/* Centered Header */}
        <div className="section-header text-center mb-14">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="reveal stagger-1 text-[#162047]/80 text-base md:text-lg leading-relaxed max-w-[800px] mx-auto mt-5"
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

        <div className="cr-jobs-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT: Job list + CTA */}
          <div className="cr-jobs-left flex flex-col justify-between">
            <div className="flex flex-col flex-1 divide-y divide-[#162047]/15">
              {jobAreas.map((area, index) => {
                const accentColor = JOB_AREA_ACCENTS[index % JOB_AREA_ACCENTS.length];
                return (
                  <div
                    key={index}
                    className={`cr-job-box reveal stagger-${(index % 5) + 1} py-5 flex items-center`}
                    style={{ "--item-accent": accentColor } as React.CSSProperties}
                  >
                    <Typography
                      variant="h5"
                      as="h3"
                      weight="medium"
                      className="cr-job-box-title inline-flex items-center gap-3 text-[#162047] m-0 text-left"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CBF] flex-shrink-0" />
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
          <div className="cr-jobs-right reveal">
            <div className="cr-jobs-img-box relative rounded-[20px] overflow-hidden shadow-2xl h-[320px] lg:h-full min-h-[320px]">
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
