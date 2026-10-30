import React from "react";
import { SharedTestimonials } from "@ui-common";
import type { WhereSubpageTestimonialsProps } from "./type";

export default function RightOfWayTestimonials({ title, cards }: WhereSubpageTestimonialsProps) {
  return <SharedTestimonials title={title} cards={cards} />;
}
