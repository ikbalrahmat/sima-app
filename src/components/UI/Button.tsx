import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-4 disabled:opacity-60 disabled:cursor-not-allowed";
  const widthClass = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: "bg-brand-900 text-white shadow-sm hover:bg-brand-950 focus-visible:ring-brand-500/50 hover:-translate-y-px",
    secondary: "bg-brand-500 text-white shadow-sm hover:bg-brand-600 focus-visible:ring-brand-500/50 hover:-translate-y-px",
    outline: "bg-transparent border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-200",
    text: "bg-transparent text-brand-600 hover:bg-brand-50 hover:text-brand-800"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" viewBox="0 0 24 24"></svg>
      ) : (
        <>
          {icon && <span className="mr-2 flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
