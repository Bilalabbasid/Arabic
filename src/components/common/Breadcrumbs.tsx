import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="فتات الخبز" className={`flex items-center text-xs text-slate-500 overflow-x-auto py-2 ${className}`}>
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400 rtl:rotate-0 ltr:rotate-180" />
              {isLast ? (
                <span className="font-semibold text-slate-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
