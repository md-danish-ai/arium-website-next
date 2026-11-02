import React from "react";

interface FooterCopyrightProps {
  copyright?: string;
  className?: string;
}

export function FooterCopyright({ copyright, className = "" }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`w-full ${className}`}>
      <p className="text-xs text-white/60 font-body m-0">
        {copyright || `© ${currentYear} Arium Networks`}
      </p>
    </div>
  );
}
