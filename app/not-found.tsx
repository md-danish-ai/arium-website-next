"use client";

import React from "react";
import Image from "next/image";
import { useSpringShapes } from "@hooks/useSpringShapes";

export default function NotFound() {
  const { tealShapeRef, whiteShapeRef, tealInnerRef, whiteInnerRef, shapesWrapRef, bgRef } =
    useSpringShapes();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#162047",
      }}
    >
      <style>{`
        @keyframes notfound-breathe-teal {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes notfound-breathe-white {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.93); }
        }
      `}</style>

      {/* Background with animated shapes */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} aria-hidden="true">
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
          <div
            ref={shapesWrapRef}
            style={{ position: "absolute", width: "100%", height: "100%", opacity: 0 }}
          >
            {/* Teal shape */}
            <div
              ref={tealShapeRef}
              style={{
                position: "absolute",
                width: "170vmin",
                aspectRatio: "1955/1769",
                pointerEvents: "none",
                opacity: 0.5,
                willChange: "transform",
                left: "26%",
                top: "33%",
                translate: "-50% -50%",
                rotate: "180deg",
              }}
            >
              <div
                ref={tealInnerRef}
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  animation: "notfound-breathe-teal 20s ease-in-out infinite",
                }}
              >
                <Image
                  src="/assets/svg-images/shape-teal.svg"
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* White shape */}
            <div
              ref={whiteShapeRef}
              style={{
                position: "absolute",
                width: "170vmin",
                aspectRatio: "1940/1757",
                pointerEvents: "none",
                opacity: 0.5,
                willChange: "transform",
                left: "73%",
                top: "97%",
                translate: "-50% -50%",
                rotate: "525deg",
              }}
            >
              <div
                ref={whiteInnerRef}
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  animation: "notfound-breathe-white 20s ease-in-out 10s infinite",
                }}
              >
                <Image
                  src="/assets/svg-images/shape-white.svg"
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "#ffffff",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(6rem, 15vw, 10.5rem)",
            fontWeight: 300,
            fontFamily: "var(--font-heading)",
            lineHeight: 1,
            margin: "0 0 24px",
            letterSpacing: "0.05em",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 400,
            margin: "0",
            opacity: 0.9,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  );
}
