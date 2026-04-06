'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
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
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="bg-transparent py-12 md:py-24 px-5 sm:px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-14 md:mb-20 space-y-4 px-2"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2d3436] tracking-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            How It Works
          </motion.h2>

          <motion.p
            className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            Getting your favorite food delivered is easier than ever. Just follow these
            three simple steps to start your Sosika experience.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="
                flex flex-col items-center text-center group
                rounded-[28px] md:rounded-none
                px-4 py-5 sm:px-5 sm:py-6 md:p-0
                bg-white/70 md:bg-transparent
                backdrop-blur-[6px] md:backdrop-blur-0
                shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:shadow-none
                border border-white/60 md:border-0
              "
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[350px] mb-6 md:mb-8">
                {/* Decorative Texture/Blob Background */}
                <motion.div
                  className="absolute inset-0 bg-[#29d9d5]/5 rounded-full scale-90"
                  animate={{
                    scale: [0.92, 1, 0.92],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.25,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-dashed border-[#29d9d5]/20 rounded-full"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* App Screen */}
                <motion.div
                  className="relative z-10 w-full h-full"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + index * 0.08,
                    ease: 'easeOut',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  style={{ willChange: 'transform' }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={500}
                    height={500}
                    className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.10)]"
                  />
                </motion.div>

                {/* Bottom Platform/Shadow */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-[#2d3436] rounded-full opacity-10"
                  animate={{
                    scaleX: [1, 1.06, 1],
                    opacity: [0.1, 0.14, 0.1],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                />
              </div>

              {/* Text Content */}
              <motion.div
                className="space-y-3 md:space-y-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.22 + index * 0.08,
                  ease: 'easeOut',
                }}
              >
                <h3 className="text-xl sm:text-2xl font-black text-[#2d3436] flex items-center justify-center gap-3">
                  <span className="text-3xl sm:text-4xl text-left text-[#29d9d5]/30">
                    {step.number}
                  </span>
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-relaxed text-sm lg:text-base px-2 md:px-4 max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;