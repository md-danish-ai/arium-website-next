interface ContactHeroProps {
  heading?: string;
  intro?: string;
}

export default function ContactHero({ heading, intro }: ContactHeroProps) {
  return (
    <section
      className="subpage-header relative overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFE8D6] to-[#FFDAC8] pt-[180px] md:pt-[200px] pb-24 md:pb-32 px-6"
      id="contact-header"
    >
      {/* Ambient glow: top-right teal */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      {/* Ambient glow: bottom-left warm */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="subpage-header-inner relative z-[1] flex flex-col items-center text-center">
        <div className="subpage-header-text flex flex-col items-center text-center max-w-[960px]">
          <h1 className="subpage-title reveal stagger-1 font-heading text-3xl md:text-5xl uppercase tracking-wider text-[#162047] font-light leading-tight mb-4">
            {heading || "Contact us"}
          </h1>
          <p className="subpage-intro reveal stagger-2 text-[#162047]/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {intro ||
              "Looking for more information? Or ready to discuss your connectivity needs? Fill out the form so we can connect you to the right team."}
          </p>
        </div>
      </div>
    </section>
  );
}
