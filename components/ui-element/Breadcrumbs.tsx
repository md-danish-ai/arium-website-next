import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  uppercase?: boolean;
}

export default function Breadcrumbs({
  items,
  className = "",
  separator = "/",
  uppercase = false,
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="list-none p-0 m-0 flex items-center gap-2 font-body text-[0.78rem] tracking-[0.04em]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayLabel = uppercase ? item.label.toUpperCase() : item.label;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="!text-[#162047] hover:!text-[#162047]/60 no-underline transition-colors duration-200"
                  >
                    {displayLabel}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="!text-[#162047] font-medium"
                  >
                    {displayLabel}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="!text-[#162047]/30 text-[0.7rem] select-none">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
