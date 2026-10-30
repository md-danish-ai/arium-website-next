"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopLogoSvg } from "@ui-svg";
import { useSpringShapes } from "@hooks/useSpringShapes";

export default function NotFound() {
  const { tealShapeRef, whiteShapeRef, tealInnerRef, whiteInnerRef, shapesWrapRef, bgRef } =
    useSpringShapes();

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-[99999] min-h-screen w-full bg-gradient-to-b from-[#080C1F] via-[#0D1535] to-[#162047] text-white flex flex-col justify-between overflow-x-hidden overflow-y-auto selection:bg-[#00E8D9]/30 selection:text-white"
    >
      {/* 1. Global style to strictly suppress root layout Header & Footer */}
      <style>{`
        #main-nav,
        header,
        footer,
        #main-content > header,
        #main-content > footer {
          display: none !important;
        }

        @keyframes notfound-breathe-teal {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.08) rotate(3deg);
          }
        }

        @keyframes notfound-breathe-white {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(0.92) rotate(-3deg);
          }
        }

        @keyframes notfound-float-number {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes notfound-glow-pulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>

      {/* 2. Interactive Background with Organic Spring Shapes (Similar to Home Hero, with 404 Atmosphere) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0, 232, 217, 0.45) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient background glow orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#00E8D9]/15 blur-[140px] pointer-events-none"
          style={{ animation: "notfound-glow-pulse 8s ease-in-out infinite" }}
        />

        {/* Interactive Organic Fluid Shapes from Home Hero */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <div ref={shapesWrapRef} className="relative h-full w-full opacity-0">
            {/* Teal Organic Shape */}
            <div
              ref={tealShapeRef}
              className="absolute [width:170vmin] [aspect-ratio:1955/1769] pointer-events-none opacity-45 will-change-transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_0_80px_rgba(0,232,217,0.35)]"
              style={{ left: "28%", top: "35%", rotate: "180deg" }}
            >
              <div
                ref={tealInnerRef}
                className="relative h-full w-full"
                style={{ animation: "notfound-breathe-teal 18s ease-in-out infinite" }}
              >
                <Image
                  src="/images/svg-images/shape-teal.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* White/Violet Organic Shape */}
            <div
              ref={whiteShapeRef}
              className="absolute [width:170vmin] [aspect-ratio:1940/1757] pointer-events-none opacity-40 will-change-transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_0_90px_rgba(210,199,255,0.3)]"
              style={{ left: "72%", top: "92%", rotate: "525deg" }}
            >
              <div
                ref={whiteInnerRef}
                className="relative h-full w-full"
                style={{ animation: "notfound-breathe-white 18s ease-in-out 9s infinite" }}
              >
                <Image
                  src="/images/svg-images/shape-white.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ambient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,12,31,0.6)_70%,#080C1F_100%)] pointer-events-none" />
      </div>

      {/* 3. Top Navigation Bar with Logo */}
      <header className="relative z-10 w-full px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E8D9]"
          aria-label="Return to Arium Networks Homepage"
        >
          <DesktopLogoSvg className="w-[128px] sm:w-[150px] h-auto text-white" />
        </Link>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-xs font-mono uppercase tracking-widest text-[#00E8D9]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E8D9] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E8D9]" />
          </span>
          <span>Error 404</span>
        </div>
      </header>

      {/* 4. Center Content (Accurate 404: "Page Not Found") */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-12 max-w-4xl mx-auto w-full">
        {/* Animated 404 Typography with Ambient Glow */}
        <div
          className="relative select-none mb-3 sm:mb-4"
          style={{ animation: "notfound-float-number 5s ease-in-out infinite" }}
        >
          {/* Backlight glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E8D9]/25 via-white/15 to-[#7C5CFC]/25 blur-[55px] rounded-full scale-125 pointer-events-none" />

          {/* Huge Gradient 404 */}
          <h1 className="relative font-heading font-extralight text-[7.5rem] sm:text-[11rem] md:text-[14rem] leading-none tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
            404
          </h1>
        </div>

        {/* Direct, Accurate 404 Copy */}
        <div className="max-w-xl mx-auto space-y-3 sm:space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-white">
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/75 font-light leading-relaxed max-w-lg mx-auto">
            The page you are looking for doesn&apos;t exist, has been removed, or is temporarily
            unavailable.
          </p>
        </div>

        {/* Action Buttons: Exact Matching Dimensions & Mutual Inverse Hover States */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* Button 1: Back to Home (Filled Teal -> Inverts to Outlined on Hover) */}
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-[245px] h-[54px] sm:h-[56px] rounded-full bg-[#00E8D9] text-[#0A0E23] border-2 border-[#00E8D9] hover:bg-transparent hover:text-[#00E8D9] hover:shadow-[0_0_35px_rgba(0,232,217,0.4)] hover:scale-[1.03] active:scale-[0.98] font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00E8D9]/40 shrink-0"
          >
            {/* Home Icon */}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Back to Home</span>
          </Link>

          {/* Button 2: Explore Solutions (Outlined Teal -> Inverts to Filled on Hover) */}
          <Link
            href="/solutions"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-[245px] h-[54px] sm:h-[56px] rounded-full bg-transparent text-[#00E8D9] border-2 border-[#00E8D9] hover:bg-[#00E8D9] hover:text-[#0A0E23] hover:shadow-[0_0_35px_rgba(0,232,217,0.45)] hover:scale-[1.03] active:scale-[0.98] font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00E8D9]/40 shrink-0"
          >
            <span>Explore Solutions</span>
            {/* Right Arrow Icon */}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.4}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Redesigned Popular Destinations Section */}
        <div className="mt-12 sm:mt-16 pt-8 w-full max-w-xl mx-auto">
          {/* Subtle framed header */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-white/20 to-white/30" />
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/50 font-mono font-medium">
              Popular Destinations
            </p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent via-white/20 to-white/30" />
          </div>

          {/* Redesigned Glassmorphic Destination Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {/* Where We Build */}
            <Link
              href="/where-we-build"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00E8D9]/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,232,217,0.2)] text-xs sm:text-sm font-medium"
            >
              <svg
                className="w-4 h-4 text-[#00E8D9]/70 group-hover:text-[#00E8D9] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>Where We Build</span>
            </Link>

            {/* Community */}
            <Link
              href="/community"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00E8D9]/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,232,217,0.2)] text-xs sm:text-sm font-medium"
            >
              <svg
                className="w-4 h-4 text-[#00E8D9]/70 group-hover:text-[#00E8D9] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <span>Community</span>
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00E8D9]/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,232,217,0.2)] text-xs sm:text-sm font-medium"
            >
              <svg
                className="w-4 h-4 text-[#00E8D9]/70 group-hover:text-[#00E8D9] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v1.319m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <span>Careers</span>
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00E8D9]/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,232,217,0.2)] text-xs sm:text-sm font-medium"
            >
              <svg
                className="w-4 h-4 text-[#00E8D9]/70 group-hover:text-[#00E8D9] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>

      {/* 5. Minimalist Bottom Copyright Row */}
      <footer className="relative z-10 w-full px-6 py-6 text-center text-xs text-white/40 font-mono">
        <p>© {new Date().getFullYear()} Arium Networks. All rights reserved.</p>
      </footer>
    </div>
  );
}
