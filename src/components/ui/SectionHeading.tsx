import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} max-w-3xl ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2.5 ${
            light ? 'text-[#DFCA9B]' : 'text-[#C7A66B]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight tracking-tight ${
          light ? 'text-white' : 'text-[#062B45]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${
            light ? 'text-gray-300' : 'text-[#60758B]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
