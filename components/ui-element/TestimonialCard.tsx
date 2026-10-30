import React from "react";
import Typography from "./Typography";

export interface TestimonialCardProps {
  /**
   * Person or author name / title
   */
  title: string;
  /**
   * Badge, designation, or role
   */
  badge?: string;
  /**
   * Testimonial quote or description
   */
  description: string;
  /**
   * Custom inline style (e.g. CSS variables for theme accents)
   */
  style?: React.CSSProperties;
  /**
   * Optional index for stagger animation sequence
   */
  index?: number;
  /**
   * Optional extra classes
   */
  className?: string;
}

export default function TestimonialCard({
  title,
  badge,
  description,
  style,
  index = 0,
  className = "",
}: TestimonialCardProps) {
  const staggerClass = typeof index === "number" ? `reveal stagger-${(index % 4) + 1}` : "reveal";

  const footerBg = (style as Record<string, unknown> | undefined)?.["--footer-bg"] as
    string | undefined;

  return (
    <div
      className={`${staggerClass} relative rounded-[24px] p-6 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5 ${className}`.trim()}
      style={style}
    >
      <span className="text-4xl font-serif leading-none mb-3 opacity-40 text-[#162047]">“</span>
      <Typography variant="quote" as="blockquote" className="text-[#162047]/85 flex-1 mb-6">
        {description}
      </Typography>
      {footerBg ? (
        <div
          className="rounded-[16px] px-5 py-3.5 flex flex-col justify-center border border-black/5"
          style={{ backgroundColor: footerBg }}
        >
          <Typography
            variant="b3"
            as="p"
            weight="semibold"
            className="m-0 text-[#162047] leading-snug"
          >
            {title}
          </Typography>
          {badge && (
            <Typography
              variant="b4"
              as="p"
              className="m-0 text-[#162047]/75 font-medium leading-snug"
            >
              {badge}
            </Typography>
          )}
        </div>
      ) : (
        <div className="pt-4 border-t border-black/10">
          <Typography variant="h6" as="p" weight="bold" className="text-[#162047] m-0">
            {title}
          </Typography>
          {badge && (
            <Typography variant="b4" as="p" className="text-[#162047]/60 mt-1 m-0">
              {badge}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
