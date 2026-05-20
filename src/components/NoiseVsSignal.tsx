"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function NoiseVsSignal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !maskRef.current) return;

    // The scroll animation expanding the mask
    gsap.to(maskRef.current, {
      clipPath: "circle(150vw at 50% 50%)",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
      }
    });

    // Subtle parallax on the text inside the mask for a feeling of depth
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#030303] z-10">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: NOISE (Base Layer) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuOCIvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
          
          <h2 className="font-display text-[4rem] md:text-[7rem] lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-center max-w-[90vw]">
            <span className="text-zinc-800 transition-colors duration-1000 hover:text-zinc-700">99.8%</span><br/>
            <span className="text-zinc-800 transition-colors duration-1000 hover:text-zinc-700">OF ALERTS</span><br/>
            <span className="text-zinc-800 transition-colors duration-1000 hover:text-zinc-700">ARE NOISE.</span>
          </h2>
        </div>

        {/* Layer 2: SIGNAL (Masked Layer) */}
        <div 
          ref={maskRef} 
          className="absolute inset-0 flex flex-col items-center justify-center bg-white will-change-transform"
          style={{ clipPath: "circle(0vw at 50% 50%)" }}
        >
          {/* Clean minimal background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_0%,#f4f4f5_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
          
          <div ref={textRef} className="z-10 flex flex-col items-center">
            <h2 className="font-display text-[4rem] md:text-[7rem] lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-center max-w-[90vw] text-zinc-900 mix-blend-multiply">
              <span className="text-zinc-900">WE EXTRACT</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400">THE SIGNAL.</span>
            </h2>
            <p className="mt-8 font-sans text-xl md:text-2xl text-zinc-500 font-medium tracking-wide max-w-2xl text-center">
              Vyrox cuts through the chaos with absolute precision, delivering only actionable intelligence.
            </p>
          </div>
          
          {/* Subtle tech UI overlay on the bright background */}
          <div className="absolute bottom-10 left-10 flex space-x-6 font-mono text-xs md:text-sm text-zinc-400 font-medium">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
              STATUS: <span className="text-orange-600 ml-1">SIGNAL ACQUIRED</span>
            </div>
            <div>|</div>
            <div>LATENCY: 12ms</div>
            <div>|</div>
            <div>FALSE POSITIVES: 0%</div>
          </div>
        </div>

      </div>
    </section>
  );
}
