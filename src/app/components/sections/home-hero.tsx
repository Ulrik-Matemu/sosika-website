
import Image from 'next/image';
// Import your wrappers instead of framer-motion directly
import { MotionDiv, MotionSpan, MotionButton } from '@/app/components/shared/motion-wrapper';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

            {/* Background blobs using the wrapper */}
            <MotionDiv
                aria-hidden="true"
                className="absolute top-[-80px] right-[-80px] rounded-full pointer-events-none"
                style={{
                    width: 480,
                    height: 480,
                    background: 'radial-gradient(circle, rgba(41,217,213,0.18) 0%, transparent 70%)',
                }}
                animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 min-w-9xl mx-auto px-6 md:px-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20 lg:py-0 min-h-screen justify-center">

                    {/* LEFT: Copy */}
                    <MotionDiv
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <h1 className="font-black leading-[1.08] mb-6 text-[#1a1a1a] text-5xl sm:text-5xl lg:text-7xl text-center md:text-left">
                            The #1 Food Delivery Service <br />
                            <MotionSpan
                                style={{ color: '#29d9d5', display: 'inline-block' }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                In Tanzania<span className='text-[#1a1a1a]'>.</span>
                            </MotionSpan>
                        </h1>

                        <MotionButton
                            className="bg-[#29d9d5] text-white uppercase w-full md:w-1/2 px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                        >
                            Order Now
                        </MotionButton>
                    </MotionDiv>

                    {/* RIGHT: Illustration */}
                    {/* ── RIGHT: Illustration ── */}
                    <MotionDiv
                        className="relative md:right-[-50px] flex items-center justify-center"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    >
                        {/* Soft outer highlight blob */}
                        <MotionDiv
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
                        <MotionDiv
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
                        <MotionDiv
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
                        </MotionDiv>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
};

export default Hero;