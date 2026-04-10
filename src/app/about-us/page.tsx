import AboutFeatures from "../components/sections/about-feature";
import AboutUsHero from "../components/sections/about-us-hero";
import MissionSection from "../components/sections/mission";
import OurTeamSection from "../components/sections/our-team";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sosika | Food Delivery Platform in Tanzania",
  description:
    "Learn about Sosika and how we are building a faster, fairer delivery platform for customers, vendors, and riders across Tanzania.",
  openGraph: {
    title: "About Sosika",
    description:
      "Discover the mission and vision behind Sosika's delivery platform.",
    url: "https://sosika.com/about-us",
    siteName: "Sosika",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUsHero />
      <MissionSection />
      <AboutFeatures />
      <OurTeamSection />
    </>
  );
}