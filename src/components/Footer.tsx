"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const MAILTO =
  "mailto:hello@vyrox.dev?subject=Vyrox%20early%20access&body=Tell%20us%20about%20your%20team%20(MSSP%20or%20in-house)%20and%20which%20EDR%20you%20run%2C%20and%20we%27ll%20get%20you%20onboarded.";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "The Engine", href: "#engine" },
      { label: "Evidence pack", href: "#features" },
      { label: "Autonomy", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Security", href: "#security" },
      { label: "Docs", href: "https://docs.vyrox.dev" },
      { label: "GitHub", href: "https://github.com/vyrox-security" },
      { label: "Disclosure", href: "https://vyrox.dev/.well-known/security.txt" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@vyrox.dev", href: "mailto:hello@vyrox.dev" },
      { label: "security@vyrox.dev", href: "mailto:security@vyrox.dev" },
    ],
  },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const kids = ctaRef.current?.children ? Array.from(ctaRef.current.children) : [];
        gsap.fromTo(
          kids,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <footer id="access" ref={containerRef} className="surface-deep relative w-full overflow-hidden border-t border-white/[0.06]">
      <div className="bg-grid-void absolute inset-0 opacity-40 pointer-events-none" />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "80%",
          background: "radial-gradient(ellipse at center, rgba(232,70,46,0.16) 0%, transparent 65%)",
        }}
      />

      {/* CTA band */}
      <div ref={ctaRef} className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 pt-32 pb-24 text-center flex flex-col items-center">
        <span className="eyebrow text-[#FFE6B0]/80 mb-7">Now onboarding design partners</span>
        <h2 className="display-tight font-medium text-[#F8F4EA] leading-[0.95] text-[clamp(2.6rem,7vw,5.5rem)] max-w-[15ch]">
          Stop triaging alerts{" "}
          <span className="display-wonk italic text-gradient-ember">one by one.</span>
        </h2>
        <p className="mt-8 max-w-[520px] text-[#EBE5D6]/85 text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.6]">
          Bring the EDRs you already run. We triage, you approve, and every client walks away with an
          audit trail they own.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a href={MAILTO} className="btn-ember hover-lift group justify-center">
            Request early access
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="https://github.com/vyrox-security" className="btn-ghost hover-lift group justify-center">
            View on GitHub
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 border-t border-white/[0.07] py-16 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/vyrox-mark.png"
              alt=""
              width={581}
              height={569}
              className="w-8 h-8 object-contain"
            />
            <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-[#F4EFE3]/85">
              Vyrox Security
            </span>
          </div>
          <p className="text-[#C9C6BD]/75 text-[14px] leading-[1.6] max-w-[280px]">
            The autonomous, auditable action layer for security operations.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FFE6B0]/55 w-fit">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8462E] animate-pulse" />
            MIT open-core proxy
          </span>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#FFE6B0]/55 mb-5">
              {col.title}
            </span>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[#C9C6BD]/80 hover:text-[#FFE6B0] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 border-t border-white/[0.07] py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#C9C6BD]/55">
          © 2026 Vyrox Security
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#C9C6BD]/55">
          Owned · SHA-256 chained audit trail
        </span>
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.18em] uppercase text-[#C9C6BD]/70">
          <a href="https://github.com/vyrox-security" className="hover:text-[#FFE6B0] transition-colors">
            GitHub
          </a>
          <a href="https://docs.vyrox.dev" className="hover:text-[#FFE6B0] transition-colors">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
