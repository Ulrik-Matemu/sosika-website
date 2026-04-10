'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { trackEvent } from '@/lib/posthog';

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M14 22h16M22 14v16" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    headline: 'TZS 800k+ / month',
    sub: 'Earnings potential',
    body: 'Top Sosika riders consistently earn over TZS 800,000 per month working part-time hours. The more you ride, the more you grow.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <rect x="13" y="11" width="18" height="22" rx="3" stroke="#29d9d5" strokeWidth="2.2" />
        <path d="M17 17h10M17 21h10M17 25h6" stroke="#29d9d5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Weekly payouts',
    sub: 'Every Monday',
    body: 'No waiting games. Earnings hit your mobile money wallet every Monday without fail — transparent, automatic, reliable.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <circle cx="22" cy="22" r="7" stroke="#29d9d5" strokeWidth="2.2" />
        <path d="M22 10v4M22 30v4M10 22h4M30 22h4" stroke="#29d9d5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Your schedule',
    sub: 'Total flexibility',
    body: 'Morning, evening, weekends — ride when it suits you. No fixed shifts, no penalties for time off. You are your own boss.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M16 22l4 4 8-8" stroke="#29d9d5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: 'Free starter kit',
    sub: 'Insulated bag + uniform',
    body: 'Every verified Sosika rider receives a branded delivery bag and uniform at zero cost. Arrive professional, earn faster.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M22 15v7l4 4" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="22" r="9" stroke="#29d9d5" strokeWidth="1.8" />
      </svg>
    ),
    headline: 'Real-time orders',
    sub: 'Always near you',
    body: "Our dispatch algorithm prioritises riders closest to merchants. Less waiting, more delivering — your time isn't wasted.",
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M15 26c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="22" cy="17" r="3" stroke="#29d9d5" strokeWidth="2" />
        <path d="M11 32h22" stroke="#29d9d5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Rider community',
    sub: 'You are not alone',
    body: 'Join a network of riders across Tanzania. Group support, tips, and a direct line to our team whenever you need help.',
  },
];

const STEPS = [
  { n: '01', label: 'Submit application', note: 'This form — takes 3 minutes.' },
  { n: '02', label: 'Team review', note: 'We review within 48 hours.' },
  { n: '03', label: 'Verification call', note: 'Quick ID & bike check.' },
  { n: '04', label: 'Pick up your kit', note: 'Free bag + app activation.' },
  { n: '05', label: 'Start earning', note: 'First delivery, first income.' },
];

const VEHICLE_OPTIONS = ['Bicycle', 'Motorcycle', 'Scooter', 'Car'];
const ZONE_OPTIONS = [
  'Arusha', 'Dar es salaam', 'Mwanza', 'Dodoma', 'Tanga',
  'Pemba', 'Unguja', 'Singida', 'Manyara', 'Kilimanjaro', 'Tabora', 'Ruvuma', 'Morogoro', 'Lindi', 'Mtwara', 'Shinyanga', 'Kagera', 'Kigoma', 'Geita', 'Simiyu', 'Katavi', 'Rukwa', 'Njombe', 'Iringa', 'Mbeya', 'Songwe',
];

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zone: string;
  vehicle: string;
  hasSmartphone: string;
  availability: string[];
  experience: string;
  motivation: string;
  agreeTerms: boolean;
};

const INITIAL: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  zone: '',
  vehicle: '',
  hasSmartphone: '',
  availability: [],
  experience: '',
  motivation: '',
  agreeTerms: false,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({
  icon, headline, sub, body,
}: (typeof BENEFITS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 52px rgba(41,217,213,0.12), 0 2px 8px rgba(0,0,0,0.04)'
          : '0 2px 12px rgba(0,0,0,0.04)',
      }}
      className="relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{
          background: hovered ? 'linear-gradient(90deg,#29d9d5,#49e5e1 60%,transparent)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />
      <div className="mb-5">{icon}</div>
      <p className="text-xl font-black text-[#1a1a1a] leading-tight mb-0.5">{headline}</p>
      <p className="text-xs font-bold uppercase tracking-widest text-[#29d9d5] mb-3">{sub}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Input helpers ────────────────────────────────────────────────────────────

