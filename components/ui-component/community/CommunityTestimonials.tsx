import React from "react";

interface TestimonialCard {
  title: string;
  badge: string;
  description: string;
}

interface CommunityTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const TESTIMONIAL_STYLES = [
  { "--kpi-color": "#00b4a0", "--glow-color": "0, 180, 160", "--footer-bg": "var(--color-secondary-teal)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
  { "--kpi-color": "#e8935a", "--glow-color": "232, 147, 90", "--footer-bg": "var(--color-secondary-peach)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
  { "--kpi-color": "#8b6fe6", "--glow-color": "139, 111, 230", "--footer-bg": "var(--color-secondary-purple)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
];

const FALLBACK_TESTIMONIALS = [
  {
    title: "Dewitt",
    badge: "President & CEO, Downtown Austin Alliance",
    description: "Wireless connectivity is so critically important in today's economy. It's like roadways. It's infrastructure that we have to have.\"",
  },
  {
    title: "Rob",
    badge: "City Sustainability Director",
    description: "It's not just the technology and the connectivity, but it's how we work, too.\"",
  },
  {
    title: "Kari",
    badge: "Real Estate Agent",
    description: "I use my phone as my lifeline to get my job done.\"",
  }
];

export default function CommunityTestimonials({ data }: CommunityTestimonialsProps) {
  const testimonials = data?.cards?.length ? data.cards : FALLBACK_TESTIMONIALS;
  return (
    <section className="section-light bg-transparent py-20 relative overflow-hidden" id="testimonials">
      <div className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="container relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-18">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-wide text-3xl md:text-4xl leading-relaxed text-[#162047] max-w-[880px] mx-auto">
            {data?.title || "Communities support advanced connectivity"}
          </h2>
        </div>

        <div className="tm-row community-tm-row grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div 
                key={index} 
                className={`tm-panel reveal stagger-${(index % 3) + 1} relative rounded-[24px] p-8 md:p-9 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`} 
                style={style}
              >
                <span className="tm-quote-symbol text-4xl font-serif leading-none mb-3 opacity-40 text-[#162047]">“</span>
                <p className="tm-panel-text text-base italic text-[#162047]/85 leading-relaxed flex-1 mb-6">
                  {testimonial.description}
                </p>
                <div className="tm-panel-footer pt-4 border-t border-black/10">
                  <p className="tm-panel-name font-heading font-bold text-sm tracking-wide text-[#162047] m-0">
                    {testimonial.title}
                  </p>
                  <p className="tm-panel-role text-xs text-[#162047]/60 mt-1 m-0">
                    {testimonial.badge}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
