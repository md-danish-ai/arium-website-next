export default function WhereHero() {
  return (
    <section className="ov-hero relative min-h-[520px] md:min-h-[640px] flex items-center justify-center overflow-hidden py-32 px-6" id="overview-hero">
      <div className="ov-hero-bg absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/assets/video/charlotte-communities.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="ov-hero-overlay absolute inset-0 bg-[#0d1428]/70 backdrop-blur-[2px] z-[1]"></div>
      <div className="container ov-hero-content relative z-[2] text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="ov-hero-heading reveal stagger-1 font-heading text-white text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-wider leading-tight mb-6">Building the wireless networks we rely on</h1>
        <p className="ov-hero-intro reveal stagger-2 text-white/80 text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">We build wireless infrastructure in two main places: out in communities and inside buildings and venues. Each environment has unique needs, so we design each network to fit the space and people that use them.</p>
      </div>
    </section>
  );
}
