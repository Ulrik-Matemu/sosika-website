import { CookingPot, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-600 px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Logo / Icon Section */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <CookingPot size={48} className="text-[#00FFFF]" />
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-4">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-[#00FFFF]`}>Sosika</h1>
          <h2 className="text-4xl md:text-5xl font-300 tracking-tight text-slate-900">
            Something delicious is <br />
            <span className="text-[#00FFFF]">coming soon.</span>
          </h2>
        </div>

        {/* Progress Indicator (Optional) */}
        <div className="max-w-xs mx-auto">
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#00FFFF] w-3/4 rounded-full animate-pulse" />
          </div>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-semibold">
            Website under construction : 75%
          </p>
          <Link href="https://sosika.app">
            <button className="mt-4 px-4 py-2 bg-[#00FFFF] font-bold text-black rounded-md hover:bg-[#00CCCC] transition-colors">
              Open App
            </button>
          </Link>
        </div>

        {/* Action / Socials */}
        <div className="pt-8 border-t border-slate-200 flex flex-col items-center gap-6">
          <p className="text-sm font-medium text-slate-500">Stay updated:</p>
          <div className="flex gap-6 text-slate-400">
            {/* <a href="#" className="hover:text-orange-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              <Twitter size={24} />
            </a> */}
            <a href="mailto:sosika.app@gmail.com" className="hover:text-orange-600 transition-colors mb-10">
              <Mail size={24} />
            </a>
          </div>
        </div>

      </div>
      
      {/* Subtle Footer */}
      <footer className="absolute bottom-8 text-slate-400 text-xs text-center tracking-wide">
        &copy; {new Date().getFullYear()} SOSIKA DELIVERY COMPANY. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}