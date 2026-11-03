import React from "react";
import Typography from "./Typography";

export interface TestimonialCardProps {
  id?: number | string;
  person_name: string;
  person_message: string;
  person_designation: string;
  card_footer_bg?: string | null;
  index?: number;
  className?: string;
}

export default function TestimonialCard({
  person_name,
  person_message,
  person_designation,
  card_footer_bg,
  index = 0,
  className = "",
}: TestimonialCardProps) {
  const footerBg = card_footer_bg || (index % 2 === 0 ? "#bcf6f2" : "#ffdac8");

  return (
    <div
      className={`tm-panel reveal stagger-${(index % 4) + 1} relative bg-midnight rounded-[28px] p-9 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.075),0_30px_60px_rgba(0,0,0,0.05)] cursor-default overflow-hidden flex flex-col h-full ${className}`}
    >
      <span
        className="tm-quote-symbol font-serif text-[5rem] leading-none opacity-50 absolute top-5 left-7 pointer-events-none select-none text-teal"
        style={{ color: footerBg }}
      >
        “
      </span>
      <Typography
        variant="quote"
        as="p"
        className="tm-panel-text z-[1] grow pt-10 text-white relative m-0 mb-6"
      >
        {person_message}
      </Typography>
      <div
        className="tm-panel-footer mx-[-36px] sm:mx-[-40px] mb-[-36px] sm:mb-[-40px] px-9 sm:px-10 py-5 border-t border-white/10 shrink-0"
        style={{ backgroundColor: footerBg }}
      >
        <Typography variant="h5" as="p" className="tm-panel-name text-midnight m-0">
          {person_name}
        </Typography>
        <Typography variant="b4" as="p" className="tm-panel-role text-midnight/80 mt-1 mb-0">
          {person_designation}
        </Typography>
      </div>
    </div>
  );
}
