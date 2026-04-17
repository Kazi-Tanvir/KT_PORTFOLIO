import React from 'react';

type TagShape = 'rect' | 'ribbon-left' | 'capsule' | 'ribbon-right' | 'tab';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  shape?: TagShape;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  color = 'bg-primary', 
  shape = 'rect',
  className = ''
}) => {
  const baseStyles = "inline-flex items-center px-4 py-1.5 text-[10px] md:text-xs font-black uppercase border-2 border-black relative transition-transform hover:scale-105 cursor-default";
  
  const shapes = {
    rect: "rounded-none",
    capsule: "rounded-full px-6",
    'ribbon-left': "rounded-none [clip-path:polygon(10%_0,100%_0,100%_100%,10%_100%,0%_50%)] pl-6",
    'ribbon-right': "rounded-none [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%)] pr-6",
    tab: "rounded-t-lg rounded-b-none"
  };
  
  return (
    <span className={`${baseStyles} ${color} ${shapes[shape]} ${className}`}>
      {children}
    </span>
  );
};
