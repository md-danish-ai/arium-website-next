import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@ui-element";

export interface ContactFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
}

export default function ContactFormField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  error,
  registration,
}: ContactFormFieldProps) {
  const borderClass = error
    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    : "border-[#162047]/40 hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20";

  return (
    <div className="flex flex-col gap-2">
      <Typography
        variant="b4"
        as="label"
        uppercase
        weight="medium"
        htmlFor={id}
        className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
      >
        {label} {required && <span className="text-red-600">*</span>}
      </Typography>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-transparent border-[1.5px] ${borderClass} rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs`}
        {...registration}
      />
      {error && <p className="text-red-600 text-xs mt-1 font-body leading-tight">{error}</p>}
    </div>
  );
}
