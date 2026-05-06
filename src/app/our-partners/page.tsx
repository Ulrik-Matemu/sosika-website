'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  { stat: '3×', label: 'Revenue growth', body: 'Vendor partners report up to 3× increase in monthly orders within the first 90 days of going live on Sosika.' },
  { stat: '50k+', label: 'Active customers', body: 'Instantly reach a hungry, ready-to-buy audience you would never reach through walk-in traffic alone.' },
  { stat: '0', label: 'Upfront fees', body: 'No setup cost, no monthly subscription. You only pay a small commission when you earn — aligned incentives, always.' },
  { stat: '24 hrs', label: 'Go-live time', body: 'Our onboarding team gets your menu live on the platform in as little as 24 hours after signing up.' },
];

const RIDER_BENEFITS = [
  { stat: 'TZS 800k+', label: 'Monthly earnings', body: 'Top Sosika riders earn over TZS 800,000 per month — with flexible hours that fit around your life.' },
  { stat: '100%', label: 'Earnings transparency', body: 'See exactly what you earn on every delivery. Weekly payouts direct to your mobile money — no delays.' },
  { stat: 'Free', label: 'Rider kit', body: 'Qualified riders receive a Sosika-branded delivery bag and uniform at no cost when they join the fleet.' },
  { stat: 'Flex', label: 'Work schedule', body: 'Work mornings, evenings, weekends — whenever suits you. No minimum hours, no penalties for days off.' },
];

const STATS = [
  { value: '100+', label: 'Merchant partners' },
  { value: '100+', label: 'Delivery riders' },
  { value: '50k+', label: 'Happy customers' },
  { value: 'TZS 800k', label: 'Monthly top earner' },
];

const TESTIMONIALS = [
  { quote: 'Since partnering with Sosika, our lunch orders have doubled. The dashboard is clean and payouts always arrive on time. I wish we had joined sooner.', name: 'Fatuma A.', role: 'Owner, Mama Fatuma Kitchen', location: 'Njiro', type: 'vendor' },
  { quote: "I ride three hours in the evening after my day job. Last month I made enough to cover my rent and still save. Sosika genuinely changed things for my family.", name: 'Emmanuel K.', role: 'Freelance Rider', location: 'Sakina', type: 'rider' },
  { quote: 'Our pharmacy went from local-only to city-wide in one week. The prescription upload feature is a complete game-changer for our customers.', name: 'Dr. Salim M.', role: 'Director, MedPlus Pharmacy', location: 'Mount Meru', type: 'vendor' },
  { quote: "The onboarding was incredibly smooth — our menu was live within a day. We've seen a 40% jump in weekend orders since joining the platform.", name: 'Amina J.', role: 'Co-founder, Spice Garden Restaurant', location: 'Kijenge', type: 'vendor' },
  { quote: "I was skeptical at first, but my first week I made TZS 120,000 in just four evenings. The app is easy and support is always responsive.", name: 'Rashid O.', role: 'Part-time Rider', location: 'Usa River', type: 'rider' },
  { quote: "Sosika brought our grocery store online without any hassle. Our regular customers now order from home and we've gained a whole new audience.", name: 'Grace N.', role: 'Manager, FreshMart Supermarket', location: 'Tengeru', type: 'vendor' },
  { quote: "The weekly payouts hit my M-Pesa every Monday without fail. That kind of reliability makes all the difference when you're building a side income.", name: 'Baraka M.', role: 'Freelance Rider', location: 'Sanawari', type: 'rider' },
  { quote: "We partnered with Sosika for corporate lunch deliveries and it transformed how our team eats at the office. Punctual, professional, and delicious.", name: 'Zainab H.', role: 'Operations Lead, Tanzanite Group', location: 'Clock Tower (CBD)', type: 'vendor' },
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

const PARTNERSHIP_TYPES = [
  { value: 'technology', label: 'Technology integration' },
  { value: 'investor', label: 'Investment opportunity' },
  { value: 'ngo', label: 'NGO / Social impact' },
  { value: 'corporate', label: 'Corporate catering' },
  { value: 'media', label: 'Media & PR' },
  { value: 'other', label: 'Other' },
];

// ─── Animated Stat ────────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-black text-4xl md:text-5xl tracking-tight transition-all duration-700" style={{ color: '#29d9d5', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}>{value}</span>
      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">{label}</span>
    </div>
  );
}

