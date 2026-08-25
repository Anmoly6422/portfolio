import React, { useState } from 'react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { FeedbackWall } from '../components/FeedbackWall';
import { FeedbackFormModal } from '../components/FeedbackFormModal';
import { LiveActivityTicker } from '../components/LiveActivityTicker';
import { useFeedbackWall } from '../hooks/useFeedbackWall';
import MagneticButton from '../components/MagneticButton';

const WallOfLove = () => {
  const { items, addLocalItem } = useFeedbackWall();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitted = (newItem) => {
    addLocalItem(newItem);
  };

  const headerText = `Live notes and endorsements from recruiters, clients, and software architects.
Hover any note card to pause and inspect in 3D!`;

  return (
    <section id="wall-of-love" className="relative flex flex-col justify-between min-h-screen pt-24 bg-[#e5e5e0] overflow-hidden">
      <div className="relative z-20 px-6 lg:px-12 max-w-7xl mx-auto w-full flex flex-col items-center">
        <AnimatedHeaderSection
          subTitle={"Wall of Love"}
          title={"Wall of Love"}
          text={headerText}
          textColor={"text-black"}
        />

        {/* Magnetic Trigger for Dark Glass Guestbook Modal */}
        <div className="my-8 flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton strength={0.4}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-all duration-300 shadow-xl"
            >
              <span className="text-base font-bold text-[#cfa355]">＋</span>
              <span>Sign the Wall of Love</span>
              <span className="w-2 h-2 rounded-full bg-[#cfa355] animate-pulse" />
            </button>
          </MagneticButton>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-black/10 text-xs font-mono text-neutral-700 uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Wall of Love Stream Active</span>
          </div>
        </div>
      </div>

      {/* Dual-Lane Velocity Marquee Stream with 3D Tilt & Hover Blur Focus */}
      <div className="relative z-10 w-full my-4">
        <FeedbackWall items={items} />
      </div>

      {/* Minimalist Bottom Activity Ticker */}
      <div className="relative z-20 w-full mt-auto">
        <LiveActivityTicker items={items} />
      </div>

      {/* Dark Glass Modal for signing the Wall of Love */}
      <FeedbackFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </section>
  );
};

export default WallOfLove;
