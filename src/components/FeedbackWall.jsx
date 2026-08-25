import React, { useState } from 'react';
import { motion } from 'framer-motion';

function chunkIntoRows(items, rows) {
  if (!items || items.length === 0) return [];
  const result = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => result[i % rows].push(item));
  return result;
}

function FeedbackCard({ item }) {
  const formattedDate = item.created_at
    ? new Date(item.created_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  return (
    <div className="shrink-0 w-72 sm:w-80 mx-3 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(207,163,85,0.25)] hover:border-[#cfa355] transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center text-xl shrink-0">
            {item.emoji || '💜'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-[#111111] truncate">{item.name}</h4>
            {item.role && (
              <p className="text-xs text-[#393632] truncate font-medium">{item.role}</p>
            )}
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase text-neutral-500 shrink-0">
          {formattedDate}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#393632] leading-relaxed font-normal">
        “{item.message}”
      </p>
    </div>
  );
}

export function FeedbackWall({ items }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div className="text-neutral-500 text-center py-12 font-mono text-xs uppercase tracking-widest">
        Be the first to leave a feedback note above 👇
      </div>
    );
  }

  const rows = chunkIntoRows(items, 3);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex flex-col gap-6 overflow-hidden py-6 select-none w-full"
    >
      {/* Edge Blur Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#e5e5e0] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#e5e5e0] to-transparent z-10" />

      {rows.map((row, i) => {
        if (row.length === 0) return null;

        // Ensure enough items for seamless infinite marquee loop
        let duplicated = [...row];
        while (duplicated.length < 10) {
          duplicated = [...duplicated, ...row];
        }

        const direction = i % 2 === 0 ? -1 : 1;
        const duration = 35 + i * 8;

        return (
          <div key={i} className="overflow-hidden w-full flex">
            <motion.div
              className="flex"
              animate={
                isPaused
                  ? false
                  : { x: direction === -1 ? ['0%', '-50%'] : ['-50%', '0%'] }
              }
              transition={{
                repeat: Infinity,
                duration,
                ease: 'linear',
              }}
            >
              {duplicated.map((item, idx) => (
                <FeedbackCard key={`${item.id}-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
