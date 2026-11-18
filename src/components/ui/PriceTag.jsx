import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

export default function PriceTag({ price, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-lg font-bold',
    xl: 'text-2xl font-black',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-accent font-mono ${sizeClasses[size]} ${className}`}>
      <span>{formatPrice(price)}</span>
      <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]">🪙</span>
    </div>
  );
}