// ─── Step Item ────────────────────────────────────────────────────────────────

function StepItem({ step, title, body, last }: { step: string; title: string; body: string; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-sm border border-[rgba(41,217,213,0.3)] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(41,217,213,0.05)' }}>
          <span className="text-[11px] font-black text-[#29d9d5]">{step}</span>
        </div>
        {!last && <div className="w-px flex-1 my-2" style={{ background: 'rgba(41,217,213,0.12)' }} />}
      </div>
      <div className="pb-8">
        <p className="font-black text-white text-sm mb-1">{title}</p>
        <p className="text-sm text-white leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ quote, name, role, location, type }: typeof TESTIMONIALS[0]) {
  return (
    <div
      className="relative flex-shrink-0 flex flex-col rounded-2xl p-8 overflow-hidden"
      style={{
        width: '360px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-10 h-px" style={{ background: '#29d9d5', opacity: 0.5 }} />
      <div className="absolute top-0 left-0 w-px h-10" style={{ background: '#29d9d5', opacity: 0.5 }} />

      {/* badge */}
      <div className="flex items-center justify-between mb-7">
        <svg viewBox="0 0 28 20" fill="none" className="w-7 h-5" aria-hidden="true">
          <path d="M0 20V12C0 5.6 3.8 1.6 11.4 0l1.3 2.4C9 3.6 6.9 6 6.4 9.8H11V20H0zm17 0V12C17 5.6 20.8 1.6 28.4 0l1.3 2.4C26 3.6 23.9 6 23.4 9.8H28V20H17z" fill="#29d9d5" fillOpacity="0.25" />
        </svg>
        <span
          className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm"
          style={{
            background: type === 'vendor' ? 'rgba(41,217,213,0.1)' : 'rgba(255,255,255,0.06)',
            color: type === 'vendor' ? '#29d9d5' : '#5a5a5a',
          }}
        >
          {type === 'vendor' ? 'Vendor' : 'Rider'}
        </span>
      </div>

      <p className="text-[#aaa] text-sm leading-[1.8] flex-1 mb-7">&ldquo;{quote}&rdquo;</p>

      <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-9 h-9 rounded-sm flex items-center justify-center text-sm font-black text-[#0a0a0a] flex-shrink-0" style={{ background: '#29d9d5' }}>
          {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white leading-tight truncate">{name}</p>
          <p className="text-xs text-white mt-0.5 truncate">{role}</p>
        </div>
        <span className="text-[10px] text-white font-semibold uppercase tracking-widest whitespace-nowrap">{location}</span>
      </div>
    </div>
  );
}

// ─── Testimonials Slider ──────────────────────────────────────────────────────

function TestimonialsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => { if (!trackRef.current) return; setIsDragging(true); setStartX(e.pageX - trackRef.current.offsetLeft); setScrollLeft(trackRef.current.scrollLeft); };
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging || !trackRef.current) return; e.preventDefault(); const x = e.pageX - trackRef.current.offsetLeft; trackRef.current.scrollLeft = scrollLeft - (x - startX); };
  const onMouseUp = () => setIsDragging(false);
  const onTouchStart = (e: React.TouchEvent) => { if (!trackRef.current) return; setStartX(e.touches[0].pageX - trackRef.current.offsetLeft); setScrollLeft(trackRef.current.scrollLeft); };
  const onTouchMove = (e: React.TouchEvent) => { if (!trackRef.current) return; const x = e.touches[0].pageX - trackRef.current.offsetLeft; trackRef.current.scrollLeft = scrollLeft - (x - startX); };
  const onScroll = () => { if (!trackRef.current) return; const idx = Math.round(trackRef.current.scrollLeft / 380); setActiveIdx(Math.min(idx, TESTIMONIALS.length - 1)); };
  const scrollBy = (dir: 1 | -1) => { if (!trackRef.current) return; trackRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' }); };

  return (
    <div className="relative">
      <style>{`.sosika-slider::-webkit-scrollbar{display:none}`}</style>
      <div className="hidden md:flex items-center gap-2 absolute -top-13 right-0">
        {[[-1, 'M10 12L6 8l4-4'], [1, 'M6 4l4 4-4 4']].map(([dir, d], i) => (
          <button key={i} onClick={() => { scrollBy(dir as 1 | -1); trackEvent('testimonial_nav_clicked'); }} aria-label={dir === -1 ? 'Previous' : 'Next'}
            className="w-10 h-10 rounded-sm border flex items-center justify-center transition-all duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#4a4a4a' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#29d9d5'; (e.currentTarget as HTMLButtonElement).style.color = '#29d9d5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#4a4a4a'; }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d={d as string} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ))}
      </div>
      <div ref={trackRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onScroll={onScroll}
        className="sosika-slider flex gap-4 overflow-x-auto pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: isDragging ? 'grabbing' : 'grab', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
      >
        <div className="flex-shrink-0 w-0" />
        {TESTIMONIALS.map((t) => (
          <div key={t.name} style={{ scrollSnapAlign: 'start' }}><TestimonialCard {...t} /></div>
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} aria-label={`Go to ${i + 1}`}
            onClick={() => { if (!trackRef.current) return; trackRef.current.scrollTo({ left: i * 380, behavior: 'smooth' }); }}
            style={{ width: activeIdx === i ? '24px' : '6px', height: '6px', borderRadius: '99px', background: activeIdx === i ? '#29d9d5' : 'rgba(255,255,255,0.1)', transition: 'width 0.3s ease, background 0.3s ease', border: 'none', padding: 0, cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

const FORM_FIELDS = [
  { name: 'name', label: 'Full name', placeholder: 'Your name', type: 'text', required: true, hint: 'Who should we address?' },
  { name: 'email', label: 'Work email', placeholder: 'you@company.com', type: 'email', required: true, hint: 'We reply within 1–2 business days.' },
  { name: 'organization', label: 'Organization', placeholder: 'Company or brand name', type: 'text', required: false, hint: 'Optional — helps us tailor our response.' },
];

function PartnershipForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', organization: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const trackStart = () => {
    if (!hasTrackedStart) {
      posthog.capture('other_partnership_form_started', { form_name: 'other_partnership_form' });
      setHasTrackedStart(true);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    trackEvent('other_partnership_form_submitted', { form_name: 'other_partnership_form', platform: 'website' });
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/other-partnership-applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (response.ok) {
        setSubmitted(true);
        trackEvent('other_partnership_form_submission_success', { form_name: 'other_partnership_form', platform: 'website' });
      } else throw new Error('Failed');
    } catch {
      alert("We couldn't send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = form.name && form.email && form.message;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <div className="w-16 h-16 rounded-sm flex items-center justify-center" style={{ border: '1px solid #29d9d5', background: 'rgba(41,217,213,0.08)' }}>
          <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
            <path d="M6 16l8 8 14-14" stroke="#29d9d5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-black text-white mb-2">Message received.</h3>
          <p className="text-white text-sm max-w-xs leading-relaxed">Our partnerships team will be in touch within 1–2 business days. We read every inquiry personally.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#29d9d5] font-semibold uppercase tracking-widest">
          <div className="w-4 h-px bg-[#29d9d5]" />
          Sosika Partnerships
          <div className="w-4 h-px bg-[#29d9d5]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Text fields */}
      {FORM_FIELDS.map((field) => (
        <div key={field.name} className="relative">
          <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: focused === field.name ? '#29d9d5' : '#FFFFFF' }}>
            {field.label}{field.required && <span className="ml-1 text-[#29d9d5]">*</span>}
          </label>
          <input
            name={field.name}
            type={field.type}
            value={form[field.name as keyof FormState]}
            onChange={handleChange}
            onFocus={() => { setFocused(field.name); trackStart(); }}
            onBlur={() => setFocused(null)}
            placeholder={field.placeholder}
            style={{
              background: 'transparent',
              border: `1px solid ${focused === field.name ? 'rgba(41,217,213,0.5)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '4px',
              padding: '12px 16px',
              width: '100%',
              fontSize: '14px',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxShadow: focused === field.name ? '0 0 0 3px rgba(41,217,213,0.06)' : 'none',
            }}
            placeholder-style="color: #2a2a2a"
          />
          {focused === field.name && (
            <p className="text-[10px] text-[#29d9d5] mt-1.5 tracking-wide">{field.hint}</p>
          )}
        </div>
      ))}

      {/* Partnership type — pill selector */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: '#FFFFFF' }}>Partnership type</label>
        <div className="flex flex-wrap gap-2">
          {PARTNERSHIP_TYPES.map((pt) => (
            <button
              key={pt.value}
              onClick={() => { setSelectedType(pt.value); setForm(prev => ({ ...prev, type: pt.value })); }}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '6px 14px',
                borderRadius: '2px',
                border: `1px solid ${selectedType === pt.value ? '#29d9d5' : 'rgba(255,255,255,0.08)'}`,
                background: selectedType === pt.value ? 'rgba(41,217,213,0.1)' : 'transparent',
                color: selectedType === pt.value ? '#29d9d5' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: focused === 'message' ? '#29d9d5' : '#FFFFFF' }}>
          Message <span className="text-[#29d9d5]">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          onFocus={() => { setFocused('message'); trackStart(); }}
          onBlur={() => setFocused(null)}
          rows={5}
          placeholder="Tell us about your partnership idea, what you're building, and what you hope to achieve together..."
          style={{
            background: 'transparent',
            border: `1px solid ${focused === 'message' ? 'rgba(41,217,213,0.5)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '4px',
            padding: '12px 16px',
            width: '100%',
            fontSize: '14px',
            color: '#fff',
            outline: 'none',
            resize: 'none',
            transition: 'border-color 0.2s ease',
            boxShadow: focused === 'message' ? '0 0 0 3px rgba(41,217,213,0.06)' : 'none',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              background: '#29d9d5',
              width: `${(([form.name, form.email, form.message].filter(Boolean).length) / 3) * 100}%`,
            }}
          />
        </div>
        <span className="text-[10px] text-white uppercase tracking-widest font-semibold whitespace-nowrap">
          {[form.name, form.email, form.message].filter(Boolean).length}/3 required
        </span>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !isValid}
        className="group relative w-full overflow-hidden rounded-sm font-black text-sm uppercase tracking-[0.2em] py-4 transition-all duration-300"
        style={{
          background: isValid ? '#29d9d5' : 'rgba(255,255,255,0.04)',
          color: isValid ? '#0a0a0a' : '#2a2a2a',
          border: `1px solid ${isValid ? '#29d9d5' : 'rgba(255,255,255,0.06)'}`,
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isSubmitting ? 'Sending...' : 'Send message'}
          {!isSubmitting && (
            <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>

      <p className="text-center text-[10px] text-white uppercase tracking-widest">
        We read every message personally — typically within 1 business day.
      </p>
    </div>
  );
}

// ─── Benefit Row ──────────────────────────────────────────────────────────────

function BenefitRow({ stat, label, body, index }: { stat: string; label: string; body: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-6 p-6 rounded-sm transition-all duration-300"
      style={{ border: `1px solid ${hovered ? 'rgba(41,217,213,0.2)' : 'rgba(255,255,255,0.05)'}`, background: hovered ? 'rgba(41,217,213,0.02)' : 'transparent' }}
    >
      <div className="w-16 flex-shrink-0">
        <span className="text-3xl font-black tracking-tight" style={{ color: '#29d9d5' }}>{stat}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#29d9d5] mb-1">{label}</p>
        <p className="text-sm text-white leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Checklist Item ───────────────────────────────────────────────────────────

function CheckItem({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm" style={{ color: dark ? '#4a4a4a' : '#5a5a5a' }}>
      <span className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 rounded-sm flex items-center justify-center" style={{ background: 'rgba(41,217,213,0.1)' }}>
        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
          <path d="M2 5.5l2 2 4-4" stroke="#29d9d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#29d9d5]" />
      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  return (
    <main className="w-full overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #062f3a 40%, #033a41 70%, #0b4f54 100%)', color: '#ffffff' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Fine grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(41,217,213,0.07) 0%, transparent 60%)' }} />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(41,217,213,0.04) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute top-0 bottom-0 left-[5%] w-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute top-0 bottom-0 right-[5%] w-px" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 xl:px-24 pt-40 pb-32">
          <Eyebrow label="Partner ecosystem" />
          <h1 className="font-black leading-[0.95] tracking-[-0.03em] mb-8" style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}>
            <span className="block text-white">Grow together.</span>
            <span className="block" style={{ color: '#29d9d5' }}>Win together.</span>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
            <p className="max-w-md text-base leading-relaxed text-white">
              Sosika connects vendors, riders, and businesses into Tanzania's fastest-growing delivery ecosystem. Whether you cook, ride, or build — there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/join-vendor" onClick={() => trackEvent('join_vendor_clicked', { location: 'partners_hero' })}
                className="group inline-flex items-center gap-3 font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300"
                style={{ background: '#29d9d5', color: '#0a0a0a' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}
              >
                Join as Vendor
                <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/join-rider" onClick={() => trackEvent('join_rider_clicked', { location: 'partners_hero' })}
                className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#29d9d5'; (e.currentTarget as HTMLElement).style.color = '#29d9d5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              >
                Join as Rider
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="absolute bottom-10 right-6 md:right-16 xl:right-24">
          <span className="text-[11px] text-white tracking-[0.2em] uppercase font-semibold">Est. 2025 — Arusha, TZ</span>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="md:px-10" style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <AnimatedStat value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Partner type ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow label="Two ways to partner" />
            <h2 className="font-black tracking-tight leading-[0.95] text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Which one<br />are you?
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white leading-relaxed md:text-right">Both paths are built for people who want to grow with Tanzania's fastest delivery platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {/* Vendor */}
          {[
            {
              role: 'vendor', eyebrow: 'For vendors',
              heading: <><span>Sell more.</span><br /><span>Reach further.</span></>,
              body: "List your restaurant, grocery store, pharmacy, or retail shop on Sosika and tap into a city-wide customer base — with zero setup cost and same-day onboarding.",
              checks: ['Zero upfront fees', 'Free storefront setup', 'Real-time order dashboard', 'Weekly payouts via mobile money', 'Dedicated support team'],
              cta: 'Join as a Vendor', href: '/join-vendor',
              trackKey: 'join_vendor_clicked',
            },
            {
              role: 'rider', eyebrow: 'For riders',
              heading: <><span>Ride on your</span><br /><span>own terms.</span></>,
              body: "Earn flexible income making deliveries in your city. No boss, no fixed hours — just you, your bike, and a platform that pays fairly and pays on time.",
              checks: ['Flexible schedule, no minimums', 'Free Sosika delivery kit', 'Weekly mobile money payout', 'In-app earnings tracker', 'Rider community & support'],
              cta: 'Join as a Rider', href: '/join-rider',
              trackKey: 'join_rider_clicked',
            },
          ].map((card) => (
            <div key={card.role} className="bg-[#0a0a0a] p-10 md:p-12 flex flex-col group">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#29d9d5] mb-8">{card.eyebrow}</span>
              <h3 className="font-black text-white leading-tight mb-4 tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>{card.heading}</h3>
              <p className="text-sm text-white leading-relaxed mb-8">{card.body}</p>
              <ul className="space-y-3 mb-10 flex-1">
                {card.checks.map(c => <CheckItem key={c} text={c} />)}
              </ul>
              <Link href={card.href} onClick={() => trackEvent(card.trackKey, { location: 'partners_page' })}
                className="group/btn inline-flex items-center gap-3 font-black text-sm uppercase tracking-[0.15em] px-7 py-4 rounded-sm transition-all duration-300 self-start"
                style={{ border: '1px solid #29d9d5', color: '#29d9d5' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#29d9d5'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#29d9d5'; }}
              >
                {card.cta}
                <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits: vendor then rider ───────────────────────────────────── */}
      {[
        { eyebrow: 'Vendor results', heading: <>What our vendors<br />say in numbers.</>, benefits: VENDOR_BENEFITS, cta: 'Become a vendor', href: '/join-vendor', trackKey: 'join_vendor_clicked', loc: 'vendor_results' },
        { eyebrow: 'Rider earnings', heading: <>Real income.<br />Real freedom.</>, benefits: RIDER_BENEFITS, cta: 'Become a rider', href: '/join-rider', trackKey: 'join_rider_clicked', loc: 'rider_results' },
      ].map((sec) => (
        <section key={sec.eyebrow} className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <Eyebrow label={sec.eyebrow} />
                <h2 className="font-black tracking-tight leading-[0.95] text-white" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>{sec.heading}</h2>
              </div>
              <Link href={sec.href} onClick={() => trackEvent(sec.trackKey, { location: sec.loc })}
                className="self-start inline-flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#4a4a4a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#29d9d5'; (e.currentTarget as HTMLElement).style.color = '#29d9d5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#4a4a4a'; }}
              >
                {sec.cta}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sec.benefits.map((b, i) => <BenefitRow key={b.label} {...b} index={i} />)}
            </div>
          </div>
        </section>
      ))}

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <Eyebrow label="Simple process" />
              <h2 className="font-black tracking-tight leading-[0.95] text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Up and running<br />in 4 steps.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-white leading-relaxed md:text-right">No paperwork. No complexity. Just a fast, human onboarding process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {[
              { label: 'For Vendors', steps: HOW_IT_WORKS_VENDOR },
              { label: 'For Riders', steps: HOW_IT_WORKS_RIDER },
            ].map((col, ci) => (
              <div key={col.label} className="p-10 md:p-12" style={{ borderLeft: ci > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#29d9d5] block mb-8">{col.label}</span>
                {col.steps.map((s, i) => <StepItem key={s.step} {...s} last={i === col.steps.length - 1} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <Eyebrow label="Partner stories" />
              <h2 className="font-black tracking-tight leading-[0.95] text-white" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Hear it from<br />our partners.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-white leading-relaxed md:text-right">Real words from real vendors and riders building their future with Sosika.</p>
          </div>
          <TestimonialsSlider />
        </div>
        {/* Fade overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-68" style={{ background: 'linear-gradient(to left, #062f3a 0%, transparent 100%)' }} />
      </section>

      {/* ── Other partnerships + form ─────────────────────────────────────── */}
      <section className="py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

            {/* Left: context */}
            <div className="p-10 md:p-14 flex flex-col justify-between" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <Eyebrow label="Other opportunities" />
                <h2 className="font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                  Something else<br />in mind?
                </h2>
                <p className="text-sm text-white leading-relaxed mb-10 max-w-sm">
                  We're open to all kinds of meaningful collaboration — technology integrations, investment, NGO work, corporate catering, media, and more. If you see potential in working with Sosika, so do we.
                </p>
                <div className="flex flex-wrap gap-2 mb-14">
                  {['Technology', 'Investment', 'Corporate catering', 'NGO & Impact', 'Media & PR', 'Academic research'].map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm" style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#FFFFFF' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Social proof mini block */}
              <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#29d9d5] mb-4">Why reach out?</p>
                <ul className="space-y-3">
                  {[
                    'Every message is read personally by our founding team',
                    'Response within 1 business day, not weeks',
                    'We\'ve partnered with NGOs, corporates, and tech firms',
                  ].map(line => <CheckItem key={line} text={line} />)}
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-10 md:p-14">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#29d9d5] mb-2">Send us a message</p>
              <h3 className="font-black text-white text-2xl mb-2 tracking-tight">Let's start a conversation.</h3>
              <p className="text-sm text-white mb-10 leading-relaxed">Fill in what you can — we'll handle the rest. No lengthy forms, no committees.</p>
              <PartnershipForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-black text-white leading-none whitespace-nowrap" style={{ fontSize: 'clamp(100px, 20vw, 260px)', opacity: 0.02 }}>PARTNER</span>
        </div>
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(41,217,213,0.05) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 xl:px-24 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-[#29d9d5]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5]">Ready to start</span>
            <div className="w-6 h-px bg-[#29d9d5]" />
          </div>
          <h2 className="font-black tracking-tight text-white leading-[0.95] mb-6" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            Ready to grow<br />with Sosika?
          </h2>
          <p className="text-white text-base mb-12 max-w-sm mx-auto leading-relaxed">
            Join 100+ vendors and 100+ riders already building their future on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/join-vendor" onClick={() => trackEvent('join_vendor_clicked', { location: 'partners_cta' })}
              className="group inline-flex items-center justify-center gap-3 font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-sm transition-all duration-300"
              style={{ background: 'white', color: '#0a0a0a' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#29d9d5'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'white'}
            >
              Join as Vendor
              <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="/join-rider" onClick={() => trackEvent('join_rider_clicked', { location: 'partners_cta' })}
              className="inline-flex items-center justify-center font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-sm transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#29d9d5'; (e.currentTarget as HTMLElement).style.color = '#29d9d5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              Join as Rider
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}