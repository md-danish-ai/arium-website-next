import Link from "next/link";

interface LeadershipHeroProps {
  heading?: string;
  intro?: string;
}

export default function LeadershipHero({ heading, intro }: LeadershipHeroProps) {
  return (
    <section
      className="subpage-header relative bg-gradient-to-br from-[#B8A9F0] via-[#D2C7FF] to-[#DDD5FF] pt-[180px] md:pt-[200px] pb-36 md:pb-44 px-6 overflow-visible"
      id="leadership-header"
    >
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.18)_0%,transparent_65%)] -top-[100px] -right-[50px] pointer-events-none blur-[40px]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,transparent_60%)] top-[20%] left-[10%] pointer-events-none blur-[50px]" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(184,169,240,0.4)_0%,transparent_65%)] bottom-[10%] right-[20%] pointer-events-none blur-[60px]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_60%)] -bottom-[200px] -left-[100px] pointer-events-none blur-[30px]" />

      <nav
        className="reveal absolute top-[130px] md:top-[140px] left-0 right-0 z-[2] px-6 md:px-16"
        aria-label="Breadcrumb"
      >
        <ol className="list-none p-0 m-0 flex items-center gap-2 font-body text-xs tracking-wider">
          <li>
            <Link
              href="/about"
              className="breadcrumb-link text-[#162047]/50 hover:text-[#162047] no-underline transition-opacity duration-300"
            >
              Our Company
            </Link>
          </li>
          <li className="text-[#162047]/30 text-[0.7rem]">/</li>
          <li className="text-[#162047]/80 font-medium">Leadership</li>
        </ol>
      </nav>

      <div className="subpage-header-inner relative z-[1] flex flex-col items-center text-center">
        <div className="subpage-header-text flex flex-col items-center text-center max-w-[960px]">
          <h1 className="subpage-title reveal stagger-1 font-heading text-3xl md:text-5xl uppercase tracking-wider text-[#162047] font-light leading-tight mb-4">
            {heading || "Our Leadership"}
          </h1>
          <p className="subpage-intro reveal stagger-2 text-[#162047]/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {intro ||
              "Seasoned industry leaders driving strategic growth and operational excellence."}
          </p>
        </div>
      </div>
    </section>
  );
}
