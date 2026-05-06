"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Tag, Banknote, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState, useCallback, useTransition, useRef, useEffect } from "react";
import type { VendorWithMenuStats } from "@/types/vendor";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  vendors: VendorWithMenuStats[];
};

type ViewMode = "grid" | "list";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(price: number | null) {
  if (price === null) return "Not listed";
  return `TSh ${price.toLocaleString("en-US")}`;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 12 12" width="10" height="10" fill="none">
            {i < full ? (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="#29d9d5" />
            ) : i === full && half ? (
              <>
                <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="rgba(41,217,213,0.15)" />
                <clipPath id={`h${i}`}><rect x="0" y="0" width="6" height="12" /></clipPath>
                <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="#29d9d5" clipPath={`url(#h${i})`} />
              </>
            ) : (
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill="rgba(255,255,255,0.08)" />
            )}
          </svg>
        ))}
      </div>
      <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>{rating.toFixed(1)}</span>
      <span style={{ fontSize: '10px', color: '#aaaaaa' }}>· {count}</span>
    </div>
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLElement>(null);
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

// ─── Vendor Card (Grid) ───────────────────────────────────────────────────────

function VendorCard({ vendor, index }: { vendor: VendorWithMenuStats; index: number }) {
  const appUrl = `https://sosika.app/vendor/${vendor.id}/menu`;
  const { ref, visible } = useReveal(0.05);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease, transform 0.5s ease`,
        transitionDelay: `${(index % 3) * 60}ms`,
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#080b11',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      className="group rounded-xl"
    >
      {/* Image */}
      <Link
        href={`/vendors/${vendor.slug}`}
        className="relative block overflow-hidden"
        style={{ height: '176px', background: '#111', flexShrink: 0 }}
      >
        {vendor.coverImageUrl && (
          <Image
            src={vendor.coverImageUrl}
            alt={`${vendor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)' }} />

        {/* Top row: status + rating */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div
            className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1"
            style={{
              border: vendor.isOpen ? '1px solid rgba(41,217,213,0.4)' : '1px solid rgba(255,255,255,0.1)',
              background: vendor.isOpen ? 'rgba(41,217,213,0.12)' : 'rgba(0,0,0,0.4)',
              color: vendor.isOpen ? '#29d9d5' : 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {vendor.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>

        {/* Bottom: rating */}
        <div className="absolute bottom-3 right-3">
          <div
            className="px-2.5 py-1.5"
            style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <StarRating rating={vendor.averageRating} count={vendor.ratingCount} />
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name + desc */}
        <Link href={`/vendors/${vendor.slug}`} className="block mb-1">
          <h2
            className="font-black text-white leading-tight transition-colors duration-200 group-hover:text-[#29d9d5]"
            style={{ fontSize: '16px' }}
          >
            {vendor.name}
          </h2>
        </Link>
        <p
          className="text-xs leading-relaxed mb-3 line-clamp-2"
          style={{ color: '#aaaaaa' }}
        >
          {vendor.shortDescription}
        </p>

        {/* Category tags */}
        {vendor.menuStats.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {vendor.menuStats.categories.slice(0, 3).map(cat => (
              <span
                key={cat}
                className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1"
                style={{ border: '1px solid rgba(41,217,213,0.15)', color: 'rgba(41,217,213,0.6)', background: 'rgba(41,217,213,0.04)' }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Delivery areas */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendor.serviceAreas.slice(0, 3).map(area => (
            <span
              key={area}
              className="text-[9px] tracking-wide px-2 py-1 font-semibold uppercase"
              style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#888888', background: 'transparent' }}
            >
              {area}
            </span>
          ))}
          {vendor.serviceAreas.length > 3 && (
            <span className="text-[9px] tracking-wide px-2 py-1 font-semibold" style={{ color: '#888888' }}>
              +{vendor.serviceAreas.length - 3}
            </span>
          )}
        </div>

        {/* Divider + price / items meta */}
        <div className="flex items-center justify-between mb-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: '#888888' }}>From</p>
            <p className="text-sm font-black text-white">{formatPrice(vendor.menuStats.minPrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: '#888888' }}>Items</p>
            <p className="text-sm font-black text-white">{vendor.menuStats.availableItemCount} available</p>
          </div>
        </div>

        {/* Menu preview */}
        {vendor.menuStats.sampleItems.length > 0 && (
          <div className="mb-4 p-3" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] mb-2.5" style={{ color: '#29d9d5' }}>
              Menu preview
            </p>
            <div className="flex flex-col gap-0">
              {vendor.menuStats.sampleItems.slice(0, 3).map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-1.5"
                  style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <span className="text-xs truncate pr-3" style={{ color: '#cccccc' }}>{item.name}</span>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: '#ffffff' }}>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link
            href={`/vendors/${vendor.slug}`}
            className="flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 transition-all rounded-xl duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#aaaaaa' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#aaaaaa'; }}
          >
            View menu
          </Link>
          <a
            href={appUrl}
            className="flex items-center justify-center text-[10px] rounded-xl font-bold uppercase tracking-[0.15em] py-2.5 transition-all duration-200"
            style={{ background: '#29d9d5', color: '#0a0a0a' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}
          >
            Order now
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Vendor Row (List view) ───────────────────────────────────────────────────

function VendorRow({ vendor, index }: { vendor: VendorWithMenuStats; index: number }) {
  const appUrl = `https://sosika.app/vendor/${vendor.id}/menu`;
  const { ref, visible } = useReveal(0.05);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.4s ease ${index * 30}ms, transform 0.4s ease ${index * 30}ms`,
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#080b11',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
      className="group flex flex-col sm:grid sm:grid-cols-[120px_1fr_auto] mb-2"
    >
      {/* Thumbnail */}
      <Link href={`/vendors/${vendor.slug}`} className="relative overflow-hidden w-full sm:w-[120px] h-32 sm:h-full block" style={{ background: '#111' }}>
        {vendor.coverImageUrl && (
          <Image src={vendor.coverImageUrl} alt={vendor.name} fill sizes="(max-width: 640px) 100vw, 120px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,10,10,0.8))' }} />
        <div
          className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-[0.18em] px-1.5 py-0.5"
          style={{
            border: vendor.isOpen ? '1px solid rgba(41,217,213,0.4)' : '1px solid rgba(255,255,255,0.08)',
            color: vendor.isOpen ? '#29d9d5' : 'rgba(255,255,255,0.5)',
            background: 'rgba(10,10,10,0.7)',
          }}
        >
          {vendor.isOpen ? 'Open' : 'Closed'}
        </div>
      </Link>

      {/* Info */}
      <div className="flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-l border-white/5">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
            <Link href={`/vendors/${vendor.slug}`}>
              <h2 className="font-black text-white text-sm leading-tight hover:text-[#29d9d5] transition-colors duration-200">{vendor.name}</h2>
            </Link>
            <StarRating rating={vendor.averageRating} count={vendor.ratingCount} />
          </div>
          <p className="text-xs mb-3 line-clamp-2 sm:line-clamp-1" style={{ color: '#aaaaaa' }}>{vendor.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5">
            {vendor.menuStats.categories.slice(0, 4).map(cat => (
              <span key={cat} className="text-[8px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5"
                style={{ border: '1px solid rgba(41,217,213,0.15)', color: 'rgba(41,217,213,0.6)' }}>
                {cat}
              </span>
            ))}
            {vendor.serviceAreas.slice(0, 2).map(a => (
              <span key={a} className="text-[8px] font-semibold uppercase tracking-wide px-1.5 py-0.5"
                style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#888888' }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex flex-row sm:flex-col items-center sm:items-end justify-between p-4 sm:min-w-[140px] gap-4 sm:gap-0 sm:border-l border-white/5"
      >
        <div className="text-left sm:text-right">
          <p className="text-[8px] uppercase tracking-[0.18em] font-bold mb-0.5" style={{ color: '#888888' }}>From</p>
          <p className="text-sm font-black text-white">{formatPrice(vendor.menuStats.minPrice)}</p>
        </div>
        <div className="flex flex-row sm:flex-col gap-1.5 w-full sm:w-auto flex-1 sm:flex-none">
          <a href={appUrl} className="flex-1 sm:flex-none flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.15em] py-2 px-3"
            style={{ background: '#29d9d5', color: '#0a0a0a', transition: 'filter 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}
          >
            Order now
          </a>
          <Link href={`/vendors/${vendor.slug}`}
            className="flex-1 sm:flex-none flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.15em] py-2 px-3 transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#aaaaaa' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#aaaaaa'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            View menu
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Filter Input ─────────────────────────────────────────────────────────────

function FilterSelect({
  value, onChange, options, placeholder, icon: Icon,
}: {
  value: string; onChange: (v: string) => void; options: string[];
  placeholder: string; icon: React.ElementType;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full">
      <Icon
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
        style={{ color: focused ? '#29d9d5' : '#888888' }}
        strokeWidth={1.8}
      />
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-10 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] rounded-xl"
        style={{
          background: 'transparent',
          border: `1px solid ${focused ? 'rgba(41,217,213,0.4)' : 'rgba(255,255,255,0.08)'}`,
          paddingLeft: '34px',
          paddingRight: '16px',
          color: value !== 'All' && value !== '' ? '#fff' : '#888888',
          outline: 'none',
          appearance: 'none',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease',
        }}
      >
        <option value="All" style={{ background: '#0a0a0a', color: '#fff' }}>{placeholder}</option>
        {options.filter(o => o !== 'All').map(o => (
          <option key={o} value={o} style={{ background: '#0a0a0a', color: '#fff' }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VendorDirectoryClient({ vendors }: Props) {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isPending, startTransition] = useTransition();

  const locations = useMemo(() => {
    const values = vendors.flatMap(v => v.serviceAreas);
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [vendors]);

  const categories = useMemo(() => {
    const values = vendors.flatMap(v => v.menuStats.categories);
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [vendors]);

  const totalOpen = useMemo(() => vendors.filter(v => v.isOpen).length, [vendors]);

  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vendors.filter(vendor => {
      const searchMatch = !query ||
        vendor.name.toLowerCase().includes(query) ||
        vendor.shortDescription.toLowerCase().includes(query) ||
        vendor.serviceAreas.some(a => a.toLowerCase().includes(query)) ||
        vendor.menuStats.categories.some(c => c.toLowerCase().includes(query)) ||
        vendor.menuStats.sampleItems.some(i => i.name.toLowerCase().includes(query));
      const locationMatch = selectedLocation === "All" || vendor.serviceAreas.includes(selectedLocation);
      const categoryMatch = selectedCategory === "All" || vendor.menuStats.categories.includes(selectedCategory);
      const openMatch = !openOnly || vendor.isOpen;
      const priceLimit = maxPrice === "All" ? null : Number(maxPrice);
      const priceMatch = priceLimit === null || vendor.menuStats.minPrice === null || vendor.menuStats.minPrice <= priceLimit;
      return searchMatch && locationMatch && categoryMatch && openMatch && priceMatch;
    });
  }, [vendors, search, selectedLocation, selectedCategory, openOnly, maxPrice]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => setSearch(e.target.value));
  }, []);

  const hasActiveFilters = selectedLocation !== "All" || selectedCategory !== "All" || openOnly || maxPrice !== "All" || search.trim() !== "";

  const clearFilters = () => {
    setSearch("");
    setSelectedLocation("All");
    setSelectedCategory("All");
    setOpenOnly(false);
    setMaxPrice("All");
  };

  return (
    <main style={{ background: 'linear-gradient(135deg, #0f172a 0%, #062f3a 40%, #033a41 70%, #0b4f54 100%)', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {/* Fine grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div aria-hidden className="absolute top-0 right-0 w-96 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(41,217,213,0.07) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 xl:px-24 pt-28 pb-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: '#29d9d5' }} />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#29d9d5' }}>
              Sosika Vendors · Arusha
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h1
                className="font-black text-white leading-none mb-4"
                style={{ fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.93, letterSpacing: '-0.01em' }}
              >
                Discover
                Food Near<br />
                <span style={{ color: '#29d9d5' }}>You!</span>
              </h1>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#cccccc' }}>
                Restaurants, snacks, drinks, and local meals — all available for delivery across Arusha through Sosika.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-0 flex-shrink-0">
              {[
                { value: vendors.length, label: 'Vendors' },
                { value: totalOpen, label: 'Open now' },
                { value: locations.length - 1, label: 'Delivery areas' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    paddingLeft: i > 0 ? 'clamp(14px, 3vw, 28px)' : '0',
                    marginLeft: i > 0 ? 'clamp(14px, 3vw, 28px)' : '0',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <p className="font-black leading-none mb-1.5" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#29d9d5' }}>
                    {s.value}
                  </p>
                  <p className="text-[9px] tracking-[0.22em] uppercase font-semibold" style={{ color: '#888888' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky filter bar ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 backdrop-blur-md"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(135deg, #0f172a 0%, #062f3a 40%, #033a41 70%, #0b4f54 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-4">
          <div className="flex flex-col gap-4">
            {/* Main filter row */}
            <div className="flex flex-col lg:flex-row gap-2 w-full">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                  style={{ color: '#888888' }}
                  strokeWidth={1.8}
                />
                <input
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search vendors, dishes, areas..."
                  className="w-full h-10 text-sm rounded-xl"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.08)',
                    paddingLeft: '36px',
                    paddingRight: '16px',
                    color: '#fff',
                    outline: 'none',
                    letterSpacing: '0.02em',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(41,217,213,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  aria-label="Search vendors"
                />
              </div>

              {/* Filters & View Toggle Wrapper */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-2">
                <FilterSelect value={selectedLocation} onChange={setSelectedLocation} options={locations} placeholder="Locations" icon={MapPin}  />
                <FilterSelect value={selectedCategory} onChange={setSelectedCategory} options={categories} placeholder="Categories" icon={Tag} />
                <FilterSelect
                  value={maxPrice}
                  onChange={setMaxPrice}
                  options={['5000', '10000', '15000', '25000']}
                  placeholder="Max Price"
                  icon={Banknote}
                />

                {/* View toggle */}
                <div className="flex rounded-xl col-span-2 md:col-span-1 justify-center lg:justify-start" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  {(['grid', 'list'] as ViewMode[]).map((mode, index) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      aria-label={`${mode} view`}
                      className="flex-1 lg:flex-none flex items-center justify-center w-full lg:w-10 h-10 transition-colors duration-150"
                      style={{
                        background: viewMode === mode ? 'rgba(41,217,213,0.1)' : 'transparent',
                        color: viewMode === mode ? '#29d9d5' : '#888888',
                        borderLeft: index !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      }}
                    >
                      {mode === 'grid' ? (
                        <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                          <rect x="0" y="0" width="6" height="6" fill="currentColor" rx="0.5" />
                          <rect x="8" y="0" width="6" height="6" fill="currentColor" rx="0.5" />
                          <rect x="0" y="8" width="6" height="6" fill="currentColor" rx="0.5" />
                          <rect x="8" y="8" width="6" height="6" fill="currentColor" rx="0.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                          <rect x="0" y="0" width="14" height="3.5" fill="currentColor" rx="0.5" />
                          <rect x="0" y="5.25" width="14" height="3.5" fill="currentColor" rx="0.5" />
                          <rect x="0" y="10.5" width="14" height="3.5" fill="currentColor" rx="0.5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary row: open toggle + result count + clear */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <div
                  onClick={() => setOpenOnly(p => !p)}
                  role="checkbox"
                  aria-checked={openOnly}
                  tabIndex={0}
                  onKeyDown={e => e.key === ' ' && setOpenOnly(p => !p)}
                  className="flex items-center justify-center"
                  style={{
                    width: '14px', height: '14px',
                    border: `1px solid ${openOnly ? '#29d9d5' : 'rgba(255,255,255,0.12)'}`,
                    background: openOnly ? 'rgba(41,217,213,0.15)' : 'transparent',
                    borderRadius: '2px',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {openOnly && (
                    <svg viewBox="0 0 10 10" fill="none" width="9" height="9">
                      <path d="M2 5.5l2 2 4-4" stroke="#29d9d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#888888' }}>
                  Open now only
                </span>
              </label>

              <div className="flex flex-row-reverse sm:flex-row items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] transition-colors duration-150"
                    style={{ color: '#aaaaaa' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f87171'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#aaaaaa'}
                  >
                    <X className="w-3 h-3" strokeWidth={2} />
                    Clear filters
                  </button>
                )}
                <p className="text-[10px] tracking-wide" style={{ color: '#888888' }}>
                  <span
                    className="font-black text-sm"
                    style={{ color: '#29d9d5', opacity: isPending ? 0.5 : 1, transition: 'opacity 0.15s ease' }}
                  >
                    {filteredVendors.length}
                  </span>
                  {' '}
                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                    vendor{filteredVendors.length !== 1 ? 's' : ''} found
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Vendor grid / list ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 py-10">
        {filteredVendors.length > 0 ? (
          viewMode === 'grid' ? (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              }}
            >
              {filteredVendors.map((vendor, i) => (
                <div key={vendor.id} className="bg-transparent h-full">
                  <VendorCard vendor={vendor} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-px" style={{ background: 'transparent sm:rgba(255,255,255,0.06)' }}>
              {filteredVendors.map((vendor, i) => (
                <div key={vendor.id} className="rounded-xl sm:rounded-none overflow-hidden">
                  <VendorRow vendor={vendor} index={i} />
                </div>
              ))}
            </div>
          )
        ) : (
          /* ── Empty state ── */
          <div
            className="py-24 text-center mx-auto max-w-lg"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
          >
            {/* Corner brackets */}
            <div style={{ position: 'relative', display: 'inline-block', padding: '40px 20px sm:padding-60px', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '1px', background: '#29d9d5', opacity: 0.4 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '20px', background: '#29d9d5', opacity: 0.4 }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '1px', background: '#29d9d5', opacity: 0.4 }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1px', height: '20px', background: '#29d9d5', opacity: 0.4 }} />

              <p className="font-black text-white text-xl sm:text-2xl mb-2">No vendors found.</p>
              <p className="text-xs mb-6" style={{ color: '#aaaaaa' }}>
                Try adjusting your search or removing a filter.
              </p>
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}