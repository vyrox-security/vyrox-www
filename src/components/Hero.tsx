"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowUpRight, Terminal } from "lucide-react";
import { QueueWindow } from "@/components/console";
import TiltWindow from "@/components/TiltWindow";

gsap.registerPlugin(useGSAP);

const NAV = [
  { href: "#engine", label: "Product" },
  { href: "#features", label: "How it works" },
  { href: "#security", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "https://docs.vyrox.dev", label: "Docs" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const copyKids = copyRef.current?.children ? Array.from(copyRef.current.children) : [];
        gsap.set(copyKids, { opacity: 0, y: 26 });
        gsap.set(windowRef.current, { opacity: 0, y: 40 });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
        tl.to(copyKids, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 }).to(
          windowRef.current,
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.7"
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [...(copyRef.current?.children ? Array.from(copyRef.current.children) : []), windowRef.current],
          { opacity: 1, y: 0 }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="surface-void relative w-full min-h-[100svh] flex flex-col overflow-hidden isolate"
    >
      {/* Atmosphere: grid + grain + one ember glow */}
      <div className="bg-grid-void pointer-events-none absolute inset-0 opacity-60 z-0" />
      <div className="bg-grain mb-overlay pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay z-0" />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "-12%",
          right: "-15%",
          width: "72%",
          height: "92%",
          background:
            "radial-gradient(ellipse at center, rgba(232,70,46,0.22) 0%, rgba(232,70,46,0.05) 38%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-[1]" />

      {/* Transparent centered navbar - hero glow shows straight through */}
      <header className="relative z-40 px-6 md:px-12 py-7">
        <div className="max-w-[1500px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center">
          <a href="#" className="flex items-center gap-2.5 justify-self-start" aria-label="Vyrox Security home">
            <Image
              src="/vyrox-mark.png"
              alt=""
              width={581}
              height={569}
              priority
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-bold text-[16px] sm:text-[17px] tracking-[-0.01em] text-[#F8F4EA] whitespace-nowrap">
              Vyrox <span className="font-semibold text-[#F8F4EA]/55">Security</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 justify-self-center font-display font-bold text-[15px] tracking-[-0.005em] text-[#F4EFE3]/85">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-[#FFE6B0] transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="justify-self-end flex items-center gap-4 md:gap-5">
            <a
              href="https://github.com/vyrox-security"
              aria-label="Vyrox Security on GitHub"
              className="hidden sm:inline-flex text-[#F4EFE3]/75 hover:text-[#FFE6B0] transition-colors"
            >
              <svg viewBox="0 0 16 16" width="21" height="21" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </a>
            <a
              href="#access"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 font-display font-bold text-[14px] tracking-[-0.005em] text-[#FFE6B0] border border-[#E8462E]/50 hover:bg-[#E8462E]/12 transition-colors"
            >
              Request access
            </a>
          </div>
        </div>
      </header>

      {/* Hero body */}
      <div className="relative z-20 flex-1 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-16 items-center">
        <div ref={copyRef} className="flex flex-col">
          <div className="eyebrow text-[#FFE6B0]/85 mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#FFE6B0]/50" />
            For MSSPs &amp; MDR teams
          </div>

          <h1 className="display-tight text-[#F8F4EA] font-medium text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.92]">
            One analyst.
            <br />
            Every client.
            <br />
            Every action{" "}
            <span className="display-wonk italic text-gradient-ember">provable.</span>
          </h1>

          <p className="mt-8 max-w-[520px] text-[#EBE5D6]/90 font-body text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.65]">
            Vyrox triages the EDR alerts your team already manages, contains the real threats on your
            approval, and hands each client a tamper-evident record their auditor can verify.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="#access" className="btn-ember hover-lift group justify-center">
              Request early access
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#engine" className="btn-ghost hover-lift group justify-center">
              <Terminal className="w-3.5 h-3.5" />
              See it work
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 flex-wrap font-mono text-[11px] tracking-[0.16em] uppercase text-[#EBE5D6]/60">
            <span><span className="text-[#E8462E]">●</span>&nbsp;&nbsp;Human-approved</span>
            <span className="w-px h-3 bg-[#F4EFE3]/25" />
            <span>SHA-256 audited</span>
            <span className="w-px h-3 bg-[#F4EFE3]/25" />
            <span>MIT open-core</span>
          </div>
        </div>

        {/* Live console - cursor reactive */}
        <div ref={windowRef} className="will-change-transform">
          <TiltWindow>
            <QueueWindow />
          </TiltWindow>
          <div className="absolute -bottom-5 left-8 right-8 h-10 bg-black/40 blur-2xl rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}
