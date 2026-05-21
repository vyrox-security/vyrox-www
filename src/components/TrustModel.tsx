"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  GitCommit,
  FileCode2,
  TerminalSquare,
  ArrowUpRight,
} from "lucide-react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function TrustModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!sectionRef.current) return;

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
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Number counters
        const counters =
          numbersRef.current?.querySelectorAll<HTMLSpanElement>("[data-counter]");
        counters?.forEach((el) => {
          const target = Number(el.dataset.counter || "0");
          const suffix = el.dataset.suffix || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString() + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Stacked card pop — pinned scrub
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          transformPerspective: 1400,
          transformOrigin: "center center",
        });
        gsap.set(card3Ref.current, { rotation: 0, x: 0, y: 0, scale: 0.95, opacity: 0.85 });
        gsap.set(card2Ref.current, { rotation: 0, x: 0, y: 0, scale: 0.97, opacity: 0.95 });
        gsap.set(card1Ref.current, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=160%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(card3Ref.current, { y: 200, x: 90, rotation: 9, scale: 0.92, opacity: 1 }, 0)
          .to(card2Ref.current, { y: 30, x: 40, rotation: 4, scale: 0.97 }, 0)
          .to(card1Ref.current, { y: -180, x: -40, rotation: -3, scale: 1.04 }, 0);

        return () => {
          headSplit?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="surface-bone relative w-full h-[100svh] overflow-hidden flex items-center"
    >
      <div className="bg-grid-bone absolute inset-0 opacity-40 pointer-events-none" />
      <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" />

      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-stretch justify-between h-full relative z-10">
        {/* LEFT — copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center pt-24 lg:pt-0 pr-0 lg:pr-8">
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8462E]" />
            <span className="eyebrow text-[#6B5E48]">Section 03 / Trust</span>
          </div>

          <h2
            ref={headlineRef}
            className="display-tight text-[#0E0A05] font-medium text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] mb-10 max-w-[16ch]"
          >
            Open-core.{" "}
            <span className="display-wonk italic text-gradient-ember">
              Total transparency.
            </span>
          </h2>

          <div className="w-16 h-px bg-[#0E0A05]/25 mb-8" />

          <p className="text-[#2A2118]/80 leading-[1.75] max-w-[440px] text-[clamp(0.95rem,1.05vw,1.1rem)]">
            Black-box AI is a liability in the SOC. Vyrox&apos;s deterministic
            engine is open-core — inspect the logic, audit the rules, deploy
            entirely within your perimeter. The Rust proxy is MIT-licensed;
            the heuristics are yours.
          </p>

          <div
            ref={numbersRef}
            className="mt-14 grid grid-cols-3 gap-6 max-w-[520px]"
          >
            <BigStat value="100" suffix="%" label="Auditable logic" />
            <BigStat value="0" label="Hidden prompts" />
            <BigStat value="14" suffix=" d" label="Mean integration" />
          </div>

          <div className="mt-14 flex items-center gap-6 flex-wrap">
            <a
              href="https://github.com/vyrox-security"
              className="btn-ember hover-lift group"
            >
              View on GitHub
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#docs" className="btn-ghost-bone hover-lift">
              <FileCode2 className="w-3.5 h-3.5" />
              Read the docs
            </a>
          </div>
        </div>

        {/* RIGHT — fanned card stack */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-auto relative flex items-center justify-center mt-12 lg:mt-0">
          {/* Card 3 — audit_log.json (bottom) */}
          <div
            ref={card3Ref}
            className="absolute w-[min(92vw,460px)] term-window-bone p-6 z-10"
          >
            <div className="flex justify-between items-center border-b border-[#0E0A05]/10 pb-3 mb-4">
              <div className="flex items-center text-[#6B5E48] font-mono text-[10px] tracking-[0.24em] uppercase">
                <TerminalSquare className="w-3 h-3 mr-2" />
                audit_log.json
              </div>
              <span className="font-mono text-[9px] text-[#6B5E48]/70 tracking-[0.2em]">
                APPEND-ONLY · SHA256
              </span>
            </div>
            <div className="font-mono text-[11px] leading-[1.95] text-[#6B5E48]">
              <div>
                [10:42:01] <span className="text-[#2A2118]">INFO</span> Alert evt_992 ingested
              </div>
              <div>
                [10:42:01] <span className="text-[#2A2118]">INFO</span> Eval rule 42a
              </div>
              <div>
                [10:42:02] <span className="text-[#C9892F]">WARN</span> No deterministic match
              </div>
              <div>
                [10:42:02] <span className="text-[#2A2118]">INFO</span> Route → LLM
              </div>
              <div>
                [10:42:05]{" "}
                <span className="text-[#E8462E] font-semibold">RESOLVED</span> Verdict applied
              </div>
              <div>
                [10:42:05] <span className="text-[#2A2118]">INFO</span> hash =
                a7c…f12 (chain ok)
              </div>
            </div>
          </div>

          {/* Card 2 — heuristics.yaml (middle) */}
          <div
            ref={card2Ref}
            className="absolute w-[min(92vw,460px)] term-window-bone p-6 z-20"
          >
            <div className="flex justify-between items-center border-b border-[#0E0A05]/10 pb-3 mb-4">
              <div className="flex items-center text-[#6B5E48] font-mono text-[10px] tracking-[0.24em] uppercase">
                <GitCommit className="w-3 h-3 mr-2" />
                heuristics.yaml
              </div>
              <span className="font-mono text-[9px] text-[#E8462E] tracking-[0.22em] uppercase border border-[#E8462E]/30 px-1.5 py-0.5">
                Open-Core
              </span>
            </div>
            <div className="font-mono text-[11px] leading-[2] text-[#6B5E48]">
              <div>
                <span className="text-[#6B5E48]/70">name:</span>{" "}
                <span className="text-[#2A2118]">Global Suppress List</span>
              </div>
              <div>
                <span className="text-[#6B5E48]/70">rules:</span>
              </div>
              <div className="pl-4">
                - <span className="text-[#6B5E48]/70">match:</span>{" "}
                <span className="text-[#2A2118]">
                  &quot;process.name == &apos;updater.exe&apos;&quot;
                </span>
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">action:</span>{" "}
                <span className="text-[#E8462E] font-bold tracking-wider">SUPPRESS</span>
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">confidence:</span>{" "}
                <span className="text-[#2A2118]">1.0</span>
              </div>
              <div className="h-2" />
              <div className="pl-4">
                - <span className="text-[#6B5E48]/70">match:</span>{" "}
                <span className="text-[#2A2118]">
                  &quot;network.dest == &apos;10.0.0.0/8&apos;&quot;
                </span>
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">action:</span>{" "}
                <span className="text-[#E8462E] font-bold tracking-wider">IGNORE</span>
              </div>
            </div>
          </div>

          {/* Card 1 — triage_engine.rs (top) */}
          <div
            ref={card1Ref}
            className="absolute w-[min(92vw,460px)] term-window-bone p-6 z-30"
          >
            <div className="flex justify-between items-center border-b border-[#0E0A05]/10 pb-3 mb-4">
              <div className="flex items-center text-[#2A2118] font-mono text-[10px] tracking-[0.24em] uppercase">
                <FileCode2 className="w-3 h-3 mr-2 text-[#E8462E]" />
                triage_engine.rs
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8462E] shadow-[0_0_8px_rgba(232,70,46,0.5)] animate-pulse" />
            </div>
            <div className="font-mono text-[11.5px] leading-[1.95] text-[#2A2118]">
              <div>
                <span className="text-[#6B5E48]/70">pub struct</span>{" "}
                <span className="text-[#0E0A05] font-medium">TriageEngine</span>{" "}
                <span>{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#6B5E48]/70">heuristics:</span>{" "}
                <span className="text-[#E8462E]">HeuristicSet</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#6B5E48]/70">llm_client:</span>{" "}
                <span className="text-[#E8462E]">LLMTriage</span>,
              </div>
              <div>{"}"}</div>
              <div className="h-1" />
              <div>
                <span className="text-[#6B5E48]/70">impl</span>{" "}
                <span className="text-[#0E0A05]">TriageEngine</span> {"{"}
              </div>
              <div className="pl-4">
                <span className="text-[#6B5E48]/70">pub async fn</span>{" "}
                <span className="text-[#E8462E]">evaluate</span>(&amp;self, alert:{" "}
                <span className="text-[#E8462E]">EDRAlert</span>) {"{"}
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">if</span> self.heuristics
                .<span className="text-[#E8462E]">is_false_positive</span>(&amp;alert){" "}
                {"{"}
              </div>
              <div className="pl-12">
                <span className="text-[#6B5E48]/70">return</span> Action::
                <span className="text-[#6B5E48]">Suppress</span>;
              </div>
              <div className="pl-8">{"}"}</div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70 italic">
                  {"// Only the ambiguous reaches the LLM"}
                </span>
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">let</span> ctx = self.llm_client
                .<span className="text-[#E8462E]">triage</span>(&amp;alert).await?;
              </div>
              <div className="pl-8">
                <span className="text-[#6B5E48]/70">Ok</span>(ctx.
                <span className="text-[#E8462E]">verdict</span>())
              </div>
              <div className="pl-4">{"}"}</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStat({
  value,
  suffix = "",
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <span
        data-counter={value}
        data-suffix={suffix}
        className="font-display font-medium text-[#0E0A05] leading-none tracking-tight text-[clamp(2rem,4vw,3rem)]"
      >
        0{suffix}
      </span>
      <span className="mt-3 font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
        {label}
      </span>
    </div>
  );
}
