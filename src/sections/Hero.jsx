import React from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import HeroCanvas from "../components/HeroCanvas";

const Hero = () => {
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="hero" className="relative flex flex-col justify-end min-h-screen">
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"404 No Bugs Found"}
          title={"Anmol Yadav"}
          text={text}
          textColor={"text-black"}
        />
      </div>
      <figure
        className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
        aria-hidden="true"
      >
        <HeroCanvas />
      </figure>
    </section>
  );
};

export default Hero;
