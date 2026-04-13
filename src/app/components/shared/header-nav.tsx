'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, X } from 'lucide-react';
import { trackEvent } from '@/lib/posthog';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', hasArrow: false, active: false },
    { name: 'About Us', href: '/about-us', hasArrow: false },
    { name: 'Our Services', href: '/our-services', hasArrow: false },
    { name: 'Our Partners', href: '/our-partners', hasArrow: false },
    { name: 'Contacts', href: '/contact-us', hasArrow: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-24 transition-all duration-300
          ${scrolled
            ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm shadow-black/5'
            : 'py-4 bg-transparent'
          }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-5xl font-black text-[#29d9d5] tracking-tight">Sosika</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex items-center gap-14">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
<<<<<<< Updated upstream
                className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${
                  link.active ? 'text-[#29d9d5]' : 'text-black hover:text-[#29d9d5]'
                }`}
=======
                className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${scrolled ? 'text-black' : 'text-[#FFFFF0]'} ${link.active ? 'text-[#FFFFF0]' : 'text-[#FFFFF0] hover:text-[#29d9d5]'
                  }`}
>>>>>>> Stashed changes
              >
                {link.name}
                {link.hasArrow && <ChevronRight size={14} strokeWidth={3} className="mt-0.5" />}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="https://sosika.app"
            className="bg-black hover:bg-white hover:text-[#1a1c20] transition-colors duration-200 text-white uppercase px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 active:scale-95"
            onClick={() => {
              trackEvent("open_app_clicked", {
                location: "header_desktop",
                destination: "https://sosika.app",
              })
            }}
          >
            Open App
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-1 z-50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} strokeWidth={2.5} />
          ) : (
            <>
              <span className="block w-6 h-[2.5px] bg-black rounded-full" />
              <span className="block w-6 h-[2.5px] bg-black rounded-full" />
              <span className="block w-6 h-[2.5px] bg-black rounded-full" />
            </>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col mt-24 px-8">
          {navLinks.map((link, i) => (
            <li
              key={link.name}
              className="border-b border-gray-100"
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-5 text-lg font-bold text-black hover:text-[#29d9d5] transition-colors"
              >
                {link.name}
                <ChevronRight size={18} strokeWidth={2.5} className="text-gray-300" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-8 mt-8">
          <Link
            href="https://sosika.app"
            onClick={() => {
              setMenuOpen(false);
              trackEvent("open_app_clicked", {
                location: "header_mobile",
                destination: "https://sosika.app",
              })
            }}
            className="block text-center bg-black hover:bg-[#29d9d5] hover:text-black transition-colors duration-200 text-white uppercase px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 active:scale-95"
          >
            Open App
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;