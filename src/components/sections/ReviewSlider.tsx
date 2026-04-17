"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../common/Card';
import { Review } from '@/types';

interface ReviewSliderProps {
  reviews: Review[];
}

export const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews }) => {
  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 overflow-hidden bg-black text-white -mx-6 px-6">
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary">
          Client_Feedback
        </h2>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -1920], // Adjust based on content width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <Card 
              key={`${review.id}-${index}`} 
              bg="bg-white" 
              className="inline-block w-[400px] p-8 whitespace-normal text-black hover:scale-105 transition-transform duration-300 cursor-default"
            >
              <div className="flex flex-col gap-4">
                <p className="font-body font-bold italic text-lg leading-tight">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full border-2 border-black"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-headline font-black uppercase text-sm">{review.name}</h4>
                    <p className="font-body text-xs font-bold text-on-surface-variant">{review.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
