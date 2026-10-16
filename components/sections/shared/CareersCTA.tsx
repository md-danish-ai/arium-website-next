import Image from "next/image";
import Link from "next/link";

interface CareersCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
}

export default function CareersCTA({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage = "/assets/images/careers-bg.jpg"
}: CareersCTAProps) {
  return (
    <section className="careers-cta-section" id="careers-cta">

      <div className="careers-cta-bg">
        <Image 
          src={backgroundImage} 
          alt="Careers Background" 
          fill
          style={{ objectFit: "cover" }}
          className="careers-cta-bg-img" 
        />
      </div>
      

      <div className="careers-cta-content">
        <div className="container text-center">
          <div className="careers-cta-textbox">
            <h2 className="section-title reveal stagger-1" style={{ fontSize: "2.5rem", fontWeight: 400 }}>
              {title}
            </h2>
            <p className="section-description reveal stagger-2" style={{ maxWidth: "800px", margin: "16px auto 0" }}>
              {description}
            </p>
            <div className="reveal stagger-3" style={{ marginTop: "32px" }}>
              <Link href={buttonLink} className="btn-primary">{buttonText}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
