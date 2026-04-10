'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import posthog, { trackEvent } from '@/lib/posthog';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  organization: string;
  type: string;
  message: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const VENDOR_BENEFITS = [
  {
    stat: '3×',
    label: 'Revenue growth',
    body: 'Our vendor partners report up to 3× increase in monthly orders within the first 90 days of going live on Sosika.',
  },
  {
    stat: '50k+',
    label: 'Active customers',
    body: 'Instantly reach a hungry, ready-to-buy audience you would never reach through walk-in traffic alone.',
  },
  {
    stat: '0',
    label: 'Upfront fees',
    body: 'No setup cost, no monthly subscription. You only pay a small commission when you earn — aligned incentives, always.',
  },
  {
    stat: '24 hrs',
    label: 'Go-live time',
    body: 'Our onboarding team gets your menu live on the platform in as little as 24 hours after signing up.',
  },
];

const RIDER_BENEFITS = [
  {
    stat: 'TZS 800k+',
    label: 'Monthly earnings',
    body: 'Top Sosika riders earn over TZS 800,000 per month — with flexible hours that fit around your life.',
  },
  {
    stat: '100%',
    label: 'Earnings transparency',
    body: 'See exactly what you earn on every delivery. Weekly payouts direct to your mobile money — no delays.',
  },
  {
    stat: 'Free',
    label: 'Rider kit',
    body: 'Qualified riders receive a Sosika-branded delivery bag and uniform at no cost when they join the fleet.',
  },
  {
    stat: 'Flexible',
    label: 'Work schedule',
    body: 'Work mornings, evenings, weekends — whenever suits you. No minimum hours, no penalties for days off.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Since partnering with Sosika, our lunch orders have doubled. The dashboard is clean and payouts always arrive on time. I wish we had joined sooner.',
    name: 'Fatuma A.',
    role: 'Owner, Mama Fatuma Kitchen',
    location: 'Njiro',
    type: 'vendor',
  },
  {
    quote:
      "I ride three hours in the evening after my day job. Last month I made enough to cover my rent and still save. Sosika genuinely changed things for my family.",
    name: 'Emmanuel K.',
    role: 'Freelance Rider',
    location: 'Sakina',
    type: 'rider',
  },
  {
    quote:
      'Our pharmacy went from local-only to city-wide in one week. The prescription upload feature is a complete game-changer for our customers.',
    name: 'Dr. Salim M.',
    role: 'Director, MedPlus Pharmacy',
    location: 'Mount Meru',
    type: 'vendor',
  },
  {
    quote:
      "The onboarding was incredibly smooth — our menu was live within a day. We've seen a 40% jump in weekend orders since joining the platform.",
    name: 'Amina J.',
    role: 'Co-founder, Spice Garden Restaurant',
    location: 'Kijenge',
    type: 'vendor',
  },
  {
    quote:
      "I was skeptical at first, but my first week I made TZS 120,000 in just four evenings. The app is easy and support is always responsive.",
    name: 'Rashid O.',
    role: 'Part-time Rider',
    location: 'Usa River',
    type: 'rider',
  },
  {
    quote:
      "Sosika brought our grocery store online without any hassle. Our regular customers now order from home and we've gained a whole new audience.",
    name: 'Grace N.',
    role: 'Manager, FreshMart Supermarket',
    location: 'Tengeru',
    type: 'vendor',
  },
  {
    quote:
      "The weekly payouts hit my M-Pesa every Monday without fail. That kind of reliability makes all the difference when you're building a side income.",
    name: 'Baraka M.',
    role: 'Freelance Rider',
    location: 'Sanawari',
    type: 'rider',
  },
  {
    quote:
      "We partnered with Sosika for corporate lunch deliveries and it transformed how our team eats at the office. Punctual, professional, and delicious.",
    name: 'Zainab H.',
    role: 'Operations Lead, Tanzanite Group',
    location: 'Clock Tower (CBD)',
    type: 'vendor',
  },
];

