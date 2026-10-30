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
              className="leading-relaxed text-[#162047]/65 text-[0.8rem] md:text-[0.85rem] mx-auto tracking-normal text-center"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Typography
              variant="b4"
              as="p"
              className="text-[#162047]/65 text-[0.8rem] md:text-[0.85rem] mx-auto tracking-normal leading-relaxed text-center"
            >
              {text}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
}
