import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersEEOProps } from "./type";

export default function CareersEEO({
  bottom_message,
  statementText,
  contentHtml,
}: CareersEEOProps) {
  const text = bottom_message || statementText;

  return (
    <section className="reveal relative overflow-hidden pb-16 pt-4 bg-white" id="eeo-statement">
      <Container className="relative z-[1]">
        <div className="reveal max-w-4xl mx-auto text-center">
          {contentHtml ? (
            <div
              className="leading-[1.75] text-[#162047]/65 text-[clamp(0.74rem,0.9vw,0.82rem)] mx-auto tracking-[0.02em] text-center"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Typography
              variant="disclaimer"
              as="p"
              className="text-[#162047]/65 mx-auto text-center"
            >
              {text}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
}
