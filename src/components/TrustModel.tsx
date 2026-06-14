"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, FileCode2, FileCog, ScrollText, ArrowUpRight, Check } from "lucide-react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function TrustModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // -- helpers shared by both branches -----------------------------------
      const setCounters = (animate: boolean) => {
        const counters = numbersRef.current?.querySelectorAll<HTMLSpanElement>("[data-counter]");
        counters?.forEach((el) => {
          const target = Number(el.dataset.counter || "0");
          const suffix = el.dataset.suffix || "";
          if (!animate) {
            el.textContent = target.toLocaleString() + suffix;
            return;
          }
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString() + suffix;
            },
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          });
        });
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = cardsRef.current;
        if (!root) return;

        // Headline char reveal
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
              duration: 1.1,
              ease: "expo.out",
              stagger: { each: 0.018, from: "start" },
              scrollTrigger: { trigger: headlineRef.current, start: "top 82%", toggleActions: "play none none reverse" },
            }
          );
        }

        setCounters(true);

        // -- initial hidden states (no FOUC before scroll) -------------------
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-card]"));
        const rail = root.querySelector<HTMLElement>("[data-rail]");
        const verified = root.querySelector<HTMLElement>("[data-verified]");

        gsap.set(items, { opacity: 0, y: 42 });
        gsap.set(root.querySelectorAll("[data-code-line]"), { opacity: 0, x: -10 });
        gsap.set(root.querySelectorAll("[data-log-line]"), { opacity: 0, y: 6 });
        if (rail) gsap.set(rail, { scaleY: 0, transformOrigin: "top" });
        if (verified) gsap.set(verified, { opacity: 0, y: 4 });

        // Rail draws down as the stack enters
        if (rail) {
          gsap.to(rail, {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none reverse" },
          });
        }

        // Per-card: reveal, light the rail node, type the code in line by line
        items.forEach((item) => {
          const node = item.querySelector<HTMLElement>("[data-node]");
          const codeLines = item.querySelectorAll<HTMLElement>("[data-code-line]");
          const scan = item.querySelector<HTMLElement>("[data-scan]");
          const pulses = item.querySelectorAll<HTMLElement>("[data-pulse]");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: item, start: "top 86%", toggleActions: "play none none reverse" },
          });
          tl.to(item, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" });
          if (node) {
            tl.to(
              node,
              { backgroundColor: "#E8462E", borderColor: "#E8462E", boxShadow: "0 0 12px rgba(232,70,46,0.85)", duration: 0.4 },
              0.15
            );
          }
          if (codeLines.length) {
            tl.to(codeLines, { opacity: 1, x: 0, duration: 0.5, stagger: 0.055, ease: "power2.out" }, 0.2);
          }
          // Rust read-head sweep
          if (scan) {
            tl.set(scan, { top: "0%", opacity: 0 }, 0.2)
              .to(scan, { opacity: 0.9, duration: 0.15 }, 0.25)
              .to(scan, { top: "100%", duration: 1.0, ease: "power1.inOut" }, 0.3)
              .to(scan, { opacity: 0, duration: 0.25 }, ">-0.25");
          }
          // YAML action chips pulse once after the lines land
          if (pulses.length) {
            tl.fromTo(
              pulses,
              { boxShadow: "0 0 0 rgba(232,70,46,0)" },
              { boxShadow: "0 0 14px rgba(232,70,46,0.55)", duration: 0.35, yoyo: true, repeat: 1, stagger: 0.12, ease: "power2.inOut" },
              ">-0.1"
            );
          }
        });

        // -- audit_log.json: live append loop --------------------------------
        const auditCard = items[items.length - 1];
        const logLines = auditCard?.querySelectorAll<HTMLElement>("[data-log-line]");
        const chainOk = auditCard?.querySelector<HTMLElement>("[data-chain-ok]");

        if (logLines && logLines.length) {
          const logTl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, paused: true });
          if (chainOk) logTl.set(chainOk, { color: "#8a8a82", textShadow: "none" }, 0);
          logTl.fromTo(
            logLines,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.46, ease: "power2.out" }
          );
          if (chainOk) {
            logTl.to(chainOk, { color: "#2faf6a", textShadow: "0 0 10px rgba(47,175,106,0.55)", duration: 0.35 }, ">-0.05");
          }
          if (verified) {
            logTl.fromTo(verified, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, "<");
          }
          ScrollTrigger.create({
            trigger: auditCard,
            start: "top 85%",
            end: "bottom 12%",
            onToggle: (self) => (self.isActive ? logTl.play() : logTl.pause()),
          });
        }

        return () => {
          headSplit?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setCounters(false);
        const root = cardsRef.current;
        if (!root) return;
        gsap.set(root.querySelectorAll("[data-card]"), { opacity: 1, y: 0 });
        gsap.set(root.querySelectorAll("[data-code-line]"), { opacity: 1, x: 0 });
        gsap.set(root.querySelectorAll("[data-log-line]"), { opacity: 1, y: 0 });
        gsap.set(root.querySelectorAll("[data-node]"), { backgroundColor: "#E8462E", borderColor: "#E8462E" });
        const rail = root.querySelector("[data-rail]");
        if (rail) gsap.set(rail, { scaleY: 1, transformOrigin: "top" });
        const verified = root.querySelector("[data-verified]");
        if (verified) gsap.set(verified, { opacity: 1, y: 0 });
        const chainOk = root.querySelector("[data-chain-ok]");
        if (chainOk) gsap.set(chainOk, { color: "#2faf6a" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="security"
      className="surface-deep relative w-full py-28 lg:py-36 border-t border-white/[0.06]"
    >
      <div className="bg-grid-void absolute inset-0 opacity-50 pointer-events-none" />

      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-start justify-between gap-16 relative z-10">
        {/* LEFT - copy */}
        <div className="w-full lg:w-1/2 flex flex-col lg:sticky lg:top-28 lg:pr-8">
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8462E]" />
            <span className="eyebrow text-[#FFE6B0]/70">Section 03 / Trust</span>
          </div>

          <h2
            ref={headlineRef}
            className="display-tight text-[#F8F4EA] font-semibold text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] mb-10 max-w-[16ch]"
          >
            Open-core.{" "}
            <span className="text-gradient-ember">Total transparency.</span>
          </h2>

          <div className="w-16 h-px bg-white/25 mb-8" />

          <p className="text-[#EBE5D6]/82 leading-[1.75] max-w-[440px] text-[clamp(0.98rem,1.05vw,1.1rem)]">
            Black-box decisions are a liability in the SOC. Vyrox&apos;s heuristics are inspectable,
            the Rust proxy is MIT-licensed, and every action is written to an append-only, SHA-256
            chained log. The record you hand each client&apos;s auditor is tamper-evident since
            generation and independently verifiable.
          </p>

          <div ref={numbersRef} className="mt-14 grid grid-cols-3 gap-6 max-w-[520px]">
            <BigStat value="100" suffix="%" label="Auditable logic" />
            <BigStat value="0" label="Hidden prompts" />
            <BigStat value="10" suffix=" min" label="To first alert" />
          </div>

          <div className="mt-14 flex items-center gap-6 flex-wrap">
            <a href="https://github.com/vyrox-security" className="btn-ember hover-lift group">
              View on GitHub
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="https://docs.vyrox.dev" className="btn-ghost hover-lift">
              <FileCode2 className="w-3.5 h-3.5" />
              Read the docs
            </a>
          </div>
        </div>

        {/* RIGHT - the transparency proof stack: read the code, read the rules,
            verify the log. Connected down a single ember rail. */}
        <div ref={cardsRef} className="relative w-full lg:w-1/2 lg:max-w-[520px]">
          {/* the rail */}
          <div
            data-rail
            className="absolute left-[10px] top-3 bottom-3 w-px bg-gradient-to-b from-[#E8462E]/0 via-[#E8462E]/45 to-[#E8462E]/0"
            aria-hidden
          />

          <div className="flex flex-col gap-6">
            {/* 01 - the logic */}
            <StackItem>
              <FileHead
                step="01"
                purpose="The logic"
                icon={<FileCode2 className="w-3 h-3" />}
                name="triage_engine.rs"
                chip={<span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-[#6c6f78]">Rust · MIT</span>}
              />
              <div className="relative overflow-hidden">
                <div
                  data-scan
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 h-px z-10 opacity-0"
                  style={{ background: "linear-gradient(90deg, transparent, #E8462E 50%, transparent)", boxShadow: "0 0 8px rgba(232,70,46,0.7)" }}
                />
                <Code>
                  <Ln n={1}><K>pub struct</K> <T>TriageEngine</T> {"{"}</Ln>
                  <Ln n={2} i={1}><D>heuristics:</D> <T>HeuristicSet</T>,</Ln>
                  <Ln n={3} i={1}><D>llm_client:</D> <T>LLMTriage</T>,</Ln>
                  <Ln n={4}>{"}"}</Ln>
                  <Ln n={5}>{" "}</Ln>
                  <Ln n={6}><K>impl</K> <T>TriageEngine</T> {"{"}</Ln>
                  <Ln n={7} i={1}><K>pub async fn</K> <T>evaluate</T>(<D>&amp;self</D>, alert: <T>EDRAlert</T>) {"{"}</Ln>
                  <Ln n={8} i={2}><K>if</K> self.heuristics.<T>is_false_positive</T>(<D>&amp;alert</D>) {"{"}</Ln>
                  <Ln n={9} i={3}><K>return</K> Action::<C>Suppress</C>;</Ln>
                  <Ln n={10} i={2}>{"}"}</Ln>
                  <Ln n={11} i={2}><Cm>{"// only the ambiguous reaches the LLM"}</Cm></Ln>
                  <Ln n={12} i={2}><K>Ok</K>(ctx.<T>verdict</T>())</Ln>
                  <Ln n={13} i={1}>{"}"}</Ln>
                  <Ln n={14}>{"}"}</Ln>
                </Code>
              </div>
            </StackItem>

            {/* 02 - the rules */}
            <StackItem>
              <FileHead
                step="02"
                purpose="The rules"
                icon={<FileCog className="w-3 h-3" />}
                name="heuristics.yaml"
                chip={
                  <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#FF6A3D] border border-[#E8462E]/40 px-1.5 py-0.5">
                    Open-core
                  </span>
                }
              />
              <Code>
                <Ln n={1}><D>name:</D> <S>Global Suppress List</S></Ln>
                <Ln n={2}><D>rules:</D></Ln>
                <Ln n={3} i={1}>- <D>match:</D> <S>&quot;process.name == &apos;updater.exe&apos;&quot;</S></Ln>
                <Ln n={4} i={2}><D>action:</D> <Tag>SUPPRESS</Tag></Ln>
                <Ln n={5} i={2}><D>confidence:</D> <S>1.0</S></Ln>
                <Ln n={6}>{" "}</Ln>
                <Ln n={7} i={1}>- <D>match:</D> <S>&quot;network.dest == &apos;10.0.0.0/8&apos;&quot;</S></Ln>
                <Ln n={8} i={2}><D>action:</D> <Tag>IGNORE</Tag></Ln>
              </Code>
            </StackItem>

            {/* 03 - the proof (live) */}
            <StackItem>
              <FileHead
                step="03"
                purpose="The proof"
                icon={<ScrollText className="w-3 h-3" />}
                name="audit_log.json"
                chip={
                  <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-[#6c6f78] inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2faf6a] animate-pulse" />
                    Append-only · SHA-256
                  </span>
                }
              />
              <div className="font-mono text-[11px] leading-[1.95]">
                <LogLine t="10:42:01" level="INFO">Alert evt_992 ingested</LogLine>
                <LogLine t="10:42:01" level="INFO">Eval rule 42a</LogLine>
                <LogLine t="10:42:02" level="WARN">No deterministic match</LogLine>
                <LogLine t="10:42:02" level="INFO">Route → LLM</LogLine>
                <LogLine t="10:42:05" level="DONE">Verdict applied</LogLine>
                <LogLine t="10:42:05" level="INFO">
                  hash = <span data-chain-ok className="text-[#8a8a82]">a7c…f12 (chain ok)</span>
                </LogLine>
                {/* live prompt caret */}
                <div className="flex items-center gap-2 mt-1.5 text-[#5b5e67]" aria-hidden>
                  <span>[stream]</span>
                  <span className="caret-blink inline-block w-[7px] h-[13px] bg-[#E8462E] translate-y-[1px]" />
                </div>
              </div>
              <div
                data-verified
                className="mt-4 inline-flex items-center gap-2 border border-[#2faf6a]/35 bg-[#2faf6a]/10 px-3 py-1.5"
              >
                <Check className="w-3 h-3 text-[#2faf6a]" />
                <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[#2faf6a]">
                  Chain continuous · signature valid
                </span>
              </div>
            </StackItem>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- stack scaffolding ------------------------------------------------- */

function StackItem({ children }: { children: ReactNode }) {
  return (
    <div data-card className="relative pl-9">
      <span
        data-node
        aria-hidden
        className="absolute left-[5px] top-[26px] w-2.5 h-2.5 rounded-full border border-[#E8462E]/55 bg-[#0a0b0f] z-10"
      />
      <div className="card-deep card-deep-hover p-6">{children}</div>
    </div>
  );
}

function FileHead({
  step,
  purpose,
  icon,
  name,
  chip,
}: {
  step: string;
  purpose: string;
  icon: ReactNode;
  name: string;
  chip: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#FF9156] shrink-0">{step}</span>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6c6f78] shrink-0">{purpose}</span>
        <span className="w-px h-3 bg-white/15 shrink-0" />
        <span className="text-[#7d808a] shrink-0">{icon}</span>
        <span className="font-mono text-[11px] tracking-[0.03em] text-[#cfcabb] truncate">{name}</span>
      </div>
      <span className="shrink-0">{chip}</span>
    </div>
  );
}

/* ---- code primitives --------------------------------------------------- */

function Code({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[11.5px] leading-[1.85]">{children}</div>;
}

function Ln({ n, i = 0, children }: { n: number; i?: number; children: ReactNode }) {
  return (
    <div data-code-line className="flex">
      <span className="w-6 shrink-0 select-none text-right pr-3 text-[#393c45]">{n}</span>
      <span className="flex-1 text-[#c9c6bd]" style={{ paddingLeft: i * 14 }}>
        {children}
      </span>
    </div>
  );
}

// syntax tones
const K = ({ children }: { children: ReactNode }) => <span className="text-[#6c6f78]">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="text-[#FF6A3D]">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-[#6c6f78]">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-[#c9c6bd]">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-[#8a8a82]">{children}</span>;
const Cm = ({ children }: { children: ReactNode }) => <span className="text-[#5b5e67] italic">{children}</span>;
const Tag = ({ children }: { children: ReactNode }) => (
  <span data-pulse className="text-[#E8462E] font-bold tracking-wider">
    {children}
  </span>
);

const LOG_LEVEL: Record<string, string> = {
  INFO: "#7f93b0",
  WARN: "#C9892F",
  DONE: "#E8462E",
};

function LogLine({ t, level, children }: { t: string; level: keyof typeof LOG_LEVEL | string; children: ReactNode }) {
  const label = level === "DONE" ? "RESOLVED" : level;
  return (
    <div data-log-line className="flex gap-2">
      <span className="text-[#5b5e67] shrink-0">[{t}]</span>
      <span className="font-semibold shrink-0" style={{ color: LOG_LEVEL[level] ?? "#7f93b0" }}>
        {label}
      </span>
      <span className="text-[#9a9d8f] min-w-0">{children}</span>
    </div>
  );
}

function BigStat({ value, suffix = "", label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span
        data-counter={value}
        data-suffix={suffix}
        className="font-display font-semibold text-[#F8F4EA] leading-none tracking-tight text-[clamp(2rem,4vw,3rem)]"
      >
        0{suffix}
      </span>
      <span className="mt-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#FFE6B0]/55">{label}</span>
    </div>
  );
}
