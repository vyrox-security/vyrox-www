"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, GitCommit, FileCode2, TerminalSquare } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function TrustModel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Pin the section and animate the cards spreading out
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    // Initial state: stacked tightly
    gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
      rotateX: 15,
      rotateY: -15,
      rotateZ: 5,
      transformPerspective: 1000,
    });

    // Spread animation
    tl.to(card1Ref.current, { y: -160, x: -40, rotateZ: 0, scale: 1.05, ease: "none" }, 0)
      .to(card2Ref.current, { y: 0, x: 0, rotateZ: 5, scale: 1, ease: "none" }, 0)
      .to(card3Ref.current, { y: 160, x: 40, rotateZ: 10, scale: 0.95, ease: "none" }, 0);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#030303] overflow-hidden flex items-center">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,98,0,0.05)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between h-full">
        
        {/* Left Column: Editorial Typography */}
        <div className="w-full lg:w-1/2 z-20 flex flex-col justify-center h-full pt-20 lg:pt-0">
          {/* Eyebrow tag — precise, mono, subdued */}
          <div className="inline-flex items-center space-x-3 mb-10">
            <div className="w-6 h-px bg-zinc-700"></div>
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[10px] font-mono text-zinc-600 tracking-[0.3em] uppercase">Zero Trust Architecture</span>
          </div>
          
          {/* Headline — tighter, sharper, editorial weight */}
          <h2 className="font-display font-black tracking-tighter text-white leading-[0.95] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            Open&#8209;Core.
          </h2>
          <h2 className="font-display font-black tracking-tighter leading-[0.95] mb-10" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #71717a 0%, #3f3f46 100%)' }}>
              Total Transparency.
            </span>
          </h2>
          
          {/* Thin horizontal rule to separate heading from body */}
          <div className="w-12 h-px bg-zinc-800 mb-8"></div>

          {/* Body copy — refined, no word wrap issues */}
          <p className="text-base text-zinc-500 font-sans leading-[1.85] max-w-[360px] tracking-[0.01em]">
            Black-box AI is a liability in the SOC. Vyrox&apos;s deterministic engine is entirely open-core — inspect the logic, audit the rules, and deploy entirely within your perimeter.
          </p>

          {/* Stats block — more architectural, editorial spacing */}
          <div className="mt-14 grid grid-cols-[auto_1px_auto] gap-x-8 items-start w-max">
            <div className="flex flex-col">
              <span className="font-display font-black text-white leading-none tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>100%</span>
              <span className="text-[10px] font-mono text-zinc-600 tracking-[0.25em] uppercase mt-3">Auditable Logic</span>
            </div>
            <div className="w-px h-10 bg-zinc-800 self-center"></div>
            <div className="flex flex-col">
              <span className="font-display font-black text-white leading-none tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>Zero</span>
              <span className="text-[10px] font-mono text-zinc-600 tracking-[0.25em] uppercase mt-3">Hidden Prompts</span>
            </div>
          </div>

          {/* Ghost CTA link */}
          <div className="mt-12 flex items-center space-x-3 group cursor-pointer w-max">
            <span className="text-xs font-mono text-zinc-600 tracking-[0.2em] uppercase group-hover:text-zinc-400 transition-colors duration-300">View on GitHub</span>
            <div className="w-8 h-px bg-zinc-700 group-hover:w-14 group-hover:bg-zinc-500 transition-all duration-300"></div>
          </div>
        </div>

        {/* Right Column: Isometric Glass Stack */}
        <div className="w-full lg:w-1/2 h-[600px] relative flex items-center justify-center lg:justify-start mt-12 lg:mt-0 z-10 lg:pl-16">
          
          {/* Card 3 (Bottom) */}
          <div 
            ref={card3Ref}
            className="absolute w-[450px] bg-[#0A0A0C]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
          >
             <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  <TerminalSquare className="w-3.5 h-3.5 mr-2"/> audit_log.json
                </div>
             </div>
             <div className="font-mono text-[11px] leading-[1.8] text-zinc-500">
                <div>[10:42:01] <span className="text-zinc-300">INFO</span>: Alert evt_992 ingested.</div>
                <div>[10:42:01] <span className="text-zinc-300">INFO</span>: Evaluating deterministic rule 42a.</div>
                <div>[10:42:02] <span className="text-zinc-300">WARN</span>: No deterministic match.</div>
                <div>[10:42:02] <span className="text-zinc-300">INFO</span>: Routing to LLM Contextual Engine.</div>
                <div>[10:42:05] <span className="text-emerald-500/70">SUCCESS</span>: Resolution applied.</div>
             </div>
          </div>

          {/* Card 2 (Middle) */}
          <div 
            ref={card2Ref}
            className="absolute w-[450px] bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20"
          >
             <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  <GitCommit className="w-3.5 h-3.5 mr-2"/> heuristics.yaml
                </div>
                <div className="text-[9px] text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded tracking-widest">OPEN_CORE</div>
             </div>
             <div className="font-mono text-[11px] leading-[2] text-zinc-400 space-y-0">
                <div><span className="text-zinc-500">name:</span> <span className="text-zinc-300">Global Suppress List</span></div>
                <div><span className="text-zinc-500">rules:</span></div>
                <div className="pl-4">- <span className="text-zinc-500">match:</span> <span className="text-zinc-300">&quot;process.name == &apos;updater.exe&apos;&quot;</span></div>
                <div className="pl-8"><span className="text-zinc-500">action:</span> <span className="text-[#FF8C00]/80">SUPPRESS</span></div>
                <div className="pl-8"><span className="text-zinc-500">confidence:</span> <span className="text-zinc-300">1.0</span></div>
                <div className="h-2"></div>
                <div className="pl-4">- <span className="text-zinc-500">match:</span> <span className="text-zinc-300">&quot;network.dest == &apos;internal_cidr&apos;&quot;</span></div>
                <div className="pl-8"><span className="text-zinc-500">action:</span> <span className="text-[#FF8C00]/80">IGNORE</span></div>
             </div>
          </div>

          {/* Card 1 (Top) */}
          <div 
            ref={card1Ref}
            className="absolute w-[450px] bg-[#0D0D11]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] z-30"
          >
             <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center text-zinc-300 font-mono text-xs uppercase tracking-widest">
                  <FileCode2 className="w-3.5 h-3.5 mr-2 text-[#FF6200]"/> core_engine.ts
                </div>
                <div className="w-2 h-2 rounded-full bg-[#FF6200] shadow-[0_0_8px_rgba(255,98,0,0.8)]"></div>
             </div>
             <div className="font-mono text-[12px] leading-[2] text-zinc-300 space-y-0">
                <div><span className="text-zinc-500">export class</span> <span className="text-white font-medium">DeterministicEngine</span> {'{'}</div>
                <div className="pl-4"><span className="text-zinc-500">async</span> <span className="text-[#FF8C00]">evaluate</span>(alert: EDRAlert) {'{'}</div>
                <div className="pl-8"><span className="text-zinc-500">if</span> (this.<span className="text-[#FF8C00]">isFalsePositive</span>(alert)) {'{'}</div>
                <div className="pl-12"><span className="text-zinc-500">return</span> Action.<span className="text-zinc-400">SUPPRESS</span>;</div>
                <div className="pl-8">{'}'}</div>
                <div className="h-1"></div>
                <div className="pl-8"><span className="text-zinc-600 italic">{"// Escalate edge cases to LLM"}</span></div>
                <div className="pl-8"><span className="text-zinc-500">const</span> ctx = <span className="text-zinc-500">await</span> this.<span className="text-[#FF8C00]">gather</span>(alert);</div>
                <div className="pl-8"><span className="text-zinc-500">return</span> this.<span className="text-[#FF8C00]">llmTriage</span>(ctx);</div>
                <div className="pl-4">{'}'}</div>
                <div>{'}'}</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
