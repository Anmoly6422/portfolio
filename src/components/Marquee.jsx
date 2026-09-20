import { StarFourPointsIcon } from "./Icons";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef, useMemo } from "react";
gsap.registerPlugin(Observer);

const Marquee = ({
  items = [],
  className = "text-white bg-black",
  IconComponent = StarFourPointsIcon,
  iconClassName = "",
  reverse = false,
  speed = 30,
}) => {
  const trackRef = useRef(null);

  // Multiply items to ensure a track covers wide screens (min 8 items per track)
  const trackItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const repeatCount = Math.max(2, Math.ceil(8 / items.length));
    return Array(repeatCount).fill(items).flat();
  }, [items]);

  useEffect(() => {
    if (!trackRef.current || trackItems.length === 0) return;

    // Track 1 and Track 2 are identical twin blocks side-by-side.
    // Moving trackRef from 0% to -50% (or -50% to 0% for reverse) creates a 100% seamless, mathematically bulletproof loop.
    const fromX = reverse ? -50 : 0;
    const toX = reverse ? 0 : -50;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.fromTo(
      trackRef.current,
      { xPercent: fromX },
      { xPercent: toX, duration: speed }
    );

    // Dynamic scroll speed reaction using GSAP Observer
    const observer = Observer.create({
      onChangeY(self) {
        if (!tl) return;
        let factor = 2.5;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }
        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, {
            timeScale: factor * 2.5,
            duration: 0.2,
            overwrite: true,
          })
          .to(
            tl,
            {
              timeScale: 1,
              duration: 1,
            },
            "+=0.3"
          );
      },
    });

    return () => {
      observer.kill();
      tl.kill();
    };
  }, [trackItems, reverse, speed]);

  return (
    <div className={`overflow-hidden w-full py-5 flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap select-none ${className}`}>
      <div ref={trackRef} className="flex w-max shrink-0">
        {/* First Half Track */}
        <div className="flex shrink-0 items-center">
          {trackItems.map((text, index) => (
            <span key={`track1-${index}`} className="flex items-center px-10 gap-x-20 shrink-0">
              {text}{" "}
              {IconComponent && (
                <IconComponent className={iconClassName} aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
        {/* Second Half Track (Identical duplicate for seamless 50% loop) */}
        <div className="flex shrink-0 items-center">
          {trackItems.map((text, index) => (
            <span key={`track2-${index}`} className="flex items-center px-10 gap-x-20 shrink-0">
              {text}{" "}
              {IconComponent && (
                <IconComponent className={iconClassName} aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
