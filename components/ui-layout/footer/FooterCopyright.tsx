import React from "react";

interface FooterCopyrightProps {
  copyright?: string;
}

export function FooterCopyright({ copyright }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full mt-6 min-[601px]:mt-10">
      <p className="text-[0.78rem] text-white/60 font-body text-center min-[601px]:text-right m-0">
        {copyright || `© ${currentYear} Arium Networks`}
      </p>
    </div>
  );
}
