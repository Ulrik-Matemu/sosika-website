'use client'
import Image from 'next/image';
import { MotionButton } from '@/app/components/shared/motion-wrapper';
import Link from 'next/link';
import { trackEvent } from '@/lib/posthog';
import posthog from '@/lib/posthog';
import { useEffect, useState, useRef } from 'react';

const PHRASES = ['In Tanzania', 'In Africa', 'In the World'];
const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 3000;
const PAUSE_AFTER_DELETE = 400;

const Hero = () => {
    const [linkHref, setLinkHref] = useState('https://sosika.app/');
    const websiteDistinctId = posthog.get_distinct_id();

    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    // All typewriter mutable state lives in a ref — no re-triggers, no stale closures
    const twState = useRef({
        phraseIndex: 0,
        charIndex: 0,
        isDeleting: false,
    });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setLinkHref(`https://sosika.app/?utm_source=${window.location.hostname}&utm_medium=cta&utm_campaign=hero_section&utm_content=open_app_button&web_distinct_id=${encodeURIComponent(websiteDistinctId)}`)
    });

    // Single-mount typewriter loop
    useEffect(() => {
        const tick = () => {
            const { phraseIndex, charIndex, isDeleting } = twState.current;
            const currentPhrase = PHRASES[phraseIndex];

            if (!isDeleting) {
                const next = currentPhrase.slice(0, charIndex + 1);
                setDisplayText(next);
                twState.current.charIndex = charIndex + 1;

                if (next === currentPhrase) {
                    // Finished typing — pause then delete
                    twState.current.isDeleting = true;
                    timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
                } else {
                    timeoutRef.current = setTimeout(tick, TYPING_SPEED);
                }
            } else {
                const next = currentPhrase.slice(0, charIndex - 1);
                setDisplayText(next);
                twState.current.charIndex = charIndex - 1;

                if (next === '') {
                    // Finished deleting — move to next phrase
                    twState.current.isDeleting = false;
                    twState.current.phraseIndex = (phraseIndex + 1) % PHRASES.length;
                    timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
                } else {
                    timeoutRef.current = setTimeout(tick, DELETING_SPEED);
                }
            }
        };

        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []); // ← empty deps: runs once, never restarts

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section className="relative mt-20 w-full md:mt-14 min-h-screen overflow-hidden flex items-center justify-center">
            <div
                aria-hidden="true"
                className="absolute top-[-80px] right-[-80px] rounded-full pointer-events-none"
                style={{
                    width: 480,
                    height: 480,
                    background: 'radial-gradient(circle, rgba(41,217,213,0.18) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 min-w-9xl mx-auto px-6 md:px-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20 lg:py-0 min-h-screen justify-center">

                    <div className="flex flex-col justify-center">
                        <h1 className="font-black leading-[1.08] mb-6 text-[#FFFFF0] text-5xl sm:text-5xl lg:text-7xl text-center md:text-left">
                            Fastest Food Delivery Service <br />
                            <span style={{ color: '#29d9d5', display: 'inline-block' }}>
                                {displayText}
                                <span
                                    style={{
                                        opacity: showCursor ? 1 : 0,
                                        color: '#29d9d5',
                                        fontWeight: 300,
                                        marginLeft: '2px',
                                        transition: 'opacity 0.1s',
                                    }}
                                >|</span>
                            </span>
                        </h1>

                        <Link href={linkHref}>
                            <MotionButton
                                className="bg-black text-white uppercase w-full md:w-1/2 px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 hover:bg-white hover:text-[#1a1c20] transition-colors duration-300"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -2, scale: 1.02 }}
                                onClick={() => {
                                    trackEvent("open_app_clicked", {
                                        location: "hero_section",
                                        destination: "https://sosika.app",
                                        platform: 'website',
                                        utm_source: "website",
                                        utm_medium: "cta",
                                        utm_campaign: 'hero_section'
                                    })
                                }}
                            >
                                Order Now
                            </MotionButton>
                        </Link>
                    </div>

                    <div className="relative md:right-[-50px] flex items-center justify-center">
                        <div
                            className="absolute inset-0 m-auto"
                            style={{
                                width: '82%',
                                height: '72%',
                                borderRadius: '32% 68% 58% 42% / 38% 42% 58% 62%',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.88) 60%, rgba(255,255,255,0.9) 100%)',
                                boxShadow: '0 18px 50px rgba(41,217,213,0.12)',
                                backdropFilter: 'blur(2px)',
                            }}
                        />
                        <div
                            className="absolute inset-0 m-auto"
                            style={{
                                width: '78%',
                                height: '68%',
                                borderRadius: '42% 58% 36% 64% / 46% 34% 66% 54%',
                                background: 'linear-gradient(145deg, #29d9d5 0%, #20c9c5 45%, #49e5e1 100%)',
                                boxShadow: '0 24px 60px rgba(41,217,213,0.22)',
                            }}
                        />
                        <div
                            className="relative z-10 w-full"
                            style={{ maxWidth: 420, aspectRatio: '3/4' }}
                        >
                            <Image
                                src="/asset-images/sosika-delivery-rider.png"
                                alt="Delivery rider"
                                width={550}
                                height={500}
                                className="object-cover drop-shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;