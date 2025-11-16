import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'corporate';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-golden-orange to-golden-orange-dark text-warm-white hover:shadow-[0_8px_24px_-6px_rgba(236,140,68,0.4)] hover:scale-105 hover:brightness-110 shadow-[0_4px_14px_-6px_rgba(236,140,68,0.3)] focus:ring-golden-orange/50',
    secondary: 'bg-gradient-to-r from-mystic-mauve to-mystic-mauve-dark text-warm-white hover:shadow-[0_8px_24px_-6px_rgba(170,152,169,0.4)] hover:scale-105 hover:brightness-110 shadow-[0_4px_14px_-6px_rgba(170,152,169,0.3)] focus:ring-mystic-mauve/50',
    corporate: 'bg-gradient-to-r from-morocco-blue to-deep-blue text-warm-white hover:shadow-[0_8px_24px_-6px_rgba(74,108,133,0.4)] hover:scale-105 hover:brightness-110 shadow-[0_4px_14px_-6px_rgba(74,108,133,0.3)] focus:ring-morocco-blue/50',
    outline: 'bg-white/50 backdrop-blur-sm text-morocco-blue hover:bg-morocco-blue/10 hover:shadow-[0_4px_16px_-4px_rgba(74,108,133,0.2)] hover:scale-105 border border-morocco-blue/30 hover:border-morocco-blue/50 focus:ring-morocco-blue/30',
    text: 'text-morocco-blue hover:text-deep-blue hover:bg-morocco-blue/5 rounded-full px-2 focus:ring-morocco-blue/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={(e) => onClick?.(e)} type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
