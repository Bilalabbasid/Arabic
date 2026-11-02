import React from 'react';
import Link from 'next/link';

interface MarkdownLinkRendererProps {
  text: string;
  className?: string;
}

/**
 * Parses inline markdown links [Label](url) and renders them as Next.js <Link> components.
 */
export default function MarkdownLinkRenderer({
  text,
  className = '',
}: MarkdownLinkRendererProps) {
  if (!text) return null;

  // Split on [label](url) pattern
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const label = match[1];
    const url = match[2];

    const isExternal = url.startsWith('http://') || url.startsWith('https://');

    if (isExternal) {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 transition-colors"
        >
          {label}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={match.index}
          href={url}
          className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 transition-colors"
        >
          {label}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push remainder
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
