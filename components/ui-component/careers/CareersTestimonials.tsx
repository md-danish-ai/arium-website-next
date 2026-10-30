import React from "react";
import { SharedTestimonials } from "@ui-common";
import type { CareersTestimonialsProps } from "./type";

export default function CareersTestimonials({ title, cards = [] }: CareersTestimonialsProps) {
  return <SharedTestimonials title={title} cards={cards} />;
}
