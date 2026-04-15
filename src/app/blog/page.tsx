// app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getFeaturedArticles, getAllCategories, formatDate } from '@/lib/blog/articles';
import type { Article } from '@/lib/blog/types';

export const metadata: Metadata = {
  title: 'Blog — Sosika',
  description:
    'Stories, guides, and insights from the Sosika team on food delivery, restaurant growth, and the future of food in Tanzania.',
  openGraph: {
    title: 'Sosika Blog',
    description: 'Food delivery insights, restaurant guides, and company news from Sosika Tanzania.',
    type: 'website',
  },
};

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group block ${featured ? 'col-span-full' : ''}`}
    >
      <article
        className={`relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06] transition-all duration-300 group-hover:border-[#29d9d5]/30 group-hover:shadow-[0_0_40px_rgba(41,217,213,0.07)] ${
          featured ? 'grid md:grid-cols-2' : 'flex flex-col'
        }`}
      >
        {/* Cover image */}
        <div
          className={`relative overflow-hidden bg-[#131820] ${
            featured ? 'min-h-[320px]' : 'h-[200px]'
          }`}
        >
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            /* Placeholder with brand gradient */
            <div className="absolute inset-0 bg-gradient-to-br from-[#29d9d5]/20 via-[#0e1117] to-[#0e1117] flex items-center justify-center">
              <span className="text-[#29d9d5]/30 text-6xl italic select-none">S</span>
            </div>
          )}
          {/* Category pill */}
          <span className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-[#29d9d5]/10 text-[#29d9d5] border border-[#29d9d5]/20 backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className={`flex flex-col p-6 ${featured ? 'justify-center gap-4 md:p-10' : 'gap-3'}`}>
          <h2
            className={`font-bold text-white leading-tight tracking-tight transition-colors group-hover:text-[#29d9d5] ${
              featured ? 'text-3xl md:text-4xl' : 'text-xl'
            }`}
          >
            {article.title}
          </h2>
          <p className={`text-white/50 leading-relaxed ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.05]">
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs">{formatDate(article.publishedAt)}</p>
            </div>
            <span className="text-white/30 text-xs shrink-0">{article.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const allArticles = getAllArticles();
  const [featured, ...rest] = allArticles;
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-[#080b11] text-white">
      {/* ── Hero header ── */}
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(41,217,213,0.12),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#29d9d5] mb-4">
            Sosika Stories
          </span>
          <h1 className="font-black text-5xl md:text-7xl text-white leading-none mb-4">
            The Sosika Blog
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Insights on food delivery, growth guides for restaurant partners, and the story of building Sosika.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16">
       

        {/* ── Featured article ── */}
        {featured && (
          <div className="mb-8">
            <ArticleCard article={featured} featured />
          </div>
        )}

        {/* ── Article grid ── */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {allArticles.length === 0 && (
          <p className="text-white/30 text-center py-24">No articles yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}