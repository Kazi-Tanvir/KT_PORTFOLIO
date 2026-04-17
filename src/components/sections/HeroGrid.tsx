"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Tag } from '../common/Tag';
import { Skill } from '@/types';

interface HeroGridProps {
  skills: Skill[];
}

export const HeroGrid: React.FC<HeroGridProps> = ({ skills }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-[auto] md:min-h-[80vh] mb-8 md:mb-12">
      {/* Left Half: Hero */}
      <Card bg="bg-hero-bg" className="p-6 md:p-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-headline text-4xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-white text-stroke mb-4 md:mb-8">
            Full Stack <br /> Dev.
          </h1>
          <p className="bg-black text-white inline-block px-3 md:px-4 py-1.5 md:py-2 text-base md:text-xl font-bold mb-6 md:mb-10 self-start">
            Computer Science @ BUET
          </p>
          <Button size="md" className="w-fit md:px-12 md:py-5 md:text-2xl">
            Let's Talk →
          </Button>
        </motion.div>
      </Card>

      {/* Right Half: About + Tech Stack */}
      <div className="grid grid-rows-2 gap-4 md:gap-6">
        {/* Top Half: About */}
        <Card bg="bg-about-bg" className="p-5 md:p-8 flex flex-col justify-center">
          <h2 className="font-headline text-2xl md:text-3xl font-black uppercase border-b-[3px] md:border-b-[4px] border-black inline-block mb-4 md:mb-6 self-start">
            The Pitch
          </h2>
          <p className="font-body text-sm md:text-lg leading-relaxed font-bold">
            Building high-performance web systems with raw passion and engineering precision. Based in Dhaka, shipping worldwide.
          </p>
        </Card>

        {/* Bottom Half: Tech Stack */}
        <Card bg="bg-white" className="p-5 md:p-8 flex flex-col justify-center">
          <h3 className="font-headline text-xl md:text-2xl font-black uppercase mb-4 md:mb-6">Arsenal</h3>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {skills.map((skill, index) => {
              const shapes: any[] = ['rect', 'capsule', 'ribbon-left', 'ribbon-right', 'tab'];
              const colors = ['bg-primary', 'bg-primary-container', 'bg-about-bg', 'bg-hero-bg', 'bg-milestone-bg'];
              return (
                <Tag 
                  key={skill.name} 
                  shape={shapes[index % shapes.length]}
                  color={colors[index % colors.length]}
                >
                  {skill.name}
                </Tag>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};
