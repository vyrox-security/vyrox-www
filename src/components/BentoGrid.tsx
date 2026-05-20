"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, BrainCircuit, Flame, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "ingestion",
    title: "Ingestion Engine",
    description: "Instantly connects to your EDR via native APIs. We ingest millions of events per second with zero rate-limiting, buffering directly into our hot storage.",
    accent: "text-zinc-100",
    glow: "rgba(255,255,255,0.03)"
  },
  {
    id: "heuristics",
    title: "Deterministic Sub-system",
    description: "Before AI touches the data, our high-speed Rust heuristics engine drops 90% of known false positives. This conserves tokens and entirely eliminates standard alert fatigue.",
    accent: "text-[#FF4500]",
    glow: "rgba(255,69,0,0.05)"
  },
  {
    id: "llm",
    title: "Autonomous Triage",
    description: "The core AI engine. It analyzes full execution trees, reverse-engineers obfuscated scripts, and provides human-equivalent contextual reasoning for deeply complex edge cases.",
    accent: "text-blue-500",
    glow: "rgba(59,130,246,0.05)"
  },
  {
    id: "human",
    title: "Human Override",
    description: "Vyrox requires human sign-off for catastrophic actions like host isolation. Direct Slack integrations ensure your team maintains absolute authority over critical infrastructure.",
    accent: "text-emerald-500",
    glow: "rgba(16,185,129,0.05)"
  }
];

