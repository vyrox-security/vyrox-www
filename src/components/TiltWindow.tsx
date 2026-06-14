"use client";

import { useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Cursor-reactive wrapper for the product windows: a subtle 3D tilt that
 * follows the pointer plus an ember spotlight that tracks the cursor. Disabled
 * on coarse pointers (touch) where it only causes scroll jank.
 */
export default function TiltWindow({
  children,
  max = 7,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const isTouch =
    typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = tiltRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      gsap.to(el, {
        rotateY: (px - 0.5) * max * 2,
        rotateX: -(py - 0.5) * max * 2,
        transformPerspective: 1400,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
      const g = glowRef.current;
      if (g) {
        g.style.setProperty("--gx", `${px * 100}%`);
        g.style.setProperty("--gy", `${py * 100}%`);
        gsap.to(g, { opacity: 1, duration: 0.3, overwrite: "auto" });
      }
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = tiltRef.current;
    if (el) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "expo.out", overwrite: "auto" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.5, overwrite: "auto" });
  }, []);

  const handlers = isTouch ? {} : { onMouseMove: onMove, onMouseLeave: onLeave };

  return (
    <div className="relative" style={{ perspective: 1400 }}>
      <div
        ref={tiltRef}
        className={`relative will-change-transform ${className}`}
        style={{ transformStyle: "preserve-3d" }}
        {...handlers}
      >
        {children}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
          style={{
            opacity: 0,
            background:
              "radial-gradient(240px circle at var(--gx,50%) var(--gy,50%), rgba(255,138,92,0.16), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
