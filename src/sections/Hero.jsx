import React, { useRef } from "react";


import { Planet } from "../components/Planet";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const isMobile = useMediaQuery({maxWidth:853})
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
     <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Anmol Yadav"}
        text={text}
        textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{
            position: [0, 0, 5],
            fov: 35,
            near: 0.1,
            far: 100,
          }}
        >
          <ambientLight intensity={0.3} />

          <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
            <Planet scale={isMobile ? 0.7 : 1} rotation={[0, Math.PI, 0]} />
          </Float>

          <Environment resolution={256}>
            <group rotation={[Math.PI / 3, 4, 1]}>
              <Lightformer
                form="circle"
                intensity={3}
                position={[0, 5, -9]}
                scale={10}
              />

              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />

              <Lightformer
                form="circle"
                intensity={4}
                position={[-5, -1, -1]}
                scale={10}
              />

              <Lightformer
                form="circle"
                intensity={3}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
