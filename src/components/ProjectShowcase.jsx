import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  GithubIcon,
  SmartphoneIcon,
  LayersIcon,
  Maximize2Icon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons";
import { mobileProjects } from "../constants";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import gsap from "gsap";

const ProjectShowcase = ({ showcaseId, onClose }) => {
  const containerRef = useRef(null);
  const heroCardRef = useRef(null);
  const floatingCardsRef = useRef([]);

  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const project = mobileProjects.find((p) => p.showcaseId === showcaseId);

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    // GSAP Entry Animation
    const ctx = gsap.context(() => {
      // Backdrop fade in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Hero Card pop up
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, y: 50, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15, ease: "back.out(1.4)" }
      );

      // Floating phones stagger pop
      gsap.fromTo(
        ".floating-phone",
        { opacity: 0, scale: 0.5, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  // Interactive 3D Cursor Parallax effect
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 to +1
    const dy = (e.clientY - cy) / cy; // -1 to +1

    mouseRef.current = { x: dx, y: dy };

    floatingCardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const depth = ((idx % 3) + 1) * 22; // Multi-plane depth calculation
      gsap.to(card, {
        x: dx * depth,
        y: dy * depth,
        duration: 1.2,
        ease: "power2.out",
      });
    });
  };

  if (!project) return null;

  const images = project.galleryImages || [project.image];

  // Pre-calculated position configurations around the center card for Desktop
  const phoneConfigs = [
    { top: "8%", left: "5%", rotate: "-12deg", floatDur: "5.5s" },
    { top: "6%", right: "6%", rotate: "14deg", floatDur: "6.5s" },
    { top: "46%", left: "2%", rotate: "7deg", floatDur: "5.0s" },
    { top: "50%", right: "2%", rotate: "-9deg", floatDur: "6.0s" },
    { bottom: "7%", left: "9%", rotate: "-11deg", floatDur: "7.0s" },
    { bottom: "5%", right: "9%", rotate: "10deg", floatDur: "5.8s" },
    { top: "2%", left: "42%", rotate: "-4deg", floatDur: "7.5s" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[999] bg-[#e5e5e0] text-[#111111] flex flex-col justify-between overflow-y-auto lg:overflow-hidden select-none font-sans"
    >
      {/* Subtle Background Organic Noise / Halos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Warm Halos matching portfolio primary colors */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#cfa355]/20 rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 -right-20 w-[650px] h-[650px] bg-[#8b8b73]/25 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/40 rounded-full blur-[140px]" />

        {/* Subtle Portfolio Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-40 flex items-center justify-between px-6 py-5 lg:px-12 bg-[#e5e5e0]/80 backdrop-blur-md border-b border-black/10 shrink-0">
        <MagneticButton
          onClick={onClose}
          strength={0.4}
          aria-label="Back to projects list"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 shadow-md text-sm font-medium"
        >
          <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Back to Projects</span>
        </MagneticButton>

        <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 text-xs font-semibold uppercase tracking-wider text-neutral-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#cfa355] animate-pulse" />
          <span>Interactive App Showcase</span>
        </div>

        <MagneticButton
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          strength={0.4}
          aria-label={`View ${project.name} source code on GitHub`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/15 text-black hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-sm text-sm font-medium"
        >
          <GithubIcon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Source Code</span>
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </MagneticButton>
      </header>

      {/* Main Interactive Stage Area */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center p-6 lg:p-10 my-auto">
        
        {/* Floating Surround Phone Mockups with 3D Tilt & Light Sheen */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {images.map((imgSrc, idx) => {
            const config = phoneConfigs[idx % phoneConfigs.length];

            return (
              <div
                key={idx}
                ref={(el) => (floatingCardsRef.current[idx] = el)}
                style={{
                  top: config.top,
                  left: config.left,
                  right: config.right,
                  bottom: config.bottom,
                }}
                className="floating-phone absolute pointer-events-auto z-20"
              >
                <div
                  style={{
                    transform: `rotate(${config.rotate})`,
                    animation: `portfolioFloat ${config.floatDur} ease-in-out infinite alternate`,
                    animationDelay: `${idx * 0.4}s`,
                  }}
                >
                  <TiltCard
                    maxTilt={18}
                    onClick={() => setActiveImageIndex(idx)}
                    className="cursor-pointer group relative rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_70px_rgba(207,163,85,0.4)] transition-all duration-500 hover:scale-110 hover:rotate-0 hover:z-50"
                  >
                    {/* Smartphone Frame styled in rich lava/dark theme */}
                    <div className="relative w-[155px] h-[315px] xl:w-[178px] xl:h-[365px] bg-[#1a1918] border-[5px] border-[#393632] rounded-[30px] overflow-hidden flex flex-col">
                      {/* Top Speaker Notch */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20 flex items-center justify-center gap-1 border border-neutral-800 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        <div className="w-4 h-0.5 bg-neutral-700 rounded-full" />
                      </div>

                      {/* Screenshot Container */}
                      <div className="w-full h-full bg-black rounded-[24px] overflow-hidden relative">
                        <img
                          src={imgSrc}
                          alt={`${project.name} preview screen ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Hover Overlay Badge */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="px-3.5 py-1.5 rounded-full bg-white/90 text-black text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-lg border border-white">
                            <Maximize2Icon className="size-3.5" aria-hidden="true" />
                            <span>Inspect</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Hero Card wrapped with 3D Tilt & Sheen Light Reflection */}
        <div ref={heroCardRef} className="relative z-40 max-w-xl lg:max-w-2xl w-full">
          <TiltCard
            maxTilt={8}
            className="w-full text-center p-8 sm:p-10 lg:p-12 rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.08)] flex flex-col items-center gap-6"
          >
            {/* Header Pill */}
            <div className="px-4 py-1.5 rounded-full bg-[#393632] text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <SmartphoneIcon className="size-4 text-[#cfa355]" aria-hidden="true" />
              <span>Mobile App Showcase</span>
            </div>

            {/* Main App Title */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-none">
              {project.name}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#393632] font-normal leading-relaxed max-w-lg">
              {project.description}
            </p>

            {/* Framework Badges */}
            <div className="flex flex-wrap justify-center gap-2.5 my-1">
              {project.frameworks.map((fw) => (
                <span
                  key={fw.id}
                  className="px-4 py-1.5 rounded-full bg-white border border-black/15 text-xs font-semibold text-black tracking-wide shadow-sm hover:border-[#cfa355] transition-colors"
                >
                  {fw.name}
                </span>
              ))}
            </div>

            {/* Action Buttons wrapped in Magnetic Motion */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <MagneticButton
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.3}
                aria-label={`Explore ${project.name} source code on GitHub`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-all duration-300 shadow-lg group"
              >
                <GithubIcon className="size-5 mr-2" aria-hidden="true" />
                <span>Explore GitHub Code</span>
                <ArrowUpRightIcon className="size-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </MagneticButton>

              {images.length > 0 && (
                <MagneticButton
                  onClick={() => setActiveImageIndex(0)}
                  strength={0.3}
                  aria-label={`Inspect ${images.length} app screens`}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-sm border border-black/20 transition-all duration-300 shadow-sm"
                >
                  <LayersIcon className="size-4 mr-2" aria-hidden="true" />
                  <span>Inspect Screens ({images.length})</span>
                </MagneticButton>
              )}
            </div>
          </TiltCard>
        </div>

        {/* Mobile Horizontal Phone Carousel */}
        <div className="lg:hidden w-full mt-8 flex flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-widest text-neutral-600 font-semibold">
            Tap screen to inspect up close
          </p>
          <div className="w-full flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-none">
            {images.map((imgSrc, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="shrink-0 snap-center w-[145px] h-[290px] bg-black border-4 border-[#393632] rounded-[26px] overflow-hidden shadow-xl cursor-pointer relative"
              >
                <img
                  src={imgSrc}
                  alt={`${project.name} mobile screen ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Infinite Horizontal Screen Marquee Ticker */}
      <footer className="hidden lg:flex relative z-30 w-full py-4 bg-white/40 border-t border-black/10 backdrop-blur-md overflow-hidden shrink-0">
        <div className="flex gap-6 animate-marquee whitespace-nowrap items-center">
          {images.concat(images).map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImageIndex(i % images.length)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white border border-black/10 shadow-sm cursor-pointer hover:border-[#cfa355] transition-all shrink-0 hover:scale-105"
            >
              <div className="w-6 h-10 rounded-md overflow-hidden bg-black border border-neutral-800 shrink-0">
                <img src={img} alt={`${project.name} thumbnail ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-xs font-semibold text-black">
                {project.name} UI #{i % images.length + 1}
              </span>
            </div>
          ))}
        </div>
      </footer>

      {/* Lightbox Inspector Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fade-in select-none">
          <div className="w-full flex justify-between items-center z-10 max-w-4xl">
            <div className="text-sm font-medium text-neutral-300 font-mono tracking-wide">
              {project.name} Screen {activeImageIndex + 1} of {images.length}
            </div>
            <MagneticButton
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close image inspector modal"
              className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-colors border border-white/20"
            >
              <XIcon className="size-6" aria-hidden="true" />
            </MagneticButton>
          </div>

          <div className="relative flex-1 flex items-center justify-center w-full my-4 max-h-[82vh]">
            <MagneticButton
              onClick={() =>
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
              }
              aria-label="Previous screen"
              className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/20 transition-all text-white shadow-xl"
            >
              <ChevronLeftIcon className="size-6" aria-hidden="true" />
            </MagneticButton>

            <TiltCard maxTilt={14} className="h-full max-h-[750px] aspect-[9/19.5] rounded-[42px] overflow-hidden shadow-[0_0_90px_rgba(255,255,255,0.2)]">
              <div className="w-full h-full bg-[#1a1918] border-[8px] border-[#393632] rounded-[42px] overflow-hidden relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-950 rounded-full z-20 border border-neutral-800 flex items-center justify-center gap-1.5 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-neutral-900" />
                  <div className="w-5 h-0.5 bg-neutral-800 rounded-full" />
                </div>
                <img
                  src={images[activeImageIndex]}
                  alt={`${project.name} detailed screen ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-top rounded-[32px]"
                />
              </div>
            </TiltCard>

            <MagneticButton
              onClick={() =>
                setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next screen"
              className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/20 transition-all text-white shadow-xl"
            >
              <ChevronRightIcon className="size-6" aria-hidden="true" />
            </MagneticButton>
          </div>

          <div className="flex gap-2.5 overflow-x-auto p-2 max-w-full z-10">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                aria-label={`Inspect screen ${i + 1}`}
                className={`w-11 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === i
                    ? "border-[#cfa355] scale-110 shadow-lg"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Float Animation Keyframe */}
      <style>{`
        @keyframes portfolioFloat {
          0% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-22px) rotate(-2deg);
          }
          100% {
            transform: translateY(8px) rotate(-8deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectShowcase;
