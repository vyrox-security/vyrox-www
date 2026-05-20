"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wingsRef = useRef<SVGSVGElement>(null);
  const leftWing = useRef<SVGGElement>(null);
  const rightWing = useRef<SVGGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Initial states
    gsap.set(textRef.current?.children ? Array.from(textRef.current.children) : [], { opacity: 0, y: 40 });
    gsap.set(wingsRef.current, { scale: 0.8, opacity: 0, y: 50 });
    gsap.set(leftWing.current, { rotation: -15, transformOrigin: "bottom right" });
    gsap.set(rightWing.current, { rotation: 15, transformOrigin: "bottom left" });

    // Epic Reveal Animation
    tl.to(wingsRef.current, { scale: 1, opacity: 1, y: 0, duration: 2.5, ease: "power3.out" })
      .to([leftWing.current, rightWing.current], { rotation: 0, duration: 2.5, ease: "expo.out" }, "-=2.2")
      .to(textRef.current?.children ? Array.from(textRef.current.children) : [], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
      }, "-=1.5");

    // Continuous Cinematic Breathing
    gsap.to(leftWing.current, { 
      rotation: -3, 
      scaleY: 1.05, 
      transformOrigin: "bottom right", 
      duration: 4, 
      repeat: -1, 
      yoyo: true, 
      ease: "sine.inOut" 
    });
    
    gsap.to(rightWing.current, { 
      rotation: 3, 
      scaleY: 1.05, 
      transformOrigin: "bottom left", 
      duration: 4, 
      repeat: -1, 
      yoyo: true, 
      ease: "sine.inOut" 
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000000] flex flex-col items-center justify-center overflow-hidden selection:bg-[#FF4500]/40 selection:text-white"
    >
      {/* 1. Grain Texture for high-end physical feel */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen z-0"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
      />

      {/* 2. Abstract Fire Wings SVG (Background) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none mt-20">
        <svg 
          ref={wingsRef}
          viewBox="0 0 1200 800" 
          className="w-full min-w-[1000px] max-w-[1600px] h-auto object-cover opacity-80 mix-blend-screen"
        >
          <defs>
            {/* Plasma/Fire Gradients */}
            <linearGradient id="fireGradLeft" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="20%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FF4500" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8A0000" stopOpacity="0" />
            </linearGradient>
            
            <linearGradient id="fireGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="20%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FF4500" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8A0000" stopOpacity="0" />
            </linearGradient>

            {/* Hyper Blur for realism */}
            <filter id="wingBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="24" result="blurM" />
              <feGaussianBlur stdDeviation="8" result="blurS" />
              <feMerge>
                <feMergeNode in="blurM" />
                <feMergeNode in="blurS" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LEFT WING SHARDS */}
          <g ref={leftWing} filter="url(#wingBlur)">
            {/* Main Primary Feather/Arc */}
            <path d="M600,500 Q400,450 150,150 Q300,300 450,450 Z" fill="url(#fireGradLeft)" />
            {/* Secondary Upper Feather */}
            <path d="M580,480 Q350,380 180,50 Q350,200 480,420 Z" fill="url(#fireGradLeft)" opacity="0.7" />
            {/* Lower Stabilizer Arc */}
            <path d="M600,550 Q400,550 50,350 Q250,450 500,520 Z" fill="url(#fireGradLeft)" opacity="0.5" />
            {/* Inner brilliant hot core path */}
            <path d="M600,500 Q450,460 300,250 Q400,350 500,470 Z" fill="#FFFFFF" opacity="0.8" filter="blur(10px)" />
          </g>

          {/* RIGHT WING SHARDS */}
          <g ref={rightWing} filter="url(#wingBlur)">
            {/* Main Primary Feather/Arc */}
            <path d="M600,500 Q800,450 1050,150 Q900,300 750,450 Z" fill="url(#fireGradRight)" />
            {/* Secondary Upper Feather */}
            <path d="M620,480 Q850,380 1020,50 Q850,200 720,420 Z" fill="url(#fireGradRight)" opacity="0.7" />
            {/* Lower Stabilizer Arc */}
            <path d="M600,550 Q800,550 1150,350 Q950,450 700,520 Z" fill="url(#fireGradRight)" opacity="0.5" />
            {/* Inner brilliant hot core path */}
            <path d="M600,500 Q750,460 900,250 Q800,350 700,470 Z" fill="#FFFFFF" opacity="0.8" filter="blur(10px)" />
          </g>
        </svg>
      </div>

      {/* 3. Text Legibility Layer - Dark radial fade behind text so the bright wings don't wash it out */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_60%)]" />
      </div>

      {/* 4. CONTENT / TEXT (Foreground) */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mt-[-5vh]">

        {/* Epic Headline */}
        <h1 className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-display font-medium tracking-tight text-white leading-[0.95] mb-6 shadow-[#000_0_10px_40px]">
          Vyrox <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            Awakens.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] md:text-[20px] text-zinc-300 font-sans leading-relaxed mb-12 max-w-[700px] drop-shadow-md">
          Harness the power of an autonomous cyber-sentinel. Silently process chaotic telemetry, execute deterministic heuristcs, and isolate absolute threats in milliseconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button className="w-full sm:w-auto relative group overflow-hidden bg-white text-black px-10 py-4 rounded-full font-bold text-[14px] transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
            Deploy Sentinel
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto relative group bg-black/50 border border-white/20 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-[14px] transition-all hover:bg-white/10 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            Initialize Node
          </button>
        </div>
      </div>
      
      {/* Bottom fade to seamlessly blend into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-[200px] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
