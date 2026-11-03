import React from "react";
import { Typography } from "@ui-element";

interface FooterCopyrightProps {
  copyright?: string;
  className?: string;
}

export function FooterCopyright({ copyright, className = "" }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`w-full ${className}`}>
      <Typography variant="b4" as="p" className="text-white/60 m-0">
        {copyright || `© ${currentYear} Arium Networks`}
      </Typography>
    </div>
  );
}
