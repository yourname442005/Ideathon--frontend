import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export default function Tag({ children, onClick, active, className }: TagProps) {
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono font-medium transition-colors',
        onClick && 'cursor-pointer hover:bg-zinc-200',
        active
          ? 'bg-black text-white'
          : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200',
        className
      )}
      {...(onClick && { type: 'button' as const })}
    >
      {children}
    </Component>
  );
}
