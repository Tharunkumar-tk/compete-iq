import React from 'react';
import { Search, Smartphone } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Smartphone base */}
        <Smartphone className="text-compete-purple w-full h-full" />
        
        {/* Magnifying glass overlay */}
        <Search 
          className="absolute top-1 right-1 w-1/2 h-1/2 text-compete-green animate-pulse-slow" 
          strokeWidth={3}
        />
        
        {/* Pulse/Signal line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-4 bg-gradient-to-t from-compete-red to-compete-green opacity-80 animate-bounce-slow"></div>
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]}`}>
          <span className="text-compete-white">Compete</span>
          <span className="bg-gradient-to-r from-compete-purple to-compete-green bg-clip-text text-transparent">IQ</span>
        </div>
      )}
    </div>
  );
};