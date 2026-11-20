import React from 'react';
import { RARITIES } from '../../utils/rarities';

export default function RarityStrip({ rarities, height = 3, className = '' }) {
  // Если передан список редкостей с долями
  if (Array.isArray(rarities) && rarities.length > 0) {
    return (
      <div
        className={`w-full flex overflow-hidden ${className}`}
        style={{ height: `${height}px` }}
      >
        {rarities.map((item, idx) => {
          const r = RARITIES[item.rarity?.toUpperCase()] || RARITIES.CONSUMER;
          const pct = item.percent || (100 / rarities.length);
          return (
            <div
              key={idx}
              style={{
                width: `${pct}%`,
                backgroundColor: r.color,
              }}
              title={`${r.nameRu || r.name}: ${pct}%`}
            />
          );
        })}
      </div>
    );
  }

  // Одиночная редкость для скина
  const r = typeof rarities === 'string'
    ? RARITIES[rarities.toUpperCase()] || RARITIES.CONSUMER
    : RARITIES.CONSUMER;

  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor: r.color,
      }}
    />
  );
}
