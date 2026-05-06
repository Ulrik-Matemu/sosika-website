'use client';

import { trackEvent } from '@/lib/posthog';
import posthog from 'posthog-js';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    index: '01',
    headline: '30% More Reach',
    sub: 'Expanded Visibility',
    body: 'Tap into our massive student and professional user base. We bring your kitchen to thousands of screens across the city.',
  },
  {
    index: '02',
    headline: 'Seamless Logistics',
    sub: 'Zero delivery stress',
    body: "Focus on the food; we'll handle the rest. Our fleet of 100+ riders ensures your orders reach customers hot and on time.",
  },
  {
    index: '03',
    headline: 'Smart Insights',
    sub: 'Data-driven growth',
    body: 'Access a merchant dashboard with best-sellers, peak hours, and customer feedback to continuously optimise your menu.',
  },
];

const STEPS = [
  { n: '01', label: 'Register Store', note: 'Basic business info' },
  { n: '02', label: 'Upload Menu', note: 'Items, prices & photos' },
  { n: '03', label: 'Tech Setup', note: 'Receive your merchant app' },
  { n: '04', label: 'Go Live', note: 'Start receiving orders' },
];

const BIZ_TYPES = ['Restaurant', 'Grocery', 'Pharmacy', 'Specialty Store'];

const MONTHLY_RANGES = [
  'Under 100 orders',
  '100 – 300 orders',
  '300 – 600 orders',
  '600+ orders',
];

// ─── Types ────────────────────────────────────────────────────────────────────

type VendorFormData = {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  location: string;
  businessType: string;
  avgOrderValue: string;
  hasPhysicalStore: string;
  agreeTerms: boolean;
};

const INITIAL: VendorFormData = {
  businessName: '',
  ownerName: '',
  phone: '',
  email: '',
  location: '',
  businessType: '',
  avgOrderValue: '',
  hasPhysicalStore: '',
  agreeTerms: false,
};

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
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

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const { ref, visible } = useReveal(0.4);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="font-black leading-none"
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: '#29d9d5',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {value}
      </span>
      <span className="text-[9px] tracking-[0.22em] uppercase font-semibold" style={{ color: '#2a2a2a' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Benefit Row ──────────────────────────────────────────────────────────────

function BenefitRow({ index, headline, sub, body, delay = 0 }: typeof BENEFITS[0] & { delay?: number }) {
  const { ref, visible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px 40px',
        border: `1px solid ${hovered ? 'rgba(41,217,213,0.25)' : 'rgba(255,255,255,0.05)'}`,
        background: hovered ? 'rgba(41,217,213,0.02)' : 'transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        cursor: 'default',
      }}
    >
      <div className="flex gap-10 items-start">
        <span
          className="font-black leading-none select-none flex-shrink-0"
          style={{
            fontSize: '64px',
            color: hovered ? 'rgba(41,217,213,0.15)' : 'rgba(255,255,255,0.04)',
            transition: 'color 0.4s ease',
          }}
        >
          {index}
        </span>
        <div className="flex-1">
          <p className="font-black text-white text-2xl leading-tight mb-1">{headline}</p>
          <p className="text-[10px] tracking-[0.22em] uppercase font-bold mb-3" style={{ color: '#29d9d5' }}>
            {sub}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#4a4a4a' }}>
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Form field components ────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[9px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: '#2a2a2a' }}>
      {children}
      {required && <span className="ml-1" style={{ color: '#29d9d5' }}>*</span>}
    </label>
  );
}

