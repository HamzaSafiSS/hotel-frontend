import React from 'react';
import { Link } from 'react-router-dom';

export interface FooterLinkProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  to,
  href,
  children,
  className = '',
}) => {
  const baseClasses =
    'text-sm text-gray-300 hover:text-[#C7A66B] transition-colors duration-200 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66B] rounded-xs';

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return <span className={`${baseClasses} ${className}`}>{children}</span>;
};
