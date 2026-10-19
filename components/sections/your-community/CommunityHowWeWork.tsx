"use client";
import Image from "next/image";
import Link from "next/link";

interface CommunityHowWeWorkProps {
  data?: {
    title?: string;
    body?: string;
    media?: {
      url: string;
    };
    cta?: {
      label: string;
      url: string;
    };
  };
}

export default function CommunityHowWeWork({ data }: CommunityHowWeWorkProps) {
  const imageUrl = "/assets/images/how-we-work-community.png";
  return (
    <section id="how-we-work" className="relative overflow-hidden p-0">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center block"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0d1224]/80 via-[#0d1224]/50 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-[200px] z-[1] bg-gradient-to-t from-[#0d1224]/50 to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-[150px] z-[1] bg-gradient-to-b from-[#0d1224]/40 to-transparent" />

      <div className="container relative z-[2] py-32 md:py-40">
        <div className="max-w-[560px]">
          <h2 className="reveal font-heading text-white text-3xl md:text-5xl font-normal uppercase leading-tight mb-6">
            {data?.title || "How we work in your community"}
          </h2>
          {data?.body ? (
            <div
              className="reveal stagger-1 text-white/85 text-base md:text-lg leading-relaxed mb-9 flex flex-col gap-5"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <div className="text-white/85 text-base md:text-lg leading-relaxed mb-9 space-y-5">
              <p className="reveal stagger-1 m-0">
                We are expanding our small cell network across every major U.S. market. We use a structured, collaborative process that balances the needs of local communities, municipalities, and wireless carriers.
              </p>
              <p className="reveal stagger-2 m-0">
                This means building the vital connectivity that meets current needs while being ready for future technologies and growth.
              </p>
            </div>
          )}
          {data?.cta ? (
            <Link 
              href={data.cta.url} 
              aria-label={`${data.cta.label} about how we work in your community`} 
              className="reveal stagger-3 inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-semibold bg-[#00e8d9] text-[#162047] border-2 border-[#00e8d9] rounded-full px-10 py-3.5 hover:bg-transparent hover:text-[#00e8d9] transition-all duration-300 hover:-translate-y-0.5"
            >
              {data.cta.label}
            </Link>
          ) : (
            <Link 
              href="/right-of-ways" 
              aria-label="Learn more about how we work in your community" 
              className="reveal stagger-3 inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-semibold bg-[#00e8d9] text-[#162047] border-2 border-[#00e8d9] rounded-full px-10 py-3.5 hover:bg-transparent hover:text-[#00e8d9] transition-all duration-300 hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
