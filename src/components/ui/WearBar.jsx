import React from 'react';

export default function WearBar({ float, showLabel = true, className = '' }) {
  const safeFloat = Math.max(0, Math.min(1, Number(float) || 0));
  const percentage = (safeFloat * 100).toFixed(2);

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-[11px] text-[#8C93A1] tabular-nums">
          <span>Float</span>
          <span className="font-mono text-[#E8EAEE]">{safeFloat.toFixed(4)}</span>
        </div>
      )}
      <div className="relative w-full h-1.5 rounded-[2px] bg-[#232731] overflow-hidden">
        {/* Градиент зон износа */}
        <div className="w-full h-full bg-gradient-to-r from-[#3FB67A] via-[#E8A33D] to-[#E5534B] opacity-80" />

        {/* Разделители зон FN(7%), MW(15%), FT(38%), WW(45%) */}
        <div className="absolute top-0 bottom-0 left-[7%] w-px bg-[#13151A]" />
        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-[#13151A]" />
        <div className="absolute top-0 bottom-0 left-[38%] w-px bg-[#13151A]" />
        <div className="absolute top-0 bottom-0 left-[45%] w-px bg-[#13151A]" />
      </div>

      {/* Маркер позиции float */}
      <div className="relative w-full h-2">
        <div
          className="absolute -top-1 w-1.5 h-2.5 bg-white border border-[#13151A] rounded-[1px] -translate-x-1/2 shadow-sm"
          style={{ left: `${percentage}%` }}
          title={`Float: ${safeFloat.toFixed(4)}`}
        />
      </div>
    </div>
  );
}
