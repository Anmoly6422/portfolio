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
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  // Ensure enough items exist to comfortably exceed 2x-3x screen width
  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const repeatCount = Math.max(3, Math.ceil(15 / items.length));
    return Array(repeatCount).fill(items).flat();
  }, [items]);

  function horizontalLoop(elements, config) {
    elements = gsap.utils.toArray(elements).filter(Boolean);
    if (!elements || elements.length === 0) return null;

    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = elements.length,
      startX = elements[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    gsap.set(elements, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    gsap.set(elements, { x: 0 });
    totalWidth =
      elements[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      elements[length - 1].offsetWidth *
        gsap.getProperty(elements[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
      item = elements[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  useEffect(() => {
    let tl = null;
    let observer = null;

    const initLoop = () => {
      if (tl) tl.kill();
      const validElements = itemsRef.current.filter(Boolean);
      if (validElements.length === 0) return;

      tl = horizontalLoop(validElements, {
        repeat: -1,
        paddingRight: 40,
        reversed: reverse,
      });

      if (!observer) {
        observer = Observer.create({
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
                  timeScale: factor / 2.5,
                  duration: 1,
                },
                "+=0.3"
              );
          },
        });
      }
    };

    // Initial loop creation
    const timer = setTimeout(initLoop, 50);

    // Recalculate loop when custom fonts finish loading
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initLoop);
    }

    // Handle window resize
    const handleResize = () => {
      initLoop();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.kill();
      if (tl) tl.kill();
    };
  }, [displayItems, reverse]);

  itemsRef.current = [];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full py-5 flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div className="flex">
        {displayItems.map((text, index) => (
          <span
            key={`${text}-${index}`}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex items-center px-10 gap-x-20 shrink-0"
          >
            {text}{" "}
            {IconComponent && (
              <IconComponent className={iconClassName} aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