const HOW_IT_WORKS_VENDOR = [
  { step: '01', title: 'Apply online', body: 'Fill in your restaurant or shop details. Takes under 5 minutes.' },
  { step: '02', title: 'Menu setup', body: 'Our team photographs your menu and builds your storefront on the app.' },
  { step: '03', title: 'Go live', body: "You're live in 24 hours. Orders start flowing immediately." },
  { step: '04', title: 'Grow & earn', body: 'Track performance, manage your menu, and collect weekly payouts.' },
];

const HOW_IT_WORKS_RIDER = [
  { step: '01', title: 'Register', body: 'Submit your details, ID, and a photo of your bike or bicycle.' },
  { step: '02', title: 'Background check', body: 'Quick 48-hour verification to keep the network trusted and safe.' },
  { step: '03', title: 'Get your kit', body: 'Pick up your free Sosika bag and activate the rider app.' },
  { step: '04', title: 'Start earning', body: 'Accept deliveries near you and earn from your very first ride.' },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const StoreIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
    <rect x="6" y="16" width="28" height="20" rx="2.5" stroke="#29d9d5" strokeWidth="2" />
    <path d="M6 16l4-8h20l4 8" stroke="#29d9d5" strokeWidth="2" strokeLinejoin="round" />
    <rect x="15" y="24" width="10" height="12" rx="1.5" stroke="#29d9d5" strokeWidth="1.8" />
    <path d="M6 16h28" stroke="#29d9d5" strokeWidth="2" />
  </svg>
);

const RiderIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
    <circle cx="20" cy="10" r="4" stroke="#29d9d5" strokeWidth="2" />
    <path d="M14 20c0-3.314 2.686-6 6-6s6 2.686 6 6v4H14v-4z" stroke="#29d9d5" strokeWidth="2" />
    <circle cx="12" cy="30" r="4" stroke="#29d9d5" strokeWidth="2" />
    <circle cx="28" cy="30" r="4" stroke="#29d9d5" strokeWidth="2" />
    <path d="M16 30h8" stroke="#29d9d5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OtherIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
    <path d="M8 12h24M8 20h16M8 28h10" stroke="#29d9d5" strokeWidth="2" strokeLinecap="round" />
    <circle cx="30" cy="28" r="6" stroke="#29d9d5" strokeWidth="2" />
    <path d="M30 25v3l2 2" stroke="#29d9d5" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M3 8l3 3 7-7" stroke="#29d9d5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 32 24" fill="none" className="w-8 h-6 opacity-30" aria-hidden="true">
    <path d="M0 24V14C0 6.268 4.477 1.857 13.43 0l1.57 2.857C10.286 4.286 7.81 7.048 7.238 11.43H13V24H0zm19 0V14c0-7.732 4.477-12.143 13.43-14L34 2.857C29.286 4.286 26.81 7.048 26.238 11.43H32V24H19z" fill="#29d9d5" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({ stat, label, body }: { stat: string; label: string; body: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: h ? '0 20px 48px rgba(41,217,213,0.11)' : '0 2px 12px rgba(0,0,0,0.04)',
      }}
      className="bg-white rounded-2xl border border-gray-100 p-7 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          background: h ? 'linear-gradient(90deg,#29d9d5,#49e5e1)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />
      <p className="text-3xl font-black text-[#1a1a1a] mb-0.5">{stat}</p>
      <p className="text-xs font-bold uppercase tracking-widest text-[#29d9d5] mb-3">{label}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
    </div>
  );
}

