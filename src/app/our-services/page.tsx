'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/posthog';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'food',
    tag: '01 — Core',
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
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M16 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 32h24M20 32v2a4 4 0 008 0v-2" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="22" y="22" width="4" height="10" rx="1" fill="#29d9d5" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'grocery',
    tag: '02 — Essentials',
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
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M12 16h4l3 14h14l3-10H19" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="33" r="2" fill="#29d9d5" />
        <circle cx="31" cy="33" r="2" fill="#29d9d5" />
      </svg>
    ),
  },
  {
    id: 'pharma',
    tag: '03 — Health',
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
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#29d9d5" fillOpacity="0.12" />
        <rect x="18" y="12" width="12" height="24" rx="6" stroke="#29d9d5" strokeWidth="2.2" />
        <path d="M18 24h12" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'retail',
    tag: '04 — Lifestyle',
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
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#29d9d5" fillOpacity="0.12" />
        <rect x="12" y="18" width="24" height="18" rx="3" stroke="#29d9d5" strokeWidth="2.2" />
        <path d="M18 18v-2a6 6 0 0112 0v2" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
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

const STATS = [
  { value: '100+', label: 'Merchant partners' },
  { value: '30 min', label: 'Avg. delivery time' },
  { value: '50k+', label: 'Happy customers' },
  { value: '7 days', label: 'Always on' },
];

// ─── Sub-component: Service Card ─────────────────────────────────────────────

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'all 0.35s ease', // Simplified to 'all' to cover background and shadow
        backgroundColor: hovered ? '#121212' : '#ffffff',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 32px 64px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.1)'
          : '0 2px 16px rgba(0,0,0,0.04)',
      }}
      className="relative rounded-3xl border border-gray-100 p-8 md:p-10 overflow-hidden cursor-default flex flex-col"
    >
      {/* top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
        style={{
          background: hovered ? 'linear-gradient(90deg,#29d9d5,#49e5e1)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />

      {/* bg blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(41,217,213,0.15) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* tag */}
      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#29d9d5] mb-5">
        {service.tag}
      </p>

      {/* icon - Added a brightness filter to make icons pop on dark if they are dark-colored */}
      <div className={`mb-6 transition-all duration-300 ${hovered ? 'brightness-125' : ''}`}>
        {service.icon}
      </div>

      {/* title & tagline */}
      <h3
        className={`text-2xl md:text-3xl font-black leading-tight mb-1 transition-colors duration-300 ${hovered ? 'text-white' : 'text-[#1a1a1a]'
          }`}
      >
        {service.title}
      </h3>
      <p className="text-[#29d9d5] font-semibold text-sm mb-4">{service.tagline}</p>

      <p
        className={`text-sm leading-relaxed mb-7 transition-colors duration-300 ${hovered ? 'text-gray-400' : 'text-gray-500'
          }`}
      >
        {service.description}
      </p>

      {/* bullets */}
      <ul className="space-y-2 mb-8 flex-1">
        {service.bullets.map((b) => (
          <li
            key={b}
            className={`flex items-start gap-2.5 text-sm transition-colors duration-300 ${hovered ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            <span className="mt-[3px] w-4 h-4 flex-shrink-0 rounded-full bg-[#29d9d5]/10 flex items-center justify-center">
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#29d9d5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {b}
          </li>
        ))}
      </ul>

      {/* stat */}
      <div className={`flex items-end gap-2 border-t pt-5 transition-colors duration-300 ${hovered ? 'border-gray-800' : 'border-gray-100'
        }`}>
        <span className={`text-3xl font-black transition-colors duration-300 ${hovered ? 'text-white' : 'text-[#1a1a1a]'
          }`}>
          {service.stat}
        </span>
        <span className={`text-xs leading-snug pb-1 transition-colors duration-300 ${hovered ? 'text-gray-500' : 'text-gray-400'
          }`}>
          {service.statLabel}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="w-full bg-transparent text-[#1a1a1a] overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative md:mt- min-h-[80vh] flex items-center justify-center overflow-hidden bg-transparent">

        {/* blob top-left */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.18) 0%, transparent 70%)' }}
        />
        {/* blob bottom-right */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.10) 0%, transparent 70%)' }}
        />

        {/* dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.055]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 md:mt-12 max-w-6xl mx-auto px-6 md:px-24 w-full py-28 text-center">
         
          <h1 className="font-black text-[#FFFFF0] text-5xl sm:text-6xl lg:text-[88px] leading-[1.04] mb-6">
            Everything<br />
            <span style={{ color: '#29d9d5' }}>Delivered.</span>
          </h1>

          <p className="max-w-xl mx-auto text-slate-300 text-lg leading-relaxed mb-10">
            Sosika is Tanzania&apos;s on-demand delivery platform — bringing food, groceries,
            medicine, and retail goods to your doorstep, faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://sosika.app"
              className="inline-block bg-[#29d9d5] text-[#1a1a1a] font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-cyan-500/20 hover:bg-white transition-colors duration-300"
              onClick={() => {
                trackEvent('open_app_clicked', {
                  location: 'services_page_hero',
                  destination: 'https://sosika.app',
                  platform: 'website',
                })
              }}
            >
              Order Now
            </Link>
            <Link
              href="/our-partners"
              className="inline-block bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-white/10 transition-colors duration-300"
              onClick={() => {
                trackEvent('become_partner_clicked', {
                  location: 'services_page_hero',
                  destination: '/our-partners',
                  platform: 'website',
                })
              }}
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#29d9d5]">
        <div className="max-w-6xl relative z-10 mx-auto px-6 md:px-24 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-[#1a1a1a]">{s.value}</p>
              <p className="text-[#1a1a1a]/55 text-xs font-semibold uppercase tracking-widest mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">
            What we offer
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#FFFFF0] leading-tight">
            One platform.<br />Every need.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* ── How it works / Differentiators ───────────────────────────────── */}
      <section className="relative bg-[#1a1a1a] py-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(41,217,213,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-24 relative z-10">
          <div className="mb-16 text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">
              The Sosika difference
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Built for speed.<br />Designed for trust.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.number} className="group">
                <p className="text-5xl font-black text-[#29d9d5]/18 group-hover:text-[#29d9d5]/40 transition-colors duration-300 mb-4 leading-none select-none">
                  {d.number}
                </p>
                <h3 className="text-lg font-black text-white mb-2">{d.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners / Investors strip ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">

          {/* blob */}
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.11) 0%, transparent 70%)' }}
          />

          <div className="flex-1 relative z-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">
              For Partners &amp; Investors
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight mb-5">
              Grow with Tanzania&apos;s<br />fastest delivery network.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Whether you&apos;re a restaurant owner, pharmacy, retail brand, or investor —
              Sosika offers a proven platform, dedicated support, and a rapidly growing
              customer base ready to be served.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
            <Link
              href="/our-partners"
              className="block text-center bg-[#1a1a1a] text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-colors duration-300"
              onClick={() => {
                trackEvent('become_partner_clicked', {
                  location: 'services_page_near_end',
                  destination: '/our-partners',
                  platform: 'website',
                })
              }}
            >
              Partner with us
            </Link>
            <Link
              href="/our-partners"
              className="block text-center border border-gray-200 text-[#1a1a1a] font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-300"
              onClick={() => {
                trackEvent('become_investor_clicked', {
                  location: 'services_page_near_end',
                  destination: '/our-partners',
                  platform: 'website',
                })
              }}
            >
              Investor relations
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#29d9d5] py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] leading-tight mb-4">
            Ready to order?
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg mb-10">
            Download the Sosika app or order via web — it&apos;s that simple.
          </p>
          <Link
            href="https://sosika.app"
            className="inline-block bg-[#1a1a1a] text-white font-bold uppercase tracking-wider px-10 py-4 rounded-xl text-sm shadow-xl hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300"
            onClick={() => {
              trackEvent('open_app_clicked', {
                location: 'services_page_end',
                destination: 'https://sosika.app',
                platform: 'website',
              })
            }}
          >
            Start ordering
          </Link>
        </div>
      </section>

    </main>
  );
}