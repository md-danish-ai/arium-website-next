import React from "react";
import { Typography } from "@ui-element";

export interface ContactHeroProps {
  heading?: string;
  intro?: string;
}

export default function ContactHero({
  heading = "Contact us",
  intro = "Looking for more information? Or ready to discuss your connectivity needs? Fill out the form so we can connect you to the right team.",
}: ContactHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFE8D6] to-[#FFDAC8] pt-[160px] md:pt-[200px] pb-20 md:pb-28 px-6"
      id="contact-header"
    >
      {/* Ambient glow: top-right teal */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      {/* Ambient glow: bottom-left warm */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,200,170,0.15)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="relative z-[1] flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center max-w-[960px]">
          <Typography
            variant="h2"
            uppercase
            className="reveal stagger-1 text-[#162047] mb-4 text-center"
          >
            {heading || "Contact us"}
          </Typography>
          <Typography
            variant="b1"
            className="reveal stagger-2 text-[#162047]/80 max-w-2xl mx-auto text-center"
          >
            {intro ||
              "Looking for more information? Or ready to discuss your connectivity needs? Fill out the form so we can connect you to the right team."}
          </Typography>
        </div>
      </div>
    </section>
  );
}
