'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { trackEvent } from '@/lib/posthog';

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    index: '01',
    headline: 'TZS 800k+ / month',
    sub: 'Earnings potential',
    body: 'Top Sosika riders consistently earn over TZS 800,000 per month working part-time hours. The more you ride, the more you grow.',
  },
  {
    index: '02',
    headline: 'Weekly payouts',
    sub: 'Every Monday',
    body: 'No waiting games. Earnings hit your mobile money wallet every Monday without fail — transparent, automatic, reliable.',
  },
  {
    index: '03',
    headline: 'Your schedule',
    sub: 'Total flexibility',
    body: 'Morning, evening, weekends — ride when it suits you. No fixed shifts, no penalties for time off. You are your own boss.',
  },
  {
    index: '04',
    headline: 'Free starter kit',
    sub: 'Bag + uniform',
    body: 'Every verified Sosika rider receives a branded delivery bag and uniform at zero cost. Arrive professional, earn faster.',
  },
  {
    index: '05',
    headline: 'Real-time orders',
    sub: 'Always near you',
    body: "Our dispatch algorithm prioritises riders closest to merchants. Less waiting, more delivering — your time isn't wasted.",
  },
  {
    index: '06',
    headline: 'Rider community',
    sub: 'You are not alone',
    body: 'Join a network of riders across Tanzania. Group support, tips, and a direct line to our team whenever you need help.',
  },
];

const STEPS = [
  { n: '01', label: 'Submit application', note: 'This form — 3 minutes.' },
  { n: '02', label: 'Team review', note: 'Within 48 hours.' },
  { n: '03', label: 'Verification call', note: 'Quick ID & bike check.' },
  { n: '04', label: 'Pick up your kit', note: 'Free bag + app activation.' },
  { n: '05', label: 'Start earning', note: 'First delivery, first income.' },
];

const VEHICLE_OPTIONS = ['Bicycle', 'Motorcycle', 'Scooter', 'Car'];

const ZONE_OPTIONS = [
  'Arusha', 'Dar es Salaam', 'Mwanza', 'Dodoma', 'Tanga',
  'Pemba', 'Unguja', 'Singida', 'Manyara', 'Kilimanjaro',
  'Tabora', 'Ruvuma', 'Morogoro', 'Lindi', 'Mtwara',
  'Shinyanga', 'Kagera', 'Kigoma', 'Geita', 'Simiyu',
  'Katavi', 'Rukwa', 'Njombe', 'Iringa', 'Mbeya', 'Songwe',
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const FAQS = [
  { q: 'Do I need a motorcycle?', a: 'No — bicycles, scooters, and cars are all accepted.' },
  { q: 'When do I get paid?', a: 'Every Monday via mobile money, no exceptions.' },
  { q: 'Is there a minimum age?', a: 'Yes — you must be at least 18 years old.' },
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
  firstName: '', lastName: '', phone: '', email: '',
  zone: '', vehicle: '', hasSmartphone: '',
  availability: [], experience: '', motivation: '', agreeTerms: false,
};

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#29d9d5' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Animated Stat ────────────────────────────────────────────────────────────

function AnimatedStat({ value, label, sub }: { value: string; label: string; sub: string }) {
  const { ref, visible } = useReveal(0.3);
  return (
    <div ref={ref} className="text-center flex flex-col gap-1">
      <span
        className="font-black leading-none"
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          color: '#29d9d5',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {value}
      </span>
      <span className="font-black text-white text-sm">{label}</span>
      <span className="text-[10px] tracking-wide" style={{ color: '#3a3a3a' }}>{sub}</span>
    </div>
  );
}

// ─── Benefit Row ─────────────────────────────────────────────────────────────

function BenefitRow({ index, headline, sub, body, delay = 0 }: typeof BENEFITS[0] & { delay?: number }) {
  const { ref, visible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 36px',
        border: `1px solid ${hovered ? 'rgba(41,217,213,0.25)' : 'rgba(255,255,255,0.05)'}`,
        background: hovered ? 'rgba(41,217,213,0.02)' : 'transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
        cursor: 'default',
      }}
    >
      <div className="flex gap-8 items-start">
        <span
          className="font-black leading-none select-none flex-shrink-0"
          style={{
            fontSize: '56px',
            color: hovered ? 'rgba(41,217,213,0.15)' : 'rgba(255,255,255,0.04)',
            transition: 'color 0.4s ease',
          }}
        >
          {index}
        </span>
        <div className="flex-1">
          <p className="font-black text-white text-xl leading-tight mb-1">{headline}</p>
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2.5" style={{ color: '#29d9d5' }}>
            {sub}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#4a4a4a' }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Step Card ───────────────────────────────────────────────────────────────

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        background: hovered ? 'rgba(41,217,213,0.02)' : 'transparent',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease',
        transitionDelay: `${index * 60}ms`,
        cursor: 'default',
      }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center mb-4"
        style={{
          border: `1px solid ${hovered ? '#29d9d5' : 'rgba(41,217,213,0.25)'}`,
          background: hovered ? 'rgba(41,217,213,0.08)' : 'transparent',
          transition: 'all 0.3s ease',
          borderRadius: '2px',
        }}
      >
        <span className="text-[10px] font-bold" style={{ color: '#29d9d5' }}>{step.n}</span>
      </div>
      <p className="font-black text-white text-base leading-tight mb-1">{step.label}</p>
      <p className="text-xs tracking-wide" style={{ color: '#3a3a3a' }}>{step.note}</p>
    </div>
  );
}

