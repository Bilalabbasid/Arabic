import React from 'react';

interface Props {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
}

export default function AdSlot({ slotId, format = 'horizontal', className = '' }: Props) {
  // Hide all ad placeholders until AdSense account is approved and enabled
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== 'true') {
    return null;
  }

  return (
    <div
      className={`my-6 mx-auto w-full max-w-4xl bg-slate-50/80 border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px] text-center text-xs text-slate-400 ${className}`}
      aria-label="إعلان"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="[FILL: pub-XXXXXXXXXXXXXXXX]"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
