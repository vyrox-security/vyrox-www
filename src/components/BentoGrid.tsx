"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Database,
  BrainCircuit,
  Flame,
  ShieldCheck,
  ShieldQuestion,
  GitCommit,
} from "lucide-react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* The four stages read on the left as a sticky narrative; each one is paired
   with a real crop of the Vyrox console on the right. Copy stays tied to the
   surface shown on screen. */
const features = [
  {
    id: "ingestion",
    num: "01",
    title: "Ingestion Engine",
    description:
      "Connect the EDRs you already run through native APIs. Every alert is ingested, normalized, and dropped into one cross-client work queue, scoped per tenant. Nothing dropped, nothing rate-limited.",
    accent: "#E8462E",
  },
  {
    id: "heuristics",
    num: "02",
    title: "Deterministic Sub-system",
    description:
      "Before any model sees an alert, a Rust heuristics engine scores it and suppresses known-benign patterns in under 5 ms. Aggregated by Noisy OR. Conserves tokens, kills alert fatigue.",
    accent: "#C9892F",
  },
  {
    id: "llm",
    num: "03",
    title: "Autonomous Triage",
    description:
      "Only the irreducibly ambiguous reaches the model. It reads the full execution tree, maps technique to MITRE ATT&CK, and writes a verdict with its reasoning attached.",
    accent: "#8B2A12",
  },
  {
    id: "human",
    num: "04",
    title: "Human Override",
    description:
      "Containment waits for a person. Approve the recommended action in the console and it lands in the tamper-evident, SHA-256 audit chain before it executes. Reversible by rollback.",
    accent: "#0E0A05",
  },
];

/* =============================================================
   Console palette (dark operational surface). Identical brand DNA
   to the marketing site: ember + bone + void slate. Source of truth
   is vyrox-console/packages/shared/src/styles/tokens.css.
   ============================================================= */
const C = {
  void: "#07070a",
  pitch: "#0b0c10",
  graphite: "#14161c",
  ash: "#1c1f27",
  slate: "#262a35",
  line: "#2e333f",
  lineSoft: "#23272f",
  fg: "#e9e7df",
  fgDim: "#a8a89e",
  fgFaint: "#6c6f78",
  bone: "#f2ead8",
  ember: "#e8462e",
  ember2: "#ff6a3d",
  emberSoft: "rgba(232, 70, 46, 0.12)",
  emberLine: "rgba(232, 70, 46, 0.4)",
  pass: "#2faf6a",
  passSoft: "rgba(47, 175, 106, 0.12)",
  passLine: "rgba(47, 175, 106, 0.45)",
} as const;

const consoleGrid: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(233,231,223,0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,231,223,0.022) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

