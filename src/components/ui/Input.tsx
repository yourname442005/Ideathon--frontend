import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-semibold text-zinc-600 block"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 transition-colors',
              'focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-100',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon ? 'pl-9' : '',
              error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[10px] text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
