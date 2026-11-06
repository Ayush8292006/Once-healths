import React from 'react';

interface BottleImageProps {
  gender: 'women' | 'men';
  className?: string;
  imageClassName?: string;
  alt?: string;
  priority?: boolean;
  withShadow?: boolean;
  scale?: number;
  interactive?: boolean;
  /**
   * 'width'  (default) – bottle fills the width of its wrapper, height follows the aspect ratio.
   * 'height' – bottle fills a wrapper that has an explicit height + aspect-ratio (e.g. pinned story).
   */
  fit?: 'width' | 'height';
}

// Natural pixel sizes of the bottle artwork – lets the browser reserve space before the image loads
const SIZES = {
  women: { src: '/images/womens-multi.webp', width: 519, height: 1200 },
  men: { src: '/images/mens-multi.webp', width: 548, height: 1200 },
} as const;

export const BottleImage: React.FC<BottleImageProps> = ({
  gender,
  className = '',
  imageClassName = '',
  alt = 'ONCE HEALTH Premium Multivitamin Bottle',
  withShadow = true,
  scale = 1,
  interactive = false,
  fit = 'width',
}) => {
  const { src, width, height } = SIZES[gender];
  const shadowColor = gender === 'women' ? 'rgba(156, 61, 115, 0.18)' : 'rgba(47, 107, 140, 0.18)';
  const byHeight = fit === 'height';

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${
        byHeight ? 'h-full w-full' : 'w-full'
      } ${className} ${interactive ? 'group cursor-pointer' : ''}`}
      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
    >
      {/* The bottle – sized by its wrapper, never by the file's natural size */}
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        draggable={false}
        decoding="async"
        className={`relative z-10 object-contain md:drop-shadow-[0_15px_25px_rgba(33,29,29,0.08)] transition-transform duration-500 ease-out ${
          byHeight ? 'h-full w-full min-h-0' : 'w-full h-auto'
        } ${interactive ? 'group-hover:-translate-y-2.5' : ''} ${imageClassName}`}
        loading="eager"
      />

      {/* Soft contact shadow under the bottle */}
      {withShadow && (
        <div
          className={`relative -mt-5 z-0 w-3/4 h-4 shrink-0 rounded-full blur-[7px] transition-all duration-500 ease-out ${
            interactive ? 'group-hover:scale-95 group-hover:opacity-75 group-hover:blur-[9px]' : ''
          }`}
          style={{
            background: `radial-gradient(ellipse at center, rgba(33, 29, 29, 0.35) 0%, ${shadowColor} 45%, transparent 75%)`,
          }}
        />
      )}
    </div>
  );
};
