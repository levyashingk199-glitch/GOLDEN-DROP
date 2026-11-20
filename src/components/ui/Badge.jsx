import React from 'react';
import clsx from 'clsx';
import { getRarity } from '../../utils/rarities';

export default function Badge({ rarity, children, className = '' }) {
  const r = rarity ? getRarity(rarity) : null;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-xs font-medium tracking-wide bg-[#1B1E25] border border-[#2D323D]',
        className
      )}
    >
      {r && (
        <span
          className="w-2 h-2 rounded-[2px] flex-shrink-0"
          style={{ backgroundColor: r.color }}
        />
      )}
      <span style={r ? { color: r.color } : { color: '#E8EAEE' }}>
        {children || r?.nameRu || r?.name}
      </span>
    </span>
  );
}
