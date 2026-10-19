interface CareersEEOProps {
  data?: {
    body?: string;
  };
}

export default function CareersEEO({ data }: CareersEEOProps) {
  return (
    <section className="reveal relative overflow-hidden py-10 bg-gradient-to-b from-white via-[#f6f8fa] to-[#efeaf7]" id="eeo-statement">
      <div className="container relative z-[1]">
        <div className="reveal max-w-5xl mt-24 mb-0 mx-auto px-6 text-center">
          {data?.body ? (
            <div 
              className="font-body text-xs md:text-sm leading-relaxed text-[#162047]/80 mx-auto font-normal tracking-wide text-center"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="font-body text-xs md:text-sm leading-relaxed text-[#162047]/80 mx-auto font-normal tracking-wide text-center">
              We are an equal opportunity employer. We recruit, hire and promote without regard to race, color, religion, creed, national origin or ancestry, ethnicity, sex (including pregnancy or pregnancy related conditions), gender (including gender identity and expression, and status as a transgender individual), sexual orientation, age, physical or mental disability, citizenship, past, current or prospective service in the uniformed services, genetic information, marital status or any other characteristic protected under applicable federal, state or local law.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
