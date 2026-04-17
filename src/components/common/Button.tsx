"use client";

import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

type ButtonBaseProps = Omit<HTMLMotionProps<"button">, 'children'>;

interface ButtonProps extends ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-headline uppercase font-black transition-all duration-100 border-black";
  
  const variants = {
    primary: "bg-primary-container border-[4px] neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
    secondary: "bg-white border-[3px] neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
    outline: "bg-transparent border-[4px] neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-8 py-3 text-lg",
    lg: "px-12 py-5 text-2xl"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
