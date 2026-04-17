"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-3 md:py-4 border-b-[4px] md:border-b-[6px] border-black mb-4 md:mb-8 bg-background sticky top-0 z-50">
      <Link href="/" className="text-xl md:text-3xl font-black tracking-tighter uppercase font-headline hover:text-hero-bg transition-colors">
        Kazi Tanvir.
      </Link>
      
      <div className="hidden md:flex gap-4 items-center">
        <Link 
          href="/"
          className="bg-white border-[3px] border-black px-4 py-1 font-headline uppercase font-bold text-sm neo-shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform"
        >
          Home
        </Link>
        <Link 
          href="/projects"
          className="bg-white border-[3px] border-black px-4 py-1 font-headline uppercase font-bold text-sm neo-shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform"
        >
          Projects
        </Link>
        
        <a href="/#contact" className="bg-primary-container border-[3px] border-black px-4 py-1 font-headline uppercase font-bold text-sm neo-shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform inline-block">
          Hire Me
        </a>
      </div>

      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-[-3px] right-[-3px] md:left-0 md:right-0 md:hidden bg-white border-b-[4px] border-black neo-shadow p-4 flex flex-col gap-4 z-40"
        >
          {[
            { name: 'Home', href: '/' },
            { name: 'Projects', href: '/projects' },
            { name: 'Hire Me', href: '/#contact' }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="font-headline uppercase tracking-widest text-base md:text-xl font-black text-center py-2 border-b-2 border-black/10 last:border-b-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};
