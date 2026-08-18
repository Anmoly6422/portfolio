import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CurtainLoader = ({ progress, isReady, onComplete }) => {
  const containerRef = useRef(null);
  const bladesRef = useRef([]);
  const textRef = useRef(null);

  const numberOfBlades = 6;

  useEffect(() => {
    if (isReady) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });

        // 1. Text content fade out with smooth scale
        tl.to(textRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.15,
          ease: "power2.in",
        });

        // 2. Alternating Awwwards Staggered Blade Slide Reveal
        bladesRef.current.forEach((blade, index) => {
          if (!blade) return;
          const direction = index % 2 === 0 ? -100 : 100;

          tl.to(
            blade,
            {
              yPercent: direction,
              duration: 0.4,
              ease: "power3.inOut",
            },
            index === 0 ? "-=0.05" : `<+${0.02}`
          );
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isReady, onComplete]);

  const displayProgress = Math.min(100, Math.floor(progress || 0));
  const formattedCounter = String(displayProgress).padStart(3, "0");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden font-sans tracking-tight"
    >
      {/* 6 Vertical Awwwards Architectural Shutter Blades */}
      <div className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: numberOfBlades }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (bladesRef.current[i] = el)}
            style={{ width: `${100 / numberOfBlades}%` }}
            className={`h-full border-r border-white/10 relative ${
              i % 2 === 0 ? "bg-[#070709]" : "bg-[#0d0d10]"
            }`}
          >
            {/* Fine Hairline Top Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Subtle Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Center Awwwards Minimal Typography */}
      <div
        ref={textRef}
        className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-between p-8 sm:p-14 text-white z-20"
      >
        {/* Header Bar */}
        <div className="w-full flex justify-between items-center max-w-6xl text-xs font-mono tracking-widest text-neutral-400">
          <div className="flex items-center gap-2 uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>ANMOL YADAV</span>
            <span className="text-neutral-600">//</span>
            <span className="text-neutral-300">2026</span>
          </div>

          <div className="uppercase tracking-widest text-neutral-400 hidden sm:block">
            [ PORTFOLIO PRELOADER ]
          </div>
        </div>

        {/* Center Title & Counter */}
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl my-auto">
          {/* Category Tag */}
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-300 backdrop-blur-md">
            FULL-STACK & MOBILE ARCHITECT
          </div>

          {/* Main Name Heading */}
          <div className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none">
            ANMOL YADAV
          </div>

          {/* Monospaced 3-Digit Counter */}
          <div className="flex items-baseline gap-2 my-2 font-mono">
            <span className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white">
              {formattedCounter}
            </span>
            <span className="text-2xl sm:text-3xl text-neutral-500 font-light">%</span>
          </div>

          {/* Fine Hairline Progress Line */}
          <div className="relative w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        {/* Footer Technical Bar */}
        <div className="w-full flex justify-between items-center max-w-6xl text-xs font-mono tracking-widest text-neutral-500 uppercase">
          <span>LOGIC MEETS AESTHETICS</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </div>
  );
};

export default CurtainLoader;