const inputCls =
  'w-full bg-[#f8fafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#29d9d5] focus:ring-2 focus:ring-[#29d9d5]/15';

const labelCls = 'block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

// ─── Application Form ─────────────────────────────────────────────────────────

function RiderApplicationForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((p) => ({ ...p, [key]: value }));

  const toggleAvail = (day: string) => {
    setForm((p) => ({
      ...p,
      availability: p.availability.includes(day)
        ? p.availability.filter((d) => d !== day)
        : [...p.availability, day],
    }));
  };

  const validateStep1 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    if (!form.zone) e.zone = 'Required';
    if (!form.vehicle) e.vehicle = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.hasSmartphone) e.hasSmartphone = 'Required';
    if (form.availability.length === 0) e.availability = 'Select at least one';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;


    trackEvent("rider_application_submitted", {
      form_name: 'rider_form'
    });
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/rider-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent("rider_application_submission_success", {
          form_name: 'rider_form'
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture("rider_application_started", {
        form_name: 'rider_application_form'
      });
      setHasTrackedStart(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-14 px-6 gap-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#29d9d5,#49e5e1)' }}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
            <path d="M8 20l9 9 16-16" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#1a1a1a] mb-2">
            Application received, {form.firstName}!
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            Our team will review your details and reach out within <strong>48 hours</strong> via
            phone or email. Keep an eye on <strong>{form.phone}</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
          <Link
            href="/"
            className="block text-center bg-[#1a1a1a] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl text-xs hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-colors duration-300"
          >
            Back to home
          </Link>
          <Link
            href="/our-partners"
            className="block text-center border border-gray-200 text-gray-500 font-bold uppercase tracking-wider py-3.5 rounded-xl text-xs hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-300"
          >
            Explore partners
          </Link>
        </div>
      </div>
    );
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: step === 1 ? '50%' : '100%',
              background: 'linear-gradient(90deg,#29d9d5,#49e5e1)',
            }}
          />
        </div>
        <span className="text-xs font-black text-gray-400 whitespace-nowrap">
          Step {step} of 2
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <p className="text-xs font-black uppercase tracking-widest text-[#29d9d5] mb-6">
            Personal details
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Field label="First name">
              <input
                value={form.firstName}
                onFocus={trackStart}
                onChange={(e) => set('firstName', e.target.value)}
                placeholder="Amina"
                className={`${inputCls} ${errors.firstName ? 'border-red-300' : ''}`}
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </Field>
            <Field label="Last name">
              <input
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                placeholder="Mwanga"
                className={`${inputCls} ${errors.lastName ? 'border-red-300' : ''}`}
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </Field>
          </div>

          <Field label="Phone number">
            <input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="+255 7XX XXX XXX"
              className={`${inputCls} ${errors.phone ? 'border-red-300' : ''}`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </Field>

          <Field label="Email address (optional)">
            <input
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="you@email.com"
              className={inputCls}
            />
          </Field>

          <Field label="Your delivery zone">
            <select
              value={form.zone}
              onChange={(e) => set('zone', e.target.value)}
              className={`${inputCls} ${errors.zone ? 'border-red-300' : ''}`}
            >
              <option value="">Select your area</option>
              {ZONE_OPTIONS.map((z) => <option key={z}>{z}</option>)}
            </select>
            {errors.zone && <p className="text-red-400 text-xs mt-1">{errors.zone}</p>}
          </Field>

          <Field label="Your vehicle">
            <div className="grid grid-cols-2 gap-2">
              {VEHICLE_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set('vehicle', v)}
                  className="py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200"
                  style={{
                    borderColor: form.vehicle === v ? '#29d9d5' : '#e5e7eb',
                    background: form.vehicle === v ? 'rgba(41,217,213,0.08)' : 'transparent',
                    color: form.vehicle === v ? '#29d9d5' : '#6b7280',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            {errors.vehicle && <p className="text-red-400 text-xs mt-1">{errors.vehicle}</p>}
          </Field>

          <button
            onClick={handleNext}
            className="w-full bg-[#1a1a1a] text-white font-black uppercase tracking-wider py-4 rounded-xl text-sm hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-colors duration-300 mt-2"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <p className="text-xs font-black uppercase tracking-widest text-[#29d9d5] mb-6">
            Availability &amp; details
          </p>

          <Field label="Do you own a smartphone?">
            <div className="flex gap-3">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set('hasSmartphone', opt)}
                  className="flex-1 py-3 rounded-xl border text-sm font-bold transition-all duration-200"
                  style={{
                    borderColor: form.hasSmartphone === opt ? '#29d9d5' : '#e5e7eb',
                    background: form.hasSmartphone === opt ? 'rgba(41,217,213,0.08)' : 'transparent',
                    color: form.hasSmartphone === opt ? '#29d9d5' : '#6b7280',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.hasSmartphone && <p className="text-red-400 text-xs mt-1">{errors.hasSmartphone}</p>}
          </Field>

          <Field label="Which days can you ride?">
            <div className="flex gap-2 flex-wrap">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleAvail(d)}
                  className="w-12 py-2.5 rounded-xl border text-xs font-black transition-all duration-200"
                  style={{
                    borderColor: form.availability.includes(d) ? '#29d9d5' : '#e5e7eb',
                    background: form.availability.includes(d) ? 'rgba(41,217,213,0.08)' : 'transparent',
                    color: form.availability.includes(d) ? '#29d9d5' : '#6b7280',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            {errors.availability && <p className="text-red-400 text-xs mt-1">{errors.availability}</p>}
          </Field>

          <Field label="Any delivery experience? (optional)">
            <select
              value={form.experience}
              onChange={(e) => set('experience', e.target.value)}
              className={inputCls}
            >
              <option value="">Select level</option>
              <option value="none">None — first time</option>
              <option value="some">Some — done it casually</option>
              <option value="experienced">Experienced — worked for other platforms</option>
            </select>
          </Field>

          <Field label="Why do you want to ride with Sosika? (optional)">
            <textarea
              value={form.motivation}
              onChange={(e) => set('motivation', e.target.value)}
              rows={3}
              placeholder="Tell us a bit about yourself and your goals..."
              className={`${inputCls} resize-none`}
            />
          </Field>

          {/* Disclaimer */}
          <div className="bg-[#f8fafa] rounded-xl border border-gray-100 p-4 text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-500">Note:</strong> This application is not the final
            onboarding. Submitting this form starts a review process — our team will contact you
            to complete verification before you can start riding.
          </div>

          {/* Agreement */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => set('agreeTerms', !form.agreeTerms)}
              className="mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all duration-200"
              style={{
                borderColor: form.agreeTerms ? '#29d9d5' : errors.agreeTerms ? '#fca5a5' : '#d1d5db',
                background: form.agreeTerms ? '#29d9d5' : 'transparent',
              }}
            >
              {form.agreeTerms && (
                <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                  <path d="M1 5l3.5 3.5L11 1" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500 leading-relaxed">
              I confirm the information above is accurate and I agree to Sosika&apos;s{' '}
              <Link href="/terms" className="text-[#29d9d5] hover:underline">terms of service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-[#29d9d5] hover:underline">privacy policy</Link>.
            </span>
          </label>
          {errors.agreeTerms && <p className="text-red-400 text-xs -mt-3">{errors.agreeTerms}</p>}

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-200 text-gray-500 font-bold uppercase tracking-wider py-4 rounded-xl text-sm hover:border-[#29d9d5] hover:text-[#29d9d5] transition-colors duration-300"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-[#29d9d5] text-[#1a1a1a] font-black uppercase tracking-wider py-4 rounded-xl text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit application'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RiderApplyPage() {
  return (
    <main className="w-full bg-[#f8fafa] text-[#1a1a1a] overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative md:mt-18 min-h-[75vh] flex items-center overflow-hidden bg-[#1a1a1a]">

        {/* blobs */}
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[580px] h-[580px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.15) 0%, transparent 70%)' }} />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.07) 0%, transparent 70%)' }} />

        {/* dot grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* diagonal accent stripe */}
        <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block"
          style={{
            background: 'linear-gradient(135deg, rgba(41,217,213,0.04) 0%, rgba(41,217,213,0.02) 100%)',
            clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-24 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left copy */}
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#29d9d5] bg-[#29d9d5]/10 px-4 py-1.5 rounded-full mb-8">
              Rider Programme
            </span>
            <h1 className="font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.04] mb-6">
              Ride.<br />
              Earn.<br />
              <span style={{ color: '#29d9d5' }}>Thrive.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-10">
              Join over 1,200 Sosika riders who are building real income on their own terms —
              part-time, full-time, or anything in between.
            </p>

            {/* inline stat pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { v: 'TZS 800k+', l: 'Monthly top earners' },
                { v: '48 hrs', l: 'Review turnaround' },
                { v: 'Free kit', l: 'For every rider' },
              ].map((s) => (
                <div key={s.l}
                  className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-full px-4 py-2">
                  <span className="text-sm font-black text-[#29d9d5]">{s.v}</span>
                  <span className="text-xs text-gray-500">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: decorative rider SVG illustration */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.12) 0%, transparent 70%)' }} />

          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#29d9d5]/40" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        </div>
      </section>

      {/* ── Process bar ──────────────────────────────────────────────────── */}
      <section className="bg-[#29d9d5]">
        <div className="max-w-6xl mx-auto px-6 md:px-24 py-6">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-[#1a1a1a] text-xs font-black leading-tight">{s.label}</p>
                    <p className="text-[#1a1a1a]/55 text-[10px]">{s.note}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-6 h-px bg-[#1a1a1a]/20 flex-shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Why ride with us</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">
              Built for riders.<br />Not just deliveries.
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed md:text-right">
            Every feature of the Sosika platform is designed to help you earn more, stress less, and ride smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b) => <BenefitCard key={b.headline} {...b} />)}
        </div>
      </section>

      {/* ── Social proof strip ────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-16 relative overflow-hidden">
        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(41,217,213,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-6xl mx-auto px-6 md:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { v: '1,200+', l: 'Active riders', sub: 'And growing every week' },
              { v: 'TZS 800k', l: 'Top monthly earner', sub: 'Working part-time hours' },
              { v: '4.8 ★', l: 'Rider satisfaction', sub: 'Based on internal surveys' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-4xl font-black text-[#29d9d5] mb-1">{s.v}</p>
                <p className="text-white font-black text-sm mb-0.5">{s.l}</p>
                <p className="text-gray-500 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application form ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-24 py-24" id="apply">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: pitch */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#29d9d5] mb-3">Apply now</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight mb-5">
              Your first ride<br />starts here.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
              Fill in the form and our team will reach out within 48 hours to guide you through the
              verification and onboarding steps. <em>No commitment yet</em> — this is just the start.
            </p>

            {/* What happens next */}
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">What happens next</p>
              {[
                'We review your application (48 hrs)',
                'Our team calls you to verify details',
                'You pick up your free Sosika kit',
                'App activated — you start earning',
              ].map((item, i) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(41,217,213,0.12)', color: '#29d9d5' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>

            {/* FAQ teaser */}
            <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Quick answers</p>
              {[
                { q: 'Do I need a motorcycle?', a: 'No — bicycles, scooters, and cars are all accepted.' },
                { q: 'When do I get paid?', a: 'Every Monday via mobile money, no exceptions.' },
                { q: 'Is there a minimum age?', a: 'Yes — you must be at least 18 years old.' },
              ].map((faq) => (
                <div key={faq.q} className="py-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">{faq.q}</p>
                  <p className="text-xs text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* card header */}
            <div className="bg-[#1a1a1a] px-8 py-6 relative overflow-hidden">
              <div aria-hidden="true" className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(41,217,213,0.18) 0%,transparent 70%)' }} />
              <p className="text-xs font-bold uppercase tracking-widest text-[#29d9d5] mb-1">Rider application</p>
              <p className="text-white font-black text-lg leading-tight">
                Join the Sosika fleet
              </p>
            </div>

            <div className="px-8 py-8">
              <RiderApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA footer ───────────────────────────────────────────────────── */}
      <section className="bg-[#29d9d5] py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-24 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight mb-4">
            Questions before applying?
          </h2>
          <p className="text-[#1a1a1a]/55 text-base mb-8">
            Our rider support team is available Monday to Saturday, 8am – 6pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/255700000000"
              className="inline-block bg-[#1a1a1a] text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300"
            >
              WhatsApp us
            </a>
            <Link
              href="/our-partners"
              className="inline-block bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
            >
              Back to partners
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}