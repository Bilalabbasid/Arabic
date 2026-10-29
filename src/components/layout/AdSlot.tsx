import React from 'react';

interface Props {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
}

export default function AdSlot({ slotId, format = 'horizontal', className = '' }: Props) {
  return (
    <div
      className={`my-6 mx-auto w-full max-w-4xl bg-slate-50/80 border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px] text-center text-xs text-slate-400 ${className}`}
      aria-label="إعلان"
    >
      <span className="text-[10px] tracking-wider text-slate-400 uppercase mb-1">مساحة إعلانية</span>
      <div className="w-full flex items-center justify-center text-slate-300">
        <span>Google AdSense Slot</span>
      </div>
    </div>
  );
}
