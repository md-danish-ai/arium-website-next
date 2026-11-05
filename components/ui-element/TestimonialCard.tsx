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
      className={`tm-panel reveal stagger-${(index % 4) + 1} relative bg-midnight rounded-[20px] md:rounded-[22px] xl:rounded-[28px] p-5 sm:p-6 md:px-[18px] md:py-[28px] xl:px-[30px] xl:py-[36px] shadow-none md:shadow-[0_10px_30px_rgba(0,0,0,0.075),0_30px_60px_rgba(0,0,0,0.05)] cursor-default overflow-hidden flex flex-col min-w-[220px] max-w-[280px] w-[280px] shrink-0 [scroll-snap-align:start] h-auto ${className}`}
    >
      <span
        className="tm-quote-symbol font-serif text-[3.5rem] md:text-[3.2rem] xl:text-[5rem] leading-none opacity-50 absolute top-3 left-4 md:top-3.5 md:left-4 xl:top-5 xl:left-7 pointer-events-none select-none text-teal"
        style={{ color: footerBg }}
      >
        “
      </span>
      <Typography
        variant="quote"
        as="blockquote"
        className="tm-panel-text not-italic z-[1] grow pt-10 md:pt-[26px] xl:pt-10 text-white relative m-0 mb-4 md:mb-[18px] xl:mb-6"
      >
        {person_message}
      </Typography>
      <div
        className="tm-panel-footer mx-[-20px] sm:mx-[-24px] md:mx-[-18px] xl:mx-[-30px] mb-[-20px] sm:mb-[-24px] md:mb-[-28px] xl:mb-[-36px] px-5 py-3 sm:px-6 md:px-[18px] md:py-3.5 xl:px-[30px] xl:py-5 border-0 md:border-t md:border-white/10 shrink-0 mt-auto"
        style={{ backgroundColor: footerBg }}
      >
        <Typography variant="h5" className="tm-panel-name text-midnight m-0 font-bold">
          {person_name}
        </Typography>
        <Typography
          variant="b4"
          as="p"
          className="tm-panel-role text-midnight/80 mt-1 mb-0 font-normal"
        >
          {person_designation}
        </Typography>
      </div>
    </div>
  );
}
