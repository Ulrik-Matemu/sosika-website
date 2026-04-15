// components/blog/BlogAnalyticsWrapper.tsx
'use client';

import { useBlogAnalytics } from '@/hooks/useBlogAnalytics';
import type { Article } from '@/lib/blog/types';

/**
 * Thin client component that activates PostHog blog analytics.
 * Wrap the article page body in this so the Server Component tree stays intact.
 */
export default function BlogAnalyticsWrapper({
  article,
  children,
}: {
  article: Article;
  children: React.ReactNode;
}) {
  useBlogAnalytics(article);
  return <>{children}</>;
}