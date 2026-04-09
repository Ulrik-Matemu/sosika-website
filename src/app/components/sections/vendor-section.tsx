import Image from "next/image";
import Link from "next/link";
import { Clock3, Star, Store } from "lucide-react";
import type { Vendor } from "@/types/vendor";

type FeaturedVendorsSectionProps = {
  vendors: Vendor[];
};

function formatRating(rating: number) {
  if (!Number.isFinite(rating) || rating <= 0) return "New";
  return rating.toFixed(1);
}

export default function FeaturedVendorsSection({
  vendors,
}: FeaturedVendorsSectionProps) {
  if (!vendors.length) return null;

  return (
    <section className="bg-slate-200 py-10 md:py-20 md:px-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">

          <h2 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
            <span className="text-[#29d9d5]">Great Food </span>from Vendors Customers Love!
          </h2>

          <p className="mt-4 text-base text-lg leading-7 text-slate-600">
            Explore some of the trusted vendors on Sosika. Fast delivery,
            quality meals, and a better experience from order to doorstep.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
              className="group overflow-hidden rounded-3xl border border-[#29d9d5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={vendor.coverImageUrl}
                  alt={vendor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority={false}
                />

                <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
                  {vendor.isOpen ? "Open now" : "Currently closed"}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {vendor.name}
                    </h3>
                  </div>

                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Store className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4" />
                    {formatRating(vendor.averageRating)}
                    {vendor.ratingCount > 0 ? ` (${vendor.ratingCount})` : ""}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    Under 30 min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="https://sosika.app/"
            className="inline-flex items-center uppercase rounded-xl px-8 py-3 text-lg font-semibold bg-black hover:bg-white hover:text-[#1a1c20] text-white transition-colors duration-300"
          >
            View all vendors
          </Link>
        </div>
      </div>
    </section>
  );
}