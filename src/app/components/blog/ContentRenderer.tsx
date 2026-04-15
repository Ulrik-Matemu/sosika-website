// components/blog/ContentRenderer.tsx
import Image from 'next/image';
import type { ContentBlock } from '@/lib/blog/types';

function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-white/70 text-[1.0625rem] leading-[1.85] tracking-[0.01em]">{text}</p>
  );
}

function Heading({ level, text }: { level: 2 | 3 | 4; text: string }) {
  const classMap = {
    2: 'text-2xl md:text-3xl italic text-white mt-12 mb-4',
    3: 'text-xl md:text-2xl italic text-white mt-8 mb-3',
    4: 'text-lg font-semibold text-white/90 mt-6 mb-2',
  };
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return <Tag className={classMap[level]}>{text}</Tag>;
}

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="relative my-10 px-8 py-6 rounded-xl bg-[#29d9d5]/[0.05] border-l-4 border-[#29d9d5]">
      <span className="absolute -top-4 left-6 text-[#29d9d5] text-6xl leading-none select-none opacity-30">
        "
      </span>
      <p className="text-white/80 text-lg italic leading-relaxed font-serif">{text}</p>
      {attribution && (
        <cite className="block mt-3 text-sm text-[#29d9d5]/70 not-italic font-medium tracking-wide">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

function InlineImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#131820]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-white/35 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

function BulletList({ ordered, items }: { ordered: boolean; items: string[] }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`my-5 space-y-2 pl-6 ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {items.map((item, i) => (
        <li key={i} className="text-white/70 text-[1.0625rem] leading-relaxed pl-1">
          {item}
        </li>
      ))}
    </Tag>
  );
}

function Divider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="text-[#29d9d5]/40 text-lg">✦</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

function Callout({ variant, text }: { variant: 'info' | 'tip' | 'warning'; text: string }) {
  const styles = {
    info:    { border: 'border-blue-500/30',   bg: 'bg-blue-500/5',   text: 'text-blue-400',   icon: 'ℹ' },
    tip:     { border: 'border-[#29d9d5]/30',  bg: 'bg-[#29d9d5]/5', text: 'text-[#29d9d5]',  icon: '💡' },
    warning: { border: 'border-amber-500/30',  bg: 'bg-amber-500/5',  text: 'text-amber-400',  icon: '⚠' },
  }[variant];

  return (
    <div className={`my-8 flex gap-4 rounded-xl border px-5 py-4 ${styles.border} ${styles.bg}`}>
      <span className={`text-lg mt-0.5 ${styles.text}`}>{styles.icon}</span>
      <p className="text-white/65 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export default function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <Paragraph key={i} text={block.text} />;
          case 'heading':
            return <Heading key={i} level={block.level} text={block.text} />;
          case 'quote':
            return <Quote key={i} text={block.text} attribution={block.attribution} />;
          case 'image':
            return <InlineImage key={i} src={block.src} alt={block.alt} caption={block.caption} />;
          case 'list':
            return <BulletList key={i} ordered={block.ordered} items={block.items} />;
          case 'divider':
            return <Divider key={i} />;
          case 'callout':
            return <Callout key={i} variant={block.variant} text={block.text} />;
          default:
            return null;
        }
      })}
    </div>
  );
}