// lib/blog/types.ts

export type ContentBlockType =
  | 'paragraph'
  | 'heading'
  | 'quote'
  | 'image'
  | 'list'
  | 'divider'
  | 'callout';

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3 | 4;
  text: string;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution?: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export interface DividerBlock {
  type: 'divider';
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'tip' | 'warning';
  text: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | QuoteBlock
  | ImageBlock
  | ListBlock
  | DividerBlock
  | CalloutBlock;

export interface ArticleAuthor {
  name: string;
  avatar?: string;
  role: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: ArticleAuthor;
  publishedAt: string; // ISO 8601
  readingTime: number; // minutes
  featured: boolean;
  content: ContentBlock[];
}