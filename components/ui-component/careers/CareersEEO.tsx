import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersEEOProps } from "./type";

export default function CareersEEO({ contentHtml, statementText }: CareersEEOProps) {
  return (
    <section
      className="reveal relative overflow-hidden py-10 bg-gradient-to-b from-white via-[#f6f8fa] to-[#efeaf7]"
      id="eeo-statement"
    >
      <Container className="relative z-[1]">
        <div className="reveal max-w-5xl mt-24 mb-0 mx-auto text-center">
          {contentHtml ? (
            <div
              className="leading-relaxed text-[#162047]/80 mx-auto tracking-wide text-center"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Typography
              variant="b3"
              as="p"
              className="text-[#162047]/80 mx-auto tracking-wide text-center"
            >
              {statementText}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
}
