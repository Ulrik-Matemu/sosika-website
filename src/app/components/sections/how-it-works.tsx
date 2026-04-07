import React from 'react';
import Image from 'next/image';
import { MotionDiv } from '@/app/components/shared/motion-wrapper';
import { StaggerContainer, StaggerItem } from '@/app/components/shared/staggeredGrid';

const HowItWorks = () => {
  const steps = [{

    number: '01',

    title: 'Select Mood',

    description:

      'Choose your current vibe or craving and let our AI-powered engine suggest the perfect meals for your moment.',

    image: '/mobile-app-screenshots/sosika-app-mood-selection.png',

  },

  {

    number: '02',

    title: 'Choose Location',

    description:

      'Pinpoint your delivery spot on campus or in the city. We ensure your food reaches you exactly where you are.',

    image: '/mobile-app-screenshots/sosika-app-location-selection.png',

  },

  {

    number: '03',

    title: 'Browse Vendors',

    description:

      'Explore the best local vendors and restaurants near you. Quality food from trusted partners, every time.',

    image: '/mobile-app-screenshots/sosika-app-vendor-browsing.png',

  },];

  return (
    <section className="bg-transparent py-12 md:py-24 px-5 sm:px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header: Uses simple MotionDiv for view-based fade in */}
        <MotionDiv
          className="text-center mb-14 md:mb-20 space-y-4 px-2"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2d3436] tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Getting your favorite food delivered is easier than ever.
          </p>
        </MotionDiv>

        {/* Steps Grid: Using the Client Wrappers */}
        <StaggerContainer>
          {steps.map((step, index) => (
            <StaggerItem
              key={step.number}
              className="flex flex-col items-center text-center group rounded-[28px] md:rounded-none px-4 py-5 sm:px-5 sm:py-6 md:p-0 bg-white/70 md:bg-transparent backdrop-blur-[6px] md:backdrop-blur-0 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:shadow-none border border-white/60 md:border-0"
            >
              <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[350px] mb-6 md:mb-8">
                {/* Decorative Background - Still use MotionDiv for infinite loops */}
                <MotionDiv
                  className="absolute inset-0 bg-[#29d9d5]/5 rounded-full scale-90"
                  animate={{ scale: [0.92, 1, 0.92], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 6, repeat: Infinity, delay: index * 0.25 }}
                />

                {/* App Screen Image */}
                <MotionDiv
                  className="relative z-10 w-full h-full"
                  animate={{ y: [0, -6, 0] }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={500}
                    height={500}
                    className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.10)]"
                    // Optimization: add loading="lazy" for sections below the fold
                    loading="lazy"
                  />
                </MotionDiv>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#2d3436] flex items-center justify-center gap-3">
                  <span className="text-3xl sm:text-4xl text-[#29d9d5]/30">{step.number}</span>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm lg:text-base px-2 max-w-sm">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default HowItWorks;