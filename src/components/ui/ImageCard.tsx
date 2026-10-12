import React from 'react';

export interface ImageCardProps {
  imageUrl: string;
  alt: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'landscape';
  className?: string;
  onClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  alt,
  title,
  subtitle,
  badge,
  aspectRatio = 'landscape',
  className = '',
  onClick,
}) => {
  const aspectClasses = {
    video: 'aspect-16/9',
    square: 'aspect-square',
    portrait: 'aspect-3/4',
    landscape: 'aspect-4/3',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-[#D8E0EA] bg-white transition-all duration-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]}`}>
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for luxury feel */}
        {(title || subtitle) && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B45]/90 via-[#062B45]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        )}

        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block rounded bg-[#062B45]/85 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium tracking-wider text-white uppercase">
              {badge}
            </span>
          </div>
        )}

        {(title || subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
            {title && (
              <h3 className="font-serif text-lg font-medium leading-snug drop-shadow-xs">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-gray-200 line-clamp-2 leading-relaxed font-sans">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
