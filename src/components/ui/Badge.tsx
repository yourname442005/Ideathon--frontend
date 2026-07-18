import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'violet';
  size?: 'sm' | 'md';
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', size = 'sm', pulse, children, className }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-[11px]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-mono font-semibold border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {pulse && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </span>
  );
}
