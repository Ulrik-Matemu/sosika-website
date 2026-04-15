import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
  formatDate,
} from '@/lib/blog/articles';
import ContentRenderer from '@/app/components/blog/ContentRenderer';
import ShareButtons from '@/app/components/blog/SharesButton';
import BlogAnalyticsWrapper from '@/app/components/blog/blogAnalyticsWrapper';

// ── Types ──────────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ slug: string }>;
};

// ── Static generation ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── SEO metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found — Sosika Blog' };

  return {
    title: `${article.title} — Sosika Blog`,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

// ── JSON-LD structured data ────────────────────────────────────────────────────
function ArticleJsonLd({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author.name },
    datePublished: article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Sosika',
      logo: { '@type': 'ImageObject', url: 'https://sosika.co/logo.png' },
    },
    ...(article.coverImage && { image: article.coverImage }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: Props) {
  // In Next.js 15, params is a Promise that must be awaited
  const { slug } = await params;
  
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  return (
    <>
      <ArticleJsonLd article={article} />

      <BlogAnalyticsWrapper article={article}>
        <main className="min-h-screen bg-[#080b11] text-white">

          {/* ── Back nav ── */}
          <nav className="max-w-3xl absolute top-10 md:top-20 md:left-18 mx-auto px-6 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#29d9d5] transition-colors"
            >
              <span>←</span> Back to Blog
            </Link>
          </nav>

          {/* ── Hero ── */}
          <header className="max-w-3xl mx-auto px-6 pt-29 pb-0">
            {/* Category + read time */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#29d9d5]">
                {article.category}
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-white/40 text-xs">{article.readingTime} min read</span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-white/50 text-lg leading-relaxed mb-8">{article.excerpt}</p>

            {/* Author + date */}
            <div className="flex items-center gap-4 py-5 border-y border-white/[0.06]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#29d9d5]/10 shrink-0 flex items-center justify-center">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[#29d9d5] text-sm font-bold">
                    {article.author.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">{article.author.name}</p>
                <p className="text-white/35 text-xs">{article.author.role}</p>
              </div>
              <span className="ml-auto text-white/30 text-sm">{formatDate(article.publishedAt)}</span>
            </div>
          </header>

          {/* ── Cover image ── */}
          {article.coverImage && (
            <div className="max-w-4xl mx-auto px-6 mt-10">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#131820]">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            </div>
          )}

          {/* ── Article body ── */}
          <article className="max-w-3xl mx-auto px-6 py-12">
            <ContentRenderer blocks={article.content} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share row */}
            <div className="mt-8">
              <ShareButtons article={article} />
            </div>
          </article>

          {/* ── Related articles ── */}
          {related.length > 0 && (
            <section className="border-t border-white/[0.06] bg-[#0a0d14]">
              <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="italic text-2xl text-white mb-8">More from Sosika</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-[#0e1117] border border-white/[0.06] hover:border-[#29d9d5]/30 transition-all"
                    >
                      <div className="relative h-40 bg-[#131820]">
                        {rel.coverImage ? (
                          <Image
                            src={rel.coverImage}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#29d9d5]/10 to-transparent flex items-center justify-center">
                            <span className="text-[#29d9d5]/20 text-4xl italic">S</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-[#29d9d5] font-semibold tracking-widest uppercase mb-2">
                          {rel.category}
                        </p>
                        <h3 className="italic text-white text-lg leading-tight group-hover:text-[#29d9d5] transition-colors line-clamp-2">
                          {rel.title}
                        </h3>
                        <p className="text-white/35 text-xs mt-3">{formatDate(rel.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </BlogAnalyticsWrapper>
    </>
  );
}