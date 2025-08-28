import React from 'react';

interface LogoProps {
  className?: string;
}

//pawin logo
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="/pawin-demo/img/pawin-logo-2.1.png"
      alt="PAWIN Logo"
      className={className}
      // Provide an approximate intrinsic size based on the logo's content
      // to help the browser with layout, even though CSS will override it.
      width="500" 
      height="150"
    />
  );
};

export default Logo;
