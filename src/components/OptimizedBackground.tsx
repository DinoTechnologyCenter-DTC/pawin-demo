import React, { CSSProperties, useEffect, useState } from 'react';

// Extend Vite's import.meta type
declare global {
  interface ImportMeta {
    env: {
      DEV: boolean;
    };
  }
}

interface OptimizedBackgroundProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({
  src,
  className = '',
  style = {},
  children,
}) => {
  const [isWebPSupported, setIsWebPSupported] = useState<boolean | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check WebP support
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };
    
    setIsWebPSupported(checkWebPSupport());
  }, []);

  const getOptimizedImageUrl = (imgSrc: string) => {
    if (isWebPSupported === null) return '';
    
    // Skip if it's an external URL
    if (imgSrc.startsWith('http')) return imgSrc;
    
    // In development, use the original image
    if (import.meta.env.DEV) return imgSrc;
    
    // In production, Vite will handle the optimization
    return imgSrc;
  };

  const optimizedSrc = getOptimizedImageUrl(src);
  const backgroundImage = optimizedSrc ? `url(${optimizedSrc})` : '';

  return (
    <div 
      className={`relative ${className}`}
      style={{
        ...style,
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'opacity 0.3s ease-in-out',
        opacity: imageLoaded ? 1 : 0,
      }}
    >
      {optimizedSrc && (
        <img 
          src={optimizedSrc} 
          alt="" 
          className="hidden" 
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      )}
      {children}
    </div>
  );
};

export default OptimizedBackground;
