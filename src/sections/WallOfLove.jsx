import React from 'react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { FeedbackForm } from '../components/FeedbackForm';
import { FeedbackWall } from '../components/FeedbackWall';
import { useFeedbackWall } from '../hooks/useFeedbackWall';

const WallOfLove = () => {
  const { items, addLocalItem } = useFeedbackWall();

  const handleSubmitted = (newItem) => {
    addLocalItem(newItem);
  };

  const headerText = `Instant feedback from recruiters, clients, and fellow developers.
Leave a note below — it publishes live instantly!`;

  return (
    <section id="wall-of-love" className="relative flex flex-col justify-center min-h-screen py-24 bg-[#e5e5e0]">
      <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <AnimatedHeaderSection
          subTitle={"Wall of Love"}
          title={"Live Feedback"}
          text={headerText}
          textColor={"text-black"}
        />

        <div className="flex justify-center my-10">
          <FeedbackForm onSubmitted={handleSubmitted} />
        </div>
      </div>

      <div className="relative z-10 w-full mt-4">
        <FeedbackWall items={items} />
      </div>
    </section>
  );
};

export default WallOfLove;
