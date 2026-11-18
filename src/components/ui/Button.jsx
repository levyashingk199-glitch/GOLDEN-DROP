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
    primary: 'btn-primary shadow-lg shadow-primary/20',
    secondary: 'btn-secondary',
    accent: 'btn-accent text-neutral font-bold shadow-lg shadow-accent/20',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
    error: 'btn-error',
    success: 'btn-success',
  };

  const sizeClasses = {
    sm: 'btn-sm text-xs',
    md: 'btn-md text-sm',
    lg: 'btn-lg text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        'btn rounded-xl font-semibold transition-all duration-200 active:scale-95',
        variantClasses[variant] || 'btn-primary',
        sizeClasses[size] || 'btn-md',
        loading && 'loading',
        className
      )}
      {...props}
    >
      {loading ? <span className="loading loading-spinner loading-sm"></span> : null}
      {children}
    </button>
  );
}
