import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import  AnimatedtextLines  from "../components/AnimatedtextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Building modern digital experiences
with clean code, scalable architecture,
and performance that speaks for itself.`;

  const aboutText = `I craft full-stack web applications that are fast, intuitive, and built to scale. From designing polished React interfaces to engineering secure backends, I focus on creating products that feel effortless to use and easy to maintain.

Beyond client projects, I enjoy exploring new technologies, contributing to personal projects, solving challenging problems, and continuously refining my craft as a developer.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="images/ber.jpg"
          alt="man"
          className="w-md rounded-3xl"
        />
        <AnimatedtextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
