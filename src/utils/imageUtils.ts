import React, { ImgHTMLAttributes } from 'react';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
}

export const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  style = {},
  ...props
}) => {
  // Convert image path to use WebP if browser supports it
  const getOptimizedSrc = (imgSrc: string): string => {
    if (typeof window === 'undefined') return imgSrc; // Server-side rendering
    
    const isWebPSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    if (!isWebPSupported) return imgSrc;
    
    // Skip if already a WebP image or external URL
    if (imgSrc.endsWith('.webp') || imgSrc.startsWith('http')) return imgSrc;
    
    // Convert to WebP
    return imgSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp') || imgSrc;
  };

  const imgStyle: React.CSSProperties = {
    ...style,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
  };

  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src: getOptimizedSrc(src),
    alt,
    className,
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
    loading,
    decoding,
    style: imgStyle,
    ...props
  };

  return React.createElement('img', imgProps);
};

// Extend Vite's import.meta type
declare global {
  interface ImportMeta {
    env: {
      DEV: boolean;
    };
  }
}

export const getOptimizedImageUrl = (src: string): string => {
  // In development, return the original src
  if (import.meta.env.DEV) return src;
  
  // In production, Vite will handle the optimization
  // This assumes you're using Vite's asset handling
  return new URL(`/src/assets/${src}`, import.meta.url).href;
};

