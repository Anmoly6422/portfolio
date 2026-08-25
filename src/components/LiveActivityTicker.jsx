import React from 'react';

export function LiveActivityTicker({ items = [] }) {
  const latestItem = items.length > 0 ? items[0] : null;

  return (
    <div className="w-full py-3.5 px-6 bg-black/90 border-y border-white/10 text-white font-mono text-xs overflow-hidden select-none flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-3 shrink-0">
        <span className="w-2 h-2 rounded-full bg-[#cfa355] animate-pulse" />
        <span className="text-neutral-400 uppercase tracking-widest text-[11px] hidden sm:inline">
          WALL OF LOVE STREAM
        </span>
        <span className="text-neutral-600">//</span>
        <span className="text-neutral-300 text-[11px]">
          {items.length} {items.length === 1 ? 'NOTE' : 'NOTES'} PUBLISHED
        </span>
      </div>

      {latestItem ? (
        <div className="flex items-center gap-2 overflow-hidden max-w-xl text-ellipsis whitespace-nowrap ml-4">
          <span className="text-[#cfa355] font-semibold uppercase text-[11px] shrink-0">
            LATEST FROM {latestItem.name}:
          </span>
          <span className="text-neutral-300 italic truncate text-[11px]">
            “{latestItem.message}”
          </span>
        </div>
      ) : (
        <div className="text-neutral-500 text-[11px] uppercase tracking-wider">
          READY FOR YOUR NOTE
        </div>
      )}
    </div>
  );
}
