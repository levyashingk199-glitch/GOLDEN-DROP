import React from 'react';
import clsx from 'clsx';
import { getRarity } from '../../utils/rarities';

export default function Badge({ rarity, children, className = '' }) {
  const r = rarity ? getRarity(rarity) : null;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
        r ? `${r.bgClass}/20 ${r.textClass} border ${r.borderClass}/40` : 'bg-base-300 text-base-content',
        className
      )}
      style={r ? { textShadow: `0 0 10px ${r.color}55` } : {}}
    >
      {r && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />}
      {children || r?.nameRu || r?.name}
    </span>
  );
}
