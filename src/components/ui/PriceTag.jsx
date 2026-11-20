import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

/** Coin SVG icon — not an emoji */
function CoinIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block shrink-0 opacity-90"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9h6M9 15h6" />
    </svg>
  );
}

const sizeMap = {
  xs: { text: 'text-xs', icon: 12 },
  sm: { text: 'text-xs font-medium', icon: 13 },
  md: { text: 'text-sm font-semibold', icon: 14 },
  lg: { text: 'text-base font-bold', icon: 16 },
  xl: { text: 'text-xl font-bold font-heading', icon: 20 },
};

export default function PriceTag({ price, size = 'md', className = '', showIcon = true }) {
  const { text, icon } = sizeMap[size] || sizeMap.md;

  return (
    <span
      className={`inline-flex items-center gap-1 tabular-nums text-[#E8A33D] ${text} ${className}`}
    >
      <span>{formatPrice(price)}</span>
      {showIcon && <CoinIcon size={icon} />}
    </span>
  );
}
