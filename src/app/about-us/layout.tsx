import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sosika | Sosika Delivery Co.",
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

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}