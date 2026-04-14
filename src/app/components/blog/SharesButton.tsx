// components/blog/ShareButtons.tsx
'use client';

import { useState } from 'react';
import type { Article } from '@/lib/blog/types';
import { captureShare } from '@/hooks/useBlogAnalytics';

export default function ShareButtons({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${article.slug}`
    : `/blog/${article.slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      captureShare(article, 'copy_link');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleWhatsApp() {
    captureShare(article, 'whatsapp');
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${article.title} — ${url}`)}`,
      '_blank'
    );
  }

  function handleTwitter() {
    captureShare(article, 'twitter');
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/30 text-xs uppercase tracking-widest">Share</span>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all
          bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white border border-white/[0.06]"
      >
        {copied ? '✓ Copied' : 'Copy link'}
      </button>
      <button
        onClick={handleWhatsApp}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all
          bg-white/[0.05] hover:bg-emerald-500/10 text-white/60 hover:text-emerald-400 border border-white/[0.06]"
      >
        WhatsApp
      </button>
      <button
        onClick={handleTwitter}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all
          bg-white/[0.05] hover:bg-sky-500/10 text-white/60 hover:text-sky-400 border border-white/[0.06]"
      >
        X / Twitter
      </button>
    </div>
  );
}