// lib/blog/articles.ts
// Server-side data access — safe to import in Server Components and generateStaticParams

import type { Article } from './../blog/types';
import articlesData from '@/data/articles.json';

const articles = articlesData as Article[];

/** Return all articles sorted newest first */
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Return featured articles */
export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

/** Return articles by category */
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

/** Return a single article by slug, or undefined */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Return all unique slugs — used by generateStaticParams */
export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

/** Return all unique categories */
export function getAllCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))];
}

/** Return articles related to a given article (same category, excluding self) */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}

/** Format ISO date string to readable format */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}