import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'corporate';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full';

  const variants = {
    primary: 'bg-golden-orange text-warm-white hover:bg-golden-orange-dark shadow-md hover:shadow-lg',
    secondary: 'bg-mystic-mauve text-warm-white hover:bg-mystic-mauve-dark shadow-md hover:shadow-lg',
    corporate: 'bg-morocco-blue text-warm-white hover:bg-deep-blue shadow-md hover:shadow-lg',
    outline: 'border-2 border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-warm-white',
    text: 'text-morocco-blue hover:text-deep-blue',
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
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
