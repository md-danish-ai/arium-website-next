import React from "react";
import DesktopLogoSvg from "@ui-svg/DesktopLogoSvg";
import MobileLogoSvg from "@ui-svg/MobileLogoSvg";
import ChevronDownIconSvg from "@ui-svg/ChevronDownIconSvg";

export { DesktopLogoSvg, MobileLogoSvg, ChevronDownIconSvg as ChevronDownIcon };

export function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <span
        className={`block w-5 h-[3px] bg-teal my-1 rounded-[2px] transition-all duration-300 ${
          isOpen ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block w-5 h-[3px] bg-teal my-1 rounded-[2px] transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block w-5 h-[3px] bg-teal my-1 rounded-[2px] transition-all duration-300 ${
          isOpen ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </>
  );
}
