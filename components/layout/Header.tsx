"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ layoutData }: { layoutData?: any }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (!navRef.current) return;
          const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        } else if (e.key === 'Escape') {
          setIsMobileOpen(false);
          setOpenDropdown(null);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const isActive = (path: string) => {
    return pathname === path ? "nav-link nav-link--active" : "nav-link";
  };

  // Pages whose hero background is light — nav must always be dark
  const LIGHT_HERO_PAGES = ["/contact", "/board-of-directors", "/leadership", "/right-of-ways", "/private-venues"];
  const isLightHeroPage = LIGHT_HERO_PAGES.some(p => pathname === p || pathname.startsWith(p + "/"));

  const navClasses = [
    "nav",
    isScrolled ? "nav--scrolled" : "",
    isLightHeroPage ? "nav--solid" : "",
    isMobileOpen ? "nav--mobile-open" : ""
  ].filter(Boolean).join(" ");

  return (
    <header className={navClasses} id="main-nav" ref={navRef}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Arium Networks Home" onClick={closeMobileMenu}>
          {layoutData?.logoDesktop && layoutData?.logoMobile ? (
            <>
              <span dangerouslySetInnerHTML={{ __html: layoutData.logoDesktop }} style={{ display: 'contents' }} />
              <span dangerouslySetInnerHTML={{ __html: layoutData.logoMobile }} style={{ display: 'contents' }} />
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="nav-logo-desktop" viewBox="0 0 216 94.951" width="162" height="72" aria-hidden="true">
                <path d="M105.081 62.566h-8.66l-2.099 5.572h-2.605l6.634-17.055c.482-1.254 1.086-1.881 2.388-1.881 1.351 0 2.026.603 2.533 1.881l6.634 17.055h-2.678zm-7.767-2.388h6.851l-3.136-8.153c-.072-.169-.145-.265-.314-.265-.145 0-.241.097-.313.265zm21.807-4.342V58.2h-1.254c-2.267 0-3.884 1.496-3.884 3.956v5.982h-2.412v-5.982c0-4.318 2.557-6.32 6.296-6.32zm1.906-4.632c0-.893.748-1.64 1.664-1.64.893 0 1.64.748 1.64 1.64 0 .917-.748 1.664-1.64 1.664a1.667 1.667 0 0 1-1.664-1.664m2.871 4.632v12.302h-2.412V55.836zm8.491 12.544c-3.281 0-5.693-2.147-5.693-5.91v-6.634h2.412v6.634c0 2.34 1.399 3.57 3.281 3.57s3.281-1.23 3.281-3.57v-6.634h2.412v6.634c0 3.763-2.412 5.91-5.693 5.91m18.816-.242h-2.412v-7.116c0-1.978-1.158-3.088-2.75-3.088-1.568 0-2.75 1.11-2.75 3.088v7.116h-2.412v-7.116c0-3.401 2.195-5.428 5.066-5.428 1.761 0 3.208.772 4.053 2.123.844-1.351 2.292-2.123 4.053-2.123 2.895 0 5.066 2.026 5.066 5.428v7.116h-2.412v-7.116c0-1.978-1.158-3.088-2.75-3.088-1.568 0-2.75 1.11-2.75 3.088v7.116Zm-46.654 26.571h-2.485v-15.68c0-2.026 1.182-3.257 2.967-3.257 1.472 0 2.292.724 3.184 2.653l6.537 13.074c.217.386.41.675.772.675.338 0 .579-.241.579-.651V75.892h2.485v15.68c0 2.05-1.158 3.257-2.943 3.257-1.447 0-2.34-.724-3.232-2.629l-6.537-13.074c-.193-.41-.386-.7-.772-.7-.338 0-.555.265-.555.651v15.631Zm22.941.242c-3.715 0-6.369-2.653-6.369-6.392 0-3.763 2.726-6.392 6.489-6.392 3.546 0 6.079 2.436 6.079 5.814 0 .506-.048.941-.145 1.375h-9.239q-.651 0-.651.579c0 1.327 1.616 2.871 3.932 2.871 1.471 0 2.943-.531 3.594-1.809h2.388c-.917 2.702-3.305 3.956-6.079 3.956Zm-3.908-7.503h7.237c.29 0 .482-.169.482-.458 0-1.278-1.447-2.75-3.667-2.75-2.195 0-3.763 1.254-4.053 3.208Zm18.358 7.43c-2.822 0-4.414-1.496-4.414-4.559v-5.717h-3.136v-2.195h2.219c.555 0 .917-.338.917-.917v-3.426h2.412v4.342h4.849v2.195h-4.849v5.524c0 1.592.603 2.436 2.388 2.436.603 0 1.399-.048 2.461-.193v2.316c-1.061.169-2.026.193-2.846.193Zm12.375-10.783c.338-1.327 1.182-1.857 2.195-1.857 1.037 0 1.858.506 2.195 1.857l2.292 8.129c.048.121.121.217.241.217s.193-.096.241-.217l2.75-9.818h2.509l-3.257 10.614c-.458 1.52-1.303 1.857-2.268 1.857-.941 0-1.785-.434-2.147-1.857l-2.34-8.129c-.048-.145-.145-.217-.265-.217s-.193.072-.241.217l-2.292 8.129c-.362 1.471-1.182 1.857-2.123 1.857-1.037 0-1.882-.41-2.292-1.857l-3.208-10.614h2.557l2.726 9.818c.048.145.121.217.241.217.096 0 .193-.072.217-.217l2.267-8.129Zm13.22 4.463c0-3.715 2.726-6.392 6.441-6.392 3.739 0 6.441 2.678 6.441 6.392 0 3.739-2.702 6.392-6.441 6.392-3.715 0-6.441-2.653-6.441-6.392m10.421 0c0-2.34-1.64-4.053-3.98-4.053-2.316 0-3.98 1.713-3.98 4.053s1.665 4.053 3.98 4.053c2.34 0 3.98-1.713 3.98-4.053m12.037-6.151v2.364h-1.254c-2.267 0-3.884 1.496-3.884 3.956v5.982h-2.412v-5.982c0-4.318 2.557-6.32 6.296-6.32zm1.882-6.513h2.412V94.71h-2.412zm3.498 12.447c0-.507.121-.82.893-1.592l4.342-4.342h2.967l-5.235 5.235c-.217.217-.314.41-.314.603 0 .169.096.338.314.555l5.5 5.91h-3.184l-4.414-4.752c-.7-.796-.868-1.158-.868-1.616Zm9.288 2.533h2.533c.41 1.423 1.809 2.002 3.498 2.002 1.713 0 2.895-.555 2.895-1.761 0-1.013-.82-1.447-1.978-1.52l-2.702-.217c-2.171-.169-3.884-1.23-3.884-3.425 0-2.485 2.195-3.787 5.114-3.787 2.822 0 5.114 1.206 5.717 3.86h-2.557c-.507-1.351-1.906-1.809-3.16-1.809-1.592 0-2.702.531-2.702 1.64 0 .989.772 1.375 1.954 1.447l2.629.193c2.436.193 3.98 1.278 3.98 3.449 0 2.629-2.34 4.004-5.428 4.004-3.039 0-5.403-1.375-5.91-4.077Z" style={{ fill: "currentColor" }}></path>
                <path d="m26.858 49.847-2.64 6.404-1.877 4.553c-1.691 4.294-5.875 7.334-10.77 7.334-6.39 0-11.57-5.18-11.57-11.57 0-1.493.283-2.92.798-4.23l17.48-44.881C19.938 3.098 24.156 0 29.097 0s9.159 3.098 10.818 7.457l12.94 33.213h-8.234c-9.602 0-14.028.947-17.762 9.177ZM59.32 40.67h-6.465l8.873 22.774a7.286 7.286 0 0 0 13.62 0l10.917-28.013a7.283 7.283 0 0 0-13.561-5.33l-1.182 2.866-1.165 2.8c-2.351 5.181-4.993 4.902-11.037 4.902Z" style={{ fill: "#00e8d9" }}></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="nav-logo-mobile" viewBox="0 0 382.282 68.139" aria-hidden="true" style={{ width: "189px", height: "auto", color: "#fff" }}>
                <path d="M117.024 45.622h-12.933l-3.134 8.322h-3.891l9.907-25.469c.721-1.873 1.621-2.81 3.566-2.81 2.017 0 3.026.901 3.783 2.81l9.907 25.469h-3.999zm-11.6-3.566h10.231l-4.683-12.176c-.108-.252-.216-.396-.468-.396-.216 0-.36.144-.468.396zm32.567-6.484v3.53h-1.873c-3.386 0-5.8 2.233-5.8 5.908v8.934h-3.602V45.01c0-6.448 3.818-9.438 9.402-9.438zm2.846-6.917c0-1.333 1.117-2.45 2.486-2.45 1.333 0 2.45 1.117 2.45 2.45 0 1.369-1.117 2.486-2.45 2.486a2.49 2.49 0 0 1-2.486-2.486m4.287 6.917v18.372h-3.602V35.572zm12.68 18.732c-4.899 0-8.502-3.206-8.502-8.826v-9.907h3.602v9.907c0 3.494 2.089 5.332 4.899 5.332s4.899-1.837 4.899-5.332v-9.907h3.602v9.907c0 5.62-3.602 8.826-8.502 8.826Zm28.1-.36h-3.602V43.317c0-2.954-1.729-4.611-4.107-4.611-2.342 0-4.107 1.657-4.107 4.611v10.627h-3.602V43.317c0-5.079 3.278-8.105 7.565-8.105 2.63 0 4.791 1.153 6.052 3.17 1.261-2.017 3.422-3.17 6.052-3.17 4.323 0 7.565 3.026 7.565 8.105v10.627h-3.603V43.317c0-2.954-1.729-4.611-4.107-4.611-2.342 0-4.107 1.657-4.107 4.611v10.627Zm29.943 0h-3.711V30.529c0-3.026 1.765-4.863 4.431-4.863 2.198 0 3.422 1.081 4.755 3.963l9.762 19.525c.324.576.612 1.008 1.153 1.008.504 0 .864-.36.864-.973V25.846h3.711v23.415c0 3.062-1.729 4.863-4.395 4.863-2.161 0-3.494-1.081-4.827-3.927l-9.762-19.525c-.288-.612-.577-1.045-1.153-1.045-.504 0-.828.396-.828.973zm34.26.36c-5.548 0-9.51-3.963-9.51-9.546 0-5.62 4.071-9.546 9.69-9.546 5.296 0 9.078 3.638 9.078 8.682 0 .756-.072 1.405-.216 2.053h-13.797q-.972 0-.973.865c0 1.981 2.414 4.287 5.872 4.287 2.197 0 4.395-.793 5.368-2.702h3.566c-1.369 4.035-4.935 5.908-9.078 5.908Zm-5.836-11.203h10.807c.432 0 .721-.252.721-.684 0-1.909-2.161-4.107-5.475-4.107-3.278 0-5.62 1.873-6.052 4.791Zm27.415 11.095c-4.215 0-6.592-2.233-6.592-6.808V38.85h-4.683v-3.278h3.314c.829 0 1.369-.504 1.369-1.369v-5.116h3.602v6.484h7.241v3.278h-7.241v8.249c0 2.378.901 3.638 3.566 3.638.901 0 2.089-.072 3.674-.288v3.458c-1.585.252-3.026.288-4.251.288Zm18.48-16.103c.504-1.981 1.765-2.774 3.278-2.774 1.549 0 2.774.756 3.278 2.774l3.422 12.14c.072.18.18.324.36.324s.288-.144.36-.324l4.107-14.662h3.747l-4.863 15.85c-.684 2.269-1.945 2.774-3.386 2.774-1.405 0-2.666-.648-3.206-2.774l-3.494-12.14c-.072-.216-.216-.324-.396-.324s-.288.108-.36.324l-3.422 12.14c-.54 2.197-1.765 2.774-3.17 2.774-1.549 0-2.81-.612-3.422-2.774l-4.791-15.85h3.818l4.071 14.662c.072.216.18.324.36.324.144 0 .288-.108.324-.324l3.386-12.14Zm19.742 6.665c0-5.548 4.071-9.546 9.618-9.546 5.584 0 9.618 3.999 9.618 9.546 0 5.584-4.035 9.546-9.618 9.546-5.548 0-9.618-3.963-9.618-9.546m15.562 0c0-3.494-2.449-6.052-5.944-6.052-3.458 0-5.944 2.558-5.944 6.052s2.486 6.052 5.944 6.052c3.494 0 5.944-2.558 5.944-6.052m17.977-9.186v3.53h-1.873c-3.386 0-5.8 2.233-5.8 5.908v8.934h-3.602V45.01c0-6.448 3.818-9.438 9.402-9.438zm2.81-9.727h3.602v28.099h-3.602zm5.224 18.589c0-.757.18-1.225 1.333-2.378l6.484-6.484h4.431l-7.817 7.817c-.324.324-.468.612-.468.901 0 .252.144.504.468.829l8.213 8.826h-4.755l-6.592-7.097c-1.045-1.189-1.297-1.729-1.297-2.414m13.87 3.782h3.782c.613 2.126 2.702 2.99 5.224 2.99 2.558 0 4.323-.828 4.323-2.63 0-1.513-1.225-2.161-2.954-2.269l-4.034-.324c-3.242-.252-5.8-1.837-5.8-5.115 0-3.711 3.278-5.656 7.637-5.656 4.215 0 7.637 1.801 8.538 5.764h-3.818c-.757-2.017-2.846-2.702-4.719-2.702-2.378 0-4.035.792-4.035 2.449 0 1.477 1.153 2.053 2.918 2.162l3.927.288c3.638.288 5.944 1.909 5.944 5.151 0 3.927-3.494 5.98-8.105 5.98-4.539 0-8.069-2.053-8.826-6.088Z" fill="currentColor"></path>
                <path d="m26.858 49.847-2.64 6.404-1.877 4.553c-1.691 4.294-5.876 7.334-10.77 7.334C5.18 68.139 0 62.958 0 56.568c0-1.493.283-2.92.798-4.23L18.279 7.457C19.938 3.098 24.156 0 29.097 0s9.159 3.098 10.818 7.457l12.94 33.213h-8.234c-9.602 0-14.028.947-17.763 9.177M59.32 40.67h-6.465l8.873 22.775a7.286 7.286 0 0 0 13.62 0l10.917-28.014a7.283 7.283 0 0 0-6.781-9.946 7.29 7.29 0 0 0-6.78 4.616l-1.182 2.866-1.165 2.8c-2.351 5.181-4.993 4.902-11.037 4.902Z" style={{ fill: "#00e8d9" }}></path>
              </svg>
            </>
          )}
        </Link>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isMobileOpen}
          onClick={toggleMobileMenu}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>

        <nav aria-label="Main navigation" className="nav-links" id="nav-links">
          {layoutData?.navigation && layoutData.navigation.length > 0 ? (
            layoutData.navigation.map((navItem: any) => {
              if (navItem.dropdown && navItem.dropdown.length > 0) {
                const dropId = navItem.label.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div key={navItem.id} className={`nav-dropdown ${openDropdown === dropId ? 'nav-dropdown--open' : ''}`} id={`nav-dropdown-${dropId}`}>
                    <button
                      type="button"
                      className="nav-dropdown-toggle"
                      aria-expanded={openDropdown === dropId}
                      aria-haspopup="menu"
                      onClick={(e) => toggleDropdown(e, dropId)}
                    >
                      {navItem.label}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="m8.75.75-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                    <div className="nav-dropdown-menu" role="menu">
                      {navItem.dropdown.map((subItem: any) => (
                        <Link key={subItem.id} href={subItem.url || "#"} className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>{subItem.label}</Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link key={navItem.id} href={navItem.url || "#"} className={isActive(navItem.url || "#")} onClick={closeMobileMenu}>{navItem.label}</Link>
              );
            })
          ) : (
            <>
              <div className={`nav-dropdown ${openDropdown === 'company' ? 'nav-dropdown--open' : ''}`} id="nav-dropdown-company">
                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  aria-expanded={openDropdown === 'company'}
                  aria-haspopup="menu"
                  onClick={(e) => toggleDropdown(e, 'company')}
                >
                  Our Company
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="m8.75.75-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
                <div className="nav-dropdown-menu" role="menu">
                  <Link href="/about" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>About Us</Link>
                  <Link href="/leadership" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>Leadership</Link>
                  <Link href="/board-of-directors" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>Board of Directors</Link>
                </div>
              </div>
              <Link href="/solutions" className={isActive("/solutions")} onClick={closeMobileMenu}>Our Solutions</Link>
              <div className={`nav-dropdown ${openDropdown === 'where' ? 'nav-dropdown--open' : ''}`} id="nav-dropdown-where">
                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  aria-expanded={openDropdown === 'where'}
                  aria-haspopup="menu"
                  onClick={(e) => toggleDropdown(e, 'where')}
                >
                  Where We Build
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="m8.75.75-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
                <div className="nav-dropdown-menu" role="menu">
                  <Link href="/where-we-build" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>Overview</Link>
                  <Link href="/right-of-ways" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>Right of Way</Link>
                  <Link href="/private-venues" className="nav-dropdown-link" role="menuitem" onClick={closeMobileMenu}>Private Venues</Link>
                </div>
              </div>
              <Link href="/community" className={isActive("/community")} onClick={closeMobileMenu}>Your Community</Link>
              <Link href="/careers" className={isActive("/careers")} onClick={closeMobileMenu}>Careers</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
