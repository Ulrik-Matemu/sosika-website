// components/blog/BlogSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, formatDate } from '@/lib/blog/articles';
import type { Article } from '@/lib/blog/types';

interface BlogSectionProps {
  /** Max articles to show. Defaults to 4 */
  limit?: number;
  /** Optional section heading override */
  heading?: string;
  /** Optional subheading override */
  subheading?: string;
  /** Show the "View all" link. Defaults to true */
  showViewAll?: boolean;
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0e1117] hover:border-[#29d9d5]/30 transition-all duration-300 hover:shadow-[0_0_48px_rgba(41,217,213,0.08)]">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#29d9d5]/15 via-[#0e1117] to-[#080b11]" />
          )}
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-7">
          {/* Category pill */}
          <span className="self-start mb-4 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-[#29d9d5]/10 text-[#29d9d5] border border-[#29d9d5]/20">
            {article.category}
          </span>

          <h3 className="font-bold text-[#FFFFF0] text-2xl md:text-[1.65rem] leading-snug tracking-tight mb-3 group-hover:text-[#29d9d5] transition-colors duration-200">
            {article.title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-5">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-white/35">
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SmallCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="flex gap-4 p-4 rounded-xl border border-white/[0.05] bg-[#0e1117] hover:border-[#29d9d5]/20 hover:bg-[#0e1117]/80 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#131820]">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="80px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#29d9d5]/15 to-transparent flex items-center justify-center">
              <span className="text-[#29d9d5]/30 text-xl font-bold">S</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center min-w-0 gap-1.5">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#29d9d5]/80">
            {article.category}
          </span>
          <h3 className="font-bold text-[#FFFFF0] text-sm leading-snug line-clamp-2 group-hover:text-[#29d9d5] transition-colors duration-200">
            {article.title}
          </h3>
          <span className="text-xs text-white/30">{article.readingTime} min read</span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogSection({
  limit = 4,
  heading = 'From Sosika Blog',
  subheading = 'Stories, guides, and updates from the Sosika team.',
  showViewAll = true,
}: BlogSectionProps) {
  const articles = getAllArticles().slice(0, limit);
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="w-full bg-[#080b11] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-[#29d9d5] mb-3">
              Sosika Stories
            </span>
            <h2 className="font-black text-[#FFFFF0] text-4xl md:text-5xl leading-none tracking-tight">
              {heading}
            </h2>
            <p className="text-slate-300 text-base mt-3 max-w-md">{subheading}</p>
          </div>
          {showViewAll && (
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#29d9d5] hover:text-white transition-colors group"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        {/* ── Layout: featured left + stack right ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_380px] gap-5">

          {/* Featured */}
          {featured && <FeaturedCard article={featured} />}

          {/* Right stack of small cards */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-3">
              {rest.map((article) => (
                <SmallCard key={article.id} article={article} />
              ))}

              {/* CTA card at the bottom of the stack */}
              {showViewAll && (
                <Link
                  href="/blog"
                  className="group mt-auto flex items-center justify-between p-4 rounded-xl border border-dashed border-white/[0.08] hover:border-[#29d9d5]/30 hover:bg-[#29d9d5]/[0.03] transition-all duration-300"
                >
                  <span className="text-sm font-semibold text-white/40 group-hover:text-[#29d9d5] transition-colors">
                    See all articles
                  </span>
                  <span className="text-white/20 group-hover:text-[#29d9d5] transition-all group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}