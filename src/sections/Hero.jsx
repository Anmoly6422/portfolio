import React, { useEffect, useState, lazy, Suspense } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const HeroCanvas = lazy(() => import("../components/HeroCanvas"));

const Hero = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

  useEffect(() => {
    let handle;
    let timer;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      handle = window.requestIdleCallback(() => setShouldRenderCanvas(true), { timeout: 1000 });
    } else {
      timer = setTimeout(() => setShouldRenderCanvas(true), 350);
    }
    return () => {
      if (handle && "cancelIdleCallback" in window) window.cancelIdleCallback(handle);
      if (timer) clearTimeout(timer);
    };
  }, []);

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
        {shouldRenderCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </figure>
    </section>
  );
};

export default Hero;
