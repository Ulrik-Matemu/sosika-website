'use client';
import { trackEvent } from '@/lib/posthog';
import posthog from 'posthog-js';
import React, { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M12 22s3-9 10-9 10 9 10 9-3 9-10 9-10-9-10-9z" stroke="#29d9d5" strokeWidth="2.2" />
        <circle cx="22" cy="22" r="3" stroke="#29d9d5" strokeWidth="2.2" />
      </svg>
    ),
    headline: '30% More Reach',
    sub: 'Expanded Visibility',
    body: 'Tap into our massive student and professional user base. We bring your kitchen to thousands of screens across the city.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M14 18l6 6 10-10" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="12" y="12" width="20" height="20" rx="2" stroke="#29d9d5" strokeWidth="2" />
      </svg>
    ),
    headline: 'Seamless Logistics',
    sub: 'Zero delivery stress',
    body: "Focus on the food; we'll handle the rest. Our fleet of 1,200+ riders ensures your orders reach customers hot and on time.",
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#29d9d5" fillOpacity="0.12" />
        <path d="M16 28V16m6 12V20m6 8v-4" stroke="#29d9d5" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 32h20" stroke="#29d9d5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Smart Insights',
    sub: 'Data-driven growth',
    body: 'Access a merchant dashboard that shows your best-selling items, peak hours, and customer feedback to optimize your menu.',
  },
];

const STEPS = [
  { n: '01', label: 'Register Store', note: 'Basic business info.' },
  { n: '02', label: 'Upload Menu', note: 'Items, prices, & photos.' },
  { n: '03', label: 'Tech Setup', note: 'Receive your merchant app.' },
  { n: '04', label: 'Go Live', note: 'Start receiving orders!' },
];

const BIZ_TYPES = ['Restaurant', 'Grocery', 'Pharmacy', 'Specialty Store'];

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({ icon, headline, sub, body }: (typeof BENEFITS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl border border-gray-100 p-7 transition-all duration-300 shadow-sm"
      style={{
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 52px rgba(41,217,213,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div className="mb-5">{icon}</div>
      <p className="text-xl font-black text-[#1a1a1a] mb-0.5">{headline}</p>
      <p className="text-xs font-bold uppercase tracking-widest text-[#29d9d5] mb-3">{sub}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
    </div>
  );
}

const inputCls = 'w-full bg-[#f8fafa] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#29d9d5] outline-none transition-all';
const labelCls = 'block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5';

// ─── Vendor Application Form ─────────────────────────────────────────────────

function VendorApplicationForm() {
  const [form, setForm] = useState<VendorFormData>(INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Add any basic validation here if needed
    trackEvent("vendor_application_submitted", {
      form_name: 'vendor_application_form',
      platform: 'website',
    });
    if (!form.businessName || !form.phone) {
      alert("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vendor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent("vendor_application_submission_success", {
          form_name: 'vendor_application_form',
          platform: 'website',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture("vendor_application_form_started", {
        form_name: 'vendor_application_form'
      });
      setHasTrackedStart(true);
    }
  }

  const set = (key: keyof VendorFormData, value: any) => setForm(p => ({ ...p, [key]: value }));

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-[#29d9d5] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black mb-2">Partner Application Sent!</h3>
        <p className="text-gray-500 text-sm">Our partnership manager will contact <b>{form.ownerName}</b> within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#29d9d5] transition-all" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>
        <span className="text-[10px] font-black text-gray-400">STEP {step}/2</span>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Business Name</label>
            <input value={form.businessName} onFocus={trackStart} onChange={e => set('businessName', e.target.value)} placeholder="e.g. Arusha Delights" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Contact Person</label>
              <input value={form.ownerName} onChange={e => set('ownerName', e.target.value)} placeholder="Full Name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07XX XXX XXX" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Business Location</label>
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Street, Area, Region" className={inputCls} />
          </div>
          <button onClick={() => setStep(2)} className="w-full bg-[#1a1a1a] text-white font-black py-4 rounded-xl text-sm hover:bg-[#29d9d5] hover:text-[#1a1a1a] transition-all">
            Next Details →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Business Type</label>
            <select value={form.businessType} onChange={e => set('businessType', e.target.value)} className={inputCls}>
              <option value="">Select Category</option>
              {BIZ_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Estimated Monthly Orders</label>
            <input value={form.avgOrderValue} onChange={e => set('avgOrderValue', e.target.value)} placeholder="Expected orders per month" className={inputCls} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-4 rounded-xl text-sm font-bold">Back</button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-2 bg-[#29d9d5] text-[#1a1a1a] font-black py-4 rounded-xl text-sm px-8 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit Application'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function VendorPartnerPage() {
  return (
    <main className="bg-[#f8fafa] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1a1a1a] mt-18 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#29d9d5]/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-[#29d9d5] text-xs font-black tracking-widest uppercase bg-[#29d9d5]/10 px-4 py-2 rounded-full mb-6 inline-block">
              Merchant Partnership
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-none mb-6">
              Grow Your<br />Kitchen <span className="text-[#29d9d5]">Global.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Join Tanzania&apos;s fastest-growing delivery network and start reaching thousands of hungry customers near you.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[#29d9d5] font-black text-2xl">24h</p>
                <p className="text-gray-500 text-[10px] uppercase font-bold">Fast Onboarding</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[#29d9d5] font-black text-2xl">0%</p>
                <p className="text-gray-500 text-[10px] uppercase font-bold">Signup Fees</p>
              </div>
            </div>
          </div>

          {/* Application Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <h2 className="text-2xl font-black text-[#1a1a1a] mb-2">Partner with Sosika</h2>
            <p className="text-gray-400 text-sm mb-8">Fill the form below and we will get you online.</p>
            <VendorApplicationForm />
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[#29d9d5] text-xs font-black tracking-widest uppercase mb-3">Merchant Perks</p>
          <h2 className="text-4xl font-black text-[#1a1a1a]">Why Sell on Sosika?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map(b => <BenefitCard key={b.headline} {...b} />)}
        </div>
      </section>

      {/* Process Bar */}
      <section className="bg-[#29d9d5] py-8">
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto flex items-center justify-between gap-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-3 flex-shrink-0">
              <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-black">{s.n}</span>
              <div>
                <p className="text-[#1a1a1a] font-black text-xs leading-none">{s.label}</p>
                <p className="text-[#1a1a1a]/60 text-[10px] mt-1">{s.note}</p>
              </div>
              {i < STEPS.length - 1 && <div className="hidden md:block w-12 h-px bg-[#1a1a1a]/20 ml-4" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}