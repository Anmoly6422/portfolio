import { ArrowUpRightIcon } from "../components/Icons";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { webProjects, mobileProjects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: "Mobile Development",
    data: mobileProjects,
    type: "mobile",
  },
  {
    title: "Web Development",
    data: webProjects,
    type: "web",
  },
];

const Works = ({ onOpenShowcase }) => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentProject, setCurrentProject] = useState(null);

  const text = `Featured projects that have been meticulously
crafted with passion to drive
results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (project, sectionType, index) => {
    if (window.innerWidth < 768) return;

    setCurrentProject({ ...project, type: sectionType });

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
      },
      {
        clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    setCurrentProject(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.to(el, {
      clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  let overlayIndex = 0;

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle="Logic meets Aesthetics, Seamlessly"
        title="Works"
        text={text}
        textColor="text-black"
        withScrollTrigger={true}
      />

      <div className="relative flex flex-col" onMouseMove={handleMouseMove}>
        {projects.map((section) => (
          <div key={section.title} className="mb-20">
            <h2 className="px-10 mb-8 text-5xl font-semibold">
              {section.title}
            </h2>

            {section.data.map((project) => {
              const current = overlayIndex++;

              return (
                <div key={project.id}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View project details for ${project.name}`}
                    id="project"
                    className="relative flex flex-col gap-1 py-5 cursor-pointer group"
                    onClick={(e) => {
                      if (project.showcaseId && onOpenShowcase) {
                        e.preventDefault();
                        onOpenShowcase(project.showcaseId);
                      }
                    }}
                    onMouseEnter={() =>
                      handleMouseEnter(project, section.type, current)
                    }
                    onMouseLeave={() => handleMouseLeave(current)}
                  >
                    <div
                      ref={(el) => (overlayRefs.current[current] = el)}
                      className="absolute inset-0 hidden bg-black md:block -z-10"
                      style={{
                        clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
                      }}
                    />

                    <div className="flex justify-between px-10 transition-all duration-500 group-hover:text-white md:group-hover:px-12">
                      <h3 className="text-[28px] lg:text-[34px]">
                        {project.name}
                      </h3>

                      <ArrowUpRightIcon className="size-6" aria-hidden="true" />
                    </div>

                    <div className="w-full h-px bg-black/80" />

                    <div className="flex flex-wrap gap-4 px-10 mt-2 uppercase transition-all duration-500 md:group-hover:px-12">
                      {project.frameworks.map((framework) => (
                        <span
                          key={framework.id}
                          className="text-sm transition-colors duration-500 group-hover:text-white"
                        >
                          {framework.name}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Image */}
                    <div className="relative flex items-center justify-center h-96 px-10 mt-5 md:hidden">
                      <img
                        src={project.bgImage}
                        alt={`${project.name} background`}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full rounded-lg brightness-50"
                      />

                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        loading="lazy"
                        decoding="async"
                        className="absolute px-6 max-h-[85%] object-contain rounded-xl shadow-lg"
                      />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        ))}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="fixed left-0 -top-2/6 hidden pointer-events-none opacity-0 md:block z-50"
        >
          {currentProject &&
            (currentProject.type === "mobile" ? (
              /* Mobile Phone Frame Shape */
              <div className="relative w-[240px] h-[480px] rounded-[34px] bg-black border-8 border-black shadow-2xl overflow-hidden flex flex-col">
                {/* Speaker / Camera Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center gap-1.5 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
                  <div className="w-6 h-1 bg-neutral-800 rounded-full" />
                </div>
                {/* Screen Content */}
                <div className="w-full h-full rounded-[26px] overflow-hidden bg-neutral-950 relative flex items-center justify-center">
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.name} interactive preview`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-top"
                  />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />
              </div>
            ) : (
              /* Desktop Browser Frame Shape */
              <div className="relative w-[560px] h-[320px] rounded-xl bg-black border-8 border-black shadow-2xl overflow-hidden flex flex-col">
                {/* Window Header */}
                <div className="h-7 bg-neutral-900 px-3 flex items-center gap-2 border-b border-neutral-800 shrink-0 z-20 pointer-events-none">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto px-4 py-0.5 bg-neutral-800/80 rounded-md text-[10px] text-neutral-400 font-mono max-w-[200px] truncate">
                    {currentProject.name.toLowerCase().replace(/\s+/g, "")}.app
                  </div>
                </div>
                {/* Screen Content */}
                <div className="w-full flex-1 overflow-hidden bg-neutral-950 relative flex items-center justify-center">
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.name} web preview`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-top"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
