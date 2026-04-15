'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const awards = [

  {
    eyebrow: 'Community Impact',
    title: 'Silver Prize',
    org: 'S.M.A.R.T Competition',
    year: '2025',
    bg: 'bg-[#29d9d5]',
    text: 'text-[#0e0e0e]',
    badgeStyle: 'bg-black/10 text-[#0e0e0e]',
    yearOpacity: 'text-black/10',
    link: '/smart-competition-2025',
  },
  {
    eyebrow: 'Industry Leader',
    title: '3rd Place Winner',
    org: 'Affroinnovate Challenge Tanzania',
    year: '2025',
    bg: 'bg-[#0e0e0e]',
    text: 'text-white',
    badgeStyle: 'bg-[#29d9d5]/15 text-[#29d9d5]',
    yearOpacity: 'text-white/10',
    link: '/afroinnovate-youth-competition-2025',
  },
];

const panels = [
  {
    num: '01 / 04',
    heading: 'Redefining fast, reliable delivery in Tanzania',
    body: 'Sosika’s innovative approach to food delivery earned us the Silver Prize at the S.M.A.R.T Competition, showcasing our commitment to transforming the delivery landscape.',
    tag: 'S.M.A.R.T Competition · 2025',
  },
  {
    num: '02 / 04',
    heading: 'Empowering local businesses through technology',
    body: "Our dedication to supporting local vendors and fostering economic growth was recognized with 3rd Place at the Affroinnovative Youth Awards, highlighting our impact on the community.",
    tag: 'Affroinnovate Challenge Tanzania · 2025',
  },
];

export default function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.panel);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getCardStyle = (cardIndex: number): React.CSSProperties => {
    const rel = cardIndex - activeIndex;

    if (rel < 0) {
      return {
        transform: `translateY(${rel * 110}%) scale(0.92)`,
        opacity: 0,
        zIndex: cardIndex,
        transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
        willChange: 'transform, opacity',
      };
    }
    if (rel === 0) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity: 1,
        zIndex: 20,
        transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
        willChange: 'transform, opacity',
      };
    }
    return {
      transform: `translateY(${rel * 14}px) scale(${1 - rel * 0.04})`,
      opacity: 1,
      zIndex: 20 - rel,
      transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
      willChange: 'transform, opacity',
    };
  };

  return (
    <section className="bg-[#f7f6f3]">
      {/* Section header */}
      <div className="text-center px-8 pt-24 pb-16">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#0f172a] font-medium mb-4">
          Internationally Prestigious
        </p>
        <h2 className="text-6xl leading-tight tracking-wide font-black text-[#0e0e0e]">
          Awards &amp; <em className="italic text-[#888]">Honours</em>
        </h2>
      </div>

      {/* ── DESKTOP layout (lg+): sticky card stack + scrolling text panels ── */}
      <div className="hidden lg:flex">
        {/* LEFT — sticky card stack */}
        <div className="w-[52%] sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-[340px] h-[420px]">
            {awards.map((award, i) => (
              <Link href={award.link} target="_blank" key={award.title}>
              <div
                key={award.year}
                className={`absolute inset-0 rounded-3xl p-10 flex flex-col justify-between ${award.bg} ${award.text}`}
                style={getCardStyle(i)}
              >
                <div>
                  <span className="text-[11px] tracking-widest uppercase opacity-50 font-medium">
                    {award.eyebrow}
                  </span>
                  <h3 className="text-[28px] leading-snug mt-4 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-sm opacity-55">{award.org}</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className={`text-[11px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full ${award.badgeStyle}`}>
                    {award.year}
                  </span>
                  <span className={`text-[56px] font-light leading-none tracking-tighter ${award.yearOpacity}`}>
                    {award.year.slice(2)}
                  </span>
                </div>
              </div>
              </Link>
            ))}
          </div>

          {/* Progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
            {awards.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: 6,
                  height: 6,
                  background: i === activeIndex ? '#29d9d5' : '#ccc',
                  transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — scrollable text panels */}
        <div className="w-[48%] pr-16 pl-10">
          {panels.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              data-panel={i}
              className="min-h-screen flex flex-col justify-center py-20"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#0f172a] font-medium mb-5">
                {panel.num}
              </p>
              <h3 className="text-[36px] leading-tight text-[#0e0e0e] font-bold mb-5">
                {panel.heading}
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-light max-w-[340px] mb-8">
                {panel.body}
              </p>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-widest uppercase font-medium text-[#0e0e0e] px-4 py-2.5 border border-gray-300 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#29d9d5] block" />
                {panel.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE layout (<lg): card + text stacked per award, scrolls naturally ── */}
      <div className="lg:hidden px-5 pb-16 flex flex-col gap-6">
        {awards.map((award, i) => (
          <div key={award.title} className="flex flex-col gap-5">
            {/* Card */}
            <div className={`rounded-3xl p-8 flex flex-col justify-between ${award.bg} ${award.text}`}
              style={{ minHeight: 300 }}>
              <div>
                <span className="text-[11px] tracking-widest uppercase opacity-50 font-medium">
                  {award.eyebrow}
                </span>
                <h3 className="text-[24px] leading-snug mt-4 mb-2">
                  {award.title}
                </h3>
                <p className="text-sm opacity-55">{award.org}</p>
              </div>
              <div className="flex items-end justify-between mt-8">
                <span className={`text-[11px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full ${award.badgeStyle}`}>
                  {award.year}
                </span>
                <span className={`text-[48px] font-light leading-none tracking-tighter ${award.yearOpacity}`}>
                  {award.year.slice(2)}
                </span>
              </div>
            </div>

            {/* Text panel */}
            <div className="px-1 pb-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#29d9d5] font-medium mb-3">
                {panels[i].num}
              </p>
              <h3 className="text-[26px] leading-tight text-[#0e0e0e] mb-3">
                {panels[i].heading}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#888] font-light mb-5">
                {panels[i].body}
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium text-[#0e0e0e] px-4 py-2.5 border border-gray-300 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#29d9d5] shrink-0 block" />
                {panels[i].tag}
              </span>
            </div>

            {/* Divider between items except last */}
            {i < awards.length - 1 && (
              <div className="h-px bg-gray-200 mx-1" />
            )}
          </div>
        ))}
      </div>

      <div className="h-20" />
    </section>
  );
}