import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingState({ message = 'Loading...', className, fullScreen = false }: LoadingStateProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <Loader2 className="h-8 w-8 text-zinc-400 animate-spin mb-3" aria-hidden="true" />
      <p className="text-xs font-semibold text-zinc-900">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {content}
      </div>
    );
  }

  return content;
}
