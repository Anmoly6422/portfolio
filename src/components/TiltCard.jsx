import React, { useRef, useState } from "react";
import gsap from "gsap";

const TiltCard = ({ children, className = "", maxTilt = 12, style = {}, onClick }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2; // -1 to +1
    const percentY = (y / rect.height - 0.5) * 2; // -1 to +1

    const rotateY = percentX * maxTilt;
    const rotateX = -percentY * maxTilt;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.35,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.2,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative overflow-hidden transition-shadow duration-500 ${className}`}
    >
      {children}

      {/* Dynamic 3D Sheen Light Reflection Overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-full opacity-0"
        style={{
          background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, rgba(207, 163, 85, 0.15) 30%, transparent 70%)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

export default TiltCard;
