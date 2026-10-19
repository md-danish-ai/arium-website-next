import Link from "next/link";

interface FinalCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function FinalCTA({
  title,
  description,
  buttonText,
  buttonLink
}: FinalCTAProps) {
  return (
    <section className="cta" id="contact">
      <div className="cta-flex-wrapper">
        <div className="cta-text-col">
          <h2 className="cta-title reveal stagger-1 text-[2.4rem] font-normal tracking-[0.06em] leading-[1.45]">
            {title}
          </h2>
          <p className="cta-description reveal stagger-2">
            {description}
          </p>
          <div className="cta-actions reveal stagger-3">
            <Link href={buttonLink} className="cta-btn-outline">{buttonText}</Link>
          </div>
        </div>
      </div>
      <div className="cta-illustration-wrap" aria-hidden="true">
        <img src="/assets/images/connection-cta.svg" alt="Connection illustration" className="cta-illustration-img" />
        <div className="cta-illustration-fade" aria-hidden="true"></div>
      </div>
    </section>
  );
}
