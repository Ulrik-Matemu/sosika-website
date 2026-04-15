// hooks/useBlogAnalytics.ts
'use client';

import { useEffect, useRef } from 'react';
import type { Article } from '@/lib/blog/types';

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Tracks rich blog reading analytics via PostHog.
 *
 * Events emitted:
 *  - blog_article_viewed      — on mount (page load)
 *  - blog_scroll_depth        — at 25%, 50%, 75%, 100% scroll milestones
 *  - blog_read_complete       — when user hits 75%+ scroll AND 60s+ time on page
 *  - blog_article_abandoned   — on beforeunload if < 25% scroll
 */
export function useBlogAnalytics(article: Article) {
  const startTimeRef = useRef<number>(Date.now());
  const milestonesFiredRef = useRef<Set<number>>(new Set());
  const readCompleteRef = useRef<boolean>(false);

  function capture(event: string, props: Record<string, unknown> = {}) {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(event, {
        article_id: article.id,
        article_slug: article.slug,
        article_title: article.title,
        article_category: article.category,
        article_tags: article.tags,
        article_author: article.author.name,
        article_reading_time_min: article.readingTime,
        ...props,
      });
    }
  }

  useEffect(() => {
    // ── Article viewed ──
    capture('blog_article_viewed', {
      referrer: document.referrer || 'direct',
    });

    // ── Scroll depth milestones ──
    const MILESTONES = [25, 50, 75, 100];

    function getScrollPercent(): number {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    }

    function handleScroll() {
      const pct = getScrollPercent();

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !milestonesFiredRef.current.has(milestone)) {
          milestonesFiredRef.current.add(milestone);
          capture('blog_scroll_depth', { scroll_depth_pct: milestone });
        }
      }

      // Read complete = 75%+ scroll AND 60s+ on page
      if (
        !readCompleteRef.current &&
        pct >= 75 &&
        Date.now() - startTimeRef.current >= 60_000
      ) {
        readCompleteRef.current = true;
        capture('blog_read_complete', {
          time_on_page_sec: Math.round((Date.now() - startTimeRef.current) / 1000),
        });
      }
    }

    // ── Abandon tracking ──
    function handleUnload() {
      const pct = getScrollPercent();
      if (pct < 25) {
        capture('blog_article_abandoned', {
          scroll_depth_pct: pct,
          time_on_page_sec: Math.round((Date.now() - startTimeRef.current) / 1000),
        });
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug]);
}

/**
 * Call this when the user clicks a share/copy link button.
 */
export function captureShare(article: Article, method: 'copy_link' | 'twitter' | 'whatsapp') {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('blog_article_shared', {
      article_slug: article.slug,
      article_title: article.title,
      share_method: method,
    });
  }
}