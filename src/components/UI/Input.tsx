import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', id, ...props }) => {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={`flex flex-col mb-4 w-full ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 flex items-center justify-center text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full rounded-lg bg-white border outline-none transition-all duration-150 py-2.5
            ${icon ? 'pl-10 pr-3' : 'px-3'}
            ${error 
              ? 'border-red-500 focus:ring-4 focus:ring-red-500/15' 
              : 'border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15'
            }
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1.5">{error}</span>}
    </div>
  );
};
