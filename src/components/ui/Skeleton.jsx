import React from 'react';

export function CardSkeleton({ className = '' }) {
  return (
    <div
      className={`bg-[#1B1E25] border border-[#2D323D] rounded-[8px] p-4 flex flex-col gap-3 animate-pulse ${className}`}
    >
      <div className="w-full h-36 bg-[#232731] rounded-[4px]" />
      <div className="h-4 bg-[#232731] rounded-[2px] w-3/4" />
      <div className="h-3 bg-[#232731] rounded-[2px] w-1/2" />
      <div className="h-9 bg-[#232731] rounded-[4px] mt-2 w-full" />
    </div>
  );
}

export function RowSkeleton({ className = '' }) {
  return (
    <div
      className={`bg-[#1B1E25] border border-[#2D323D] rounded-[4px] p-3 flex items-center justify-between gap-4 animate-pulse ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#232731] rounded-[4px]" />
        <div className="flex flex-col gap-1.5">
          <div className="w-28 h-3.5 bg-[#232731] rounded-[2px]" />
          <div className="w-16 h-2.5 bg-[#232731] rounded-[2px]" />
        </div>
      </div>
      <div className="w-16 h-4 bg-[#232731] rounded-[2px]" />
    </div>
  );
}

export default function Skeleton({ className = '' }) {
  return <div className={`bg-[#232731] rounded-[4px] animate-pulse ${className}`} />;
}
