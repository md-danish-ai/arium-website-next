import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";

interface StatItem {
  value?: string;
  Number?: string;
  label?: string;
  Label?: string;
}

interface SolutionsSmallCellsProps {
  data?: {
    title?: string;
    body?: string;
    stats?: StatItem[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function SolutionsSmallCells({ data }: SolutionsSmallCellsProps) {
  const defaultStats: StatItem[] = [
    { value: "100K+", label: "small cells on air or under contract" },
    { value: "700+", label: "municipalities served" },
  ];

  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const imgUrl = data?.media?.[0]?.url || "/assets/images/live_small-cells-illustration.svg";

  return (
    <section className="bg-transparent py-10 md:py-16 lg:py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-[1200px]">
        <div className="sol-split grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full max-w-[520px] md:max-w-none mx-auto">
          <div className="sol-split-text flex flex-col order-1">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              weight="normal"
              className="section-title text-left text-[#162047] m-0 mb-3"
            >
              {data?.title || "Small Cells"}
            </Typography>

            {data?.body ? (
              <div
                className="strapi-richtext-body text-[#162047]/80 text-[clamp(0.9rem,1.1vw,1rem)] leading-[1.8] mb-6 flex flex-col gap-4 [&>p]:m-0"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <div className="text-[#162047]/80 mb-6 flex flex-col gap-4">
                <Typography variant="b1" as="p" className="text-[#162047]/80 m-0 leading-[1.8]">
                  For more than 15 years, we&apos;ve partnered with mobile network operators (MNOs)
                  to design and deploy small cells that add targeted coverage and capacity. Our
                  discrete antennas help communities and wireless carriers keep pace with growing
                  demand.
                </Typography>
                <Typography variant="b1" as="p" className="text-[#162047]/80 m-0 leading-[1.8]">
                  Our small cell networks strengthen everyday connectivity and critical
                  communication—supporting faster speeds and more reliable service.
                </Typography>
              </div>
            )}

            <div className="sol-kpis-row flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-2">
              {stats.map((stat, index) => {
                const num = stat.value || stat.Number;
                const lbl = stat.label || stat.Label;
                return (
                  <div key={index} className="sol-kpi-item flex flex-col gap-1 py-2 cursor-default">
                    {num && (
                      <Typography
                        variant="stat"
                        weight="bold"
                        className="sol-kpi-num text-[#7c5cbf] leading-none"
                      >
                        {num}
                      </Typography>
                    )}
                    {lbl && (
                      <Typography
                        variant="b4"
                        as="p"
                        uppercase
                        weight="normal"
                        className="sol-kpi-label tracking-wider text-[#162047]/80 m-0 mt-1 max-w-[220px]"
                      >
                        {lbl}
                      </Typography>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-[#162047]/10 mt-7" />
          </div>

          <div className="sol-illustration-wrapper small-cells-illust flex items-center justify-center md:justify-end self-center order-2 w-full">
            <div className="relative w-full max-w-[340px] md:max-w-[440px]">
              <Image
                src={imgUrl}
                alt={data?.media?.[0]?.alternativeText || "Small cells network illustration"}
                className={`w-full h-auto opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                  imgUrl.toLowerCase().endsWith(".svg") ? "svg-recolor" : ""
                }`}
                width={440}
                height={440}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
