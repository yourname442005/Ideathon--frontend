import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ title, description, action, icon, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-zinc-200 pb-4',
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
          {icon}
          {title}
        </h1>
        {description && (
          <p className="text-sm text-zinc-500 mt-0.5">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
