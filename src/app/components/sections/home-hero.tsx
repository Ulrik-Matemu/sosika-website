'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
    return (
        <section
            className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* ── Background blobs ── */}
            <motion.div
                aria-hidden="true"
                className="absolute top-[-80px] right-[-80px] rounded-full pointer-events-none"
                style={{
                    width: 480,
                    height: 480,
                    background: 'radial-gradient(circle, rgba(41,217,213,0.18) 0%, transparent 70%)',
                }}
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.03, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute bottom-[-60px] rounded-full pointer-events-none"
                style={{
                    width: 360,
                    height: 360,
                    background: 'radial-gradient(circle, rgba(41,217,213,0.12) 0%, transparent 70%)',
                }}
                animate={{
                    y: [0, 8, 0],
                    x: [0, 6, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <div className="relative z-10 min-w-9xl mx-auto px-6 md:px-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20 lg:py-0 min-h-screen justify-center">
                    {/* ── LEFT: Copy + CTA ── */}
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <motion.h1
                            className="font-black leading-[1.08] mb-6 text-[#1a1a1a] text-5xl sm:text-5xl lg:text-7xl text-center md:text-left"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        >
                            The #1 Food Delivery Service <br />
                            <motion.span
                                style={{ color: '#29d9d5', display: 'inline-block' }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                In Tanzania<span className='text-[#1a1a1a]'>.</span>
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="mb-10 text-center md:text-left leading-relaxed max-w-sm"
                            style={{ color: '#666' }}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        >
                            Order from top-rated local restaurants and get hot, fresh food delivered to your door in minutes.
                        </motion.p>

                        <motion.button
                            className="bg-[#29d9d5] hover:bg-white hover:text-[#1a1c20] transition-colors duration-200 text-white uppercase w-full md:w-1/2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/30"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Order Now
                        </motion.button>
                    </motion.div>

                    {/* ── RIGHT: Illustration ── */}
                    <motion.div
                        className="relative md:right-[-50px] flex items-center justify-center"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    >
                        {/* Soft outer highlight blob */}
                        <motion.div
                            className="absolute inset-0 m-auto"
                            style={{
                                width: '82%',
                                height: '72%',
                                borderRadius: '32% 68% 58% 42% / 38% 42% 58% 62%',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.88) 60%, rgba(255,255,255,0.9) 100%)',
                                boxShadow: '0 18px 50px rgba(41,217,213,0.12)',
                                backdropFilter: 'blur(2px)',
                            }}
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 0.8, 0],
                                scale: [1, 1.01, 1],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* Main brand blob */}
                        <motion.div
                            className="absolute inset-0 m-auto"
                            style={{
                                width: '78%',
                                height: '68%',
                                borderRadius: '42% 58% 36% 64% / 46% 34% 66% 54%',
                                background: 'linear-gradient(145deg, #29d9d5 0%, #20c9c5 45%, #49e5e1 100%)',
                                boxShadow: '0 24px 60px rgba(41,217,213,0.22)',
                            }}
                            animate={{
                                y: [0, 7, 0],
                                rotate: [0, -1, 0],
                                scale: [1, 1.015, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* Rider image */}
                        <motion.div
                            className="relative z-10 w-full"
                            style={{ maxWidth: 420, aspectRatio: '3/4' }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Image
                                src="/asset-images/sosika-delivery-rider.png"
                                alt="Delivery rider"
                                width={550}
                                height={500}
                                className="object-cover drop-shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;