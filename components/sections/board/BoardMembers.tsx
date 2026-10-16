
"use client";
import { useState, useEffect, useRef } from "react";

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
        image: card.image?.[0]?.url || STATIC_IMAGES[card.title] || "/assets/images/team/placeholder-male.png",
        bio: card.description.split('\n\n').map(p => `<p>${p}</p>`).join(''),
      }))
    : [];

  const [activeLeader, setActiveLeader] = useState<typeof membersList[0] | null>(null);
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
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab' && activeLeader && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (modalRef.current) {
          const closeBtn = modalRef.current.querySelector('.bd-modal-close') as HTMLElement;
          if (closeBtn) closeBtn.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeLeader]);

  return (
    <>
      <section id="board-members" style={{ background: "linear-gradient(180deg, #FFF0E8 0%, #FFF5EF 50%, #FFFAF7 100%)", padding: "60px 0 100px", position: "relative" }}>
        <div className="container">
          <div className="bd-grid" style={{ marginTop: "-180px", position: "relative", zIndex: 2 }}>
            {membersList.map((leader, index) => (
              <div
                key={index}
                className={`bd-card reveal stagger-${(index % 6) + 1}`}
                onClick={(e) => openModal(leader, e.currentTarget)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(leader, e.currentTarget);
                  }
                }}
              >
                <div className="bd-card-img">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="bd-card-overlay">
                  <h2>{leader.name}</h2>
                  <p>{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div 
        className={`bd-modal ${activeLeader ? 'active' : ''}`} 
        id="bd-modal" 
        aria-hidden={!activeLeader}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div className="bd-modal-backdrop" onClick={closeModal}></div>
        <div className="bd-modal-content">
          <button className="bd-modal-close" onClick={closeModal} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {activeLeader && (
            <>
              <div className="bd-modal-top">
                <div className="bd-modal-photo-wrap">
                  <img className="bd-modal-photo" src={activeLeader.image} alt={activeLeader.name} />
                </div>
                <div className="bd-modal-identity">
                  <h2 className="bd-modal-name">{activeLeader.name}</h2>
                  <p className="bd-modal-role">{activeLeader.role}</p>
                </div>
              </div>
              <div
                className="bd-modal-bottom"
                dangerouslySetInnerHTML={{ __html: activeLeader.bio }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
