import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
  gsap.to("#title-service-1", {
    xPercent: 25,
    scrollTrigger: {
      trigger: "#title-service-1",
      scrub: 1,
    },
  });

  gsap.to("#title-service-2", {
    xPercent: -35,
    scrollTrigger: {
      trigger: "#title-service-2",
      scrub: 1,
    },
  });

  gsap.to("#title-service-3", {
    xPercent: 40,
    scrollTrigger: {
      trigger: "#title-service-3",
      scrub: 1,
    },
  });

  gsap.to("#title-service-4", {
    xPercent: -45,
    scrollTrigger: {
      trigger: "#title-service-4",
      scrub: 1,
    },
  });

});
  return (
   <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
  <div id="title-service-1">
    <p>DIGITAL ARCHITECTURE</p>
  </div>

  <div
    id="title-service-2"
    className="flex items-center justify-center gap-3 translate-x-16"
  >
    <p className="font-normal">WEB EXPERIENCES</p>
    <div className="shrink-0 w-10 h-0.75 md:w-32 bg-gold" />
    <p>MOBILE APPLICATIONS</p>
  </div>

  <div
    id="title-service-3"
    className="flex items-center justify-center gap-3 -translate-x-48"
  >
    <p>APIs</p>
   <div className="shrink-0 w-10 h-0.75 md:w-32 bg-gold" />
    <p className="italic">INTERACTIONS</p>
    <div className="shrink-0 w-10 h-0.75 md:w-32 bg-gold" />
    <p>SCALABILITY</p>
  </div>

  <div
    id="title-service-4"
    className="translate-x-48"
  >
    <p>CLOUD & DATA SYSTEMS</p>
  </div>
</section>
  );
};

export default ServiceSummary;
