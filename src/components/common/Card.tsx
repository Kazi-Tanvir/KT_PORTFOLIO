import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  bg = 'bg-white',
  noShadow = false
}) => {
  return (
    <div className={`border-[3px] md:border-[5px] border-black ${bg} ${noShadow ? '' : 'neo-shadow'} ${className}`}>
      {children}
    </div>
  );
};