export default function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Magnetic hover - only attached on fine-pointer devices (see effect below)
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

          // Cards are queried from the DOM (not held in a ref array) so we
          // never read a ref during render. Effects may read the DOM freely.
          const cards = Array.from(
            containerRef.current.querySelectorAll<HTMLDivElement>("[data-engine-card]")
          );

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

          // Card entrance - each card pops in as you scroll past it
          cards.forEach((card, i) => {
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
            cards.forEach((card, i) => {
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
        containerRef.current
          ?.querySelectorAll<HTMLDivElement>("[data-engine-card]")
          .forEach((card) => {
            gsap.set(card, { opacity: 1, y: 0, scale: 1 });
          });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="engine"
      className="surface-bone relative w-full text-[#0E0A05]"
    >
      {/* Texture */}
      <div className="bg-grid-bone absolute inset-0 opacity-40 pointer-events-none" />
      <div className="bg-grain mb-multiply absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" />

      {/* Section header - full bleed editorial */}
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
            the irreducibly ambiguous reaches the LLM, and never the human
            until it has to.
          </p>
          <div className="hidden md:flex items-center gap-5 font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5E48]">
            <span>4 stages</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>Sub-5 ms heuristics</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>Rust + Python</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-12 relative z-10">
        {/* LEFT - sticky narrative (desktop only; on mobile each card
            carries its own label so this would just waste a viewport). */}
        <div className="hidden md:block md:w-[40%] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center py-20 pr-6">
            <div className="relative h-[320px]">
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

        {/* CENTER - progress rail */}
        <div className="hidden md:flex w-px relative flex-col items-center">
          <div className="absolute top-0 bottom-0 w-px bg-[#0E0A05]/15" />
          <div
            ref={progressBarRef}
            className="absolute top-0 w-px bg-gradient-to-b from-[#FF9156] via-[#E8462E] to-[#8B2A12] scale-y-0 shadow-[0_0_12px_rgba(232,70,46,0.4)]"
            style={{ height: "100%" }}
          />
        </div>

        {/* RIGHT - real Vyrox console windows, one per stage.
            Mobile: tight stack. Desktop: each window gets its own
            viewport-height so the sticky narrative on the left can swap. */}
        <div className="w-full md:w-[55%] py-12 md:py-[24vh] flex flex-col gap-16 md:gap-[60vh]">
          {/* ---- Stage 01 - Work queue (ingestion) ---- */}
          <AppWindow
            index={0}
            hoverProps={hoverProps}
            tabIcon={<Database className="w-3 h-3" />}
            stage="01"
            stageLabel="Ingestion"
            route="console.vyrox.dev / queue"
            status={
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: C.ember }}
                />
                Live
              </span>
            }
            ariaLabel="Vyrox console work queue: EDR alerts across two client tenants, ranging from a critical credential-dumping alert to a benign scan auto-closed by heuristics."
          >
            {/* compressed filter toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {[
                ["Tenant", "All"],
                ["Severity", "Any"],
                ["Status", "Any"],
              ].map(([k, v]) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-1.5 font-mono"
                  style={{
                    fontSize: 10,
                    padding: "4px 8px",
                    border: `1px solid ${C.line}`,
                    background: C.graphite,
                    color: C.fgDim,
                  }}
                >
                  <span style={{ color: C.fgFaint }}>{k}:</span>
                  {v}
                </span>
              ))}
            </div>

            <div className="overflow-x-auto" style={{ border: `1px solid ${C.line}`, background: C.pitch }}>
              <table className="w-full border-collapse" style={{ fontSize: 12.5 }}>
                <thead>
                  <tr>
                    {["Tenant", "Alert", "Verdict", "Conf", "Status"].map((h) => (
                      <th
                        key={h}
                        className="font-mono uppercase text-left whitespace-nowrap"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.16em",
                          color: C.fgFaint,
                          padding: "9px 12px",
                          background: C.graphite,
                          borderBottom: `1px solid ${C.line}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUEUE_ROWS.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: i === QUEUE_ROWS.length - 1 ? "none" : `1px solid ${C.lineSoft}` }}>
                      <Td>
                        <span className="inline-flex items-center gap-2 whitespace-nowrap" style={{ color: C.fgDim, fontSize: 12 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: r.swatch, flex: "none" }} />
                          {r.tenant}
                        </span>
                      </Td>
                      <Td>
                        <span style={{ color: C.fg, fontWeight: 600 }}>{r.title}</span>
                      </Td>
                      <Td><VerdictChip v={r.verdict} /></Td>
                      <Td><ConfBar value={r.conf} /></Td>
                      <Td><StatusPill status={r.status} label={r.statusLabel} /></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="flex items-center justify-between mt-3 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />
                Stream active
              </span>
              <span>CrowdStrike · SentinelOne</span>
            </div>
          </AppWindow>

          {/* ---- Stage 02 - Deterministic sub-system (heuristics) ---- */}
          <AppWindow
            index={1}
            hoverProps={hoverProps}
            tabIcon={<ShieldQuestion className="w-3 h-3" />}
            stage="02"
            stageLabel="Heuristics"
            route="console.vyrox.dev / queue / alr_0xC5"
            status="4.8 ms"
            ariaLabel="Vyrox console alert detail: a benign scan suppressed by the deterministic heuristics engine before any model runs, with the matching rules and their weights."
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-1">
              <VerdictChip v="BENIGN" />
              <StatusPill status="auto_closed" label="Auto closed" />
            </div>
            <div style={{ color: C.fg, fontWeight: 600, fontSize: 14, margin: "8px 0 3px" }}>
              Developer ran nmap against staging subnet
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: C.fgFaint, marginBottom: 14 }}>
              NW-DEV-12 · m.ortiz · Northwind Capital
            </div>

            <Panel title="Heuristic score contributions">
              {HEURISTIC_ROWS.map((h) => (
                <ContribBar key={h.rule} name={h.rule} weight={h.weight} />
              ))}
              <p className="font-mono" style={{ fontSize: 10.5, color: C.fgFaint, marginTop: 8 }}>
                Aggregated by Noisy OR; verdict by severity rank.
              </p>
            </Panel>

            {/* deterministic result strip (pass-coloured, never the ember of a recommended action) */}
            <div
              className="flex items-center gap-3 mt-3"
              style={{ border: `1px solid ${C.passLine}`, background: C.passSoft, padding: "12px 14px" }}
            >
              <span
                className="font-mono uppercase"
                style={{ fontSize: 9, letterSpacing: "0.18em", color: C.pass }}
              >
                Deterministic match
              </span>
              <span className="font-mono" style={{ fontSize: 13, color: C.bone, fontWeight: 600 }}>
                SUPPRESS
              </span>
              <span className="ml-auto font-mono" style={{ fontSize: 10, color: C.fgFaint }}>
                dropped before the model
              </span>
            </div>

            <div
              className="flex items-center justify-between mt-3 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}
            >
              <span>Resolved in 4.8 ms · Rust</span>
              <span>0 tokens</span>
            </div>
          </AppWindow>

          {/* ---- Stage 03 - Autonomous triage (LLM) ---- */}
          <AppWindow
            index={2}
            hoverProps={hoverProps}
            tabIcon={<BrainCircuit className="w-3 h-3" />}
            stage="03"
            stageLabel="Triage"
            route="console.vyrox.dev / alerts / alr_0xC1"
            status="220 tok"
            ariaLabel="Vyrox console decision view: a critical mimikatz credential-dumping alert with the model's reasoning, confidence, and MITRE ATT&CK mapping."
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-1">
              <VerdictChip v="CRITICAL" />
              <StatusPill status="pending" label="Needs you" />
              <span className="ml-auto"><ConfBar value={0.94} /></span>
            </div>
            <div style={{ color: C.fg, fontWeight: 600, fontSize: 14, margin: "8px 0 3px" }}>
              Credential dumping via LSASS access (mimikatz)
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: C.fgFaint, marginBottom: 14 }}>
              MERIDIAN-DC-02 (crown jewel) · svc_backup
            </div>

            <Panel title="LLM reasoning">
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: C.fgDim }}>
                The process tree shows comsvcs.dll MiniDump invoked against LSASS,
                the canonical mimikatz technique, run under a backup service
                account on a crown-jewel domain controller. With an unsigned
                parent and a rare outbound destination, this is consistent with
                active credential theft before lateral movement.
              </p>
            </Panel>

            <div style={{ marginTop: 12 }}>
              <Panel title="MITRE ATT&CK">
                <div className="flex flex-wrap gap-2">
                  {MITRE.map((m) => (
                    <span
                      key={m.id}
                      style={{ border: `1px solid ${C.line}`, background: C.graphite, padding: "7px 10px" }}
                    >
                      <code className="font-mono" style={{ color: C.ember2, fontSize: 11 }}>{m.id}</code>
                      <span style={{ color: C.fgDim, fontSize: 11.5, marginLeft: 6 }}>{m.name}</span>
                    </span>
                  ))}
                </div>
              </Panel>
            </div>

            <div
              className="flex items-center justify-between mt-3 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}
            >
              <span>Verdict · Critical</span>
              <span>220 tok · $0.0011</span>
            </div>
          </AppWindow>

          {/* ---- Stage 04 - Human override (approval + audit chain) ---- */}
          <AppWindow
            index={3}
            hoverProps={hoverProps}
            tabIcon={<ShieldCheck className="w-3 h-3" />}
            stage="04"
            stageLabel="Human override"
            route="console.vyrox.dev / alerts / alr_0xC1"
            status="awaiting sign-off"
            ariaLabel="Vyrox console approval: a recommended host isolation awaiting human sign-off, with the action written to the tamper-evident SHA-256 audit chain."
          >
            {/* recommended action callout (ember) */}
            <div
              className="flex items-center gap-3"
              style={{ border: `1px solid ${C.emberLine}`, background: C.emberSoft, padding: "13px 15px" }}
            >
              <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.18em", color: C.ember2 }}>
                Recommended action
              </span>
              <span className="font-mono" style={{ fontSize: 14, color: C.bone, fontWeight: 600 }}>
                Isolate host
              </span>
            </div>
            <p style={{ fontSize: 12, color: C.fgDim, margin: "10px 0 14px", lineHeight: 1.6 }}>
              Isolates MERIDIAN-DC-02 from the network. Reversible via rollback.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <WinButton variant="primary">Approve</WinButton>
              <WinButton variant="default">Deny</WinButton>
              <WinButton variant="ghost">Investigate</WinButton>
            </div>

            <div style={{ marginTop: 16 }}>
              <Panel title="Audit chain" right="SHA-256 · append-only">
                <div className="font-mono" style={{ fontSize: 11.5 }}>
                  {CHAIN.map((n, i) => (
                    <div key={n.hash} className="flex items-center" style={{ gap: 12, padding: "7px 0" }}>
                      <span className="flex flex-col items-center" style={{ width: 14, flex: "none" }}>
                        <span
                          style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.pass}`, background: C.void }}
                        />
                        {i < CHAIN.length - 1 && (
                          <span style={{ width: 2, height: 14, background: C.pass, marginTop: 2 }} />
                        )}
                      </span>
                      <span style={{ color: C.fgDim, minWidth: 132 }}>{n.label}</span>
                      <span style={{ color: C.fgFaint }} className="truncate">{n.hash}</span>
                    </div>
                  ))}
                </div>
                <p className="font-mono inline-flex items-center gap-1.5" style={{ fontSize: 10.5, color: C.pass, marginTop: 6 }}>
                  <GitCommit className="w-3 h-3" />
                  chain verified continuous
                </p>
              </Panel>
            </div>

            <div
              className="flex items-center justify-between mt-3 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}
            >
              <span>Requires human sign-off</span>
              <span>SLA · 5 min</span>
            </div>
          </AppWindow>
        </div>
      </div>

      {/* Section close - wide quote band */}
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

/* =============================================================
   Real console data (mirrors vyrox-console mock fixtures).
   ============================================================= */
type Verdict = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "BENIGN";
type QStatus = "pending" | "auto_closed" | "executed" | "approved" | "denied";

const QUEUE_ROWS: {
  id: string;
  tenant: string;
  swatch: string;
  title: string;
  verdict: Verdict;
  conf: number;
  status: QStatus;
  statusLabel: string;
}[] = [
  {
    id: "alr_0xC1",
    tenant: "Meridian Health",
    swatch: "#eab308",
    title: "Credential dumping via LSASS access",
    verdict: "CRITICAL",
    conf: 0.94,
    status: "pending",
    statusLabel: "Needs you",
  },
  {
    id: "alr_0xC3",
    tenant: "Northwind Capital",
    swatch: "#e8462e",
    title: "Lateral movement over SMB",
    verdict: "HIGH",
    conf: 0.77,
    status: "pending",
    statusLabel: "Needs you",
  },
  {
    id: "alr_0xC2",
    tenant: "Meridian Health",
    swatch: "#eab308",
    title: "Encoded PowerShell, crown-jewel host",
    verdict: "HIGH",
    conf: 0.81,
    status: "pending",
    statusLabel: "Needs you",
  },
  {
    id: "alr_0xC5",
    tenant: "Northwind Capital",
    swatch: "#e8462e",
    title: "nmap against staging subnet",
    verdict: "BENIGN",
    conf: 0.88,
    status: "auto_closed",
    statusLabel: "Auto closed",
  },
];

const HEURISTIC_ROWS = [
  { rule: "sanctioned_scanner_subnet", weight: 0.92 },
  { rule: "known_dev_account", weight: 0.74 },
  { rule: "internal_destination_only", weight: 0.55 },
];

const MITRE = [
  { id: "T1003.001", name: "LSASS Memory" },
  { id: "T1003", name: "OS Credential Dumping" },
  { id: "T1071.001", name: "Web Protocols" },
];

const CHAIN = [
  { label: "verdict CRITICAL", hash: "a4f1c9e2b7d8" },
  { label: "approved · r.mehta", hash: "018b7c3d6e5f" },
  { label: "host isolated", hash: "4a2b1c0d9e8f" },
];

/* =============================================================
   Window chrome + console primitives. Pure presentation, faithful
   to the console's components; non-interactive (this is a product
   shot, not the live app).
   ============================================================= */

function AppWindow({
  index,
  hoverProps,
  tabIcon,
  stage,
  stageLabel,
  route,
  status,
  ariaLabel,
  children,
}: {
  index: number;
  hoverProps: React.DOMAttributes<HTMLDivElement>;
  tabIcon: React.ReactNode;
  stage: string;
  stageLabel: string;
  route: string;
  status: React.ReactNode;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-engine-card
      data-index={index}
      role="img"
      aria-label={ariaLabel}
      {...hoverProps}
      className="relative w-full will-change-transform"
      style={{
        background: C.pitch,
        border: `1px solid ${C.line}`,
        boxShadow:
          "0 40px 90px -30px rgba(0,0,0,0.6), 0 2px 0 rgba(255,255,255,0.03) inset",
      }}
    >
      {/* floating editorial stage tab, sits on the bone surface */}
      <div
        className="absolute -top-3 left-5 z-20 flex items-center gap-2 bg-[#F2EAD8] px-3 py-[3px] font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]"
      >
        {tabIcon}
        {stage} · {stageLabel}
      </div>

      {/* window chrome */}
      <div
        className="flex items-center justify-between gap-3"
        style={{ height: 36, padding: "0 14px", borderBottom: `1px solid ${C.lineSoft}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="grid place-items-center shrink-0 font-mono font-bold leading-none"
            style={{ width: 18, height: 18, background: C.bone, color: C.void, fontSize: 10 }}
          >
            V
          </span>
          <span className="font-mono truncate" style={{ fontSize: 11, color: C.fgDim }}>
            {route}
          </span>
        </div>
        <span
          className="font-mono uppercase shrink-0"
          style={{ fontSize: 10, letterSpacing: "0.12em", color: C.fgFaint }}
        >
          {status}
        </span>
      </div>

      {/* content */}
      <div className="relative" style={{ background: C.void }}>
        <div className="pointer-events-none absolute inset-0" style={consoleGrid} />
        <div className="relative" style={{ padding: "18px 18px 16px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  right,
  children,
}: {
  title?: string;
  right?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: `1px solid ${C.line}`, background: C.pitch, padding: "12px 13px" }}>
      {(title || right) && (
        <div className="flex items-center justify-between" style={{ marginBottom: 9 }}>
          <span className="font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: C.fgFaint }}>
            {title}
          </span>
          {right && (
            <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.12em", color: C.fgFaint }}>
              {right}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "11px 12px", verticalAlign: "middle" }}>{children}</td>;
}

const VERDICT_C: Record<Verdict, string> = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#eab308",
  LOW: "#3b82f6",
  BENIGN: "#5a8a6b",
};

function VerdictChip({ v }: { v: Verdict }) {
  const c = VERDICT_C[v];
  return (
    <span
      className="inline-flex items-center font-mono font-semibold uppercase"
      style={{ color: c, border: `1px solid ${c}`, fontSize: 9, letterSpacing: "0.08em", padding: "2px 6px" }}
    >
      {v}
    </span>
  );
}

const STATUS_DOT: Record<QStatus, string> = {
  pending: "#f97316",
  auto_closed: "#2faf6a",
  executed: "#3b82f6",
  approved: "#2faf6a",
  denied: "#6c6f78",
};

function StatusPill({ status, label }: { status: QStatus; label: string }) {
  return (
    <span
      className="inline-flex items-center font-mono uppercase whitespace-nowrap"
      style={{ fontSize: 9.5, letterSpacing: "0.06em", color: C.fgDim }}
    >
      <span
        className="inline-block"
        style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[status], marginRight: 6 }}
      />
      {label}
    </span>
  );
}

function ConfBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: 8 }}>
      <span style={{ width: 48, height: 5, background: C.ash, position: "relative", overflow: "hidden", display: "inline-block" }}>
        <span style={{ position: "absolute", inset: "0 auto 0 0", width: `${value * 100}%`, background: C.ember }} />
      </span>
      <span className="font-mono" style={{ fontSize: 10.5, color: C.fgDim, width: 30 }}>
        {Math.round(value * 100)}%
      </span>
    </span>
  );
}

function ContribBar({ name, weight }: { name: string; weight: number }) {
  return (
    <div className="flex items-center" style={{ gap: 10, padding: "7px 0" }}>
      <span className="font-mono flex-1 truncate" style={{ fontSize: 11, color: C.fgDim }}>
        {name}
      </span>
      <span style={{ width: 110, height: 6, background: C.ash, position: "relative", overflow: "hidden", flex: "none" }}>
        <span
          style={{ position: "absolute", inset: "0 auto 0 0", width: `${weight * 100}%`, background: `linear-gradient(90deg, ${C.ember}, ${C.ember2})` }}
        />
      </span>
      <span className="font-mono text-right" style={{ fontSize: 10.5, color: C.fgDim, width: 34, flex: "none" }}>
        {Math.round(weight * 100)}%
      </span>
    </div>
  );
}

function WinButton({
  variant,
  children,
}: {
  variant: "primary" | "default" | "ghost";
  children: React.ReactNode;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 14px",
    border: `1px solid ${C.line}`,
  };
  const variants: Record<typeof variant, React.CSSProperties> = {
    primary: { ...base, background: C.ember, borderColor: C.ember, color: C.bone },
    default: { ...base, background: C.graphite, color: C.fg },
    ghost: { ...base, background: "transparent", color: C.fg },
  };
  return (
    <span className="font-mono" style={variants[variant]} aria-hidden>
      {children}
    </span>
  );
}
