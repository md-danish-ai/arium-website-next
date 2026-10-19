"use client";
import { useState, useEffect, useRef } from "react";
import { GetStrapiMediaUrl } from "@lib/strapi";

interface PeopleCard {
  Name: string;
  Designation: string;
  Image?: { data?: { attributes?: { url: string } } } | { url: string }[] | { url: string } | any;
  Description: string;
  ModalUpperSectionBg?: string;
}

interface PeopleGlobalSectionProps {
  cards?: PeopleCard[];
}

export default function PeopleGlobalSection({ cards = [] }: PeopleGlobalSectionProps) {
  const membersList = cards.map((card) => {
    // Handle Strapi v4 nested media structure or direct url
    let imageUrl = "/assets/images/team/placeholder-male.png"; // default fallback

    if (card.Image) {
      if (Array.isArray(card.Image) && card.Image[0]?.url) {
        imageUrl = card.Image[0].url;
      } else if (card.Image?.url) {
        imageUrl = card.Image.url;
      } else if (card.Image?.data?.attributes?.url) {
        imageUrl = card.Image.data.attributes.url;
      }
    }

    // Add Strapi absolute URL prefix if it's a relative path
    if (imageUrl.startsWith("/") && !imageUrl.startsWith("/assets")) {
      imageUrl = GetStrapiMediaUrl(imageUrl);
    }

    return {
      name: card.Name || "",
      role: card.Designation || "",
      image: imageUrl,
      bio: card.Description
        ? card.Description.split("\n\n")
            .map((p) => `<p>${p}</p>`)
            .join("")
        : "",
      modalBg: card.ModalUpperSectionBg || "var(--color-midnight-blue)", // default fallback
    };
  });

  const [activeLeader, setActiveLeader] = useState<(typeof membersList)[0] | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (leader: any, currentTarget: HTMLElement) => {
    triggerRef.current = currentTarget;
    setActiveLeader(leader);
  };

  const closeModal = () => {
    setActiveLeader(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab" && activeLeader && modalRef.current) {
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

    if (activeLeader) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (modalRef.current) {
          const closeBtn = modalRef.current.querySelector(".people-modal-close") as HTMLElement;
          if (closeBtn) closeBtn.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeLeader]);

  return (
    <>
      <section className="people-global-section relative bg-gradient-to-b from-[#EDE9FF] via-[#F3F0FF] to-[#F8F7FF] pt-[60px] pb-24">
        <div className="container mx-auto px-6">
          <div className="people-grid-wrapper max-w-[1200px] mx-auto -mt-[180px] relative z-[2]">
            <div className="people-grid flex flex-wrap justify-center gap-6">
              {membersList.map((leader, index) => (
                <div
                  key={index}
                  className={`people-card reveal stagger-${(index % 4) + 1} relative rounded-xl overflow-hidden cursor-pointer aspect-[4/4.6] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl group w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]`}
                  onClick={(e) => openModal(leader, e.currentTarget)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(leader, e.currentTarget);
                    }
                  }}
                >
                  <div className="people-card-img absolute inset-0 w-full h-full">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="people-card-overlay absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#0a0e20]/85 via-[#0a0e20]/40 to-transparent z-[2]">
                    <h2 className="font-heading font-semibold text-[0.92rem] text-white m-0 mb-0.5">
                      {leader.name}
                    </h2>
                    <p className="text-[0.72rem] text-white/90 m-0 leading-tight">{leader.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`people-modal fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-350 ${activeLeader ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        id="people-modal"
        aria-hidden={!activeLeader}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div
          className="people-modal-backdrop absolute inset-0 bg-[#0a0e20]/50 backdrop-blur-md"
          onClick={closeModal}
        />
        <div
          className={`people-modal-content relative z-[1] w-[92vw] max-w-[1080px] max-h-[88vh] bg-midnight rounded-[20px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-450 ${activeLeader ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
        >
          <button
            className="people-modal-close absolute top-5 right-5 z-[5] bg-transparent border-none p-0 text-white/60 hover:text-white cursor-pointer transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {activeLeader && (
            <>
              <div
                className="people-modal-top flex items-center gap-8 p-8 md:p-12 border-b border-white/10 shrink-0"
                style={{ backgroundColor: activeLeader.modalBg }}
              >
                <div className="people-modal-photo-wrap shrink-0">
                  <img
                    className="people-modal-photo w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover block"
                    src={activeLeader.image}
                    alt={activeLeader.name}
                  />
                </div>
                <div className="people-modal-identity flex-1">
                  <h2 className="people-modal-name font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-normal text-white m-0 mb-1.5">
                    {activeLeader.name}
                  </h2>
                  <p className="people-modal-role font-body text-sm text-teal m-0">
                    {activeLeader.role}
                  </p>
                </div>
              </div>
              <div
                className="people-modal-bottom p-8 md:p-12 overflow-y-auto text-white/85 text-[0.95rem] leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: activeLeader.bio }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