export default function ArchitectureFlow() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection Observer to detect which card is centered
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the overlapping entry
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" } // Triggers strictly in the center
    );
    
    document.querySelectorAll('.visual-card').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // GSAP for the global scroll progress line
  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return;
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.fromTo(progressBarRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top" })
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black text-white selection:bg-white/20">
      
      {/* Dynamic Ambient Viewport Glow */}
      <div className="fixed top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 z-0" 
           style={{ backgroundColor: features[activeIndex].glow }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row relative z-10">
        
        {/* LEFT COLUMN: Sticky Narrative */}
        <div className="w-full md:w-[45%] lg:w-[40%] relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center py-20 pr-12">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-10 w-fit">
              <Flame className="w-3 h-3 text-[#FF4500]" />
              Zero-Noise Pipeline
            </div>

            <h2 className="text-5xl lg:text-7xl font-display font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-16">
              The Engine.
            </h2>

            {/* Dynamic Content Area */}
            <div className="relative h-[240px]">
              {features.map((feature, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={feature.id}
                    className={`absolute inset-0 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-8 invisible'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`font-mono text-xl ${feature.accent}`}>0{i + 1}</span>
                      <div className="h-[1px] flex-1 bg-white/[0.05]" />
                    </div>
                    <h3 className="text-3xl font-medium tracking-tight mb-4">{feature.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>

        {/* CENTER DIVIDER: Progress Line */}
        <div className="hidden md:flex w-[1px] relative flex-col items-center">
           <div className="absolute top-0 bottom-0 w-px bg-white/[0.05]" />
           <div ref={progressBarRef} className="absolute top-0 w-px bg-gradient-to-b from-[#FF4500] via-blue-500 to-emerald-500 scale-y-0 shadow-[0_0_10px_#FF4500]" />
        </div>

        {/* RIGHT COLUMN: Scrolling Visual Stages */}
        <div className="w-full md:w-[55%] lg:w-[60%] py-[30vh] pl-0 md:pl-16 lg:pl-24 flex flex-col gap-[70vh]">
          
          {/* Card 1: Ingestion Engine */}
          <div data-index="0" className="visual-card w-full aspect-[4/3] rounded-2xl bg-[#030303] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] relative flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
            
            <div className="w-full max-w-lg bg-[#0A0A0A] rounded-xl border border-white/[0.05] shadow-2xl relative z-10 font-mono text-[13px] leading-[1.8]">
               {/* Minimal Window Header */}
               <div className="h-10 border-b border-white/[0.05] flex items-center px-4">
                 <Database className="w-4 h-4 text-zinc-500" />
                 <span className="text-zinc-600 text-[10px] uppercase ml-3 tracking-widest">Gateway</span>
               </div>
               <div className="p-6 text-zinc-400">
                  <div><span className="text-zinc-500 mr-2">10:24:01</span> <span className="text-emerald-400">RCV</span> [CrowdStrike] Payload 4.2KB</div>
                  <div><span className="text-zinc-500 mr-2">10:24:01</span> <span className="text-emerald-400">RCV</span> [CrowdStrike] Payload 1.8KB</div>
                  <div className="text-zinc-600">... parsing JSON schema</div>
                  <div className="my-3 pl-4 border-l border-white/[0.05]">
                    <span className="text-[#FF8C00]">&quot;event_type&quot;:</span> <span className="text-zinc-300">&quot;ProcessRollup2&quot;</span><br/>
                    <span className="text-[#FF8C00]">&quot;command_line&quot;:</span> <span className="text-zinc-300">&quot;powershell.exe -enc JABz...&quot;</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-emerald-500/80 text-[11px]">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     Stream Active
                  </div>
               </div>
            </div>
          </div>

          {/* Card 2: Heuristics */}
          <div data-index="1" className="visual-card w-full aspect-[4/3] rounded-2xl bg-[#030303] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] relative flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,69,0,0.05)_0%,transparent_60%)]" />
            
            <div className="w-full max-w-lg relative z-10 flex flex-col gap-4">
              
              <div className="bg-[#0A0A0A] rounded-xl border border-white/[0.05] p-4 flex justify-between items-center opacity-50 blur-[2px]">
                 <span className="font-mono text-xs text-zinc-500 text-line-through decoration-zinc-700">evt_89291: background_updater.exe</span>
                 <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-1 rounded">MATCH: IGN_UPDATE</span>
              </div>
              
              <div className="bg-[#0A0A0A] rounded-xl border border-[#FF4500]/20 shadow-[0_10px_40px_rgba(255,69,0,0.1)] p-6 relative z-20">
                <div className="absolute right-6 top-6">
                  <div className="px-3 py-1 bg-[#FF4500]/10 border border-[#FF4500]/20 rounded font-mono text-[10px] text-[#FF4500] uppercase tracking-widest font-bold rotate-[5deg]">
                    Dropped
                  </div>
                </div>
                 <div className="font-mono text-sm text-zinc-300 mb-2">evt_89292: sysadmin_powershell</div>
                 <div className="font-mono text-[12px] text-zinc-500 mt-4 leading-relaxed">
                   MATCH <span className="text-zinc-600">=&gt;</span> rules/benign_admin_activity.yaml<br/>
                   <div className="pl-4 border-l border-zinc-800 mt-2 text-zinc-400">
                    user.group <span className="text-[#FF8C00]">==</span> &apos;Domain Admins&apos;<br/>
                    action <span className="text-[#FF4500] font-bold">SUPPRESS</span>
                   </div>
                 </div>
              </div>

              <div className="bg-[#0A0A0A] rounded-xl border border-white/[0.05] p-4 flex justify-between items-center opacity-50 blur-[2px]">
                 <span className="font-mono text-xs text-zinc-500 text-line-through decoration-zinc-700">evt_89293: legitimate_npm_install</span>
                 <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-1 rounded">MATCH: IGN_NPM</span>
              </div>

            </div>
          </div>

          {/* Card 3: LLM Triage */}
          <div data-index="2" className="visual-card w-full aspect-[4/3] rounded-2xl bg-[#030303] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] relative flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
            
            <div className="w-full max-w-lg bg-[#050A14] rounded-xl border border-blue-500/20 shadow-[0_20px_60px_rgba(59,130,246,0.1)] relative z-10 flex flex-col items-center p-8">
               <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500/50 flex flex-col items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <BrainCircuit className="w-5 h-5 text-blue-400" />
               </div>
               
               <div className="w-full bg-[#02050A] rounded-lg border border-blue-500/10 p-5 mt-4 text-center">
                  <div className="text-[10px] font-mono text-blue-500/60 uppercase tracking-widest mb-3">Vyrox Reasoning Engine</div>
                  <p className="text-[14px] text-blue-100/90 font-serif italic leading-relaxed text-left">
                    &quot;Analyzing execution tree for <span className="font-mono text-[12px] not-italic px-1 bg-white/5 rounded">svchost.exe</span>. The process originates from an unusual parent, but code signing verifies as legitimate Microsoft telemetry. Combined with historical server baselines, this is determined to be <span className="font-bold underline decoration-blue-500/50">100% benign</span>.&quot;
                  </p>
               </div>
            </div>
          </div>

          {/* Card 4: Human Override */}
          <div data-index="3" className="visual-card w-full aspect-[4/3] rounded-2xl bg-[#030303] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] relative flex flex-col items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_60%)]" />
            
            {/* Blur backdrop for Slack */}
            <div className="absolute inset-0 font-mono text-[10px] text-emerald-500/20 p-8 select-none leading-relaxed blur-[3px]">
              CRITICAL_ALERT: Payload injection detected on prod_sys_04.<br/>
              ATTACK_VECTOR: memory_mapped_file_execution<br/>
              CONFIDENCE: 98%<br/>
              INITIATING_ISOLATION_PROTOCOL...
            </div>

            <div className="w-full max-w-[400px] bg-[#0A120E] rounded-xl border border-emerald-500/20 shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.1)] relative z-10 p-6 backdrop-blur-md">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 shadow-inner mt-1">
                  <span className="text-white font-bold text-sm font-display pr-[1px]">VY</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-zinc-100">Vyrox App</span>
                    <span className="text-[10px] text-zinc-500 ml-auto mr-1">11:05 AM</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[13px] text-zinc-300 leading-snug">
                      <span className="font-bold text-rose-500">Critical Anomaly:</span> High-risk memory injection detected on <span className="text-white font-mono text-[11px] bg-white/5 px-1 py-[1px] rounded border border-white/10">prod-db-01</span>.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-[2] bg-emerald-600 text-white text-[12px] font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Isolation
                    </button>
                    <button className="flex-1 bg-[#141A17] border border-white/10 text-zinc-300 text-[12px] font-medium py-2 rounded-lg">
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
