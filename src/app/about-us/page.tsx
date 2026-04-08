import AboutFeatures from "../components/sections/about-feature";
import AboutUsHero from "../components/sections/about-us-hero";
import MissionSection from "../components/sections/mission";

export default function AboutUsPage() {
  return (
    <>
      <AboutUsHero />
      <MissionSection />
      <AboutFeatures />
    </>
  );
}