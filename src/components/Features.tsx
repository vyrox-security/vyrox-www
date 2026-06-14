"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FileCheck2, GitBranch, ArrowUpRight, Check } from "lucide-react";
import { EvidenceWindow, AutonomyWindow } from "@/components/console";
import TiltWindow from "@/components/TiltWindow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!containerRef.current) return;
        const blocks = containerRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
        blocks.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="features" className="surface-deep relative w-full border-t border-white/[0.06]">
      <div className="bg-grid-void absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-16">
        <div className="flex items-center gap-3 mb-8" data-reveal>
          <FileCheck2 className="w-3.5 h-3.5 text-[#E8462E]" />
          <span className="eyebrow text-[#FFE6B0]/70">Section 02 / The Moat</span>
        </div>
        <h2
          data-reveal
          className="display-tight text-[#F4EFE3] font-medium text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] max-w-[18ch]"
        >
          Anyone can triage.{" "}
          <span className="display-wonk italic text-gradient-ember">We prove it.</span>
        </h2>
        <p data-reveal className="mt-8 max-w-[560px] text-[#EBE5D6]/82 leading-relaxed text-[clamp(0.98rem,1vw,1.08rem)]">
          The triage is table stakes. The moat is the record you hand back: an owned, tamper-evident
          audit trail per client, and autonomy you turn up one safe rung at a time.
        </p>
      </div>

      <FeatureRow
        eyebrow="Evidence pack"
        title="A record their auditor can verify."
        body="Every action Vyrox takes is written to an append-only, SHA-256 chained log the client owns. Generate a per-client pack, re-hash the chain, check the signature. It either verifies or it does not. No black box, no trust-me."
        bullets={[
          "Owned by the client, not locked in our platform",
          "Tamper-evident since generation, independently verifiable",
          "One pack per client, scoped to their tenant",
        ]}
        window={<EvidenceWindow />}
      />

      <FeatureRow
        reverse
        eyebrow="Graduated autonomy"
        title="Turn it up one safe rung at a time."
        body="Default is L2: a human approves every containment action. When you trust it, let Vyrox auto-handle the high-confidence, low-blast-radius, reversible cases per client. The owned audit trail is what makes climbing the ladder safe."
        bullets={[
          "Per-tenant policy, default human approval",
          "Auto-execute only reversible, low-blast-radius actions",
          "Every rung change recorded in the audit chain",
        ]}
        window={<AutonomyWindow />}
      />

      <div className="h-24" />
    </section>
  );
}

function FeatureRow({
  eyebrow,
  title,
  body,
  bullets,
  window: win,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  window: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className={`flex flex-col ${reverse ? "lg:order-2" : ""}`} data-reveal>
        <span className="eyebrow text-[#FFE6B0]/70 mb-5">{eyebrow}</span>
        <h3 className="font-display text-[#F4EFE3] tracking-tight leading-[1.02] text-[clamp(1.7rem,3vw,2.7rem)] mb-6">
          {title}
        </h3>
        <p className="text-[#EBE5D6]/82 leading-[1.7] text-[clamp(0.98rem,1.05vw,1.12rem)] max-w-[460px]">{body}</p>
        <ul className="mt-8 flex flex-col gap-3.5 max-w-[460px]">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[#E4DDC8]/85 text-[15px] leading-snug">
              <span className="mt-0.5 grid place-items-center w-4 h-4 shrink-0 bg-[#E8462E]/15 border border-[#E8462E]/35">
                <Check className="w-2.5 h-2.5 text-[#E8462E]" />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <a
          href="#access"
          className="group mt-9 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#FF9156] hover:text-[#E8462E] transition-colors w-fit"
        >
          <GitBranch className="w-3.5 h-3.5" />
          See it on your alerts
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className={`${reverse ? "lg:order-1" : ""}`} data-reveal>
        <TiltWindow>{win}</TiltWindow>
      </div>
    </div>
  );
}
