"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Activity, FileCode2 } from "lucide-react";
import { splitText } from "@/lib/text-split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef1 = useRef<HTMLDivElement>(null);
  const headRef2 = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scanner line — slow horizontal sweep
        if (scannerRef.current) {
          gsap.fromTo(
            scannerRef.current,
            { left: "-10%" },
            {
              left: "110%",
              duration: 4.5,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            }
          );
        }

        // Headline reveals — clip-path lifts
        gsap.set([headRef1.current, headRef2.current], {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          y: 80,
        });

        gsap.to([headRef1.current, headRef2.current], {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Split the words inside the headlines for hover stagger
        if (headRef1.current) splitText(headRef1.current, ["chars", "words"]);
        if (headRef2.current) splitText(headRef2.current, ["chars", "words"]);

        // CTA button — magnetic on hover
        const cta = ctaRef.current;
        if (cta) {
          const onMove = (e: MouseEvent) => {
            const rect = cta.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(cta, {
              x: x * 0.08,
              y: y * 0.12,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          };
          const onLeave = () => {
            gsap.to(cta, {
              x: 0,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              overwrite: "auto",
            });
          };
          cta.addEventListener("mousemove", onMove);
          cta.addEventListener("mouseleave", onLeave);
          return () => {
            cta.removeEventListener("mousemove", onMove);
            cta.removeEventListener("mouseleave", onLeave);
          };
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      id="access"
      className="surface-bone relative w-full flex flex-col justify-between overflow-hidden text-[#0E0A05]"
    >
      <div className="bg-grid-bone absolute inset-0 opacity-30 pointer-events-none" />
      <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" />

      {/* Scanner line — top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#0E0A05]/12">
        <div
          ref={scannerRef}
          className="absolute top-0 w-32 h-px bg-[#E8462E] shadow-[0_0_16px_#E8462E,-12px_0_24px_#E8462E]"
          style={{ left: "-10%" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-32 flex flex-col xl:flex-row justify-between gap-20">
        {/* LEFT — Editorial CTA headline */}
        <div className="flex flex-col w-full xl:w-[58%]">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#E8462E] rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#0E0A05]/15 rounded-full" />
              <span className="w-1.5 h-1.5 bg-[#0E0A05]/15 rounded-full" />
            </div>
            <span className="eyebrow text-[#6B5E48]">System Initialization</span>
          </div>

          <h2 className="display-tight font-medium text-[#0E0A05] leading-[0.85] text-[clamp(4rem,11vw,9rem)] uppercase">
            <div ref={headRef1} className="overflow-hidden will-change-transform">
              Stop the
            </div>
            <div
              ref={headRef2}
              className="overflow-hidden will-change-transform"
            >
              <span className="display-wonk italic text-gradient-ember lowercase tracking-tight">
                noise.
              </span>
            </div>
          </h2>

          <p className="mt-14 text-[#2A2118]/80 text-[clamp(0.95rem,1.05vw,1.1rem)] max-w-[460px] leading-[1.75] border-l border-[#0E0A05]/20 pl-6">
            Vyrox operates precisely where classical EDRs fail. Deploy
            autonomously on-premise. Zero vendor lock-in. Zero black-box AI.
            Your data never leaves your perimeter.
          </p>

          <div className="mt-14 flex items-center gap-6 flex-wrap font-mono text-[10px] tracking-[0.24em] uppercase text-[#6B5E48]">
            <span>v0.1 alpha</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>5 design partners onboarding</span>
            <span className="w-px h-3 bg-[#0E0A05]/20" />
            <span>SOC2 Type I in progress</span>
          </div>
        </div>

        {/* RIGHT — Terminal CTA */}
        <div className="w-full xl:w-[40%] flex flex-col xl:items-end">
          <div className="w-full max-w-[460px]">
            <p className="eyebrow text-[#6B5E48] mb-4 text-left xl:text-right">
              Executable Payload
            </p>

            <button
              ref={ctaRef}
              className="group w-full relative bg-[#FBF6E7] hover:bg-white border border-[#0E0A05]/15 hover:border-[#E8462E]/60 transition-colors duration-500 p-6 md:p-8 flex flex-col items-start gap-6 outline-none shadow-[0_4px_30px_rgba(14,10,5,0.06)] hover:shadow-[0_12px_50px_rgba(232,70,46,0.18)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,70,46,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="w-full flex justify-between items-center text-[#6B5E48] font-mono text-[10px] tracking-[0.24em] uppercase">
                <span>/bin/bash</span>
                <Activity className="w-3.5 h-3.5 text-[#E8462E] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="font-mono text-[15px] md:text-[17px] text-left break-all text-[#2A2118]">
                <span className="text-[#E8462E]">user@vyrox</span>
                <span className="text-[#6B5E48]">:</span>
                <span className="text-[#C9892F]">~</span>
                <span className="text-[#6B5E48]">$</span>{" "}
                <span className="text-[#0E0A05] group-hover:text-[#E8462E] transition-colors relative font-medium">
                  ./request-early-access
                  <span className="ml-1 inline-block w-2.5 h-4 bg-[#E8462E] opacity-0 group-hover:opacity-100 animate-pulse align-middle" />
                </span>
              </div>

              <div className="w-full flex justify-between items-center mt-2 border-t border-[#0E0A05]/10 pt-4">
                <span className="font-mono text-[10px] text-[#6B5E48] tracking-[0.24em] uppercase group-hover:text-[#E8462E] transition-colors">
                  Execute Request
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#6B5E48] group-hover:text-[#E8462E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </button>

            <div className="flex items-center justify-between w-full mt-6 px-1">
              <a
                href="#docs"
                className="group flex items-center gap-2 font-mono text-[10px] text-[#6B5E48] hover:text-[#0E0A05] transition-colors tracking-[0.24em] uppercase"
              >
                <FileCode2 className="w-3.5 h-3.5 text-[#6B5E48]/60 group-hover:text-[#E8462E] transition-colors" />
                CLI Documentation
              </a>
              <a
                href="mailto:sec.vyrox@proton.me"
                className="font-mono text-[10px] text-[#6B5E48] hover:text-[#E8462E] transition-colors tracking-[0.24em] uppercase"
              >
                sec.vyrox@proton.me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Brutalist footer rail */}
      <div className="relative z-10 w-full border-t border-[#0E0A05]/15">
        <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-[#0E0A05]/15 p-7 flex items-center gap-4">
            <div className="w-8 h-8 bg-[#0E0A05] text-[#F2EAD8] grid place-items-center font-display font-bold text-xs">
              VY
            </div>
            <span className="font-mono text-[10px] text-[#6B5E48] tracking-[0.24em] uppercase">
              © 2026 Vyrox Security
            </span>
          </div>

          <div className="flex-[2] flex flex-col md:flex-row">
            <FooterCell label="Compliance" value="SOC2 Type II · in progress" />
            <FooterCell label="Infrastructure" value="On-premise · air-gapped" />
            <FooterCell label="Disclosure" value="vyrox.dev/.well-known/security.txt" />
          </div>

          <div className="flex-1 p-7 flex items-center md:justify-end gap-6 bg-[#FBF6E7]/60">
            <FooterLink href="https://github.com/vyrox-security">GitHub</FooterLink>
            <FooterLink href="#docs">Docs</FooterLink>
            <FooterLink href="#twitter">X</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 border-b md:border-b-0 md:border-r border-[#0E0A05]/15 p-7 flex flex-col justify-center gap-1.5">
      <span className="font-mono text-[9px] text-[#6B5E48] uppercase tracking-[0.28em]">
        {label}
      </span>
      <span className="font-display text-[13px] text-[#0E0A05]">{value}</span>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-mono text-[10px] text-[#6B5E48] hover:text-[#E8462E] transition-colors tracking-[0.24em] uppercase"
    >
      {children}
    </a>
  );
}
