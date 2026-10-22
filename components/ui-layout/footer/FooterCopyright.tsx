import React from "react";

interface FooterCopyrightProps {
  copyright?: string;
}

export function FooterCopyright({ copyright }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-copyright-wrap w-full mt-10 min-[601px]:mt-14 pt-2 min-[601px]:pt-3">
      <p className="footer-copyright text-[0.78rem] text-white/60 text-right min-[601px]:text-right !mt-0 !mb-0">
        {copyright || `© ${currentYear} Arium Networks.`}
      </p>
    </div>
  );
}
