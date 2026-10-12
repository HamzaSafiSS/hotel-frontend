import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline-gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#062B45] text-white hover:bg-[#0A3D60] active:bg-[#041D2F] shadow-sm hover:shadow',
    secondary:
      'bg-white text-[#18324A] border border-[#D8E0EA] hover:border-[#C7A66B] hover:text-[#062B45] hover:bg-[#EAF2FF]/40 shadow-xs',
    gold:
      'bg-[#C7A66B] text-white hover:bg-[#B39257] active:bg-[#9A7B44] shadow-sm hover:shadow',
    'outline-gold':
      'bg-transparent text-[#C7A66B] border border-[#C7A66B] hover:bg-[#C7A66B] hover:text-white',
    ghost:
      'bg-transparent text-[#18324A] hover:bg-[#EAF2FF]/60 hover:text-[#062B45]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
