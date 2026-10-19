import React from "react";

interface TestimonialCard {
  title: string;
  badge: string;
  description: string;
}

interface CareersTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const TESTIMONIAL_STYLES = [
  {
    "--kpi-color": "#00b4a0",
    "--glow-color": "0, 180, 160",
    "--footer-bg": "var(--color-secondary-teal)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Teal
  {
    "--kpi-color": "#8b6fe6",
    "--glow-color": "139, 111, 230",
    "--footer-bg": "var(--color-secondary-purple)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Purple
  {
    "--kpi-color": "#e8935a",
    "--glow-color": "232, 147, 90",
    "--footer-bg": "var(--color-secondary-peach)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Peach
];

const FALLBACK_TESTIMONIALS = [
  {
    title: "Gabe Villalobos",
    badge: "Project Manager",
    description:
      "At Arium Networks, you're surrounded by individuals who are experts in their respective fields that push you to want to grow and excel. You are heard and your opinions hold value.\"",
  },
  {
    title: "Emily Cates",
    badge: "Permitting Specialist",
    description:
      "Working here, I've been able to learn, grow, and feel truly valued. It has been incredibly rewarding—and thanks to the benefits, it even helped make starting my family possible.\"",
  },
  {
    title: "Anthony Price",
    badge: "Client Services Manager",
    description:
      'Working at Arium Networks is energizing because of the strong sense of ownership and accountability across the team. I get to move fast, solve challenges, and deliver outcomes that truly matter."',
  },
  {
    title: "Jessica Fernandez",
    badge: "Senior External Affairs Manager",
    description:
      'The best part of my role is being surrounded by accomplished people across the organization, working toward the same shared goal of building better connectivity. That makes the work especially rewarding."',
  },
];

export default function CareersTestimonials({ data }: CareersTestimonialsProps) {
  const testimonials = data?.cards?.length ? data.cards : FALLBACK_TESTIMONIALS;
  return (
    <section
      className="section-light bg-transparent py-20 relative overflow-hidden"
      id="testimonials"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="container relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-18">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-wide max-w-[880px] mx-auto text-3xl md:text-4xl leading-relaxed text-[#162047]">
            {data?.title || "Meet the Arium Networks Team"}
          </h2>
        </div>
        <div className="tm-row careers-tm-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div
                key={index}
                className={`tm-panel reveal stagger-${(index % 4) + 1} relative rounded-[24px] p-7 md:p-8 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`}
                style={style}
              >
                <span className="tm-quote-symbol text-4xl font-serif leading-none mb-3 opacity-40 text-[#162047]">
                  “
                </span>
                <p className="tm-panel-text text-sm md:text-base italic text-[#162047]/85 leading-relaxed flex-1 mb-6">
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
