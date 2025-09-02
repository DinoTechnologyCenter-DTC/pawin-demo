import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [show, setShow] = useState(true);
  const MIN_LOADING_TIME = 2000; // 2 seconds minimum loading time

  useEffect(() => {
    const loadStartTime = Date.now();

    const handleLoad = () => {
      const loadTime = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - loadTime);
      
      setTimeout(() => {
        setShow(false);
        // Remove from DOM after animation completes
        setTimeout(() => {
          const loader = document.getElementById('global-loader');
          if (loader) loader.remove();
        }, 300);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      id="global-loader"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 transition-opacity duration-300"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] rounded-full opacity-20 blur-xl"></div>
        <div className="relative z-10 p-6">
          <img 
            src="/img/logo-icon.png" 
            alt=""
            className="h-32 w-32 md:h-40 md:w-40 animate-pulse"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
