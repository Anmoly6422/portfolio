import React, { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Planet } from "./Planet";
import WebGLFallbackPlanet from "./WebGLFallbackPlanet";

// Helper to check WebGL availability before creating Canvas
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2"))
    );
  } catch {
    return false;
  }
};

// React Error Boundary for catching WebGL/Shader render crashes
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL render error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallbackPlanet />;
    }
    return this.props.children;
  }
}

const HeroCanvasContent = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        precision: "mediump",
      }}
      camera={{
        position: [0, 0, 5],
        fov: 35,
        near: 0.1,
        far: 100,
      }}
    >
      <ambientLight intensity={0.4} />

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

const HeroCanvas = () => {
  const hasWebGL = isWebGLAvailable();

  if (!hasWebGL) {
    return <WebGLFallbackPlanet />;
  }

  return (
    <WebGLErrorBoundary>
      <HeroCanvasContent />
    </WebGLErrorBoundary>
  );
};

export default HeroCanvas;
