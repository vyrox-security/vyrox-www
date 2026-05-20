"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Activity, FileCode2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Laser scanner animation
    gsap.to(scannerRef.current, {
      left: "100%",
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Premium "reveal from bottom" text animation (Clip Path)
    gsap.fromTo(
      [textRef1.current, textRef2.current],
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 40 },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full bg-[#000] text-zinc-300 font-sans border-t border-zinc-900 flex flex-col justify-between overflow-hidden">
      
      {/* Intense Custom Grid & Scanner Line (Security Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
             <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3f3f46" strokeWidth="0.5"/>
             </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-900">
        <div ref={scannerRef} className="absolute top-0 left-0 w-24 h-[1px] bg-[#FF4500] shadow-[0_0_15px_#FF4500,-10px_0_20px_#FF4500] -translate-x-1/2" />
      </div>

      {/* Main Splilt Content Area */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-8 md:px-16 pt-32 pb-40 flex flex-col xl:flex-row justify-between lg:items-end gap-16">
        
        {/* Left: Massive Typography */}
        <div className="flex flex-col w-full xl:w-[60%]">
          <div className="flex items-center gap-3 mb-10">
             <div className="flex gap-1">
               <div className="w-1.5 h-1.5 bg-[#FF4500] rounded-full" />
               <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
               <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
             </div>
             <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">System Initialization</span>
          </div>

          <h2 className="text-[12vw] xl:text-[7rem] leading-[0.85] font-display font-medium tracking-tighter text-white uppercase relative">
            <div ref={textRef1} className="will-change-transform">Stop the</div>
            <div ref={textRef2} className="text-zinc-600 will-change-transform">Noise.</div>
          </h2>
          
          <p className="mt-12 text-zinc-400 font-mono text-sm max-w-md leading-relaxed border-l border-zinc-800 pl-6">
            Vyrox operates precisely where classical EDRs fail. 
            Deploy completely autonomously on-premise. Zero vendor lock-in. Zero black-box AI.
          </p>
        </div>

        {/* Right: Brutalist / Terminal Interactive CTA */}
        <div className="w-full xl:w-[40%] flex flex-col xl:items-end w-full">
           
           <div className="w-full max-w-[450px]">
             <p className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] mb-4 uppercase text-left xl:text-right">Executable Payload</p>
             
             {/* Interactive Terminal CTA */}
             <button className="group w-full relative bg-[#050505] hover:bg-[#080808] border border-zinc-800 hover:border-[#FF4500]/50 transition-all duration-500 rounded-none p-6 md:p-8 flex flex-col items-start gap-6 outline-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,69,0,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-full flex justify-between items-center text-zinc-500 font-mono text-xs">
                  <span>/bin/bash</span>
                  <Activity className="w-4 h-4 text-emerald-500 opacity-50 group-hover:opacity-100 group-hover:animate-pulse" />
                </div>
                
                <div className="font-mono text-base md:text-lg text-left break-all text-zinc-300">
                  <span className="text-[#FF4500]">user@vyrox</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-blue-500">~</span>
                  <span className="text-zinc-600">$</span>
                  {' '}
                  <span className="text-white group-hover:text-[#FF4500] transition-colors relative">
                    ./request-early-access
                    <span className="absolute -right-3 top-[2px] w-2 h-5 bg-[#FF4500] opacity-0 group-hover:opacity-100 animate-pulse" />
                  </span>
                </div>

                <div className="w-full flex justify-between items-center mt-4 border-t border-zinc-800 pt-4">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Execute Request</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#FF4500] transition-colors" />
                </div>
             </button>

             {/* Secondary Action */}
             <div className="flex items-center justify-between w-full mt-6 px-1">
               <a href="#" className="group flex items-center gap-2 text-[11px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                 <FileCode2 className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                 View CLI Documentation
               </a>
             </div>
           </div>

        </div>

      </div>

      {/* Strict Brutalist Footer Bottom */}
      <div className="relative z-10 w-full border-t border-zinc-800">
        <div className="flex flex-col md:flex-row w-full h-full max-w-[1500px] mx-auto">
          
          {/* Copyright Cell */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-zinc-800 p-8 flex items-center gap-4">
             <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center font-display font-black text-xs text-white">VY</div>
             <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">©2026 Vyrox Security</span>
          </div>
          
          {/* Compliance Cells */}
          <div className="flex-[2] flex flex-col md:flex-row">
            <div className="flex-1 border-b md:border-b-0 md:border-r border-zinc-800 p-8 flex flex-col justify-center gap-1">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Compliance</span>
              <span className="font-mono text-xs text-zinc-300">SOC2 Type II Certified</span>
            </div>
            <div className="flex-1 border-b md:border-b-0 md:border-r border-zinc-800 p-8 flex flex-col justify-center gap-1">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Infrastructure</span>
              <span className="font-mono text-xs text-zinc-300">100% On-Premise Air-Gapped</span>
            </div>
          </div>

          {/* Social / Link Cell */}
          <div className="flex-1 p-8 flex items-center md:justify-end gap-6 bg-[#030303]">
             <a href="#" className="font-mono text-[10px] text-zinc-500 hover:text-[#FF4500] transition-colors tracking-widest uppercase">Github</a>
             <a href="#" className="font-mono text-[10px] text-zinc-500 hover:text-[#FF4500] transition-colors tracking-widest uppercase">Twitter</a>
          </div>

        </div>
      </div>
      
    </footer>
  );
}
