"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Typography } from "@ui-element";

interface SharedMainHeroProps {
  heading?: string;
  description?: string;
  fontColor?: string;
  bgColor?: string;
  scrollText?: string;
}

export default function SharedMainHero({
  heading = "Build with clarity—connect with confidence",
  description = "We are the country's largest small cell provider, bringing densification and capacity services to the wireless industry. With a focus on clarity and precision, we design, build, and deploy the essential infrastructure that powers today's most advanced wireless networks.",
  fontColor,
  bgColor,
  scrollText = "Scroll to explore",
}: SharedMainHeroProps) {
  const tealShapeRef = useRef<HTMLDivElement>(null);
  const whiteShapeRef = useRef<HTMLDivElement>(null);
  const tealInnerRef = useRef<HTMLDivElement>(null);
  const whiteInnerRef = useRef<HTMLDivElement>(null);
  const shapesWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const $t = tealShapeRef.current;
    const $w = whiteShapeRef.current;
    const $ti = tealInnerRef.current;
    const $wi = whiteInnerRef.current;
    const $c = shapesWrapRef.current;
    const $bg = bgRef.current;

    if (!$t || !$w || !$ti || !$wi || !$c || !$bg) return;

    let animationFrameId: number;

    var SUB = 8,
      SDT = 1 / 60 / SUB;
    function Sp(this: any, d: number, s: number) {
      this.v = 0;
      this.x = 0;
      this.t = 0;
      this.d = d;
      this.s = s;
    }
    Sp.prototype.set = function (t: number) {
      this.t = t;
    };
    Sp.prototype.jump = function (v: number) {
      this.x = v;
      this.t = v;
      this.v = 0;
    };
    Sp.prototype.get = function () {
      return this.x;
    };
    Sp.prototype.step = function () {
      for (var i = 0; i < SUB; i++) {
        var a = (this.t - this.x) * this.s - this.v * this.d;
        this.v += a * SDT;
        this.x += this.v * SDT;
      }
    };

    var tL = new (Sp as any)(50, 65),
      tT = new (Sp as any)(50, 65);
    var wL = new (Sp as any)(50, 65),
      wT = new (Sp as any)(50, 65);
    var tR = new (Sp as any)(50, 65),
      wR = new (Sp as any)(50, 65);
    var tS = new (Sp as any)(55, 40),
      wS = new (Sp as any)(55, 40);
    var tO = new (Sp as any)(55, 40),
      wO = new (Sp as any)(55, 40);

    var K = 600,
      LY = -200,
      ZY = 300;
    var QD = { tr: 1.05, br: 0.95, bl: 1, tl: 0.9 };
    var QS = {
      c: { t: 1, w: 1 },
      tr: { t: 1.3, w: 0.9 },
      br: { t: 1.2, w: 0.95 },
      bl: { t: 0.95, w: 1.4 },
      tl: { t: 0.8, w: 1.1 },
    };

    var cx = 0,
      cy = 0;
    var rL = 0,
      rT = 0,
      rR = 0,
      rB = 0;
    var hx = 0,
      hy = 0;
    var gx = 0,
      gy = 0;
    var idle = true,
      ready = false;
    var lastPt = 0;

    function shortA(cur: number, tgt: number) {
      var d = tgt - cur;
      while (d > 180) d -= 360;
      while (d <= -180) d += 360;
      return cur + d;
    }

    function init() {
      var r = $bg!.getBoundingClientRect();
      rL = r.left;
      rT = r.top;
      rR = r.right;
      rB = r.bottom;
      cx = r.width / 2;
      cy = r.height / 2;
      if (!idle) return;
      var hk = K / 2;
      tL.jump(cx - hk);
      tT.jump(cy + LY);
      wL.jump(cx + hk);
      wT.jump(cy + ZY);
      tS.jump(1);
      wS.jump(1);
      tR.jump(180);
      wR.jump(165);
      tO.jump(0.5);
      wO.jump(0.5);
      hx = cx;
      hy = cy;
      gx = cx;
      gy = cy;
    }
    init();

    const fadeTimeout = setTimeout(function () {
      if ($c) {
        $c.style.transition = "opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        $c.style.opacity = "1";
      }
    }, 150);
    const readyTimeout = setTimeout(function () {
      ready = true;
    }, 3000);

    const handlePointerMove = (e: PointerEvent) => {
      if (!ready) return;
      if (e.clientX >= rL && e.clientX <= rR && e.clientY >= rT && e.clientY <= rB) {
        lastPt = Date.now();
        idle = false;
        gx = e.clientX - rL;
        gy = e.clientY - rT;
      } else if (!idle) {
        idle = true;
        gx = cx;
        gy = cy;
      }
    };

    window.addEventListener("pointermove", handlePointerMove as EventListener);
    window.addEventListener("resize", init);

    function frame() {
      if (!idle && Date.now() - lastPt > 5000) {
        idle = true;
        gx = cx;
        gy = cy;
      }
      hx += (gx - hx) * 0.03;
      hy += (gy - hy) * 0.03;

      if (idle) {
        var hk = K / 2;
        tL.set(cx - hk);
        tT.set(cy + LY);
        wL.set(cx + hk);
        wT.set(cy + ZY);
        tS.set(1);
        wS.set(1);
        tO.set(0.5);
        wO.set(0.5);
        tR.set(shortA(tR.get(), 180));
        wR.set(shortA(wR.get(), 165));
      } else {
        var dx = hx - cx,
          dy = hy - cy;
        var ln = Math.hypot(dx, dy);
        if (ln < 0.1) {
          dx = 1;
          dy = 0;
          ln = 1;
        } else {
          dx /= ln;
          dy /= ln;
        }
        var near = ln < 100;
        var rt = hx > cx,
          bel = hy > cy;
        var qm = near ? 1 : rt && !bel ? QD.tr : rt && bel ? QD.br : !rt && bel ? QD.bl : QD.tl;
        var dd = near ? 720 : 600 * qm;
        tL.set(hx - dx * dd);
        tT.set(hy - dy * dd);
        wL.set(hx + dx * dd);
        wT.set(hy + dy * dd);
        var D2R = 180 / Math.PI;
        tR.set(shortA(tR.get(), Math.atan2(dy * dd, dx * dd) * D2R + 45));
        wR.set(shortA(wR.get(), Math.atan2(-dy * dd, -dx * dd) * D2R - 135));
        var qs = near ? QS.c : rt && !bel ? QS.tr : rt && bel ? QS.br : !rt && bel ? QS.bl : QS.tl;
        tS.set(0.75 * qs.t);
        wS.set(0.75 * qs.w);
        tO.set(1);
        wO.set(1);
      }
      tL.step();
      tT.step();
      wL.step();
      wT.step();
      tS.step();
      wS.step();
      tR.step();
      wR.step();
      tO.step();
      wO.step();

      $t!.style.left = tL.get().toFixed(1) + "px";
      $t!.style.top = tT.get().toFixed(1) + "px";
      $t!.style.opacity = tO.get().toFixed(3);
      $t!.style.scale = tS.get().toFixed(4);
      $t!.style.rotate = tR.get().toFixed(1) + "deg";

      $w!.style.left = wL.get().toFixed(1) + "px";
      $w!.style.top = wT.get().toFixed(1) + "px";
      $w!.style.opacity = wO.get().toFixed(3);
      $w!.style.scale = wS.get().toFixed(4);
      $w!.style.rotate = wR.get().toFixed(1) + "deg";

      animationFrameId = requestAnimationFrame(frame);
    }
    animationFrameId = requestAnimationFrame(frame);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(readyTimeout);
      window.removeEventListener("pointermove", handlePointerMove as EventListener);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const resolvedBg = bgColor || "#162047";
  const resolvedFont = fontColor || "#ffffff";

  return (
    <section
      id="shared-main-hero"
      className="shared-mh-section relative grid place-items-center h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Background with animated shapes */}
      <div
        ref={bgRef}
        className="shared-mh-bg absolute inset-0 pointer-events-none"
        style={{ backgroundColor: resolvedBg }}
        aria-hidden="true"
      >
        <div className="shared-mh-shapes-container absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <div
            ref={shapesWrapRef}
            className="shared-mh-shapes-wrap relative h-full w-full opacity-0"
          >
            {/* Teal shape */}
            <div
              ref={tealShapeRef}
              className="shared-mh-shape shared-mh-shape--teal absolute [width:170vmin] [aspect-ratio:1955/1769] pointer-events-none opacity-50 will-change-transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: "26%", top: "33%", rotate: "180deg" }}
            >
              <div
                ref={tealInnerRef}
                className="shared-mh-shape-inner relative h-full w-full animate-breathe-teal"
              >
                <Image
                  src="/assets/shape-teal.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* White shape */}
            <div
              ref={whiteShapeRef}
              className="shared-mh-shape shared-mh-shape--white absolute [width:170vmin] [aspect-ratio:1940/1757] pointer-events-none opacity-50 will-change-transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: "73%", top: "97%", rotate: "525deg" }}
            >
              <div
                ref={whiteInnerRef}
                className="shared-mh-shape-inner relative h-full w-full animate-breathe-white"
              >
                <Image
                  src="/assets/shape-white.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="shared-mh-content relative z-[5] px-6 pt-[150px] pb-[100px] text-center">
        <Typography
          variant="h1"
          uppercase
          className="shared-mh-heading mx-auto max-w-[980px] tracking-[0.12em]"
          style={{ color: resolvedFont }}
          dangerouslySetInnerHTML={{ __html: heading || "" }}
        />
        <Typography
          variant="b1"
          className="shared-mh-description mx-auto mt-8 md:mt-10 max-w-[800px] text-center"
          style={{ color: resolvedFont }}
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        className={`shared-mh-scroll-indicator ${isScrolled ? "is-scrolled pointer-events-none opacity-0" : "opacity-70 hover:opacity-100"} absolute bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 transition-opacity duration-300`}
        id="shared-scroll-indicator"
      >
        <Typography
          variant="b4"
          uppercase
          className="shared-mh-scroll-text block text-white/80 tracking-[0.15em]"
        >
          {scrollText || "Scroll to explore"}
        </Typography>
        <div className="shared-mh-scroll-arrow text-teal animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
