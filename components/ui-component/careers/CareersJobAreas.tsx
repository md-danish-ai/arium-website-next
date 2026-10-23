import Image from "next/image";
import Link from "next/link";
import { Typography } from "@ui-element";

interface JobAreaCard {
  title: string;
}

interface CareersJobAreasProps {
  data?: {
    title?: string;
    body?: string;
    cards?: JobAreaCard[];
  };
}

const JOB_AREA_ACCENTS = ["#00e8d9", "#8B6FE6", "#E8935A"];

const FALLBACK_JOB_AREAS = [
  { title: "Network Engineering & Deployment" },
  { title: "Construction & Field Operations" },
  { title: "Technology, Systems & Data" },
  { title: "Corporate & Shared Services" },
  { title: "Commercial, Strategy & Project Management" },
];

export default function CareersJobAreas({ data }: CareersJobAreasProps) {
  const jobAreas = data?.cards?.length ? data.cards : FALLBACK_JOB_AREAS;
  return (
    <section
      id="job-areas"
      className="section-light bg-transparent py-24 md:py-32 relative overflow-hidden"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-[2]">
        {/* Centered Header */}
        <div className="section-header text-center mb-14">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {data?.title || "Our Core Job Areas"}
          </Typography>
          {data?.body ? (
            <div
              className="reveal stagger-1 text-[#162047]/80 text-base md:text-lg leading-relaxed max-w-[800px] mx-auto mt-5"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="reveal stagger-1 text-[#162047]/80 max-w-[800px] mx-auto mt-5"
            >
              Our teams work cross-functionally to design, build, and support wireless
              infrastructure. These core job types include:
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

            <div className="reveal stagger-5 mt-9">
              <Link
                href="https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-[#162047] text-white border border-[#162047] rounded-full px-9 py-3.5 hover:bg-transparent hover:text-[#162047] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Typography
                  variant="button"
                  uppercase
                  weight="semibold"
                  className="text-white group-hover:text-[#162047]"
                >
                  Explore opportunities
                </Typography>
              </Link>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="cr-jobs-right reveal">
            <div className="cr-jobs-img-box relative rounded-[20px] overflow-hidden shadow-2xl h-[320px] lg:h-full min-h-[320px]">
              <Image
                src="/assets/images/team.png"
                alt="Arium Networks team collaborating in a modern office"
                fill
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 rounded-[20px] border border-[#162047]/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
