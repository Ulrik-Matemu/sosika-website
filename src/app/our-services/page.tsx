'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/posthog';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'food',
    index: '01',
    category: 'Core',
    title: 'Food Delivery',
    tagline: 'Restaurant-quality meals at your door.',
    description:
      'From local street-food favourites to fine dining, Sosika connects you with hundreds of restaurants across Tanzania. Order in seconds, track in real time, receive in minutes.',
    bullets: [
      'Live GPS tracking on every order',
      'Average delivery under 30 minutes',
      '500+ restaurant partners',
      'Scheduled & ASAP delivery',
    ],
    stat: '500+',
    statLabel: 'Restaurant partners',
  },
  {
    id: 'grocery',
    index: '02',
    category: 'Essentials',
    title: 'Grocery & Supermarket',
    tagline: 'Your weekly shop, handled.',
    description:
      'Skip the queues. Order fresh produce, pantry staples, and household goods from supermarkets and local shops near you — delivered to your door in under an hour.',
    bullets: [
      'Fresh produce guaranteed',
      'Partnered with leading supermarkets',
      'Bulk & family-size orders welcome',
      'Cold-chain delivery for perishables',
    ],
    stat: '<60 min',
    statLabel: 'Average grocery delivery',
  },
  {
    id: 'pharma',
    index: '03',
    category: 'Health',
    title: 'Pharmaceuticals',
    tagline: 'Medication delivered with care.',
    description:
      "Get prescription and over-the-counter medications from certified pharmacies, delivered safely and discreetly. Your health can't wait — neither should your medication.",
    bullets: [
      'Licensed pharmacy partners only',
      'Discreet, tamper-evident packaging',
      'Prescription upload in-app',
      'Available 7 days a week',
    ],
    stat: '100%',
    statLabel: 'Licensed pharmacy partners',
  },
  {
    id: 'retail',
    index: '04',
    category: 'Lifestyle',
    title: 'Retail & General Items',
    tagline: 'Anything you need, anywhere you are.',
    description:
      'Electronics, clothing, gifts, stationery and more — Sosika is evolving into a full on-demand platform for everyday retail needs across Tanzania.',
    bullets: [
      'Electronics & accessories',
      'Gifts & flowers on demand',
      'Office & stationery supplies',
      'Growing category catalogue',
    ],
    stat: '10+',
    statLabel: 'Product categories & growing',
  },
];

