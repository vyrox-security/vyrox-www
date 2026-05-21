"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function NoiseVsSignal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const noiseHeadRef = useRef<HTMLHeadingElement>(null);
  const signalHeadRef = useRef<HTMLHeadingElement>(null);
  const signalSubRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // DESKTOP (fine pointer, no reduced motion) — full pinned reveal
      mm.add(
        "(min-width: 769px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!containerRef.current) return;

          const noiseSplit = noiseHeadRef.current
            ? splitText(noiseHeadRef.current, ["chars", "words"])
            : null;
          const signalSplit = signalHeadRef.current
            ? splitText(signalHeadRef.current, ["chars", "words"])
            : null;
          const subSplit = signalSubRef.current
            ? splitText(signalSubRef.current, ["words"])
            : null;

          gsap.set(signalRef.current, { clipPath: "circle(0% at 50% 60%)" });
          if (signalSplit) gsap.set(signalSplit.chars, { yPercent: 110, opacity: 0 });
          if (subSplit) gsap.set(subSplit.words, { yPercent: 60, opacity: 0 });
          gsap.set(statsRef.current?.children ?? [], { opacity: 0, y: 16 });

          if (noiseSplit) {
            gsap.fromTo(
              noiseSplit.chars,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.012,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=180%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          reveal
            .to(
              signalRef.current,
              { clipPath: "circle(150% at 50% 50%)", ease: "power2.inOut", duration: 1.2 },
              0
            )
            .to(noiseRef.current, { opacity: 0.18, scale: 0.92, ease: "power2.out", duration: 1.2 }, 0)
            .to(
              signalSplit?.chars ?? [],
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                ease: "expo.out",
                stagger: { each: 0.018, from: "start" },
              },
              0.55
            )
            .to(
              subSplit?.words ?? [],
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.02 },
              0.85
            )
            .to(
              statsRef.current?.children ?? [],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05 },
              0.95
            );

          gsap.fromTo(
            marqueeRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top -40%",
                end: "top -60%",
                scrub: true,
              },
            }
          );

          return () => {
            noiseSplit?.revert();
            signalSplit?.revert();
            subSplit?.revert();
          };
        }
      );

      // MOBILE / TOUCH — no pin, no scrub. Two-stage toggle keeps the
      // narrative (noise visible → signal reveals) without holding the
      // scroll, which is what causes the sluggish feel on iOS Safari.
      mm.add(
        "(max-width: 768px), (pointer: coarse)",
        () => {
          if (!containerRef.current) return;

          // Make sure signal layer is fully shaped — no clip-path animation.
          gsap.set(signalRef.current, { clipPath: "circle(0% at 50% 60%)", opacity: 1 });

          const noiseSplit = noiseHeadRef.current
            ? splitText(noiseHeadRef.current, ["chars", "words"])
            : null;
          const signalSplit = signalHeadRef.current
            ? splitText(signalHeadRef.current, ["chars", "words"])
            : null;
          const subSplit = signalSubRef.current
            ? splitText(signalSubRef.current, ["words"])
            : null;

          if (noiseSplit) {
            gsap.fromTo(
              noiseSplit.chars,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.01,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Single toggle: clip opens once on scroll-into, no scrub.
          // clip-path animated via short fixed-duration tween, NOT tied to scroll position.
          gsap.to(signalRef.current, {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 40%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.to(noiseRef.current, {
            opacity: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 40%",
              toggleActions: "play none none reverse",
            },
          });

          if (signalSplit) {
            gsap.fromTo(
              signalSplit.chars,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                stagger: { each: 0.018, from: "start" },
                ease: "expo.out",
                delay: 0.3,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 40%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
          if (subSplit) {
            gsap.fromTo(
              subSplit.words,
              { yPercent: 60, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.02,
                ease: "power3.out",
                delay: 0.7,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 40%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
          gsap.fromTo(
            statsRef.current?.children ?? [],
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
              delay: 0.85,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );
          gsap.fromTo(
            marqueeRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: 1.0,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );

          return () => {
            noiseSplit?.revert();
            signalSplit?.revert();
            subSplit?.revert();
          };
        }
      );

      // Reduced motion — show signal layer fully
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(signalRef.current, { clipPath: "none" });
        gsap.set(noiseRef.current, { opacity: 0.2 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden z-10"
      aria-label="Noise versus signal"
    >
      {/* LAYER 1 — NOISE (base, void) */}
      <div
        ref={noiseRef}
        className="surface-void absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="bg-grain mb-overlay absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="bg-grid-void absolute inset-0 opacity-50" />

        {/* Noise eyebrow */}
        <div className="absolute top-12 left-0 right-0 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.32em] uppercase text-[#F4EFE3]/30">
          <span className="w-12 h-px bg-[#F4EFE3]/20" />
          The Problem
          <span className="w-12 h-px bg-[#F4EFE3]/20" />
        </div>

        <div className="smolder-glow">
          <h2
            ref={noiseHeadRef}
            className="display-tight text-gradient-smolder font-medium text-[clamp(1.6rem,7.4vw,8rem)] leading-[0.95] text-center px-2 select-none whitespace-nowrap"
            aria-label="99.8% of alerts are noise"
          >
            99.8% of alerts are noise.
          </h2>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-2 text-[#F4EFE3]/25 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span>scroll to extract</span>
          <span className="inline-block w-4 h-px bg-[#F4EFE3]/30 animate-pulse" />
        </div>
      </div>

      {/* LAYER 2 — SIGNAL (mask reveals on scroll, bone) */}
      <div
        ref={signalRef}
        className="surface-bone absolute inset-0 flex flex-col items-center justify-center will-change-[clip-path]"
        style={{ clipPath: "circle(0% at 50% 60%)" }}
      >
        <div className="bg-grid-bone absolute inset-0 opacity-50" />
        <div className="bg-grain mb-multiply absolute inset-0 opacity-[0.08] mix-blend-multiply" />

        {/* Soft warm vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#FFFCF1_0%,transparent_55%)]" />

        {/* Signal eyebrow */}
        <div className="absolute top-12 left-0 right-0 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.32em] uppercase text-[#0E0A05]/45">
          <span className="w-12 h-px bg-[#0E0A05]/25" />
          The Answer
          <span className="w-12 h-px bg-[#0E0A05]/25" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6">
          <h2
            ref={signalHeadRef}
            className="display-tight text-[#0E0A05] font-medium text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] text-center"
            aria-label="We extract the signal"
          >
            We extract
          </h2>
          <h2 className="display-tight text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] font-medium text-center -mt-3">
            <span className="display-wonk italic text-gradient-ember">
              the signal.
            </span>
          </h2>

          <p
            ref={signalSubRef}
            className="mt-8 max-w-[640px] text-balance text-center text-[#2A2118]/80 font-body text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.65]"
          >
            Vyrox cuts through the chaos with absolute precision, delivering
            only actionable intelligence.
          </p>

          <div
            ref={statsRef}
            className="mt-12 grid grid-cols-3 gap-6 md:gap-12 w-full max-w-[640px]"
          >
            <Stat label="Status" value="Signal Acquired" accent />
            <Stat label="Latency" value="12 ms" />
            <Stat label="False Pos." value="0.2%" />
          </div>
        </div>

        {/* Bottom marquee */}
        <div
          ref={marqueeRef}
          className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-[#0E0A05]/15 bg-[#ECE3CC]/85"
          aria-hidden="true"
        >
          <div className="marquee-track py-3 font-mono text-[11px] tracking-[0.28em] uppercase text-[#0E0A05]/55">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="px-8 inline-flex items-center gap-3">
                Signal acquired
                <span className="inline-block w-1.5 h-1.5 bg-[#E8462E] rounded-full" />
                12 ms triage
                <span className="inline-block w-1.5 h-1.5 bg-[#E8462E] rounded-full" />
                0.2% false positive
                <span className="inline-block w-1.5 h-1.5 bg-[#E8462E] rounded-full" />
                Zero black-box AI
                <span className="inline-block w-1.5 h-1.5 bg-[#E8462E] rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-l border-[#0E0A05]/15 pl-4">
      <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#0E0A05]/45">
        {label}
      </span>
      <span
        className={`font-display text-[clamp(1.1rem,1.6vw,1.6rem)] tracking-tight leading-none ${
          accent ? "text-[#E8462E]" : "text-[#0E0A05]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
