'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, ChevronRight, ArrowUp, Send } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import { trackEvent } from '@/lib/posthog';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('newsletter_subscription_attempt', {
      location: 'footer',
    }
    );

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        trackEvent('newsletter_subscription_success', {
          location: 'footer',
        });
      }
    } catch (err) {
      console.error("Subscription failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative text-gray-400 overflow-hidden bg-black">

      {/* ── Subtle food-themed SVG texture overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3C!-- fork --%3E%3Cg transform='translate(20,20) rotate(-20)' stroke='%2329d9d5' stroke-width='2' fill='none'%3E%3Cline x1='8' y1='0' x2='8' y2='28'/%3E%3Cline x1='4' y1='0' x2='4' y2='14'/%3E%3Cline x1='12' y1='0' x2='12' y2='14'/%3E%3Cpath d='M4,14 Q8,18 12,14'/%3E%3C/g%3E%3C!-- spoon --%3E%3Cg transform='translate(70,60) rotate(15)' stroke='%2329d9d5' stroke-width='2' fill='none'%3E%3Cellipse cx='8' cy='6' rx='6' ry='8'/%3E%3Cline x1='8' y1='14' x2='8' y2='36'/%3E%3C/g%3E%3C!-- small star/sparkle --%3E%3Cg transform='translate(120,20)' stroke='%2329d9d5' stroke-width='1.5' fill='none'%3E%3Cline x1='6' y1='0' x2='6' y2='12'/%3E%3Cline x1='0' y1='6' x2='12' y2='6'/%3E%3Cline x1='1.5' y1='1.5' x2='10.5' y2='10.5'/%3E%3Cline x1='10.5' y1='1.5' x2='1.5' y2='10.5'/%3E%3C/g%3E%3C!-- plate circle --%3E%3Ccircle cx='130' cy='110' r='14' stroke='%2329d9d5' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='130' cy='110' r='9' stroke='%2329d9d5' stroke-width='1' fill='none'/%3E%3C!-- dots --%3E%3Ccircle cx='40' cy='130' r='2' fill='%2329d9d5'/%3E%3Ccircle cx='55' cy='140' r='1.5' fill='%2329d9d5'/%3E%3Ccircle cx='90' cy='25' r='2' fill='%2329d9d5'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* ── Radial glow accent (bottom-left) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0"
        style={{
          width: '480px',
          height: '320px',
          background: 'radial-gradient(ellipse at 0% 100%, rgba(41,217,213,0.09) 0%, transparent 70%)',
        }}
      />

      {/* ── Multi-layer wavy top divider ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10" style={{ transform: 'translateY(-98%)' }}>
        {/* Back wave — slightly lighter, offset */}
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full"
          style={{ height: '90px', opacity: 0.45 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C200,80 400,10 600,45 C800,80 1000,20 1200,50 C1320,65 1380,55 1440,50 L1440,90 L0,90 Z"
            fill="#1a1f2a"
          />
        </svg>
        {/* Front wave */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="relative block w-full"
          style={{ height: '80px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,55 C180,20 360,75 540,50 C720,25 900,72 1080,45 C1200,28 1340,60 1440,48 L1440,80 L0,80 Z"
            fill="#1a1f2a"
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-8">

        {/* ── Top accent line ── */}
        <div className="w-16 h-[2px] mb-14" style={{ background: 'linear-gradient(90deg, #29d9d5, transparent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Col 1: Brand ── */}
          <div className="space-y-6">
            <span className="block text-5xl font-black tracking-tight" style={{ color: '#29d9d5', lineHeight: 1 }}>
              Sosika
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Fresh flavours, delivered fast. We connect great kitchens with hungry people — wherever they are.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { url: 'https://www.instagram.com/sosika.app/', network: 'instagram' },
                { url: 'https://wa.me/255760903468', network: 'whatsapp' },
                { url: 'mailto:sosika.app@gmail.com', network: 'email' },
              ].map(({ url, network }) => (
                <SocialIcon
                  key={network}
                  url={url}
                  network={network}
                  style={{ width: 34, height: 34 }}
                  bgColor="rgba(41,217,213,0.12)"
                  fgColor="#29d9d5"
                  className="!rounded-full hover:!bg-[#29d9d5] transition-all duration-300"
                />
              ))}
            </div>
          </div>

          {/* ── Col 2: Explore ── */}
          <div className="lg:pl-6">
            <h3 className="text-sm font-bold tracking-[0.18em] uppercase mb-8" style={{ color: '#29d9d5' }}>
              Explore
            </h3>
            <ul className="space-y-4">
              {[{ name: 'Home', href: '/' }, { name: 'Our Services', href: '/our-services' }, { name: 'About Us', href: '/about-us' }, { name: 'Blog', href: '/blog' }].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    <ChevronRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: '#29d9d5' }}
                    />
                    <span className="group-hover:text-white transition-colors duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.18em] uppercase mb-8" style={{ color: '#29d9d5' }}>
              Contact Info
            </h3>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(41,217,213,0.1)' }}
                >
                  <MapPin size={15} style={{ color: '#29d9d5' }} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold mb-1 text-white">Our Location</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>Business Startup Center, IAA</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>Arusha, Tanzania</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(41,217,213,0.1)' }}
                >
                  <Phone size={15} style={{ color: '#29d9d5' }} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold mb-1 text-white">Phone</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>+255 760 903 468</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>+255 688 123 103</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 4: Newsletter ── */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.18em] uppercase mb-8" style={{ color: '#29d9d5' }}>
              Newsletter
            </h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Get exclusive deals and fresh menus delivered straight to your inbox.
            </p>

            {subscribed ? (
              <div
                className="text-sm font-semibold px-4 py-3 rounded-lg"
                style={{ background: 'rgba(41,217,213,0.1)', color: '#29d9d5', border: '1px solid rgba(41,217,213,0.25)' }}
              >
                ✓ You're subscribed — enjoy the perks!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full text-sm px-4 py-3 rounded-lg outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.border = '1px solid rgba(41,217,213,0.5)';
                      e.currentTarget.style.background = 'rgba(41,217,213,0.05)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #29d9d5 0%, #1fb8b4 100%)',
                    color: '#1a1f2a',
                  }}
                >
                  {isSubmitting ? 'Joining...' : 'Subscribe'}
                  {!isSubmitting && <Send size={14} className="transition-transform duration-200 group-hover:translate-x-1" />}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="mt-16 mb-8 h-px w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <p>
            © 2026{' '}
            <span style={{ color: '#29d9d5' }}>Sosika Delivery Company</span>
            {' '}— All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(41,217,213,0.12)', color: '#29d9d5' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#29d9d5';
                e.currentTarget.style.color = '#1a1f2a';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(41,217,213,0.12)';
                e.currentTarget.style.color = '#29d9d5';
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;