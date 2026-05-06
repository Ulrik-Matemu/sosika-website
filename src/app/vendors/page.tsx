import type { Metadata } from "next";
import { getVendorsWithMenuStats } from "@/lib/vendors";
import VendorDirectoryClient from "./VendorDirectoryClient";

export const metadata: Metadata = {
  title: "Food Vendors in Arusha | Sosika",
  description:
    "Browse restaurants, food vendors, snacks, drinks, and meals available for delivery in Arusha through Sosika.",
};

export default async function VendorsPage() {
  const vendors = await getVendorsWithMenuStats();

  return <VendorDirectoryClient vendors={vendors} />;
}