// ─── Form Field Primitives ────────────────────────────────────────────────────

function FieldLabel({ children, required, error }: { children: React.ReactNode; required?: boolean; error?: string }) {
  return (
    <label
      className="block text-[9px] tracking-[0.28em] uppercase font-bold mb-2"
      style={{ color: error ? '#f87171' : '#2a2a2a' }}
    >
      {children}
      {required && <span className="ml-1" style={{ color: '#29d9d5' }}>*</span>}
    </label>
  );
}

function TextInput({
  value, onChange, onFocus, placeholder, type = 'text', hint, error,
}: {
  value: string; onChange: (v: string) => void; onFocus?: () => void;
  placeholder: string; type?: string; hint?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => { setFocused(true); onFocus?.(); }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="text-sm w-full"
        style={{
          background: 'transparent',
          border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : focused ? 'rgba(41,217,213,0.5)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '2px',
          padding: '12px 16px',
          color: '#fff',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(41,217,213,0.06)' : 'none',
          letterSpacing: '0.03em',
        }}
        aria-label={placeholder}
        aria-invalid={!!error}
      />
      {hint && focused && !error && (
        <p className="text-[10px] mt-1.5 tracking-wide" style={{ color: '#29d9d5' }}>{hint}</p>
      )}
      {error && <p className="text-[10px] mt-1.5" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  );
}

function PillButton({
  label, selected, onClick, wide,
}: {
  label: string; selected: boolean; onClick: () => void; wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="text-[11px] tracking-[0.14em] uppercase font-semibold"
      style={{
        padding: wide ? '10px 28px' : '8px 16px',
        borderRadius: '2px',
        border: `1px solid ${selected ? '#29d9d5' : 'rgba(255,255,255,0.08)'}`,
        background: selected ? 'rgba(41,217,213,0.1)' : 'transparent',
        color: selected ? '#29d9d5' : '#3a3a3a',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

function NativeSelect({
  value, onChange, options, placeholder, error,
}: {
  value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="text-sm w-full"
        style={{
          background: 'transparent',
          border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : focused ? 'rgba(41,217,213,0.5)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '2px',
          padding: '12px 16px',
          color: value ? '#fff' : '#2a2a2a',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
        aria-invalid={!!error}
      >
        <option value="" disabled style={{ background: '#0a0a0a' }}>{placeholder}</option>
        {options.map(o => <option key={o} value={o} style={{ background: '#0a0a0a', color: '#fff' }}>{o}</option>)}
      </select>
      {error && <p className="text-[10px] mt-1.5" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-px relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            background: '#29d9d5',
            width: `${(step / total) * 100}%`,
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      <span className="text-[9px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap" style={{ color: '#2a2a2a' }}>
        {step} / {total}
      </span>
    </div>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h3 className="font-black text-white text-2xl leading-tight mb-1.5">{title}</h3>
      <p className="text-xs tracking-wide" style={{ color: '#3a3a3a' }}>{subtitle}</p>
    </div>
  );
}

// ─── Button base style ────────────────────────────────────────────────────────

const btnBase: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  padding: '14px 28px',
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
};

// ─── Rider Application Form ───────────────────────────────────────────────────

function RiderApplicationForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: keyof FormData, value: unknown) =>
    setForm(p => ({ ...p, [key]: value }));

  const toggleAvail = (day: string) =>
    setForm(p => ({
      ...p,
      availability: p.availability.includes(day)
        ? p.availability.filter(d => d !== day)
        : [...p.availability, day],
    }));

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture('rider_application_started', { form_name: 'rider_application_form' });
      setHasTrackedStart(true);
    }
  };

  const validateStep1 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.zone) e.zone = 'Required';
    if (!form.vehicle) e.vehicle = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.hasSmartphone) e.hasSmartphone = 'Required';
    if (form.availability.length === 0) e.availability = 'Select at least one day';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    trackEvent('rider_application_submitted', { form_name: 'rider_form', platform: 'website' });
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rider-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        trackEvent('rider_application_submission_success', { form_name: 'rider_form', platform: 'website' });
      } else alert('Something went wrong. Please try again.');
    } catch {
      alert('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div
          className="w-14 h-14 mx-auto mb-5 flex items-center justify-center"
          style={{ border: '1px solid #29d9d5', background: 'rgba(41,217,213,0.08)', borderRadius: '2px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
            <path d="M5 12l5 5L20 7" stroke="#29d9d5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-black text-white text-2xl mb-2">
          Application received, {form.firstName}!
        </p>
        <p className="text-xs leading-relaxed mb-8" style={{ color: '#3a3a3a' }}>
          Our team will review your details and reach out within{' '}
          <span style={{ color: '#29d9d5' }}>48 hours</span> via phone.{' '}
          Keep an eye on <span style={{ color: '#fff' }}>{form.phone}</span>.
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-4 h-px" style={{ background: '#29d9d5' }} />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: '#29d9d5' }}>
            Sosika Rider Programme
          </span>
          <div className="w-4 h-px" style={{ background: '#29d9d5' }} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Link href="/" className="font-bold text-xs tracking-[0.2em] uppercase text-center py-3.5"
            style={{ background: '#29d9d5', color: '#0a0a0a' }}>
            Back to home
          </Link>
          <Link href="/our-partners" className="font-bold text-xs tracking-[0.2em] uppercase text-center py-3.5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#3a3a3a' }}>
            Explore partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepProgress step={step} total={2} />

      {step === 1 && (
        <div>
          <StepHeading title="Personal details." subtitle="Tell us a bit about yourself." />
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required error={errors.firstName}>First name</FieldLabel>
                <TextInput value={form.firstName} onChange={v => set('firstName', v)} onFocus={trackStart} placeholder="Amina" error={errors.firstName} hint="Your legal first name." />
              </div>
              <div>
                <FieldLabel required error={errors.lastName}>Last name</FieldLabel>
                <TextInput value={form.lastName} onChange={v => set('lastName', v)} placeholder="Mwanga" error={errors.lastName} />
              </div>
            </div>
            <div>
              <FieldLabel required error={errors.phone}>Phone number</FieldLabel>
              <TextInput value={form.phone} onChange={v => set('phone', v)} placeholder="+255 7XX XXX XXX" type="tel" error={errors.phone} hint="We'll call this number to confirm." />
            </div>
            <div>
              <FieldLabel>Email address</FieldLabel>
              <TextInput value={form.email} onChange={v => set('email', v)} placeholder="you@email.com" type="email" hint="Optional — for written updates." />
            </div>
            <div>
              <FieldLabel required error={errors.zone}>Delivery zone</FieldLabel>
              <NativeSelect value={form.zone} onChange={v => set('zone', v)} options={ZONE_OPTIONS} placeholder="Select your area" error={errors.zone} />
            </div>
            <div>
              <FieldLabel required error={errors.vehicle}>Your vehicle</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                {VEHICLE_OPTIONS.map(v => (
                  <PillButton key={v} label={v} selected={form.vehicle === v} onClick={() => set('vehicle', v)} />
                ))}
              </div>
              {errors.vehicle && <p className="text-[10px] mt-1.5" style={{ color: '#f87171' }}>{errors.vehicle}</p>}
            </div>
          </div>
          <div className="mt-7">
            <button
              onClick={() => { if (validateStep1()) setStep(2); }}
              className="w-full flex items-center justify-center gap-2.5"
              style={{ ...btnBase, background: '#29d9d5', color: '#0a0a0a' }}
            >
              Continue
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <StepHeading title="Availability & details." subtitle="Almost done — just a few more things." />
          <div className="flex flex-col gap-6">
            {/* Smartphone */}
            <div>
              <FieldLabel required error={errors.hasSmartphone}>Do you own a smartphone?</FieldLabel>
              <div className="flex gap-2">
                {['Yes', 'No'].map(opt => (
                  <PillButton key={opt} label={opt} selected={form.hasSmartphone === opt} onClick={() => set('hasSmartphone', opt)} wide />
                ))}
              </div>
              {errors.hasSmartphone && <p className="text-[10px] mt-1.5" style={{ color: '#f87171' }}>{errors.hasSmartphone}</p>}
            </div>

            {/* Availability */}
            <div>
              <FieldLabel required error={errors.availability}>Which days can you ride?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(d => (
                  <PillButton
                    key={d} label={d}
                    selected={form.availability.includes(d)}
                    onClick={() => {
                      setForm(p => ({
                        ...p,
                        availability: p.availability.includes(d)
                          ? p.availability.filter(x => x !== d)
                          : [...p.availability, d],
                      }));
                    }}
                  />
                ))}
              </div>
              {errors.availability && <p className="text-[10px] mt-1.5" style={{ color: '#f87171' }}>{errors.availability}</p>}
            </div>

            {/* Experience */}
            <div>
              <FieldLabel>Delivery experience</FieldLabel>
              <NativeSelect
                value={form.experience}
                onChange={v => set('experience', v)}
                options={['None — first time', 'Some — done it casually', 'Experienced — worked for other platforms']}
                placeholder="Select level (optional)"
              />
            </div>

            {/* Motivation */}
            <div>
              <FieldLabel>Why do you want to ride with Sosika?</FieldLabel>
              <textarea
                value={form.motivation}
                onChange={e => set('motivation', e.target.value)}
                rows={3}
                placeholder="Tell us a bit about your goals... (optional)"
                className="text-sm w-full"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  color: '#fff',
                  outline: 'none',
                  resize: 'none',
                  letterSpacing: '0.03em',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(41,217,213,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Disclaimer */}
            <div
              className="text-xs leading-relaxed p-4"
              style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: '#2a2a2a' }}
            >
              <span style={{ color: '#4a4a4a', fontWeight: 700 }}>Note:</span>{' '}
              Submitting this form starts a review process. Our team will contact you to complete verification before you can start riding. No commitment yet.
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => set('agreeTerms', !form.agreeTerms)}
                role="checkbox"
                aria-checked={form.agreeTerms}
                tabIndex={0}
                onKeyDown={e => e.key === ' ' && set('agreeTerms', !form.agreeTerms)}
                className="flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{
                  width: '16px', height: '16px', borderRadius: '2px',
                  border: `1px solid ${errors.agreeTerms ? 'rgba(248,113,113,0.5)' : form.agreeTerms ? '#29d9d5' : 'rgba(255,255,255,0.12)'}`,
                  background: form.agreeTerms ? 'rgba(41,217,213,0.15)' : 'transparent',
                  transition: 'all 0.15s ease', cursor: 'pointer',
                }}
              >
                {form.agreeTerms && (
                  <svg viewBox="0 0 10 10" fill="none" width="10" height="10">
                    <path d="M2 5.5l2 2 4-4" stroke="#29d9d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs leading-relaxed tracking-wide" style={{ color: '#3a3a3a' }}>
                I confirm the information above is accurate and agree to Sosika's{' '}
                <Link href="/terms" style={{ color: '#29d9d5', textDecoration: 'none' }}>terms of service</Link>{' '}
                and{' '}
                <Link href="/privacy" style={{ color: '#29d9d5', textDecoration: 'none' }}>privacy policy</Link>.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-[10px] -mt-2" style={{ color: '#f87171' }}>{errors.agreeTerms}</p>}
          </div>

          <div className="flex gap-2.5 mt-7">
            <button
              onClick={() => setStep(1)}
              style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#3a3a3a', flex: 1 }}
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2.5"
              style={{ ...btnBase, background: '#29d9d5', color: '#0a0a0a', flex: 2, opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting ? 'Sending...' : 'Submit application'}
              {!isSubmitting && (
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RiderApplyPage() {
  const heroReveal = useReveal(0.1);

  return (
    <main style={{ backgroundColor: '#0a0a0a', color: '#fff', overflowX: 'hidden' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Fine grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Glows */}
        <div aria-hidden className="absolute pointer-events-none" style={{ top: '-80px', right: '-60px', width: '560px', height: '560px', background: 'radial-gradient(circle, rgba(41,217,213,0.07) 0%, transparent 65%)' }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: '-60px', left: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(41,217,213,0.04) 0%, transparent 65%)' }} />

        {/* Border rules */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute top-0 bottom-0" style={{ left: '5%', width: '1px', background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-0 bottom-0" style={{ right: '5%', width: '1px', background: 'rgba(255,255,255,0.04)' }} />

        <div
          ref={heroReveal.ref}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-32"
          style={{
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <Eyebrow label="Rider programme" />
          <h1
            className="font-black text-white leading-none mb-8"
            style={{ fontSize: 'clamp(60px, 11vw, 130px)', lineHeight: 0.92, letterSpacing: '-0.01em' }}
          >
            RIDE.<br />
            EARN.<br />
            <span style={{ color: '#29d9d5' }}>THRIVE.</span>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#4a4a4a' }}>
              Join over 1,200 Sosika riders who are building real income on their own terms —
              part-time, full-time, or anything in between.
            </p>
            <div className="flex flex-wrap gap-0 pt-7 lg:pt-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { v: 'TZS 800k+', l: 'Monthly top earners' },
                { v: '48 hrs', l: 'Review turnaround' },
                { v: 'Free kit', l: 'For every rider' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    paddingLeft: i > 0 ? '24px' : '0',
                    marginLeft: i > 0 ? '24px' : '0',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <p className="font-black text-3xl leading-none mb-1" style={{ color: '#29d9d5' }}>{s.v}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#2a2a2a' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex flex-col items-start gap-2 mt-16 ml-1">
            <div className="w-px h-10 bg-gradient-to-b from-transparent" style={{ background: 'linear-gradient(to bottom, transparent, rgba(41,217,213,0.4))' }} />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: '#2a2a2a' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── Process steps ─────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-6">
          <div className="grid grid-cols-5" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {STEPS.map((s, i) => <StepCard key={s.n} step={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────── */}
      <section className="py-28" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <Eyebrow label="Why ride with us" />
              <h2 className="font-black text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}>
                BUILT FOR RIDERS.<br />NOT JUST DELIVERIES.
              </h2>
            </div>
            <p className="text-xs leading-relaxed md:text-right max-w-[260px]" style={{ color: '#3a3a3a' }}>
              Every feature of the Sosika platform is designed to help you earn more, stress less, and ride smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {BENEFITS.map((b, i) => (
              <div key={b.headline} className="bg-[#0a0a0a]">
                <BenefitRow {...b} delay={i * 60} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { v: '1,200+', l: 'Active riders', sub: 'And growing every week' },
              { v: 'TZS 800k', l: 'Top monthly earner', sub: 'Working part-time hours' },
              { v: '4.8 ★', l: 'Rider satisfaction', sub: 'Based on internal surveys' },
            ].map((s, i) => (
              <div key={s.l} className="py-12 px-10" style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <AnimatedStat value={s.v} label={s.l} sub={s.sub} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application form ──────────────────────────────────────────────── */}
      <section className="py-28" id="apply" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Left: pitch */}
            <div
              className="p-10 md:p-14 lg:sticky lg:top-28 self-start"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Eyebrow label="Apply now" />
              <h2 className="font-black text-white mb-5" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 0.95 }}>
                YOUR FIRST RIDE<br />STARTS HERE.
              </h2>
              <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: '#4a4a4a' }}>
                Fill in the form and our team will reach out within 48 hours to guide you through
                verification and onboarding. <em style={{ color: '#3a3a3a' }}>No commitment yet</em> — this is just the start.
              </p>

              {/* What happens next */}
              <div className="mb-10">
                <p className="text-[9px] tracking-[0.25em] uppercase font-bold mb-5" style={{ color: '#2a2a2a' }}>
                  What happens next
                </p>
                <div className="flex flex-col gap-0">
                  {[
                    'We review your application (48 hrs)',
                    'Our team calls you to verify details',
                    'You pick up your free Sosika kit',
                    'App activated — you start earning',
                  ].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 py-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div
                        className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[9px] font-black mt-0.5"
                        style={{ border: '1px solid rgba(41,217,213,0.25)', color: '#29d9d5', borderRadius: '2px' }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm" style={{ color: '#4a4a4a' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: '#2a2a2a' }}>
                  Quick answers
                </p>
                {FAQS.map((faq, i) => (
                  <div
                    key={faq.q}
                    className="py-4"
                    style={{ borderBottom: i < FAQS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <p className="font-black text-white text-sm mb-1">{faq.q}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#3a3a3a' }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="p-10 md:p-14">
              <div className="mb-7">
                <p className="text-[9px] tracking-[0.28em] uppercase font-bold mb-1.5" style={{ color: '#29d9d5' }}>
                  Rider application
                </p>
                <p className="font-black text-white text-2xl leading-tight">Join the Sosika fleet.</p>
                <p className="text-xs mt-1.5 tracking-wide" style={{ color: '#2a2a2a' }}>
                  2 short steps. Our team does the rest.
                </p>
              </div>
              <RiderApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-black text-white leading-none whitespace-nowrap" style={{ fontSize: 'clamp(100px, 20vw, 260px)', opacity: 0.02 }}>
            RIDER
          </span>
        </div>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(41,217,213,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 xl:px-24 text-center">
          <div className="inline-flex items-center gap-3 mb-7">
            <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#29d9d5' }}>
              Questions first?
            </span>
            <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
          </div>
          <h2 className="font-black text-white leading-none mb-5" style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.92 }}>
            WE'RE HERE<br />TO HELP.
          </h2>
          <p className="text-xs leading-relaxed max-w-xs mx-auto mb-10" style={{ color: '#3a3a3a' }}>
            Our rider support team is available Monday to Saturday, 8am – 6pm.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/2557609034568"
              className="inline-flex items-center gap-3 font-bold text-xs tracking-[0.2em] uppercase"
              style={{ background: '#29d9d5', color: '#0a0a0a', padding: '16px 36px', textDecoration: 'none', transition: 'filter 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}
            >
              WhatsApp us
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/our-partners"
              className="inline-flex items-center font-bold text-xs tracking-[0.2em] uppercase"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#3a3a3a', padding: '16px 36px', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#29d9d5'; (e.currentTarget as HTMLElement).style.color = '#29d9d5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#3a3a3a'; }}
            >
              Back to partners
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}