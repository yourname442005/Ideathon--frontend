import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export default function Avatar({ src, alt, size = 'md', className, showBorder = true }: AvatarProps) {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-24 w-24',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'rounded-full object-cover',
        sizes[size],
        showBorder && 'border border-zinc-200',
        className
      )}
      referrerPolicy="no-referrer"
    />
  );
}
