import React, { useRef } from "react";
import gsap from "gsap";

const MagneticButton = ({ children, className = "", onClick, href, target, rel, strength = 0.35 }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(btn, {
      x: deltaX * strength,
      y: deltaY * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)",
    });
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center cursor-pointer transition-shadow duration-300 ${className}`}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
