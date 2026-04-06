import Hero from './components/sections/home-hero';
import HowItWorks from './components/sections/how-it-works';
import Partnership from './components/sections/partnership';

export default function Home() {
  return (
    <main className="min-h-screen">
     <Hero />
     <HowItWorks />
     <Partnership />
    </main>
  );
}