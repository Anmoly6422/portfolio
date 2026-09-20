import React from "react";

const WebGLFallbackPlanet = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[350px] pointer-events-none select-none overflow-hidden">
      {/* Outer Ambient Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />

      {/* Rotating Ring Back */}
      <div 
        className="absolute w-[340px] h-[100px] border-4 border-amber-400/40 rounded-[100%] shadow-[0_0_25px_rgba(251,191,36,0.3)] transform -rotate-12 animate-[spin_30s_linear_infinite]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
      />

      {/* Main Planet Body */}
      <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-neutral-900 via-amber-950 to-black border border-amber-500/30 shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(217,119,6,0.25)] overflow-hidden flex items-center justify-center">
        {/* Surface Detail / Craters Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.15),transparent_60%)]" />
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-500/10 blur-xl" />
        {/* Small Moon Accent */}
        <div className="absolute top-8 left-10 w-8 h-8 rounded-full bg-amber-300/20 blur-sm" />
      </div>

      {/* Rotating Ring Front */}
      <div 
        className="absolute w-[340px] h-[100px] border-4 border-amber-400/60 rounded-[100%] shadow-[0_0_30px_rgba(251,191,36,0.4)] transform -rotate-12 animate-[spin_30s_linear_infinite]"
        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
      />
    </div>
  );
};

export default WebGLFallbackPlanet;
