"use client";
import { useState, useEffect, useRef } from "react";
import { Typography } from "@ui-element";

interface BoardMemberCard {
  title: string;
  badge: string;
  description: string;
  image?: { url: string }[];
}

interface BoardMembersProps {
  data?: {
    cards?: BoardMemberCard[];
  };
}

const STATIC_IMAGES: Record<string, string> = {
  "Marni M. Walden": "/assets/images/team/placeholder-female.png",
  "Gerard Ainsztein": "/assets/images/team/placeholder-male.png",
  "Tim Biltz": "/assets/images/team/placeholder-male.png",
  "Tim Cohen": "/assets/images/team/placeholder-male.png",
  "Bill Hogg": "/assets/images/team/placeholder-male.png",
  "Nirav Shah": "/assets/images/team/placeholder-male.png",
};

export default function BoardMembers({ data }: BoardMembersProps) {
  // Use data.cards if available, mapped to our internal state structure
  const membersList = data?.cards?.length
    ? data.cards.map((card) => ({
        name: card.title,
        role: card.badge,
        image:
          card.image?.[0]?.url ||
          STATIC_IMAGES[card.title] ||
          "/assets/images/team/placeholder-male.png",
        bio: card.description
          .split("\n\n")
          .map((p) => `<p>${p}</p>`)
          .join(""),
      }))
    : [];

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
          const closeBtn = modalRef.current.querySelector(".bd-modal-close") as HTMLElement;
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
      <section
        id="board-members"
        className="relative py-16 pb-24 bg-gradient-to-b from-[#FFF0E8] via-[#FFF5EF] to-[#FFFAF7]"
      >
        <div className="container mx-auto px-6">
          <div className="-mt-44 relative z-[2]">
            <div className="bd-grid flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
              {membersList.map((leader, index) => (
                <div
                  key={index}
                  className={`bd-card reveal stagger-${(index % 6) + 1} group w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/3)] relative rounded-[10px] overflow-hidden cursor-pointer aspect-[4/4.6] shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`}
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
                  <div className="bd-card-img absolute inset-0 w-full h-full">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                  <div className="bd-card-overlay absolute bottom-0 left-0 right-0 pt-12 pb-4 px-4 bg-gradient-to-t from-[#0a0e20]/90 via-[#0a0e20]/40 to-transparent z-[2]">
                    <Typography
                      variant="h5"
                      as="h2"
                      weight="semibold"
                      className="text-white m-0 mb-0.5"
                    >
                      {leader.name}
                    </Typography>
                    <Typography variant="b4" as="p" className="text-white/90 leading-tight m-0">
                      {leader.role}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`bd-modal fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-350 ${activeLeader ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        id="bd-modal"
        aria-hidden={!activeLeader}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div
          className="bd-modal-backdrop absolute inset-0 bg-[#0a0e20]/60 backdrop-blur-md"
          onClick={closeModal}
        ></div>
        <div
          className={`bd-modal-content relative z-[1] w-[92vw] max-w-[1080px] max-h-[88vh] bg-[#101830] rounded-[20px] border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-400 ${activeLeader ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
        >
          <button
            className="bd-modal-close absolute top-4 right-4 md:top-5 md:right-5 z-[5] text-white/60 hover:text-white p-2 cursor-pointer transition-colors"
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
              <div className="bd-modal-top flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-12 border-b border-white/10 flex-shrink-0 text-center md:text-left">
                <div className="bd-modal-photo-wrap flex-shrink-0">
                  <img
                    className="bd-modal-photo w-20 h-20 md:w-36 md:h-36 rounded-full md:rounded-2xl object-cover object-top"
                    src={activeLeader.image}
                    alt={activeLeader.name}
                  />
                </div>
                <div className="bd-modal-identity flex-1">
                  <Typography variant="h3" as="h2" className="bd-modal-name text-white m-0 mb-1.5">
                    {activeLeader.name}
                  </Typography>
                  <Typography variant="b3" as="p" className="bd-modal-role text-[#00e8d9] m-0">
                    {activeLeader.role}
                  </Typography>
                </div>
              </div>
              <div
                className="bd-modal-bottom p-6 md:p-10 overflow-y-auto flex-1 columns-1 md:columns-2 gap-10 bg-white rounded-b-[20px] text-[#0d1224]/80 text-sm md:text-base leading-relaxed space-y-3.5"
                dangerouslySetInnerHTML={{ __html: activeLeader.bio }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
