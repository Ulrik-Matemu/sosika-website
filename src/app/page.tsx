import { Suspense } from 'react';
import Hero from './components/sections/home-hero';
import HowItWorks from './components/sections/how-it-works';
import Partnership from './components/sections/partnership';
import WhySosikaWorksBetter from './components/sections/why-sosika-work-better';
import { getFeaturedVendors } from "@/lib/vendors";
import FeaturedVendorsSection from './components/sections/vendor-section';
import AwardsSection from './components/sections/awards';
import BlogSection from './components/sections/blog-section';

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
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodDeliveryService", // More specific than LocalBusiness
    "name": "Sosika",
    "image": "https://sosika.co.tz/icon-512x512.png",
    "@id": "https://sosika.co.tz",
    "url": "https://sosika.co.tz",
    "telephone": "+255760903468",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Njiro Road",
      "addressLocality": "Arusha",
      "addressRegion": "Arusha",
      "postalCode": "23113",
      "addressCountry": "TZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -3.3731, // Example Arusha coords
      "longitude": 36.6857
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "22:00"
    },
    "areaServed": {
      "@type": "City",
      "name": "Arusha"
    }
  };

  return (
    <main className="min-h-screen" aria-label='Main Content'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, '\\u003c') }}
      />
      <Hero />
      
      {/* This section loads independently */}
      <Suspense fallback={<VendorsSkeleton />}>
        <VendorsWrapper />
      </Suspense>

      <HowItWorks />
      <WhySosikaWorksBetter />
      <AwardsSection />
      <Partnership />
      <BlogSection />
    </main>
  );
}