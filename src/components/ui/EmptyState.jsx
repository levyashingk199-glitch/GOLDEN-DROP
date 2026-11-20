import React from 'react';
import Button from './Button';

export default function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-[#1B1E25] border border-[#2D323D] rounded-[8px] min-h-[220px] ${className}`}
    >
      {icon && <div className="text-[#8C93A1] mb-3 text-3xl">{icon}</div>}
      <h3 className="font-heading text-xl text-[#E8EAEE] tracking-wide mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-[#8C93A1] max-w-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button size="sm" variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