function TextInput({
  value, onChange, onFocus, placeholder, type = 'text', hint,
}: {
  value: string; onChange: (v: string) => void; onFocus?: () => void;
  placeholder: string; type?: string; hint?: string;
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
          border: `1px solid ${focused ? 'rgba(41,217,213,0.5)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '2px',
          padding: '12px 16px',
          color: '#fff',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(41,217,213,0.06)' : 'none',
          letterSpacing: '0.03em',
        }}
        aria-label={placeholder}
      />
      {hint && focused && (
        <p className="text-[10px] mt-1.5 tracking-wide" style={{ color: '#29d9d5' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function PillSelect({
  options, value, onChange, label,
}: {
  options: string[]; value: string; onChange: (v: string) => void; label: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className="text-[11px] tracking-[0.14em] uppercase font-semibold"
            style={{
              padding: '8px 16px',
              borderRadius: '2px',
              border: `1px solid ${value === opt ? '#29d9d5' : 'rgba(255,255,255,0.08)'}`,
              background: value === opt ? 'rgba(41,217,213,0.1)' : 'transparent',
              color: value === opt ? '#29d9d5' : '#3a3a3a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function BoolPill({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2">
        {['Yes', 'No'].map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className="text-[11px] tracking-[0.14em] uppercase font-semibold flex-1"
            style={{
              maxWidth: '120px',
              padding: '8px 24px',
              borderRadius: '2px',
              border: `1px solid ${value === opt ? '#29d9d5' : 'rgba(255,255,255,0.08)'}`,
              background: value === opt ? 'rgba(41,217,213,0.1)' : 'transparent',
              color: value === opt ? '#29d9d5' : '#3a3a3a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
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

// ─── Step heading ─────────────────────────────────────────────────────────────

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h3 className="font-black text-white text-2xl leading-tight mb-1.5">{title}</h3>
      <p className="text-xs tracking-wide" style={{ color: '#3a3a3a' }}>{subtitle}</p>
    </div>
  );
}

// ─── Vendor Application Form ─────────────────────────────────────────────────

function VendorApplicationForm() {
  const [form, setForm] = useState<VendorFormData>(INITIAL);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: keyof VendorFormData, value: any) =>
    setForm(p => ({ ...p, [key]: value }));

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture('vendor_application_form_started', { form_name: 'vendor_application_form' });
      setHasTrackedStart(true);
    }
  };

  const handleSubmit = async () => {
    if (!form.businessName || !form.phone) {
      alert('Please fill in the required fields.');
      return;
    }
    trackEvent('vendor_application_submitted', { form_name: 'vendor_application_form', platform: 'website' });
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/vendor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        trackEvent('vendor_application_submission_success', { form_name: 'vendor_application_form', platform: 'website' });
      } else throw new Error('Failed');
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p className="font-black text-white text-2xl mb-2">Application received.</p>
        <p className="text-xs leading-relaxed" style={{ color: '#3a3a3a' }}>
          Our partnership team will contact {form.ownerName || 'you'}<br />within 24 hours. Welcome to Sosika.
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-4 h-px" style={{ background: '#29d9d5' }} />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: '#29d9d5' }}>
            Sosika Vendor Partnership
          </span>
          <div className="w-4 h-px" style={{ background: '#29d9d5' }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepProgress step={step} total={3} />

      {step === 1 && (
        <div>
          <StepHeading title="Your business." subtitle="Tell us who you are and where you operate." />
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel required>Business name</FieldLabel>
              <TextInput value={form.businessName} onChange={v => set('businessName', v)} onFocus={trackStart} placeholder="e.g. Arusha Delights" hint="This is how customers will find you." />
            </div>
            <div>
              <FieldLabel required>Contact person</FieldLabel>
              <TextInput value={form.ownerName} onChange={v => set('ownerName', v)} placeholder="Full name of the owner or manager" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Phone number</FieldLabel>
                <TextInput value={form.phone} onChange={v => set('phone', v)} placeholder="07XX XXX XXX" type="tel" hint="We'll call to confirm." />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput value={form.email} onChange={v => set('email', v)} placeholder="you@business.com" type="email" />
              </div>
            </div>
            <div>
              <FieldLabel required>Business location</FieldLabel>
              <TextInput value={form.location} onChange={v => set('location', v)} placeholder="Street, area, region — e.g. Njiro, Arusha" hint="We'll check if your area is in our delivery zone." />
            </div>
          </div>
          <div className="mt-7">
            <button
              onClick={() => form.businessName && form.phone && form.location
                ? setStep(2)
                : alert('Please fill in Business Name, Phone, and Location.')}
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
          <StepHeading title="Your operation." subtitle="Help us understand your business model." />
          <div className="flex flex-col gap-6">
            <PillSelect options={BIZ_TYPES} value={form.businessType} onChange={v => set('businessType', v)} label="Business type" />
            <PillSelect options={MONTHLY_RANGES} value={form.avgOrderValue} onChange={v => set('avgOrderValue', v)} label="Expected monthly orders" />
            <BoolPill label="Do you have a physical storefront?" value={form.hasPhysicalStore} onChange={v => set('hasPhysicalStore', v)} />
          </div>
          <div className="flex gap-2.5 mt-7">
            <button
              onClick={() => setStep(1)}
              style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#3a3a3a', flex: 1 }}
            >
              ← Back
            </button>
            <button
              onClick={() => form.businessType ? setStep(3) : alert('Please select your business type.')}
              className="flex items-center justify-center gap-2.5"
              style={{ ...btnBase, background: '#29d9d5', color: '#0a0a0a', flex: 2 }}
            >
              Continue
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <StepHeading title="Review & submit." subtitle="Confirm your details before we connect you to our team." />

          {/* Summary */}
          <div
            className="mb-6"
            style={{ border: '1px solid rgba(41,217,213,0.15)', borderRadius: '2px', padding: '20px', background: 'rgba(41,217,213,0.02)' }}
          >
            {[
              { lbl: 'Business', val: form.businessName },
              { lbl: 'Contact', val: form.ownerName },
              { lbl: 'Phone', val: form.phone },
              { lbl: 'Email', val: form.email || '—' },
              { lbl: 'Location', val: form.location },
              { lbl: 'Type', val: form.businessType || '—' },
              { lbl: 'Volume', val: form.avgOrderValue || '—' },
              { lbl: 'Physical store', val: form.hasPhysicalStore || '—' },
            ].map(({ lbl, val }) => (
              <div
                key={lbl}
                className="flex justify-between items-baseline py-1.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: '#2a2a2a' }}>{lbl}</span>
                <span className="text-xs text-right" style={{ color: val === '—' ? '#2a2a2a' : '#aaa', maxWidth: '55%' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <div
              onClick={() => set('agreeTerms', !form.agreeTerms)}
              role="checkbox"
              aria-checked={form.agreeTerms}
              tabIndex={0}
              onKeyDown={e => e.key === ' ' && set('agreeTerms', !form.agreeTerms)}
              className="flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{
                width: '16px', height: '16px', borderRadius: '2px',
                border: `1px solid ${form.agreeTerms ? '#29d9d5' : 'rgba(255,255,255,0.12)'}`,
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
              <Link href="/terms" style={{ color: '#29d9d5', textDecoration: 'none' }}>vendor terms</Link>{' '}
              and{' '}
              <Link href="/privacy" style={{ color: '#29d9d5', textDecoration: 'none' }}>privacy policy</Link>.
            </span>
          </label>

          <div className="flex gap-2.5">
            <button
              onClick={() => setStep(2)}
              style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#3a3a3a', flex: 1 }}
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !form.agreeTerms}
              className="flex items-center justify-center gap-2.5"
              style={{
                ...btnBase,
                flex: 2,
                background: form.agreeTerms ? '#29d9d5' : 'rgba(255,255,255,0.04)',
                color: form.agreeTerms ? '#0a0a0a' : '#2a2a2a',
                border: `1px solid ${form.agreeTerms ? '#29d9d5' : 'rgba(255,255,255,0.06)'}`,
                cursor: form.agreeTerms ? 'pointer' : 'not-allowed',
              }}
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

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        background: hovered ? 'rgba(41,217,213,0.02)' : 'transparent',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
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
      <p className="font-black text-white text-lg leading-tight mb-1.5">{step.label}</p>
      <p className="text-xs tracking-wide" style={{ color: '#3a3a3a' }}>{step.note}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VendorPartnerPage() {
  const heroTextReveal = useReveal(0.1);
  const heroFormReveal = useReveal(0.1);

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
        <div aria-hidden className="absolute pointer-events-none" style={{ top: '-80px', right: '-60px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(41,217,213,0.07) 0%, transparent 65%)' }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: '-60px', left: '-40px', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(41,217,213,0.04) 0%, transparent 65%)' }} />

        {/* Border rules */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute top-0 bottom-0" style={{ left: '5%', width: '1px', background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-0 bottom-0" style={{ right: '5%', width: '1px', background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: copy */}
          <div
            ref={heroTextReveal.ref}
            style={{
              opacity: heroTextReveal.visible ? 1 : 0,
              transform: heroTextReveal.visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <Eyebrow label="Merchant partnership" />
            <h1
              className="font-black text-white leading-none mb-7"
              style={{ fontSize: 'clamp(52px, 9vw, 110px)', lineHeight: 0.93, letterSpacing: '-0.01em' }}
            >
              Grow Your<br />
              Kitchen<br />
              <span style={{ color: '#29d9d5' }}>Further.</span>
            </h1>
            <p className="text-sm leading-relaxed mb-9 max-w-sm" style={{ color: '#4a4a4a' }}>
              Join Tanzania's fastest-growing delivery network and start reaching thousands of hungry customers near you — with zero upfront cost.
            </p>

            {/* Inline stats */}
            <div className="flex pt-7" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { v: '24h', l: 'Go-live time' },
                { v: '0%', l: 'Signup fees' },
                { v: '50k+', l: 'Active customers' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className="flex-1"
                  style={{
                    paddingLeft: i > 0 ? '24px' : '0',
                    marginLeft: i > 0 ? '24px' : '0',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <p className="font-black text-4xl leading-none mb-1" style={{ color: '#29d9d5' }}>{s.v}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#2a2a2a' }}>{s.l}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {['F', 'A', 'G', 'S'].map((init, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                    style={{
                      background: '#29d9d5',
                      border: '2px solid #0a0a0a',
                      color: '#0a0a0a',
                      marginLeft: i > 0 ? '-8px' : '0',
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-xs tracking-wide" style={{ color: '#3a3a3a' }}>
                100+ vendors already on the platform
              </p>
            </div>
          </div>

          {/* Right: form panel */}
          <div
            ref={heroFormReveal.ref}
            style={{
              opacity: heroFormReveal.visible ? 1 : 0,
              transform: heroFormReveal.visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <div style={{ position: 'relative' }}>
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '1px', background: '#29d9d5', opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '24px', background: '#29d9d5', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '1px', background: '#29d9d5', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1px', height: '24px', background: '#29d9d5', opacity: 0.5 }} />

              <div style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '40px', background: 'rgba(255,255,255,0.01)' }}>
                <div className="mb-7">
                  <p className="text-[9px] tracking-[0.28em] uppercase font-bold mb-1.5" style={{ color: '#29d9d5' }}>
                    Partner application
                  </p>
                  <p className="font-black text-white text-2xl leading-tight">Let's get you live.</p>
                  <p className="text-xs mt-1.5 tracking-wide" style={{ color: '#2a2a2a' }}>
                    3 short steps. Our team does the rest.
                  </p>
                </div>
                <VendorApplicationForm />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-12 grid grid-cols-2 md:grid-cols-4">
          {[
            { v: '100+', l: 'Merchant partners' },
            { v: '100+', l: 'Vetted riders' },
            { v: '50k+', l: 'Verified customers' },
            { v: 'TZS 800k', l: 'Monthly top earner' },
          ].map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: '8px 40px',
                paddingLeft: i === 0 ? '0' : '40px',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <AnimatedStat value={s.v} label={s.l} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Why sell ──────────────────────────────────────────────────────── */}
      <section className="py-28" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <Eyebrow label="Merchant perks" />
              <h2 className="font-black text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}>
                Why Sell<br />On Sosika?
              </h2>
            </div>
            <p className="text-xs leading-relaxed md:text-right max-w-[260px]" style={{ color: '#3a3a3a' }}>
              Built for businesses that want results, not complexity.
            </p>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {BENEFITS.map((b, i) => (
              <div key={b.headline} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <BenefitRow {...b} delay={i * 80} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-28" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <Eyebrow label="Simple process" />
              <h2 className="font-black text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}>
                Up And Running<br />IN 4 STEPS.
              </h2>
            </div>
            <p className="text-xs leading-relaxed md:text-right max-w-[260px]" style={{ color: '#3a3a3a' }}>
              No paperwork. No complexity. Just a fast, human onboarding process.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {STEPS.map((s, i) => <StepCard key={s.n} step={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-black text-white leading-none whitespace-nowrap" style={{ fontSize: 'clamp(100px, 20vw, 260px)', opacity: 0.02 }}>
            VENDOR
          </span>
        </div>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(41,217,213,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 xl:px-24 text-center">
          <div className="inline-flex items-center gap-3 mb-7">
            <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#29d9d5' }}>
              Ready to grow
            </span>
            <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
          </div>
          <h2 className="font-black text-white leading-none mb-5" style={{ fontSize: 'clamp(52px, 9vw, 110px)', lineHeight: 0.92 }}>
            YOUR KITCHEN<br />CITY-WIDE.
          </h2>
          <p className="text-xs leading-relaxed max-w-xs mx-auto mb-10" style={{ color: '#3a3a3a' }}>
            Apply today. Go live in 24 hours. Start earning from your very first order.
          </p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="#top"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 font-bold text-xs tracking-[0.2em] uppercase"
              style={{ background: '#29d9d5', color: '#0a0a0a', padding: '16px 40px', textDecoration: 'none', transition: 'filter 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}
            >
              Apply now
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/our-partners"
              className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: '#2a2a2a', textDecoration: 'none' }}
            >
              Learn about all partnership types →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}