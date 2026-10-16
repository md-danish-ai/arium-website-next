import Image from "next/image";
import Link from "next/link";

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
  { title: "Commercial, Strategy & Project Management" }
];

export default function CareersJobAreas({ data }: CareersJobAreasProps) {
  const jobAreas = data?.cards?.length ? data.cards : FALLBACK_JOB_AREAS;
  return (
    <section id="job-areas" className="section-light" style={{ background: "transparent !important", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true"></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Centered Header */}
        <div className="section-header text-center" style={{ marginBottom: "56px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "Our Core Job Areas"}
          </h2>
          {data?.body ? (
            <div 
              className="reveal stagger-1" 
              style={{ color: "rgba(22,32,71,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "800px", margin: "20px auto 0" }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="reveal stagger-1" style={{ color: "rgba(22,32,71,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "800px", margin: "20px auto 0" }}>Our teams work cross-functionally to design, build, and support wireless infrastructure. These core job types include:</p>
          )}
        </div>

        <div className="cr-jobs-grid">
          {/* LEFT: Job list + CTA */}
          <div className="cr-jobs-left" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
              {jobAreas.map((area, index) => {
                const accentColor = JOB_AREA_ACCENTS[index % JOB_AREA_ACCENTS.length];
                return (
                  <div key={index} className={`cr-job-box reveal stagger-${(index % 5) + 1}`} style={{ "--item-accent": accentColor } as React.CSSProperties}>
                    <h3 className="cr-job-box-title">{area.title}</h3>
                  </div>
                );
              })}
            </div>

            <div className="reveal stagger-5" style={{ marginTop: "36px" }}>
              <Link href="https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL" target="_blank" rel="noopener noreferrer" className="btn-primary">Explore opportunities</Link>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="cr-jobs-right reveal">
            <div className="cr-jobs-img-box">
              <Image
                src="/assets/images/team.png"
                alt="Arium Networks team collaborating in a modern office"
                fill
                style={{ objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, borderRadius: "20px", border: "1px solid rgba(22,32,71,0.1)", pointerEvents: "none" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
