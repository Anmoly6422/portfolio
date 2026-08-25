import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

function chunkIntoRows(items, rows) {
  if (!items || items.length === 0) return [];
  const result = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => result[i % rows].push(item));
  return result;
}

function VelocityCard({ item, isHovered, isAnyHovered, onHover, onLeave }) {
  const formattedDate = item.created_at
    ? new Date(item.created_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  // Get initial letters for avatar monogram
  const initials = item.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const isDimmed = isAnyHovered && !isHovered;

  return (
    <div
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={onLeave}
      className={`shrink-0 w-80 sm:w-96 mx-4 my-2 transition-all duration-500 ${
        isHovered
          ? 'z-40 scale-105'
          : isDimmed
          ? 'opacity-35 blur-[1px] scale-95'
          : 'opacity-100 scale-100'
      }`}
    >
      <TiltCard
        maxTilt={10}
        className={`w-full rounded-2xl border transition-all duration-500 p-6 bg-[#121214]/90 backdrop-blur-xl ${
          isHovered
            ? 'border-[#cfa355] shadow-[0_20px_50px_rgba(207,163,85,0.35)]'
            : 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Top Header info */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Monogram Avatar with Ring */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#393632] to-[#1a1918] border border-[#cfa355]/40 flex items-center justify-center text-xs font-mono font-bold text-white shadow-inner shrink-0">
              {initials}
            </div>

            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-white truncate tracking-tight">{item.name}</h4>
              {item.role ? (
                <p className="text-[11px] font-mono text-[#cfa355] truncate uppercase tracking-wider">
                  {item.role}
                </p>
              ) : (
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Verified Guest
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg">{item.emoji || '💜'}</span>
            <span className="text-[10px] font-mono uppercase text-neutral-500">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Message body */}
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
          “{item.message}”
        </p>

        {/* Bottom Accent Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>REALTIME NOTE</span>
          <span className="text-neutral-400">#WALLOFLOVE</span>
        </div>
      </TiltCard>
    </div>
  );
}

export function FeedbackWall({ items }) {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-neutral-400 text-center py-16 font-mono text-xs uppercase tracking-widest">
        Be the first to sign the Wall of Love above 👇
      </div>
    );
  }

  const rows = chunkIntoRows(items, 2); // 2 Velocity Lanes
  const isAnyHovered = Boolean(hoveredCardId);

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden py-4 select-none w-full">
      {/* Edge Blur Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#e5e5e0] via-[#e5e5e0]/80 to-transparent z-30" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#e5e5e0] via-[#e5e5e0]/80 to-transparent z-30" />

      {rows.map((row, i) => {
        if (row.length === 0) return null;

        let duplicated = [...row];
        while (duplicated.length < 8) {
          duplicated = [...duplicated, ...row];
        }

        const direction = i % 2 === 0 ? -1 : 1;
        // Slow down smoothly when any card is hovered
        const duration = isAnyHovered ? 90 : 38 + i * 10;

        return (
          <div key={i} className="overflow-hidden w-full flex">
            <motion.div
              className="flex"
              animate={{ x: direction === -1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
              transition={{
                repeat: Infinity,
                duration,
                ease: 'linear',
              }}
            >
              {duplicated.map((item, idx) => (
                <VelocityCard
                  key={`${item.id}-${idx}`}
                  item={item}
                  isHovered={hoveredCardId === item.id}
                  isAnyHovered={isAnyHovered}
                  onHover={(id) => setHoveredCardId(id)}
                  onLeave={() => setHoveredCardId(null)}
                />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
