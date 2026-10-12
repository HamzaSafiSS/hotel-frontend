import React from 'react';

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '7xl' | 'full';
  className?: string;
  children: React.ReactNode;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  size = '7xl',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
