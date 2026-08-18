import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Planet } from "./Planet";

const HeroCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
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

      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Planet scale={isMobile ? 0.7 : 1} rotation={[0, Math.PI, 0]} />
        </Float>
      </Suspense>

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
  );
};

export default HeroCanvas;
