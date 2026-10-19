import React from "react";
import Link from "next/link";

interface RightOfWayHeroProps {
  data?: {
    heroTag?: string;
    heroTitle?: string;
    heroDescription?: string;
    heroCtas?: { label: string; url: string };
  };
}

export default function RightOfWayHero({ data }: RightOfWayHeroProps) {
  return (
    <section className="subpage-header relative overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFE8D6] to-[#FFDAC8] pt-[180px] md:pt-[200px] pb-24 md:pb-32 px-6" id="row-header">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <nav className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2] px-6 md:px-16" aria-label="Breadcrumb">
        <ol className="list-none p-0 m-0 flex items-center gap-2 font-body text-xs tracking-wider">
          <li>
            <Link href="/where-we-build" className="text-[#162047]/50 hover:text-[#162047] no-underline transition-colors duration-300">
              Where We Build
            </Link>
          </li>
          <li className="text-[#162047]/30 text-[0.7rem]">/</li>
          <li className="text-[#162047]/80 font-medium">{data?.heroTag || "Right of Way"}</li>
        </ol>
      </nav>

      <div className="subpage-header-inner relative z-[1] flex flex-col items-center text-center">
        <div className="subpage-header-text flex flex-col items-center text-center max-w-[960px]">
          <p className="reveal stagger-1 font-body text-sm md:text-base font-medium text-[#162047]/70 mb-4 tracking-widest uppercase">
            {data?.heroTag || "Right of Way"}
          </p>
          <div className="reveal stagger-1 w-12 h-[2px] bg-[#162047] mx-auto mb-5" />
          <h1 className="subpage-title reveal stagger-2 font-heading font-light text-3xl md:text-5xl uppercase tracking-wider text-[#162047] leading-tight mb-5">
            {data?.heroTitle || "Connectivity that moves communities forward"}
          </h1>
          <p className="subpage-intro reveal stagger-3 text-[#162047]/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {data?.heroDescription || "As technology advances, small cells keep your community connected to what matters."}
          </p>
          <div className="reveal stagger-4 mt-7">
            <Link 
              href={data?.heroCtas?.url || "/contact"} 
              className="row-hero-cta group inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-semibold bg-[#162047] !text-white border-2 border-[#162047] rounded-full px-9 py-3.5 hover:bg-transparent hover:!text-[#162047] transition-all duration-300 hover:-translate-y-0.5 no-underline shadow-sm"
              style={{ color: "#ffffff" }}
            >
              <span className="!text-white group-hover:!text-[#162047] transition-colors duration-300" style={{ color: "#ffffff" }}>
                {data?.heroCtas?.label || "Contact Us"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