const STATS = [
  { value: '100+', label: 'Merchant partners' },
  { value: '30 min', label: 'Avg. delivery time' },
  { value: '50k+', label: 'Happy customers' },
  { value: '7 days', label: 'Always on' },
];

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Real-time tracking',
    body: 'Watch your order move from the merchant to your door on a live map. No more wondering where it is.',
  },
  {
    number: '02',
    title: 'Sosika Riders',
    body: 'Our trained, vetted delivery fleet operates across Arusha and beyond — rain or shine.',
  },
  {
    number: '03',
    title: 'One app, everything',
    body: 'Food, groceries, medicine, retail — manage all your deliveries from a single seamless interface.',
  },
  {
    number: '04',
    title: 'Partner dashboard',
    body: 'Merchants get full visibility: live orders, revenue analytics, and payout management in one place.',
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="font-black text-4xl md:text-5xl tracking-tight transition-all duration-700"
        style={{
          color: '#29d9d5',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">{label}</span>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--delay': `${index * 80}ms`,
        borderColor: hovered ? 'rgba(41,217,213,0.35)' : 'rgba(255,255,255,0.06)',
        backgroundColor: hovered ? 'rgba(41,217,213,0.03)' : 'transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      } as React.CSSProperties}
      className="relative border rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden group cursor-default"
    >
      {/* Corner accent — top-right */}
      <div
        className="absolute top-0 right-0 w-px transition-all duration-500"
        style={{
          height: hovered ? '100%' : '40px',
          background: 'linear-gradient(180deg, #29d9d5 0%, transparent 100%)',
          opacity: hovered ? 0.6 : 0.25,
        }}
      />
      <div
        className="absolute top-0 right-0 h-px transition-all duration-500"
        style={{
          width: hovered ? '100%' : '40px',
          background: 'linear-gradient(270deg, #29d9d5 0%, transparent 100%)',
          opacity: hovered ? 0.6 : 0.25,
        }}
      />

      {/* Index + category */}
      <div className="flex items-center justify-between mb-10">
        <span
          className="text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300"
          style={{ color: hovered ? '#29d9d5' : '#3a3a3a' }}
        >
          {service.category}
        </span>
        <span
          className="font-black text-[80px] leading-none select-none transition-all duration-500"
          style={{
            color: hovered ? 'rgba(41,217,213,0.12)' : 'rgba(255,255,255,0.04)',
            transform: hovered ? 'translateX(-4px)' : 'translateX(0)',
          }}
        >
          {service.index}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
        {service.title}
      </h3>
      <p
        className="text-sm font-semibold mb-5 transition-colors duration-300"
        style={{ color: hovered ? '#29d9d5' : '#4a4a4a' }}
      >
        {service.tagline}
      </p>

      <p className={`text-sm leading-relaxed text-[#5a5a5a] mb-8 ${hovered ? 'text-white' : ''} transition-colors duration-300`}>
        {service.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-2.5 mb-10 flex-1">
        {service.bullets.map((b, i) => (
          <li
            key={b}
            className="flex items-start gap-3 text-sm text-[#4a4a4a] transition-all duration-300"
            style={{ transitionDelay: hovered ? `${i * 40}ms` : '0ms' }}
          >
            <span
              className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-sm flex items-center justify-center transition-colors duration-300"
              style={{ background: hovered ? 'rgba(41,217,213,0.15)' : 'rgba(255,255,255,0.04)' }}
            >
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                <path d="M2 5.5l2 2 4-4" stroke="#29d9d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={hovered ? 'text-[#888]' : ''}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Stat */}
      <div
        className="flex items-end gap-3 pt-6 transition-colors duration-300"
        style={{ borderTop: `1px solid ${hovered ? 'rgba(41,217,213,0.15)' : 'rgba(255,255,255,0.05)'}` }}
      >
        <span className="text-4xl font-black text-white tracking-tight leading-none">{service.stat}</span>
        <span className="text-xs text-[#3a3a3a] pb-1 leading-snug">{service.statLabel}</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main
      className="w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #062f3a 40%, #033a41 70%, #0b4f54 100%)', color: '#ffffff' }}
    >

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Fine grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial glow — top center */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(41,217,213,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Horizontal rule — top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* Vertical accent lines */}
        <div className="absolute top-0 bottom-0 left-[5%] w-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-0 bottom-0 right-[5%] w-px" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 xl:px-24 pt-40 pb-32">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-[#29d9d5]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">
              Tanzania's On-Demand Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[0.95] tracking-[-0.03em] mb-8"
            style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
          >
            <span className="block text-white">Everything</span>
            <span className="block" style={{ color: '#29d9d5' }}>Delivered.</span>
          </h1>

          {/* Sub + CTA row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
            <p className="max-w-md text-base leading-relaxed text-white lg:max-w-sm">
              Food, groceries, medicine, and retail goods — to your doorstep, faster than ever before.
              One platform. Every need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://sosika.app"
                className="group relative inline-flex items-center gap-3 bg-[#29d9d5] text-[#0a0a0a] font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:brightness-110"
                onClick={() => trackEvent('open_app_clicked', { location: 'services_page_hero' })}
              >
                <span>Order Now</span>
                <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/our-partners"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] text-white font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all duration-300 hover:border-[#29d9d5] hover:text-[#29d9d5]"
                onClick={() => trackEvent('become_partner_clicked', { location: 'services_page_hero' })}
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom marquee line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        />
        <div className="absolute bottom-10 right-6 md:right-16 xl:right-24">
          <span className="text-[11px] text-[#2a2a2a] tracking-[0.2em] uppercase font-semibold">
            Est. 2025 — Arusha, TZ
          </span>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        className="border-y"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x"
          style={{ divideColor: 'rgba(255,255,255,0.06)' } as React.CSSProperties}
        >
          {STATS.map((s) => (
            <div key={s.label} className="md:px-10 first:pl-0 last:pr-0">
              <AnimatedStat value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-28">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#29d9d5]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">
                What we offer
              </span>
            </div>
            <h2
              className="font-black tracking-tight leading-[0.95] text-white"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              One platform.<br />Every need.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white leading-relaxed md:text-right">
            Four service verticals, one coherent experience. Built from the ground up for Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ background: '' }}>
          {SERVICES.map((s, i) => (
            <div key={s.id} className="">
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Differentiators ───────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Subtle left glow */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.05) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#29d9d5]" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">
                  The Sosika difference
                </span>
              </div>
              <h2
                className="font-black tracking-tight leading-[0.95] text-white"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                Built for speed.<br />Designed for trust.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[rgba(255,255,255,0.06)]">
            {DIFFERENTIATORS.map((d, i) => (
              <div
                key={d.number}
                className="group p-8 relative transition-colors duration-300 hover:bg-[rgba(41,217,213,0.02)]"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {/* Top border hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg, #29d9d5, transparent)', opacity: 0 }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0')}
                />

                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#2a2a2a] mb-6 group-hover:text-[#29d9d5] transition-colors duration-300">
                  {d.number}
                </div>
                <h3 className="text-base font-black text-white mb-3 tracking-tight">{d.title}</h3>
                <p className="text-sm text-white leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner / Investor CTA ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-20">
        <div
          className="relative rounded-2xl overflow-hidden p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
          style={{
            border: '1px solid rgba(41,217,213,0.2)',
            background: 'linear-gradient(135deg, rgba(41,217,213,0.04) 0%, transparent 60%)',
          }}
        >
          {/* Corner geometry */}
          <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-0 left-0 w-full h-px bg-[#29d9d5] opacity-40" />
            <div className="absolute top-0 left-0 h-full w-px bg-[#29d9d5] opacity-40" />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20">
            <div className="absolute bottom-0 right-0 w-full h-px bg-[#29d9d5] opacity-40" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-[#29d9d5] opacity-40" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#29d9d5]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">
                Partners &amp; Investors
              </span>
            </div>
            <h2
              className="font-black text-white leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Grow with Tanzania's<br />fastest delivery network.
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-md">
              Whether you're a restaurant owner, pharmacy, retail brand, or investor —
              Sosika offers a proven platform, dedicated support, and a rapidly growing
              customer base ready to be served.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-auto min-w-[200px]">
            <Link
              href="/our-partners"
              className="group relative inline-flex items-center justify-center gap-3 border border-[#29d9d5] text-[#29d9d5] font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[#29d9d5] hover:text-[#0a0a0a]"
              onClick={() => trackEvent('become_partner_clicked', { location: 'services_page_near_end' })}
            >
              Partner with us
              <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/our-partners"
              className="inline-flex items-center justify-center border border-white text-white font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:text-white"
              onClick={() => trackEvent('become_investor_clicked', { location: 'services_page_near_end' })}
            >
              Investor relations
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Large background text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        >
          <span
            className="font-black text-white leading-none whitespace-nowrap"
            style={{ fontSize: 'clamp(100px, 20vw, 260px)', opacity: 0.025 }}
          >
            Sosika
          </span>
        </div>

        {/* Center glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-[600px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(41,217,213,0.06) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 xl:px-24 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-[#29d9d5]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">
              Ready to start
            </span>
            <div className="w-6 h-px bg-[#29d9d5]" />
          </div>

          <h2
            className="font-black tracking-tight text-white leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          >
            Ready to order?
          </h2>
          <p className="text-white text-base mb-12 max-w-sm mx-auto leading-relaxed">
            Order via web or download the app — it takes seconds.
          </p>
          <Link
            href="https://sosika.app"
            className="group inline-flex items-center gap-3 bg-white text-[#0a0a0a] font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-xl transition-all duration-300 hover:bg-[#29d9d5]"
            onClick={() => trackEvent('open_app_clicked', { location: 'services_page_end' })}
          >
            Start ordering
            <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
  );
}