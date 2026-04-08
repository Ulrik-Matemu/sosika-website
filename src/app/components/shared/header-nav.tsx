import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/', hasArrow: false, active: false },
    { name: 'About Us', href: '/about-us', hasArrow: false },
    { name: 'Our Services', href: '/our-service', hasArrow: false },
    { name: 'Our Partners', href: '/our-partners', hasArrow: false },
    { name: 'Contacts', href: '/contact-us', hasArrow: false },
  ];

  return (
    <nav className="flex items-center justify-between px-8 md:px-24 py-4 bg-transparent">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-tight">
          <span className="text-4xl font-black text-[#29d9d5] tracking-tight">Sosika</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="hidden lg:flex items-center gap-14">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${
                link.active ? 'text-[#29d9d5]' : 'text-black hover:text-[#29d9d5]'
              }`}
            >
              {link.name}
              {link.hasArrow && <ChevronRight size={14} strokeWidth={3} className="mt-0.5" />}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div>
        <Link
          href="https://sosika.app"
          className="bg-[#29d9d5] hover:bg-white hover:text-[#1a1c20] transition-colors duration-200 text-white uppercase px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 active:scale-95"
        >
          Open App
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;