import React from "react";

interface FooterCopyrightProps {
  copyright?: string;
}

export function FooterCopyright({ copyright }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full mt-8 min-[601px]:mt-14 pt-2 min-[601px]:pt-3">
      <p className="text-[0.78rem] text-white/60 text-right min-[601px]:text-right m-0">
        {copyright || `© ${currentYear} Arium Networks.`}
      </p>
    </div>
  );
}
