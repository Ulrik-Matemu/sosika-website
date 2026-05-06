import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllVendorSlugs, getVendorBySlug } from "@/lib/vendors";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllVendorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) return { title: "Vendor Not Found | Sosika" };

  return {
    title: `${vendor.name} Menu & Food Delivery in Arusha | Sosika`,
    description:
      vendor.shortDescription ||
      `Order food from ${vendor.name} through Sosika. View menu, delivery areas, ratings, and more.`,
    openGraph: {
      title: `${vendor.name} | Sosika`,
      description: vendor.shortDescription,
      images: vendor.coverImageUrl ? [vendor.coverImageUrl] : [],
    },
  };
}

export default async function VendorPage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) notFound();

  const appUrl = `https://sosika.app/vendor/${vendor.id}/menu`;

  const starCount = Math.round(vendor.averageRating);

  return (
    <main className="min-h-screen bg-[#080b11] text-[#e8e8e0]">
      <div className="mx-auto max-w-5xl pt-24 px-4 pb-20">

        {/* Breadcrumb */}
        <nav className="py-4 text-[11px] tracking-widest uppercase text-white/30">
          <Link href="/" className="hover:text-white/50 transition-colors">Sosika</Link>
          <span className="mx-2 text-white/20">›</span>
          <Link href="/vendors" className="hover:text-white/50 transition-colors">Vendors</Link>
          <span className="mx-2 text-white/20">›</span>
          <span className="text-[#29d9d5]/70">{vendor.name}</span>
        </nav>

        {/* Hero */}
        <section className="relative h-[360px] w-full overflow-hidden rounded-2xl md:h-[440px]">
          <Image
            src={vendor.coverImageUrl}
            alt={`${vendor.name} cover`}
            fill
            priority
            className="object-cover"
          />

          {/* Gradient overlay — strong at bottom, fades up */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-8">
            {/* Status pill */}
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[#29d9d5]/30 bg-[#29d9d5]/10 px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${vendor.isOpen ? "animate-pulse bg-[#29d9d5]" : "bg-white/40"}`}
              />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#29d9d5]">
                {vendor.isOpen ? "Open now" : "Currently closed"}
              </span>
            </div>

            <h1 className=" text-4xl font-normal leading-tight tracking-tight text-[#fffff0] md:text-5xl">
              {vendor.name}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              {vendor.shortDescription}
            </p>

            {/* Rating chip */}
            <div className="mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm">
              <span className="text-[#f5c518] text-xs">
                {"★".repeat(starCount)}{"☆".repeat(5 - starCount)}
              </span>
              <span className="text-sm font-semibold text-white">
                {vendor.averageRating.toFixed(1)}
              </span>
              <span className="text-xs text-white/40">
                · {vendor.ratingCount} reviews
              </span>
            </div>
          </div>
        </section>

        {/* Body grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_300px]">

          {/* Left column */}
          <div className="space-y-10">

            {/* About */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#29d9d5]">
                About
              </p>
              <h2 className=" text-2xl font-normal text-[#fffff0]">
                {vendor.name}
              </h2>
              <p className="mt-3 text-sm leading-[1.85] text-[#e8e8e0]/65">
                {vendor.fullDescription || vendor.shortDescription}
              </p>
            </div>

            {/* Delivery areas */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#29d9d5]">
                Delivery areas
              </p>
              <h2 className=" text-2xl font-normal text-[#fffff0]">
                Where we deliver
              </h2>

              {vendor.serviceAreas.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {vendor.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[#e8e8e0]/70"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#e8e8e0]/50">
                  Delivery area confirmed during ordering.
                </p>
              )}
            </div>

            {/* Menu preview notice */}
            <div className="flex gap-4 rounded-2xl border border-[#29d9d5]/15 bg-[#29d9d5]/[0.04] p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#29d9d5]/10 text-lg">
                🍽
              </div>
              <div>
                <h3 className=" text-lg font-normal text-[#fffff0]">
                  Full menu coming soon
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#e8e8e0]/55">
                  We're preparing a searchable menu preview for {vendor.name}. Open the Sosika
                  app to browse available items and place your order right away.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar — order card */}
          <aside>
            <div className="sticky top-6 rounded-2xl border border-white/[0.07] bg-[#0f1623] p-6">
              <h3 className=" text-xl font-normal text-[#fffff0]">
                Ready to order?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#e8e8e0]/50">
                Browse the full menu and place your order directly in the Sosika app.
              </p>

              <a
                href={appUrl}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-[#29d9d5] px-6 py-3.5 text-sm font-semibold text-[#080b11] transition hover:opacity-90 active:scale-[0.98]"
              >
                Start ordering →
              </a>

              {/* Trust strip */}
              <div className="mt-4 flex gap-2">
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
                  <span className="block text-sm font-semibold text-[#e8e8e0]/80">
                    {vendor.averageRating.toFixed(1)}
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-[#e8e8e0]/35">
                    Rating
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
                  <span className="block text-sm font-semibold text-[#e8e8e0]/80">
                    {vendor.ratingCount}
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-[#e8e8e0]/35">
                    Reviews
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-white/[0.06]" />

              {/* Meta rows */}
              <dl className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <dt className="text-[11px] uppercase tracking-widest text-[#e8e8e0]/35">
                    Status
                  </dt>
                  <dd
                    className={`text-xs font-medium ${
                      vendor.isOpen ? "text-[#29d9d5]" : "text-[#e8e8e0]/50"
                    }`}
                  >
                    {vendor.isOpen ? "Open now" : "Closed"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[11px] uppercase tracking-widest text-[#e8e8e0]/35">
                    Delivery
                  </dt>
                  <dd className="text-xs font-medium text-[#e8e8e0]/75">
                    Via Sosika
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[11px] uppercase tracking-widest text-[#e8e8e0]/35">
                    Location
                  </dt>
                  <dd className="text-xs font-medium text-[#e8e8e0]/75">
                    Arusha, TZ
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}