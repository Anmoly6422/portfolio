import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { webProjects, mobileProjects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: "Web Development",
    data: webProjects,
  },
  {
    title: "Mobile Development",
    data: mobileProjects,
  },
];

const Works = () => {
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

  const handleMouseEnter = (project, index) => {
    if (window.innerWidth < 768) return;

    setCurrentProject(project);

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
                    id="project"
                    className="relative flex flex-col gap-1 py-5 cursor-pointer group"
                    onMouseEnter={() => handleMouseEnter(project, current)}
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

                      <Icon icon="lucide:arrow-up-right" className="size-6" />
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
                        alt=""
                        className="object-cover w-full h-full rounded-lg brightness-50"
                      />

                      <img
                        src={project.image}
                        alt={project.name}
                        className="absolute px-12 rounded-xl"
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
          className="fixed left-0 hidden overflow-hidden border-8 border-black pointer-events-none opacity-0 md:block w-175 -top-2/6 z-50"
        >
          {currentProject && (
            <img
              src={currentProject.image}
              alt={currentProject.name}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
