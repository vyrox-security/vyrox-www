"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { splitText } from "@/lib/text-split";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const italicRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const wingsRef = useRef<SVGSVGElement>(null);
  const leftWing = useRef<SVGGElement>(null);
  const rightWing = useRef<SVGGElement>(null);
  const coreOrbRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const cond = ctx.conditions as {
            isDesktop?: boolean;
            isMobile?: boolean;
            isReduced?: boolean;
          };

          // Reduced motion — just reveal everything in place
          if (cond.isReduced) {
            gsap.set(
              [
                eyebrowRef.current,
                headlineRef.current,
                subtitleRef.current,
                ctaRef.current,
                metaRef.current,
                wingsRef.current,
              ],
              { opacity: 1, y: 0, scale: 1, clearProps: "all" }
            );
            return;
          }

          // Split the headline into chars for stagger
          const headSplit = headlineRef.current
            ? splitText(headlineRef.current, ["chars", "words"])
            : null;
          const italicSplit = italicRef.current
            ? splitText(italicRef.current, ["chars", "words"])
            : null;
          const subSplit = subtitleRef.current
            ? splitText(subtitleRef.current, ["words"])
            : null;

          // Initial states
          gsap.set(wingsRef.current, {
            opacity: 0,
            scale: 0.78,
            y: 60,
            transformOrigin: "50% 70%",
          });
          gsap.set(leftWing.current, {
            rotation: -22,
            x: -40,
            transformOrigin: "100% 100%",
          });
          gsap.set(rightWing.current, {
            rotation: 22,
            x: 40,
            transformOrigin: "0% 100%",
          });
          gsap.set(coreOrbRef.current, { scale: 0, transformOrigin: "center" });

          if (headSplit) gsap.set(headSplit.chars, { yPercent: 110, opacity: 0 });
          if (italicSplit) gsap.set(italicSplit.chars, { yPercent: 110, opacity: 0 });
          if (subSplit) gsap.set(subSplit.words, { yPercent: 60, opacity: 0 });
          gsap.set(eyebrowRef.current, { opacity: 0, y: 16 });
          gsap.set(ctaRef.current?.children ?? [], { opacity: 0, y: 24 });
          gsap.set(metaRef.current?.children ?? [], { opacity: 0, x: -12 });

          // Master timeline
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            delay: 0.15,
          });

          tl.to(coreOrbRef.current, {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
          })
            .to(
              wingsRef.current,
              { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "expo.out" },
              "-=1.1"
            )
            .to(
              [leftWing.current, rightWing.current],
              { rotation: 0, x: 0, duration: 1.6, ease: "expo.out", stagger: 0.06 },
              "-=1.5"
            )
            .to(
              eyebrowRef.current,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=1.3"
            )
            .to(
              headSplit?.chars ?? [],
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.1,
                stagger: { each: 0.018, from: "start" },
                ease: "expo.out",
              },
              "-=1.0"
            )
            .to(
              italicSplit?.chars ?? [],
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.1,
                stagger: { each: 0.022, from: "start" },
                ease: "expo.out",
              },
              "-=0.85"
            )
            .to(
              subSplit?.words ?? [],
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.018,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .to(
              ctaRef.current?.children ?? [],
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "expo.out",
              },
              "-=0.4"
            )
            .to(
              metaRef.current?.children ?? [],
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.5"
            );

          // Continuous cinematic breathing — wings drift
          gsap.to(leftWing.current, {
            rotation: -2.5,
            scaleY: 1.04,
            yoyo: true,
            repeat: -1,
            duration: 5.5,
            ease: "sine.inOut",
            transformOrigin: "100% 100%",
          });
          gsap.to(rightWing.current, {
            rotation: 2.5,
            scaleY: 1.04,
            yoyo: true,
            repeat: -1,
            duration: 5.5,
            ease: "sine.inOut",
            transformOrigin: "0% 100%",
          });
          gsap.to(coreOrbRef.current, {
            scale: 1.08,
            yoyo: true,
            repeat: -1,
            duration: 2.4,
            ease: "sine.inOut",
          });

          // Subtle parallax on mouse — desktop only
          if (cond.isDesktop && wingsRef.current) {
            const wings = wingsRef.current;
            const onMove = (e: MouseEvent) => {
              const cx = window.innerWidth / 2;
              const cy = window.innerHeight / 2;
              const x = (e.clientX - cx) / cx;
              const y = (e.clientY - cy) / cy;
              gsap.to(wings, {
                x: x * 18,
                y: y * 10,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(leftWing.current, {
                rotation: -1.5 + x * 1.2,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(rightWing.current, {
                rotation: 1.5 + x * 1.2,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
            };
            window.addEventListener("mousemove", onMove, { passive: true });
            return () => window.removeEventListener("mousemove", onMove);
          }

          // Cleanup splits on revert
          return () => {
            headSplit?.revert();
            italicSplit?.revert();
            subSplit?.revert();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="surface-void relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden isolate"
    >
      {/* Grain & grid texture */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay z-0" />
      <div className="bg-grid-void pointer-events-none absolute inset-0 opacity-60 z-0" />

      {/* Cinematic top + bottom vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent z-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-30" />

      {/* Top nav rail */}
      <header className="absolute top-0 inset-x-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 grid place-items-center bg-[#F2EAD8] text-[#0E0A05] font-mono font-bold text-[11px]">
            V
          </div>
          <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-[#F2EAD8]/70">
            Vyrox / Signal Ops
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-9 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EAD8]/55">
          <a href="#engine" className="hover:text-[#FFE6B0] transition-colors">Engine</a>
          <a href="#trust" className="hover:text-[#FFE6B0] transition-colors">Open-Core</a>
          <a href="#docs" className="hover:text-[#FFE6B0] transition-colors">Docs</a>
          <a
            href="#access"
            className="chip chip-ember hover:bg-[#E8462E]/10 transition-colors"
          >
            Request Access
          </a>
        </nav>
      </header>

      {/* Abstract fire wings SVG */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <svg
          ref={wingsRef}
          viewBox="0 0 1200 800"
          className="w-full min-w-[1100px] max-w-[1700px] h-auto opacity-[0.95] mix-blend-screen"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fireGradLeft" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFE6B0" stopOpacity="0.85" />
              <stop offset="22%" stopColor="#FFB36A" stopOpacity="0.85" />
              <stop offset="52%" stopColor="#FF6A3D" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#A82612" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3A0A03" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fireGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE6B0" stopOpacity="0.85" />
              <stop offset="22%" stopColor="#FFB36A" stopOpacity="0.85" />
              <stop offset="52%" stopColor="#FF6A3D" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#A82612" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3A0A03" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE6B0" stopOpacity="1" />
              <stop offset="40%" stopColor="#E8462E" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3A0A03" stopOpacity="0" />
            </radialGradient>
            <filter id="wingBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="14" result="blurM" />
              <feGaussianBlur stdDeviation="4" result="blurS" />
              <feMerge>
                <feMergeNode in="blurM" />
                <feMergeNode in="blurS" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Core orb */}
          <circle
            ref={coreOrbRef}
            cx="600"
            cy="500"
            r="180"
            fill="url(#coreGlow)"
            opacity="0.7"
          />

          {/* LEFT WING */}
          <g ref={leftWing} filter="url(#wingBlur)">
            <path d="M600,500 Q400,450 150,150 Q300,300 450,450 Z" fill="url(#fireGradLeft)" />
            <path d="M580,480 Q350,380 180,50 Q350,200 480,420 Z" fill="url(#fireGradLeft)" opacity="0.7" />
            <path d="M600,550 Q400,550 50,350 Q250,450 500,520 Z" fill="url(#fireGradLeft)" opacity="0.5" />
            <path d="M600,500 Q450,460 300,250 Q400,350 500,470 Z" fill="#FFE6B0" opacity="0.55" />
          </g>

          {/* RIGHT WING */}
          <g ref={rightWing} filter="url(#wingBlur)">
            <path d="M600,500 Q800,450 1050,150 Q900,300 750,450 Z" fill="url(#fireGradRight)" />
            <path d="M620,480 Q850,380 1020,50 Q850,200 720,420 Z" fill="url(#fireGradRight)" opacity="0.7" />
            <path d="M600,550 Q800,550 1150,350 Q950,450 700,520 Z" fill="url(#fireGradRight)" opacity="0.5" />
            <path d="M600,500 Q750,460 900,250 Q800,350 700,470 Z" fill="#FFE6B0" opacity="0.55" />
          </g>
        </svg>
      </div>

      {/* Center vignette for text legibility */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[920px] h-[680px] bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.85)_0%,rgba(5,5,5,0)_70%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-6xl">
        <div
          ref={eyebrowRef}
          className="eyebrow text-[#FFE6B0]/80 mb-10 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[#FFE6B0]/40" />
          Autonomous SOC · v0.1 alpha
          <span className="inline-block w-8 h-px bg-[#FFE6B0]/40" />
        </div>

        <h1
          ref={headlineRef}
          className="display-tight text-[#F4EFE3] text-[clamp(3.5rem,11vw,11rem)] font-medium mb-1 overflow-hidden"
        >
          We extract
        </h1>
        <h1 className="display-tight text-[#F4EFE3] text-[clamp(3.5rem,11vw,11rem)] font-medium overflow-hidden -mt-3">
          <span
            ref={italicRef}
            className="display-wonk text-gradient-ember italic"
          >
            the&nbsp;signal.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-10 max-w-[640px] text-balance text-[#E4DDC8]/75 font-body text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6]"
        >
          99.8% of EDR alerts are noise. Vyrox cuts through the chaos with
          absolute precision — deterministic heuristics first, contextual
          reasoning second, human-in-the-loop for anything irreversible.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#access" className="btn-ember hover-lift group">
            Request Early Access
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#engine" className="btn-ghost hover-lift group">
            <Terminal className="w-3.5 h-3.5" />
            See the Engine
          </a>
        </div>

        <div
          ref={metaRef}
          className="absolute left-6 md:left-10 bottom-10 md:bottom-16 hidden md:flex flex-col gap-2 text-left font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4EFE3]/40"
        >
          <span><span className="text-[#E8462E]">●</span>&nbsp;&nbsp;SIGNAL ACQUIRED</span>
          <span>LAT&nbsp;12&nbsp;MS · FP&nbsp;0.2%</span>
          <span>UPTIME 99.997</span>
        </div>

        <div className="absolute right-6 md:right-10 bottom-10 md:bottom-16 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4EFE3]/40">
          <span>SCROLL ↓</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#FFE6B0]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
