import { Titillium_Web } from 'next/font/google';
import './globals.css';
import Navbar from './components/shared/header-nav';
import Footer from './components/shared/footer';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium', // Define a CSS variable
});

export const metadata = {
  title: 'Sosika Delivery Co.',
  description: 'The ultimate food delivery experience in Tanzania. Official Website Launching soon!',
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
          background: 'linear-gradient(135deg, #f0fdfc 0%, #e6fafa 40%, #ccf5f4 70%, #b8f0ef 100%)',
        }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}