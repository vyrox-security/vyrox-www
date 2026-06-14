"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Database, BrainCircuit, Flame, ShieldCheck, ShieldQuestion, GitCommit } from "lucide-react";
import { splitText } from "@/lib/text-split";
import TiltWindow from "@/components/TiltWindow";
import {
  C,
  ConsoleWindow,
  Panel,
  VerdictChip,
  StatusPill,
  ConfBar,
  ContribBar,
  WinButton,
  QueueTable,
  HEURISTIC_ROWS,
  MITRE,
  CHAIN,
} from "@/components/console";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STAGES = [
  { num: "01", title: "Ingestion", desc: "Every alert, normalized into one cross-client queue.", accent: "#FF9156" },
  { num: "02", title: "Heuristics", desc: "Rust drops known-benign patterns in under 5 ms.", accent: "#E8462E" },
  { num: "03", title: "Triage", desc: "Only the irreducibly ambiguous reaches the model.", accent: "#FF6A3D" },
  { num: "04", title: "Human override", desc: "Containment waits for your approval, then it is chained.", accent: "#FFE6B0" },
];

export default function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!containerRef.current) return;

        const headSplit = headlineRef.current ? splitText(headlineRef.current, ["chars", "words"]) : null;
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
              scrollTrigger: { trigger: headlineRef.current, start: "top 78%", toggleActions: "play none none reverse" },
            }
          );
        }

        containerRef.current.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" },
            }
          );
        });

        return () => headSplit?.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        containerRef.current
          ?.querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const footerRow = (left: React.ReactNode, right: React.ReactNode) => (
    <div className="flex items-center justify-between mt-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: C.fgFaint }}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );

  return (
    <section ref={containerRef} id="engine" className="surface-deep relative w-full border-t border-white/[0.06]">
      <div className="bg-grid-void absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 pt-40 pb-44">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8" data-reveal>
          <Flame className="w-3.5 h-3.5 text-[#E8462E]" />
          <span className="eyebrow text-[#FFE6B0]/70">Section 01 / The Engine</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-16 items-end">
          <h2
            ref={headlineRef}
            className="display-tight text-[#F8F4EA] font-semibold text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] max-w-[15ch]"
          >
            A pipeline built to{" "}
            <span className="text-gradient-ember">silence</span> the noise.
          </h2>
          <p data-reveal className="text-[#EBE5D6]/82 leading-relaxed text-[clamp(0.98rem,1vw,1.1rem)] max-w-[440px] lg:pb-3">
            Four stages, in order of decreasing certainty. Anything resolvable by code is. Anything
            resolvable by pattern is. Only the irreducibly ambiguous reaches the LLM, and never the
            human until it has to.
          </p>
        </div>

        {/* Horizontal stage stepper */}
        <div className="mt-24 border-t border-white/12 pt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14" data-reveal>
          {STAGES.map((s) => (
            <div key={s.num} className="relative">
              <span
                className="absolute -top-[33px] left-0 w-2 h-2 rounded-full"
                style={{ background: s.accent, boxShadow: `0 0 10px ${s.accent}66` }}
              />
              <span className="font-mono text-[12px] tracking-[0.2em]" style={{ color: s.accent }}>
                {s.num}
              </span>
              <h3 className="font-display font-semibold text-[#F4EFE3] text-[1.15rem] mt-2.5 tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-[#EBE5D6]/65 text-[13.5px] leading-[1.55] mt-2 max-w-[220px]">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* 2x2 console windows */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-28">
          {/* 01 - Work queue */}
          <div data-reveal>
            <TiltWindow max={5}>
              <ConsoleWindow
                tab={{ icon: <Database className="w-3 h-3" />, label: "01 · Ingestion" }}
                route="console.vyrox.dev / queue"
                status={<span className="inline-flex items-center gap-1.5"><span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />Live</span>}
                ariaLabel="Vyrox console work queue across two client tenants."
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {[["Tenant", "All"], ["Severity", "Any"], ["Status", "Any"]].map(([k, v]) => (
                    <span key={k} className="inline-flex items-center gap-1.5 font-mono" style={{ fontSize: 10, padding: "4px 8px", border: `1px solid ${C.line}`, background: C.graphite, color: C.fgDim }}>
                      <span style={{ color: C.fgFaint }}>{k}:</span>{v}
                    </span>
                  ))}
                </div>
                <QueueTable />
                {footerRow(
                  <span className="inline-flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />Stream active</span>,
                  "CrowdStrike · SentinelOne"
                )}
              </ConsoleWindow>
            </TiltWindow>
          </div>

          {/* 02 - Heuristics */}
          <div data-reveal>
            <TiltWindow max={5}>
              <ConsoleWindow
                tab={{ icon: <ShieldQuestion className="w-3 h-3" />, label: "02 · Heuristics" }}
                route="console.vyrox.dev / queue / alr_0xC5"
                status="4.8 ms"
                ariaLabel="A benign scan suppressed by the deterministic heuristics engine."
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                  <VerdictChip v="BENIGN" />
                  <StatusPill status="auto_closed" label="Auto closed" />
                </div>
                <div style={{ color: C.fg, fontWeight: 600, fontSize: 14, margin: "8px 0 3px" }}>Developer ran nmap against staging subnet</div>
                <div className="font-mono" style={{ fontSize: 11, color: C.fgFaint, marginBottom: 14 }}>NW-DEV-12 · m.ortiz · Northwind Capital</div>
                <Panel title="Heuristic score contributions">
                  {HEURISTIC_ROWS.map((h) => <ContribBar key={h.rule} name={h.rule} weight={h.weight} />)}
                  <p className="font-mono" style={{ fontSize: 10.5, color: C.fgFaint, marginTop: 8 }}>Aggregated by Noisy OR; verdict by severity rank.</p>
                </Panel>
                <div className="flex items-center gap-3 mt-3" style={{ border: `1px solid ${C.passLine}`, background: C.passSoft, padding: "12px 14px" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.18em", color: C.pass }}>Deterministic match</span>
                  <span className="font-mono" style={{ fontSize: 13, color: C.bone, fontWeight: 600 }}>SUPPRESS</span>
                  <span className="ml-auto font-mono" style={{ fontSize: 10, color: C.fgFaint }}>dropped before the model</span>
                </div>
                {footerRow("Resolved in 4.8 ms · Rust", "0 tokens")}
              </ConsoleWindow>
            </TiltWindow>
          </div>

          {/* 03 - Triage */}
          <div data-reveal>
            <TiltWindow max={5}>
              <ConsoleWindow
                tab={{ icon: <BrainCircuit className="w-3 h-3" />, label: "03 · Triage" }}
                route="console.vyrox.dev / alerts / alr_0xC1"
                status="220 tok"
                ariaLabel="The decision view for a critical mimikatz credential-dumping alert."
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                  <VerdictChip v="CRITICAL" />
                  <StatusPill status="pending" label="Needs you" />
                  <span className="ml-auto"><ConfBar value={0.94} /></span>
                </div>
                <div style={{ color: C.fg, fontWeight: 600, fontSize: 14, margin: "8px 0 3px" }}>Credential dumping via LSASS access (mimikatz)</div>
                <div className="font-mono" style={{ fontSize: 11, color: C.fgFaint, marginBottom: 14 }}>MERIDIAN-DC-02 (crown jewel) · svc_backup</div>
                <Panel title="LLM reasoning">
                  <p style={{ fontSize: 12.5, lineHeight: 1.7, color: C.fgDim }}>
                    The process tree shows comsvcs.dll MiniDump invoked against LSASS, the canonical mimikatz
                    technique, run under a backup service account on a crown-jewel domain controller. With an
                    unsigned parent and a rare outbound destination, this is consistent with active credential
                    theft before lateral movement.
                  </p>
                </Panel>
                <div style={{ marginTop: 12 }}>
                  <Panel title="MITRE ATT&CK">
                    <div className="flex flex-wrap gap-2">
                      {MITRE.map((m) => (
                        <span key={m.id} style={{ border: `1px solid ${C.line}`, background: C.graphite, padding: "7px 10px" }}>
                          <code className="font-mono" style={{ color: C.ember2, fontSize: 11 }}>{m.id}</code>
                          <span style={{ color: C.fgDim, fontSize: 11.5, marginLeft: 6 }}>{m.name}</span>
                        </span>
                      ))}
                    </div>
                  </Panel>
                </div>
                {footerRow("Verdict · Critical", "220 tok · $0.0011")}
              </ConsoleWindow>
            </TiltWindow>
          </div>

          {/* 04 - Human override */}
          <div data-reveal>
            <TiltWindow max={5}>
              <ConsoleWindow
                tab={{ icon: <ShieldCheck className="w-3 h-3" />, label: "04 · Human override" }}
                route="console.vyrox.dev / alerts / alr_0xC1"
                status="awaiting sign-off"
                ariaLabel="A recommended host isolation awaiting human sign-off, written to the SHA-256 audit chain."
              >
                <div className="flex items-center gap-3" style={{ border: `1px solid ${C.emberLine}`, background: C.emberSoft, padding: "13px 15px" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.18em", color: C.ember2 }}>Recommended action</span>
                  <span className="font-mono" style={{ fontSize: 14, color: C.bone, fontWeight: 600 }}>Isolate host</span>
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
                            <span style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.pass}`, background: C.void }} />
                            {i < CHAIN.length - 1 && <span style={{ width: 2, height: 14, background: C.pass, marginTop: 2 }} />}
                          </span>
                          <span style={{ color: C.fgDim, minWidth: 132 }}>{n.label}</span>
                          <span style={{ color: C.fgFaint }} className="truncate">{n.hash}</span>
                        </div>
                      ))}
                    </div>
                    <p className="font-mono inline-flex items-center gap-1.5" style={{ fontSize: 10.5, color: C.pass, marginTop: 6 }}>
                      <GitCommit className="w-3 h-3" />chain verified continuous
                    </p>
                  </Panel>
                </div>
                {footerRow("Requires human sign-off", "SLA · 5 min")}
              </ConsoleWindow>
            </TiltWindow>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-40 border-t border-white/10 pt-14 flex flex-col md:flex-row items-start gap-12" data-reveal>
          <span className="eyebrow text-[#FFE6B0]/70 shrink-0">Design Principle</span>
          <blockquote className="font-display font-medium text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.2] tracking-[-0.01em] text-[#F8F4EA] max-w-[800px]">
            The system that never wakes you up is the one you trust. Vyrox{" "}
            <span className="text-gradient-ember">earns silence</span> by being right.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
