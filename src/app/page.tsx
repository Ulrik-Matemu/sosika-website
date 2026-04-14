import { Suspense } from 'react';
import Hero from './components/sections/home-hero';
import HowItWorks from './components/sections/how-it-works';
import Partnership from './components/sections/partnership';
import WhySosikaWorksBetter from './components/sections/why-sosika-work-better';
import { getFeaturedVendors } from "@/lib/vendors";
import FeaturedVendorsSection from './components/sections/vendor-section';
import AwardsSection from './components/sections/awards';

// Create a small wrapper for the data fetching part
async function VendorsWrapper() {
  const vendors = await getFeaturedVendors(6);
  return <FeaturedVendorsSection vendors={vendors} />;
}

// Your actual Skeleton UI
function VendorsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse p-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-60 bg-gray-200 rounded-lg" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen" aria-label='Main Content'>
      <Hero />
      
      {/* This section loads independently */}
      <Suspense fallback={<VendorsSkeleton />}>
        <VendorsWrapper />
      </Suspense>

      <HowItWorks />
      <WhySosikaWorksBetter />
      <AwardsSection />
      <Partnership />
    </main>
  );
}