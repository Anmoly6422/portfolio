import Marquee from "../components/Marquee";
import { SquareIcon } from "../components/Icons";

const ContactSummary = () => {
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "CONTACT ME",
    "EMAIL",
    "LINKEDIN",
    "GITHUB",
    "LET'S BUILD SOMETHING AMAZING",
  ];

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 gap-20 bg-[#e5e5e0]">
      <div className="w-full">
        <Marquee items={items} />
      </div>
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-[#805a10] font-semibold">together</span> “
        </p>
      </div>
      <div className="w-full mt-8">
        <Marquee
          items={items2}
          reverse
          className="text-black bg-transparent border-y-2"
          iconClassName="stroke-gold stroke-2 text-primary"
          IconComponent={SquareIcon}
        />
      </div>
    </section>
  );
};

export default ContactSummary;
