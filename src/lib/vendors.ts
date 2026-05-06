import "server-only";

import { adminDb } from "@/lib/firebase-admin";
import type { MenuItem, Vendor, VendorWithMenuStats } from "@/types/vendor";

type FirestoreVendor = {
  name?: unknown;
  owner_name?: unknown;
  cover_image_url?: unknown;
  averageRating?: unknown;
  ratingCount?: unknown;
  is_open?: unknown;
  college_id?: unknown;
  slug?: unknown;
  short_description?: unknown;
  full_description?: unknown;
  service_area?: unknown;
  is_featured?: unknown;
  featured_rank?: unknown;
  geolocation?: {
    lat?: unknown;
    lng?: unknown;
  };
};

type FirestoreMenuItem = {
  vendor_id?: unknown;
  name?: unknown;
  description?: unknown;
  category?: unknown;
  image_url?: unknown;
  price?: unknown;
  is_available?: unknown;
};

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toNullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function mapVendor(id: string, data: FirestoreVendor): Vendor {
  return {
    id,
    name: toString(data.name),
    ownerName: toString(data.owner_name),
    coverImageUrl: toString(data.cover_image_url),
    averageRating: toNumber(data.averageRating),
    ratingCount: toNumber(data.ratingCount),
    isOpen: toBoolean(data.is_open),
    collegeId: toNullableNumber(data.college_id),
    slug: toString(data.slug),
    shortDescription: toString(data.short_description),
    fullDescription: toString(data.full_description),
    serviceAreas: toStringArray(data.service_area),
    geolocation: {
      lat: toNullableNumber(data.geolocation?.lat),
      lng: toNullableNumber(data.geolocation?.lng),
    },
  };
}

function mapMenuItem(id: string, data: FirestoreMenuItem): MenuItem {
  return {
    id,
    vendorId: toString(data.vendor_id),
    name: toString(data.name),
    description: toString(data.description),
    category: toString(data.category),
    imageUrl: toString(data.image_url),
    price: toNumber(data.price),
    isAvailable: toBoolean(data.is_available),
  };
}

export async function getFeaturedVendors(limitCount = 6): Promise<Vendor[]> {
  const snapshot = await adminDb
    .collection("vendors")
    .where("is_featured", "==", true)
    .orderBy("featured_rank", "asc")
    .limit(limitCount)
    .get();

  return snapshot.docs
    .map((doc) => mapVendor(doc.id, doc.data() as FirestoreVendor))
    .filter((vendor) => vendor.name && vendor.coverImageUrl && vendor.slug);
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  const snapshot = await adminDb
    .collection("vendors")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return mapVendor(doc.id, doc.data() as FirestoreVendor);
}

export async function getAllVendorSlugs(): Promise<string[]> {
  const snapshot = await adminDb.collection("vendors").select("slug").get();

  return snapshot.docs
    .map((doc) => doc.data().slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
}

export async function getVendorsWithMenuStats(): Promise<VendorWithMenuStats[]> {
  const [vendorsSnapshot, menuSnapshot] = await Promise.all([
    adminDb.collection("vendors").get(),
    adminDb.collection("menuItems").where("is_available", "==", true).get(),
  ]);

  const vendors = vendorsSnapshot.docs
    .map((doc) => mapVendor(doc.id, doc.data() as FirestoreVendor))
    .filter((vendor) => vendor.name && vendor.slug);

  const menuItems = menuSnapshot.docs
    .map((doc) => mapMenuItem(doc.id, doc.data() as FirestoreMenuItem))
    .filter((item) => item.vendorId && item.name);

  return vendors.map((vendor) => {
    const items = menuItems.filter((item) => item.vendorId === vendor.id);

    const prices = items
      .map((item) => item.price)
      .filter((price) => Number.isFinite(price) && price > 0);

    const categories = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean))
    );

    const averagePrice =
      prices.length > 0
        ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
        : null;

    return {
      ...vendor,
      menuStats: {
        minPrice: prices.length ? Math.min(...prices) : null,
        maxPrice: prices.length ? Math.max(...prices) : null,
        averagePrice,
        categories,
        availableItemCount: items.length,
        sampleItems: items.slice(0, 4).map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
        })),
      },
    };
  });
}