"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface SpringShapesRefs {
  tealShapeRef: RefObject<HTMLDivElement | null>;
  whiteShapeRef: RefObject<HTMLDivElement | null>;
  tealInnerRef: RefObject<HTMLDivElement | null>;
  whiteInnerRef: RefObject<HTMLDivElement | null>;
  shapesWrapRef: RefObject<HTMLDivElement | null>;
  bgRef: RefObject<HTMLDivElement | null>;
}

export function useSpringShapes(): SpringShapesRefs {
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

    const SUB = 8;
    const SDT = 1 / 60 / SUB;

    class Spring {
      v = 0;
      x = 0;
      t = 0;
      d: number;
      s: number;

      constructor(d: number, s: number) {
        this.d = d;
        this.s = s;
      }

      set(t: number) {
        this.t = t;
      }

      jump(v: number) {
        this.x = v;
        this.t = v;
        this.v = 0;
      }

      get() {
        return this.x;
      }

      step() {
        for (let i = 0; i < SUB; i++) {
          const a = (this.t - this.x) * this.s - this.v * this.d;
          this.v += a * SDT;
          this.x += this.v * SDT;
        }
      }
    }

    const tL = new Spring(50, 65);
    const tT = new Spring(50, 65);
    const wL = new Spring(50, 65);
    const wT = new Spring(50, 65);
    const tR = new Spring(50, 65);
    const wR = new Spring(50, 65);
    const tS = new Spring(55, 40);
    const wS = new Spring(55, 40);
    const tO = new Spring(55, 40);
    const wO = new Spring(55, 40);

    const K = 600,
      LY = -200,
      ZY = 300;
    const QD = { tr: 1.05, br: 0.95, bl: 1, tl: 0.9 };
    const QS = {
      c: { t: 1, w: 1 },
      tr: { t: 1.3, w: 0.9 },
      br: { t: 1.2, w: 0.95 },
      bl: { t: 0.95, w: 1.4 },
      tl: { t: 0.8, w: 1.1 },
    };

    let cx = 0,
      cy = 0;
    let rL = 0,
      rT = 0,
      rR = 0,
      rB = 0;
    let hx = 0,
      hy = 0;
    let gx = 0,
      gy = 0;
    let idle = true,
      ready = false;
    let lastPt = 0;

    function shortA(cur: number, tgt: number) {
      let d = tgt - cur;
      while (d > 180) d -= 360;
      while (d <= -180) d += 360;
      return cur + d;
    }

    function init() {
      const r = $bg!.getBoundingClientRect();
      rL = r.left;
      rT = r.top;
      rR = r.right;
      rB = r.bottom;
      cx = r.width / 2;
      cy = r.height / 2;
      if (!idle) return;
      const hk = K / 2;
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
        const hk = K / 2;
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
        let dx = hx - cx,
          dy = hy - cy;
        let ln = Math.hypot(dx, dy);
        if (ln < 0.1) {
          dx = 1;
          dy = 0;
          ln = 1;
        } else {
          dx /= ln;
          dy /= ln;
        }
        const near = ln < 100;
        const rt = hx > cx,
          bel = hy > cy;
        const qm = near ? 1 : rt && !bel ? QD.tr : rt && bel ? QD.br : !rt && bel ? QD.bl : QD.tl;
        const dd = near ? 720 : 600 * qm;
        tL.set(hx - dx * dd);
        tT.set(hy - dy * dd);
        wL.set(hx + dx * dd);
        wT.set(hy + dy * dd);
        const D2R = 180 / Math.PI;
        tR.set(shortA(tR.get(), Math.atan2(dy * dd, dx * dd) * D2R + 45));
        wR.set(shortA(wR.get(), Math.atan2(-dy * dd, -dx * dd) * D2R - 135));
        const qs = near
          ? QS.c
          : rt && !bel
            ? QS.tr
            : rt && bel
              ? QS.br
              : !rt && bel
                ? QS.bl
                : QS.tl;
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

  return {
    tealShapeRef,
    whiteShapeRef,
    tealInnerRef,
    whiteInnerRef,
    shapesWrapRef,
    bgRef,
  };
}