function StepItem({ step, title, body, last }: { step: string; title: string; body: string; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#29d9d5] flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-black text-[#29d9d5]">{step}</span>
        </div>
        {!last && <div className="w-px flex-1 bg-[#29d9d5]/15 my-2" />}
      </div>
      <div className={`pb-8 ${last ? '' : ''}`}>
        <p className="font-black text-[#1a1a1a] text-base mb-1">{title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, role, location, type }: typeof TESTIMONIALS[0]) {
  return (
    <div
      className="relative flex-shrink-0 flex flex-col bg-white rounded-3xl border border-gray-100 p-8 overflow-hidden"
      style={{
        width: '360px',
        boxShadow: '0 4px 28px rgba(0,0,0,0.06)',
      }}
    >
      {/* top accent */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
        style={{ background: 'linear-gradient(90deg,#29d9d5,transparent)' }}
      />

      {/* type badge */}
      <div className="flex items-center justify-between mb-6">
        <QuoteIcon />
        <span
          className="text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full"
          style={{
            background: type === 'vendor' ? 'rgba(41,217,213,0.10)' : 'rgba(26,26,26,0.05)',
            color: type === 'vendor' ? '#29d9d5' : '#888',
          }}
        >
          {type === 'vendor' ? '🏪 Vendor' : '🛵 Rider'}
        </span>
      </div>

      {/* quote */}
      <p className="text-[#1a1a1a] text-[15px] leading-[1.7] flex-1 mb-7">
        &ldquo;{quote}&rdquo;
      </p>

      {/* author */}
      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-[#1a1a1a] flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#29d9d5,#49e5e1)' }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-black text-[#1a1a1a] leading-tight">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{role}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[11px] text-gray-400">
          <svg viewBox="0 0 12 14" fill="none" className="w-2.5 h-2.5 opacity-50" aria-hidden="true">
            <path d="M6 0C3.79 0 2 1.79 2 4c0 3 4 8.5 4 8.5S10 7 10 4c0-2.21-1.79-4-4-4zm0 5.5C5.17 5.5 4.5 4.83 4.5 4S5.17 2.5 6 2.5 7.5 3.17 7.5 4 6.83 5.5 6 5.5z" fill="currentColor" />
          </svg>
          {location}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  // Scroll-based dot tracker
  const onScroll = () => {
    if (!trackRef.current) return;
    const cardW = 360 + 20; // card width + gap
    const idx = Math.round(trackRef.current.scrollLeft / cardW);
    setActiveIdx(Math.min(idx, TESTIMONIALS.length - 1));
  };

  // Arrow navigation
  const scrollBy = (dir: 1 | -1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Hide webkit scrollbar */}
      <style>{`
        .sosika-slider::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Arrow buttons */}
      <div className="hidden md:flex items-center gap-2 absolute -top-16 right-0">
        <button
          onClick={() => {
            scrollBy(-1);
            trackEvent('testimonial_nav_clicked')
          }}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-200"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => {
            scrollBy(1);
            trackEvent('testimonial_nav_clicked');
          }}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-200"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onScroll={onScroll}
        className="sosika-slider flex gap-5 overflow-x-auto pb-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {/* left padding sentinel */}
        <div className="flex-shrink-0 w-0" />

        {TESTIMONIALS.map((t) => (
          <div key={t.name} style={{ scrollSnapAlign: 'start' }}>
            <TestimonialCard {...t} />
          </div>
        ))}

        {/* right fade sentinel */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5 mt-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              if (!trackRef.current) return;
              trackRef.current.scrollTo({ left: i * 380, behavior: 'smooth' });
            }}
            style={{
              width: activeIdx === i ? '24px' : '6px',
              height: '6px',
              borderRadius: '99px',
              background: activeIdx === i ? '#29d9d5' : '#d1d5db',
              transition: 'width 0.3s ease, background 0.3s ease',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function OtherPartnershipForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    organization: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) return;

    trackEvent("other_partnership_form_submitted", {
      form_name: 'other_partnership_form'
    });

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/other-partnership-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent("other_partnership_form_submission_success", {
          form_name: 'other_partnership_form'
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      alert("We couldn't send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture("other_partnership_form_started", {
        form_name: 'other_partnership_form'
      });
      setHasTrackedStart(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#29d9d5,#49e5e1)' }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
            <path d="M6 16l8 8 14-14" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-[#1a1a1a]">Message received.</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Thanks for reaching out. Our partnerships team will be in touch within 1–2 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-[#f8fafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#29d9d5] focus:ring-2 focus:ring-[#29d9d5]/15';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Full name *
          </label>
          <input
            name="name"
            onFocus={trackStart}
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Organization
          </label>
          <input
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Company or brand name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Partnership type
          </label>
          <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option value="">Select a category</option>
            <option value="technology">Technology integration</option>
            <option value="investor">Investment opportunity</option>
            <option value="ngo">NGO / Social impact</option>
            <option value="corporate">Corporate catering</option>
            <option value="media">Media &amp; PR</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
          Message *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your partnership idea, goals, or how we can collaborate..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-[#1a1a1a] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl text-sm hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send message →'}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  return (
    <main className="w-full bg-[#f8fafa] text-[#1a1a1a] overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative md:mt-18 min-h-[78vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.16) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.08) 0%, transparent 70%)' }}
        />
        {/* dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-24 w-full py-28">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#29d9d5] bg-[#29d9d5]/10 px-4 py-1.5 rounded-full mb-8">
              Partner with Sosika
            </span>
            <h1 className="font-black text-white text-5xl sm:text-6xl lg:text-[82px] leading-[1.04] mb-6">
              Grow together.<br />
              <span style={{ color: '#29d9d5' }}>Win together.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
              Sosika connects vendors, riders, and businesses into Tanzania&apos;s fastest-growing
              delivery ecosystem. Whether you cook, ride, or build — there&apos;s a place for you here.
            </p>
            {/* scroll indicator */}
            <div className="flex items-center gap-3 text-gray-600 text-xs uppercase tracking-widest">
              <div className="w-8 h-px bg-gray-600" />
              Scroll to explore
            </div>
          </div>
        </div>

        {/* floating chips */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
          {['100+ Vendors', '1,200+ Riders', '50k+ Customers'].map((chip) => (
            <div
              key={chip}
              className="bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
            >
              {chip}
            </div>
          ))}
        </div>
      </section>

      {/* ── Partner type selector ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Two ways to partner</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">
            Which one are you?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Vendor card */}
          <div className="group relative bg-[#1a1a1a] rounded-3xl p-10 overflow-hidden cursor-default"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-60"
              style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.18) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#29d9d5]/10 border border-[#29d9d5]/20 flex items-center justify-center mb-7">
                <StoreIcon />
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-2">For vendors</p>
              <h3 className="text-3xl font-black text-white mb-3 leading-tight">Sell more.<br />Reach further.</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                List your restaurant, grocery store, pharmacy or retail shop on Sosika and tap into
                a city-wide customer base — with zero setup cost and same-day onboarding.
              </p>
              <ul className="space-y-2.5 mb-10">
                {['Zero upfront fees', 'Free storefront setup', 'Real-time order dashboard', 'Weekly payouts via mobile money', 'Dedicated support team'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-[#29d9d5]/10 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/join-vendor"
                className="inline-block bg-[#29d9d5] text-[#1a1a1a] font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-white transition-colors duration-300"
                onClick={() => {
                  trackEvent('join_vendor_clicked', {
                    location: 'our_partners_page',
                    destination: '/join-vendor'
                  })
                }}
              >
                Join as a Vendor
              </Link>
            </div>
          </div>

          {/* Rider card */}
          <div className="group relative bg-white rounded-3xl border border-gray-100 p-10 overflow-hidden cursor-default"
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.10) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#29d9d5]/10 border border-[#29d9d5]/20 flex items-center justify-center mb-7">
                <RiderIcon />
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-2">For riders</p>
              <h3 className="text-3xl font-black text-[#1a1a1a] mb-3 leading-tight">Ride on your<br />own terms.</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Earn flexible income making deliveries in your city. No boss, no fixed hours —
                just you, your bike, and a platform that pays fairly and pays on time.
              </p>
              <ul className="space-y-2.5 mb-10">
                {['Flexible schedule, no minimums', 'Free Sosika delivery kit', 'Weekly mobile money payout', 'In-app earnings tracker', 'Rider community & support'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#29d9d5]/10 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/join-rider"
                className="inline-block bg-[#1a1a1a] text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-colors duration-300"
                onClick={() => {
                  trackEvent('join_rider_clicked', {
                    location: 'our_partners_page',
                    destination: '/join-rider'
                  })
                }}
              >
                Join as a Rider
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Vendor benefits ───────────────────────────────────────────────── */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Vendor results</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">
                What our vendors<br />are saying in numbers.
              </h2>
            </div>
            <Link
              href="/join-vendor"
              className="self-start md:self-auto inline-block border border-gray-200 text-[#1a1a1a] font-bold uppercase tracking-wider px-6 py-3 rounded-xl text-xs hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-300"
              onClick={() => {
                trackEvent('join_vendor_clicked', {
                  location: 'our_partners_page_vendor_results_section',
                  destination: '/join-vendor'
                })
              }}
            >
              Become a vendor
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENDOR_BENEFITS.map((b) => (
              <BenefitCard key={b.label} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Rider benefits ────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.07) 0%, transparent 70%)' }}
        />
        <div className="max-w-6xl mx-auto px-6 md:px-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Rider earnings</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Real income.<br />Real freedom.
              </h2>
            </div>
            <Link
              href="/join-rider"
              className="self-start md:self-auto inline-block border border-white/10 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl text-xs hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-300"
              onClick={() => {
                trackEvent('join_rider_clicked', {
                  location: 'our_partners_page_rider_results_section',
                  destination: '/join-rider'
                })
              }}
            >
              Become a rider
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RIDER_BENEFITS.map((b) => (
              <div
                key={b.label}
                className="bg-white/5 border border-white/8 rounded-2xl p-7"
              >
                <p className="text-3xl font-black text-white mb-0.5">{b.stat}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#29d9d5] mb-3">{b.label}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Simple process</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">
            Up and running<br />in 4 steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Vendor steps */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-[#29d9d5]/10 flex items-center justify-center">
                <StoreIcon />
              </div>
              <span className="font-black text-[#1a1a1a] text-lg">For Vendors</span>
            </div>
            {HOW_IT_WORKS_VENDOR.map((s, i) => (
              <StepItem key={s.step} {...s} last={i === HOW_IT_WORKS_VENDOR.length - 1} />
            ))}
          </div>

          {/* Rider steps */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-[#29d9d5]/10 flex items-center justify-center">
                <RiderIcon />
              </div>
              <span className="font-black text-[#1a1a1a] text-lg">For Riders</span>
            </div>
            {HOW_IT_WORKS_RIDER.map((s, i) => (
              <StepItem key={s.step} {...s} last={i === HOW_IT_WORKS_RIDER.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials slider ───────────────────────────────────────────── */}
      <section className="relative bg-[#f0fffe] border-y border-[#29d9d5]/15 py-24 overflow-hidden">
        {/* header stays in max-width container */}
        <div className="max-w-6xl mx-auto px-6 md:px-24 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Partner stories</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">
                Hear it from<br />our partners.
              </h2>
            </div>
            <p className="text-md text-gray-400 max-w-xs md:pb-16 md:text-right leading-relaxed">
              Real words from real vendors and riders building their future with Sosika.
            </p>
          </div>

          <TestimonialsSlider />
        </div>

        {/* right-side fade overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-40"
          style={{
            background: 'linear-gradient(to left, rgba(240,255,254,1) 0%, transparent 100%)',
          }}
        />
      </section>

      {/* ── Other partnerships + form ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: copy */}
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#29d9d5]/10 border border-[#29d9d5]/20 flex items-center justify-center mb-7">
              <OtherIcon />
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">
              Other opportunities
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight mb-5">
              Something else<br />in mind?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              We&apos;re open to all kinds of meaningful partnerships — technology integrations,
              investment opportunities, NGO collaborations, corporate catering arrangements,
              media partnerships, and more. If you see potential in working with Sosika, so do we.
            </p>

            {/* opportunity chips */}
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Investment', 'Corporate catering', 'NGO & Impact', 'Media & PR', 'Academic research'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gray-200 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm">
            <p className="font-black text-[#1a1a1a] text-xl mb-1">Send us a message</p>
            <p className="text-sm text-gray-400 mb-7">
              Our partnerships team reviews every inquiry within 1–2 business days.
            </p>
            <OtherPartnershipForm />
          </div>

        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#29d9d5] py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] leading-tight mb-4">
            Ready to grow<br />with Sosika?
          </h2>
          <p className="text-[#1a1a1a]/55 text-lg mb-10">
            Join 100+ vendors and 1,200+ riders already building their future on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/join-vendor"
              className="inline-block bg-[#1a1a1a] text-white font-bold uppercase tracking-wider px-10 py-4 rounded-xl text-sm shadow-xl hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300"
            >
              Join as Vendor
            </Link>
            <Link
              href="/join-rider"
              className="inline-block bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold uppercase tracking-wider px-10 py-4 rounded-xl text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
            >
              Join as Rider
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}