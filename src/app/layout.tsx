import { Titillium_Web } from 'next/font/google';
import './globals.css';
import Navbar from './components/shared/header-nav';
import Footer from './components/shared/footer';
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from './provider';
import PageViewTracker from './components/analytics/pageview-tracker';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium', // Define a CSS variable
});

export const metadata = {
  title: 'Sosika Delivery Co.',
  description: 'Explore local food in Tanzania with Sosika—fast delivery of meals, drinks, and snacks from trusted nearby vendors.',
  openGraph: {
    title: 'Sosika Delivery Co.',
    description: 'Food delivery, refined.',
    url: 'https://sosika.co.tz', // Replace with your actual domain
    siteName: 'Sosika',
    images: [
      {
        url: '/icon-512x512.png', // If you have a logo image in your /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_TZ',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titillium.variable} font-sans antialiased`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #062f3a 40%, #033a41 70%, #0b4f54 100%)',
        }}>
        <PostHogProvider>
          <PageViewTracker />
          <Navbar />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
      <Analytics />
    </html>
  );
}