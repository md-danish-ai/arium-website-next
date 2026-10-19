"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function NotFound() {
  const tealShapeRef = useRef<HTMLDivElement>(null);
  const whiteShapeRef = useRef<HTMLDivElement>(null);
  const tealInnerRef = useRef<HTMLDivElement>(null);
  const whiteInnerRef = useRef<HTMLDivElement>(null);
  const shapesWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
                  src="/assets/shape-teal.svg"
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
                  src="/assets/shape-white.svg"
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
