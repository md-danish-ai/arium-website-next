"use client";
import Link from "next/link";

interface GlobeCTAProps {
  title?: string;
  heading?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export default function GlobeCTA({ title, heading, description, buttonText, buttonLink }: GlobeCTAProps) {
  return (
    <section className="section-padding subpage-cta-section py-24 bg-gradient-to-br from-[#FFFFCA] via-[#FFF8E1] to-[#FFDAC8] relative overflow-hidden">
      <div className="cta-bg-illustration absolute -right-[8%] top-1/2 -translate-y-1/2 -rotate-[25deg] w-[720px] h-[130%] pointer-events-none" aria-hidden="true">
        <img src="/assets/images/connection-globe-blue.svg" alt="" className="w-full h-full opacity-55 block" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffdac8]/40 to-[#ffdac8] pointer-events-none" />
      </div>
      
      <div className="container mx-auto px-6 relative z-[1]">
        <div className="sol-split reveal flex items-center">
          <div className="sol-split-text max-w-[580px]">
            {description ? (
              <>
                <h2 className="section-title text-left font-light mb-5 text-midnight whitespace-normal sm:whitespace-nowrap font-heading text-[clamp(1.8rem,3vw,2.4rem)] uppercase leading-tight">
                  {heading || title}
                </h2>
                <div 
                  className="strapi-richtext-body text-[1.05rem] leading-[1.8] text-midnight mb-9 flex flex-col gap-4 [&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </>
            ) : (
              <p className="font-heading text-[clamp(1.3rem,2.5vw,1.7rem)] leading-[1.5] text-midnight mb-9 font-light max-w-[580px] [text-wrap:balance]">
                {title || heading}
              </p>
            )}
            <Link 
              href={buttonLink} 
              className="inline-block px-10 py-3.5 rounded-full bg-midnight text-white font-heading text-[0.9rem] font-medium tracking-[0.06em] uppercase no-underline transition-all duration-350 ease-[cubic-bezier(0.2,1,0.2,1)] border-2 border-transparent hover:bg-transparent hover:text-midnight hover:border-midnight hover:-translate-y-0.5"
            >
              {buttonText}
            </Link>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
}
