import "server-only";

import { adminDb } from "@/lib/firebase-admin";
import type { Vendor } from "@/types/vendor";

type FirestoreVendor = {
  name?: unknown;
  owner_name?: unknown;
  cover_image_url?: unknown;
  averageRating?: unknown;
  ratingCount?: unknown;
  is_open?: unknown;
  college_id?: unknown;
  geolocation?: {
    lat?: unknown;
    lng?: unknown;
  };
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

function mapVendor(id: string, data: FirestoreVendor): Vendor {
  return {
    id,
    name: toString(data.name),
    ownerName: toString(data.owner_name),
    coverImageUrl: toString(data.cover_image_url),
    averageRating: toNumber(data.averageRating, 0),
    ratingCount: toNumber(data.ratingCount, 0),
    isOpen: toBoolean(data.is_open, false),
    collegeId: toNullableNumber(data.college_id),
    geolocation: {
      lat: toNullableNumber(data.geolocation?.lat),
      lng: toNullableNumber(data.geolocation?.lng),
    },
  };
}

export async function getFeaturedVendors(limitCount = 3): Promise<Vendor[]> {
  const snapshot = await adminDb
    .collection("vendors")
    .where("is_featured", "==", true)
    .orderBy("featured_rank", "asc")
    .limit(limitCount)
    .get();

  return snapshot.docs
    .map((doc) => mapVendor(doc.id, doc.data() as FirestoreVendor))
    .filter((vendor) => vendor.name && vendor.coverImageUrl);
}