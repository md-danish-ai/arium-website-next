"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Typography from "./Typography";
import { CloseIconSvg } from "@ui-svg";

export interface MemberModalItem {
  name: string;
  role: string;
  image: string;
  modal_image?: string;
  background_image_mobile?: string;
  description: string;
  modal_upper_section_background?: string;
}

export interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberModalItem | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function MemberModal({ isOpen, onClose, member, triggerRef }: MemberModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab" && isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (isOpen && member) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (modalRef.current) {
          const closeBtn = (modalRef.current.querySelector('button[aria-label="Close"]') ||
            modalRef.current.querySelector("button")) as HTMLElement;
          if (closeBtn) closeBtn.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, member, onClose, triggerRef]);

  if (!isOpen && !member) return null;

  const mobileImage = member?.background_image_mobile || member?.modal_image || member?.image || "";
  const desktopImage = member?.image || mobileImage;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen && member ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      id="member-modal"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div
        className="absolute inset-0 bg-[#0a0e20]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative z-[1] w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[840px] max-h-[88vh] bg-[#101830] rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen && member
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <button
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-[5] bg-transparent border-none p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIconSvg className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {member && (
          <>
            <div
              className="flex flex-col lg:flex-row items-center gap-3.5 sm:gap-4 lg:gap-7 pt-8 pb-6 px-6 sm:pt-9 sm:pb-7 sm:px-8 lg:p-8 shrink-0 relative text-center lg:text-left"
              style={{
                backgroundColor: member.modal_upper_section_background || "#162047",
              }}
            >
              <div className="shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full lg:rounded-2xl overflow-hidden border-2 lg:border border-white/15 shadow-md bg-white/5">
                <Image
                  className="object-cover object-[center_15%] lg:hidden"
                  src={mobileImage}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 112px, 128px"
                />
                <Image
                  className="object-cover object-[center_15%] hidden lg:block"
                  src={desktopImage}
                  alt={member.name}
                  fill
                  sizes="128px"
                />
              </div>

              <div className="flex-1 min-w-0 w-full lg:w-auto pr-0 lg:pr-10">
                <Typography
                  as="h2"
                  variant="h3"
                  uppercase
                  weight="normal"
                  className="text-white m-0 tracking-wider lg:tracking-wide uppercase"
                >
                  {member.name}
                </Typography>
                <Typography
                  as="p"
                  variant="b3"
                  weight="medium"
                  className="text-[#00e8d9] m-0 mt-1.5 leading-snug"
                >
                  {member.role}
                </Typography>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10 overflow-y-auto flex-1 rounded-b-[24px]">
              {member.description.includes("<") ? (
                <div
                  className="text-[#374151] text-sm sm:text-[15px] lg:text-base leading-[1.8] [&>p]:mb-4 sm:[&>p]:mb-5 [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {member.description.split("\n\n").map((paragraph, idx) => (
                    <Typography key={idx} variant="b2" as="p" className="text-[#374151] m-0">
                      {paragraph}
                    </Typography>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
