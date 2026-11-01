'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CountryFlagProps {
  countryCode: string;
  nameAr?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackEmoji?: string;
}

const sizeClasses = {
  xs: 'w-4 h-3 rounded-[2px]',
  sm: 'w-5 h-3.5 rounded-[3px]',
  md: 'w-6 h-4 rounded-[3px]',
  lg: 'w-8 h-5 rounded-[4px]',
  xl: 'w-10 h-7 rounded-[5px]',
};

const dimensions = {
  xs: { width: 16, height: 12 },
  sm: { width: 20, height: 14 },
  md: { width: 24, height: 16 },
  lg: { width: 32, height: 20 },
  xl: { width: 40, height: 28 },
};

export default function CountryFlag({
  countryCode,
  nameAr,
  className = '',
  size = 'md',
  fallbackEmoji,
}: CountryFlagProps) {
  const [hasError, setHasError] = useState(false);
  const code = countryCode ? countryCode.toLowerCase() : '';
  const dim = dimensions[size];

  if (!code || hasError) {
    if (fallbackEmoji) {
      return <span className={`inline-block leading-none ${className}`}>{fallbackEmoji}</span>;
    }
    return (
      <span
        className={`inline-flex items-center justify-center font-bold text-[10px] bg-slate-100 text-slate-600 border border-slate-200 uppercase ${sizeClasses[size]} ${className}`}
      >
        {countryCode}
      </span>
    );
  }

  return (
    <Image
      src={`/flags/${code}.svg`}
      alt={nameAr ? `علم ${nameAr}` : `علم ${countryCode}`}
      width={dim.width}
      height={dim.height}
      unoptimized
      onError={() => setHasError(true)}
      className={`inline-block object-cover border border-slate-200/90 shadow-xs shrink-0 select-none ${sizeClasses[size]} ${className}`}
    />
  );
}
