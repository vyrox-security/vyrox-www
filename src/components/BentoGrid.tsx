"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Database, BrainCircuit, Flame, CheckCircle2, ShieldQuestion } from "lucide-react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const features = [
  {
    id: "ingestion",
    num: "01",
    title: "Ingestion Engine",
    description:
      "Connect to your EDR via native APIs. Ingest millions of events per second with zero rate-limiting, buffering directly into hot storage.",
    accent: "#E8462E",
  },
  {
    id: "heuristics",
    num: "02",
    title: "Deterministic Sub-system",
    description:
      "Before AI touches anything, a Rust heuristics engine drops ~90% of known false positives. Conserves tokens. Kills alert fatigue.",
    accent: "#C9892F",
  },
  {
    id: "llm",
    num: "03",
    title: "Autonomous Triage",
    description:
      "The AI engine analyzes full execution trees, reverse-engineers obfuscated scripts, and reasons contextually about the residual edge cases.",
    accent: "#8B2A12",
  },
  {
    id: "human",
    num: "04",
    title: "Human Override",
    description:
      "Vyrox requires explicit human sign-off for catastrophic actions like host isolation. Slack and Discord integrations keep your team in command.",
    accent: "#0E0A05",
  },
];

export default function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Magnetic hover — only attached on fine-pointer devices (see effect below)
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateX: -(y / rect.height) * 4,
      rotateY: (x / rect.width) * 6,
      transformPerspective: 1200,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  const onCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, []);

  // Touch devices: short-circuit magnetic hover. iOS Safari fires
  // mousemove on touch and the rotateX/Y tween causes scroll jank.
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;
  const hoverProps = isTouch
    ? {}
    : { onMouseMove: onCardMouseMove, onMouseLeave: onCardMouseLeave };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const cond = ctx.conditions as { isDesktop?: boolean };
          if (!containerRef.current) return;

          // Headline reveal
          const headSplit = headlineRef.current
            ? splitText(headlineRef.current, ["chars", "words"])
            : null;
          if (headSplit) {
            gsap.fromTo(
              headSplit.chars,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
                stagger: { each: 0.02, from: "start" },
                scrollTrigger: {
                  trigger: headlineRef.current,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Card entrance — each card pops in as you scroll past it
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, { opacity: 0, y: 80, scale: 0.96 });
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 30%",
                toggleActions: "play none none reverse",
              },
              delay: 0.06 * (i % 2),
            });
          });

          // Global progress bar tied to whole section scroll
          if (progressBarRef.current) {
            gsap.fromTo(
              progressBarRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                transformOrigin: "top",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top center",
                  end: "bottom center",
                  scrub: true,
                },
              }
            );
          }

          // Active-index sync via ScrollTrigger (desktop sticky narrative)
          if (cond.isDesktop) {
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              ScrollTrigger.create({
                trigger: card,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
              });
            });
          }

          return () => {
            headSplit?.revert();
          };
        }
      );

      // Reduced motion fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        cardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const setCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[idx] = el;
  };

  return (
    <section
      ref={containerRef}
      id="engine"
      className="surface-bone relative w-full text-[#0E0A05]"
    >
      {/* Texture */}
      <div className="bg-grid-bone absolute inset-0 opacity-40 pointer-events-none" />
      <div className="bg-grain mb-multiply absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" />

      {/* Section header — full bleed editorial */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <Flame className="w-3.5 h-3.5 text-[#E8462E]" />
          <span className="eyebrow text-[#6B5E48]">Section 02 / The Engine</span>
        </div>

        <h2
          ref={headlineRef}
          className="display-tight text-[#0E0A05] font-medium text-[clamp(3rem,9vw,8rem)] leading-[0.88] max-w-[14ch]"
        >
          A pipeline built to{" "}
          <span className="display-wonk italic text-gradient-ember">silence</span>{" "}
          the noise.
        </h2>

        <div className="mt-12 flex items-end justify-between gap-12 border-t border-[#0E0A05]/15 pt-6">
          <p className="max-w-[480px] text-[#2A2118]/75 leading-relaxed text-[clamp(0.95rem,1vw,1.05rem)]">
            Four stages, in order of decreasing certainty. Anything resolvable
            by code is. Anything resolvable by deterministic pattern is. Only
            the irreducibly ambiguous reaches the LLM — and never the human
            until it has to.
          </p>
          <div className="hidden md:flex items-center gap-5 font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5E48]">
            <span>4 stages</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>~12 ms p50</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>Rust + Python</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-12 relative z-10">
        {/* LEFT — sticky narrative (desktop only; on mobile each card
            carries its own label so this would just waste a viewport). */}
        <div className="hidden md:block md:w-[40%] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center py-20 pr-6">
            <div className="relative h-[300px]">
              {features.map((feature, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={feature.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 translate-y-6 invisible"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-mono text-sm tracking-[0.2em]"
                        style={{ color: feature.accent }}
                      >
                        {feature.num}
                      </span>
                      <div className="h-px flex-1 bg-[#0E0A05]/15" />
                      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#6B5E48]">
                        Stage {i + 1} / 4
                      </span>
                    </div>
                    <h3 className="font-display text-[clamp(1.8rem,3.2vw,3rem)] tracking-tight leading-[0.95] mb-5 text-[#0E0A05]">
                      {feature.title}
                    </h3>
                    <p className="text-[#2A2118]/75 text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.7] max-w-[380px]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER — progress rail */}
        <div className="hidden md:flex w-px relative flex-col items-center">
          <div className="absolute top-0 bottom-0 w-px bg-[#0E0A05]/15" />
          <div
            ref={progressBarRef}
            className="absolute top-0 w-px bg-gradient-to-b from-[#FF9156] via-[#E8462E] to-[#8B2A12] scale-y-0 shadow-[0_0_12px_rgba(232,70,46,0.4)]"
            style={{ height: "100%" }}
          />
        </div>

        {/* RIGHT — scrolling visual stages.
            Mobile: tight stack (no sticky narrative to pair against).
            Desktop: each card gets its own viewport-height for the sticky
            narrative on the left to swap content. */}
        <div className="w-full md:w-[55%] py-12 md:py-[24vh] flex flex-col gap-12 md:gap-[60vh]">
          {/* Card 01 — Ingestion */}
          <div
            ref={setCardRef(0)}
            data-index="0"
            {...hoverProps}
            className="term-window-bone w-full aspect-[4/3] p-7 relative will-change-transform"
          >
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-[#F2EAD8] px-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
              <Database className="w-3 h-3" />
              Gateway · /v1/webhook
            </div>

            <div className="h-full flex flex-col gap-4 pt-3">
              <div className="font-mono text-[12px] leading-[1.85] text-[#2A2118]/85 flex-1">
                <div>
                  <span className="text-[#6B5E48]">10:24:01</span>{" "}
                  <span className="text-[#E8462E] font-semibold">RCV</span> CrowdStrike · 4.2 KB
                </div>
                <div>
                  <span className="text-[#6B5E48]">10:24:01</span>{" "}
                  <span className="text-[#E8462E] font-semibold">RCV</span> CrowdStrike · 1.8 KB
                </div>
                <div>
                  <span className="text-[#6B5E48]">10:24:02</span>{" "}
                  <span className="text-[#E8462E] font-semibold">RCV</span> SentinelOne · 6.1 KB
                </div>
                <div className="text-[#6B5E48] italic">… parsing JSON schema</div>
                <div className="mt-3 pl-4 border-l-2 border-[#E8462E]/40">
                  <span className="text-[#C9892F]">&quot;event_type&quot;:</span>{" "}
                  <span className="text-[#0E0A05]">&quot;ProcessRollup2&quot;</span>
                  <br />
                  <span className="text-[#C9892F]">&quot;command_line&quot;:</span>{" "}
                  <span className="text-[#0E0A05]">&quot;powershell.exe -enc JABz...&quot;</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#0E0A05]/10 pt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5E48]">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8462E] animate-pulse" />
                  Stream Active
                </span>
                <span>3 events / 100 ms</span>
              </div>
            </div>
          </div>

          {/* Card 02 — Heuristics */}
          <div
            ref={setCardRef(1)}
            data-index="1"
            {...hoverProps}
            className="term-window-bone w-full aspect-[4/3] p-7 relative will-change-transform"
          >
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-[#F2EAD8] px-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
              <ShieldQuestion className="w-3 h-3" />
              Heuristics · rules/benign.yaml
            </div>

            <div className="h-full flex flex-col gap-3 pt-3">
              <RuleRow muted text="evt_89291 · background_updater.exe" tag="IGN_UPDATE" />

              <div className="bg-white/70 border border-[#E8462E]/30 p-5 shadow-[0_8px_30px_rgba(232,70,46,0.12)] relative">
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#E8462E] text-[#F2EAD8] font-mono text-[9px] tracking-[0.28em] uppercase rotate-[3deg]">
                  Dropped
                </div>
                <div className="font-mono text-sm text-[#0E0A05] mb-3">
                  evt_89292 · sysadmin_powershell
                </div>
                <div className="font-mono text-[11px] text-[#6B5E48] leading-relaxed">
                  MATCH <span className="text-[#0E0A05]/40">=&gt;</span> rules/benign_admin.yaml
                  <div className="pl-3 border-l border-[#0E0A05]/15 mt-2">
                    user.group <span className="text-[#E8462E]">==</span>{" "}
                    <span className="text-[#0E0A05]">&apos;Domain Admins&apos;</span>
                    <br />
                    action{" "}
                    <span className="text-[#E8462E] font-bold tracking-wider">SUPPRESS</span>
                  </div>
                </div>
              </div>

              <RuleRow muted text="evt_89293 · legitimate_npm_install" tag="IGN_NPM" />
            </div>
          </div>

          {/* Card 03 — LLM Triage */}
          <div
            ref={setCardRef(2)}
            data-index="2"
            {...hoverProps}
            className="term-window-bone w-full aspect-[4/3] p-7 relative will-change-transform"
          >
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-[#F2EAD8] px-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
              <BrainCircuit className="w-3 h-3" />
              Reasoning · gpt-4o · 220 tok
            </div>

            <div className="h-full flex flex-col items-stretch justify-center gap-5 pt-3">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 grid place-items-center bg-[#8B2A12]/8 border border-[#8B2A12]/30">
                  <BrainCircuit className="w-4 h-4 text-[#8B2A12]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
                    Vyrox Reasoning Engine
                  </span>
                  <span className="font-display text-base text-[#0E0A05]">
                    evt_89294 · svchost.exe
                  </span>
                </div>
              </div>

              <div className="bg-[#FBF6E7] border border-[#0E0A05]/10 p-5">
                <p className="font-display text-[15px] italic text-[#2A2118] leading-[1.6]">
                  &ldquo;Analyzing execution tree for{" "}
                  <span className="font-mono not-italic text-[11px] px-1.5 py-0.5 bg-[#0E0A05]/5 border border-[#0E0A05]/10">
                    svchost.exe
                  </span>
                  . Parent is unusual, but signature verifies as legitimate
                  Microsoft telemetry. Against historical baseline this is{" "}
                  <span className="text-[#E8462E] font-semibold not-italic">
                    benign with 99% confidence
                  </span>
                  .&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5E48]">
                <span>verdict · BENIGN</span>
                <span>cost · $0.0008</span>
              </div>
            </div>
          </div>

          {/* Card 04 — Human Override */}
          <div
            ref={setCardRef(3)}
            data-index="3"
            {...hoverProps}
            className="term-window-bone w-full aspect-[4/3] p-7 relative will-change-transform"
          >
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-[#F2EAD8] px-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
              <CheckCircle2 className="w-3 h-3" />
              Approval · #soc-vyrox · 11:05 AM
            </div>

            <div className="h-full flex flex-col items-stretch justify-center gap-4 pt-3">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#0E0A05] text-[#F2EAD8] grid place-items-center font-display font-bold text-sm shrink-0">
                  VY
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-medium text-[#0E0A05]">Vyrox</span>
                    <span className="chip chip-bone text-[9px] border-[#0E0A05]/20">APP</span>
                    <span className="font-mono text-[10px] text-[#6B5E48] ml-auto">11:05 AM</span>
                  </div>

                  <p className="text-[14px] text-[#2A2118] leading-snug mb-4">
                    <span className="font-semibold text-[#8B2A12]">Critical anomaly.</span>{" "}
                    High-risk memory injection detected on{" "}
                    <span className="font-mono text-[11px] px-1.5 py-0.5 bg-[#0E0A05]/5 border border-[#0E0A05]/10">
                      prod-db-01
                    </span>
                    . Recommend isolation.
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-[2] bg-[#8B2A12] hover:bg-[#A82612] text-[#F2EAD8] font-mono text-[11px] tracking-[0.18em] uppercase py-2.5 flex items-center justify-center gap-1.5 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="flex-1 bg-transparent border border-[#0E0A05]/25 text-[#0E0A05] font-mono text-[11px] tracking-[0.18em] uppercase py-2.5 hover:bg-[#0E0A05]/5 transition-colors">
                      Deny
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#0E0A05]/10 pt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5E48] flex justify-between">
                <span>requires · human sign-off</span>
                <span>SLA · 5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section close — wide quote band */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="border-t border-[#0E0A05]/15 pt-12 flex flex-col md:flex-row items-start gap-12">
          <span className="eyebrow text-[#6B5E48] shrink-0">Design Principle</span>
          <blockquote className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2] tracking-tight text-[#0E0A05] max-w-[800px]">
            &ldquo;The system that never wakes you up is the one you trust. Vyrox{" "}
            <span className="display-wonk italic text-gradient-ember">earns silence</span>{" "}
            by being right.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function RuleRow({ text, tag, muted }: { text: string; tag: string; muted?: boolean }) {
  return (
    <div
      className={`bg-white/50 border border-[#0E0A05]/10 p-3.5 flex justify-between items-center font-mono text-[11px] ${
        muted ? "opacity-50 blur-[1px]" : ""
      }`}
    >
      <span className="text-[#6B5E48] line-through decoration-[#0E0A05]/30">{text}</span>
      <span className="text-[#6B5E48] bg-[#0E0A05]/5 px-2 py-0.5 text-[9px] tracking-[0.22em] uppercase">
        MATCH · {tag}
      </span>
    </div>
  );
}
