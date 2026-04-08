import Hero from './components/sections/home-hero';
import HowItWorks from './components/sections/how-it-works';
import Partnership from './components/sections/partnership';
import WhySosikaWorksBetter from './components/sections/why-sosika-work-better';
import { getFeaturedVendors } from "@/lib/vendors";
import FeaturedVendorsSection from './components/sections/vendor-section';
import AwardsSection from './components/sections/awards';

export default async function Home() {
 const vendors = await getFeaturedVendors(3);

  return (
    <main className="min-h-screen">
     <Hero />
     <HowItWorks />
     <WhySosikaWorksBetter />
     <AwardsSection />
     <FeaturedVendorsSection vendors={vendors} /> 
     <Partnership />
    </main>
  );
}