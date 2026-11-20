import React from 'react';
import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variantClasses = {
    primary:
      'bg-[#E8A33D] hover:bg-[#D49232] active:bg-[#BF8127] text-[#13151A] font-semibold border border-[#E8A33D] hover:border-[#D49232]',
    secondary:
      'bg-[#1B1E25] hover:bg-[#232731] text-[#E8EAEE] border border-[#2D323D] hover:border-[#8C93A1]',
    outline:
      'bg-transparent hover:bg-[#1B1E25] text-[#E8EAEE] border border-[#2D323D] hover:border-[#8C93A1]',
    ghost:
      'bg-transparent hover:bg-[#1B1E25] text-[#8C93A1] hover:text-[#E8EAEE] border border-transparent',
    danger:
      'bg-[#E5534B] hover:bg-[#C9433C] text-white font-medium border border-[#E5534B]',
    success:
      'bg-[#3FB67A] hover:bg-[#349B67] text-[#13151A] font-semibold border border-[#3FB67A]',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'min-h-[44px] px-4 text-sm',
    lg: 'min-h-[48px] px-6 text-base font-medium',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-[4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8A33D] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
