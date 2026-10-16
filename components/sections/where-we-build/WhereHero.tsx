export default function WhereHero() {
  return (
    <section className="ov-hero" id="overview-hero">
      <div className="ov-hero-bg">
        <video autoPlay muted loop playsInline>
          <source src="/assets/video/charlotte-communities.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="ov-hero-overlay"></div>
      <div className="container ov-hero-content">
        <h1 className="ov-hero-heading reveal stagger-1">Building the wireless networks we rely on</h1>
        <p className="ov-hero-intro reveal stagger-2">We build wireless infrastructure in two main places: out in communities and inside buildings and venues. Each environment has unique needs, so we design each network to fit the space and people that use them.</p>
      </div>
    </section>
  );
}
