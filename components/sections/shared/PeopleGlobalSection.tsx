"use client";
import { useState, useEffect, useRef } from "react";

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
      imageUrl = `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imageUrl}`;
    }


    return {
      name: card.Name || "",
      role: card.Designation || "",
      image: imageUrl,
      bio: card.Description ? card.Description.split('\n\n').map(p => `<p>${p}</p>`).join('') : "",
      modalBg: card.ModalUpperSectionBg || "var(--color-midnight-blue)" // default fallback
    };
  });

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
          const closeBtn = modalRef.current.querySelector('.people-modal-close') as HTMLElement;
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
      <section className="people-global-section" style={{ position: "relative", padding: "60px 0 100px" }}>
        <div className="container">
          <div className="people-grid-wrapper">
            <div className="people-grid">
              {membersList.map((leader, index) => (
                <div
                  key={index}
                  className={`people-card reveal stagger-${(index % 4) + 1}`}
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
                  <div className="people-card-img">
                    <img src={leader.image} alt={leader.name} />
                  </div>
                  <div className="people-card-overlay">
                    <h2>{leader.name}</h2>
                    <p>{leader.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`people-modal ${activeLeader ? 'active' : ''}`}
        id="people-modal"
        aria-hidden={!activeLeader}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div className="people-modal-backdrop" onClick={closeModal}></div>
        <div className="people-modal-content">
          <button className="people-modal-close" onClick={closeModal} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {activeLeader && (
            <>
              <div
                className="people-modal-top"
                style={{ backgroundColor: activeLeader.modalBg }}
              >
                <div className="people-modal-photo-wrap">
                  <img className="people-modal-photo" src={activeLeader.image} alt={activeLeader.name} />
                </div>
                <div className="people-modal-identity">
                  <h2 className="people-modal-name">{activeLeader.name}</h2>
                  <p className="people-modal-role">{activeLeader.role}</p>
                </div>
              </div>
              <div
                className="people-modal-bottom"
                dangerouslySetInnerHTML={{ __html: activeLeader.bio }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
