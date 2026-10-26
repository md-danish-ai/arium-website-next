"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { CloseIconSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";
import { extractMediaUrl } from "@utils";
import type { PeopleMemberItem } from "@data/leadership.data";

export type { PeopleMemberItem };

type StrapiImageField =
  | { data?: { attributes?: { url: string } } }
  | { url: string }[]
  | { url: string }
  | Record<string, unknown>;

export interface PeopleCard {
  Name?: string;
  title?: string;
  Designation?: string;
  badge?: string;
  Image?: StrapiImageField;
  image?: StrapiImageField;
  Description?: string;
  description?: string;
  ModalUpperSectionBg?: string;
}

export interface PeopleGlobalSectionProps {
  members?: PeopleMemberItem[];
  cards?: PeopleCard[];
  data?: {
    cards?: PeopleCard[];
  };
}

const STATIC_FALLBACK_IMAGES: Record<string, string> = {
  // Board of Directors
  "Marni M. Walden": "/images/team/placeholder-female.png",
  "Gerard Ainsztein": "/images/team/placeholder-male.png",
  "Tim Biltz": "/images/team/placeholder-male.png",
  "Tim Cohen": "/images/team/placeholder-male.png",
  "Bill Hogg": "/images/team/placeholder-male.png",
  "Nirav Shah": "/images/team/placeholder-male.png",
  // Leadership Team
  'Laurent "LT" Therivel': "/images/team/placeholder-male.png",
  "Jerry Karnick": "/images/team/placeholder-male.png",
  "Karen Rohrkemper": "/images/team/placeholder-female.png",
  "Jeffery Schott": "/images/team/placeholder-male.png",
  "Manjula Sriram": "/images/team/placeholder-female.png",
  "John Townsend": "/images/team/placeholder-male.png",
};

export default function PeopleGlobalSection({ members, cards, data }: PeopleGlobalSectionProps) {
  // If clean `members` prop is passed, use it directly!
  const legacyCards = cards || data?.cards || [];
  const processedLegacy: PeopleMemberItem[] = legacyCards.map((card) => {
    const name = card.Name || card.title || "";
    const role = card.Designation || card.badge || "";
    const bioText = card.Description || card.description || "";

    const rawImage = card.Image || card.image;
    const extractedUrl = extractMediaUrl(rawImage);
    let imageUrl =
      extractedUrl || STATIC_FALLBACK_IMAGES[name] || "/images/team/placeholder-male.png";

    if (imageUrl.startsWith("/") && !imageUrl.startsWith("/images")) {
      imageUrl = GetStrapiMediaUrl(imageUrl);
    }

    return {
      name,
      role,
      image: imageUrl,
      bio: bioText
        ? bioText
            .split("\n\n")
            .map((p) => `<p>${p}</p>`)
            .join("")
        : "",
      modalBg: card.ModalUpperSectionBg || "#162047",
    };
  });

  const membersList = members && members.length > 0 ? members : processedLegacy;

  const [activeLeader, setActiveLeader] = useState<PeopleMemberItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (leader: PeopleMemberItem, currentTarget: HTMLElement) => {
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
        <Container>
          <div className="people-grid-wrapper max-w-[1200px] mx-auto -mt-32 sm:-mt-36 md:-mt-44 lg:-mt-44 relative z-[2]">
            <div className="people-grid flex flex-wrap justify-center gap-6">
              {membersList.map((leader, index) => (
                <div
                  key={index}
                  className={`people-card reveal stagger-${(index % 4) + 1} relative rounded-xl overflow-hidden cursor-pointer aspect-[4/4.6] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl group w-full max-w-[400px] sm:max-w-none sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
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
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-[center_15%] block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="people-card-overlay absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#0a0e20]/85 via-[#0a0e20]/40 to-transparent z-[2]">
                    <Typography
                      as="h3"
                      variant="b2"
                      uppercase
                      weight="semibold"
                      className="text-white m-0 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {leader.name}
                    </Typography>
                    <Typography
                      as="p"
                      variant="b4"
                      className="text-white/80 m-0 leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {leader.role}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
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
          className={`people-modal-content relative z-[1] w-[90vw] max-w-[480px] min-[769px]:w-[92vw] min-[769px]:max-w-[1080px] max-h-[85vh] sm:max-h-[88vh] bg-[#101830] rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-400 ${activeLeader ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
        >
          <button
            className="people-modal-close absolute top-4 right-4 sm:top-5 sm:right-5 z-[5] bg-transparent border-none p-2 text-white/70 hover:text-white cursor-pointer transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            <CloseIconSvg className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {activeLeader && (
            <>
              <div
                className="people-modal-top flex flex-col items-center text-center p-6 pt-8 pb-6 min-[769px]:flex-row min-[769px]:items-center min-[769px]:text-left min-[769px]:p-10 min-[769px]:gap-8 border-b border-white/10 shrink-0 relative"
                style={{ backgroundColor: activeLeader.modalBg || "#162047" }}
              >
                <div className="people-modal-photo-wrap shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 min-[769px]:w-32 min-[769px]:h-32 rounded-full min-[769px]:rounded-2xl overflow-hidden mb-3.5 min-[769px]:mb-0">
                  <Image
                    className="people-modal-photo object-cover object-[center_15%]"
                    src={activeLeader.image}
                    alt={activeLeader.name}
                    fill
                    sizes="(max-width: 768px) 112px, 128px"
                  />
                </div>
                <div className="people-modal-identity w-full min-[769px]:w-auto min-[769px]:flex-1">
                  <Typography
                    as="h2"
                    variant="h3"
                    uppercase
                    className="people-modal-name text-white m-0 mb-1 text-center min-[769px]:text-left text-xl sm:text-2xl tracking-wide font-normal"
                  >
                    {activeLeader.name}
                  </Typography>
                  <Typography
                    as="p"
                    variant="b3"
                    className="people-modal-role text-[#00e8d9] m-0 text-center min-[769px]:text-left font-medium text-sm sm:text-base"
                  >
                    {activeLeader.role}
                  </Typography>
                </div>
              </div>
              <div
                className="people-modal-bottom p-6 sm:p-8 min-[769px]:p-10 lg:p-12 overflow-y-auto flex-1 columns-1 min-[769px]:columns-2 gap-8 lg:gap-10 bg-white rounded-b-[24px] text-[#0d1224]/80 text-sm sm:text-base leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&>p]:[break-inside:avoid]"
                dangerouslySetInnerHTML={{ __html: activeLeader.bio }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
