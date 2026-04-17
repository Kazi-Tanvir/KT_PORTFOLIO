import React from 'react';
import { Card } from '../common/Card';
import { Education } from '@/types';

interface MilestonesSectionProps {
  education: Education[];
}

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({ education }) => {
  const milestones = [
    ...education.map(edu => ({ ...edu, isAward: false })),

  ];

  return (
    <section className="space-y-12 mb-24">
      <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter border-b-[8px] border-black pb-4">
        Milestones
      </h2>
      
      <div className="relative ml-8 pl-12 space-y-16 py-8">
        {milestones.map((item, index) => (
          <div key={item.degree} className="relative">
            {/* Timeline Line Segment */}
            <div className={`absolute left-[-48px] w-[8px] bg-black ${
              index === milestones.length - 1 
                ? 'top-0 h-6' // Ends at the center of the dot inside the final box area
                : 'top-0 -bottom-16' // Continues to the next item
            }`} />

            {/* Timeline Dot */}
            <div className={`absolute -left-[3.75rem] top-0 w-12 h-12 border-[5px] border-black shadow-[4px_4px_0px_0px_#000] rotate-45 z-10 ${
              item.isAward ? 'bg-milestone-bg' : (item.active ? 'bg-primary-container' : 'bg-white')
            }`}></div>
            
            <Card className="p-8 max-w-3xl">
              <div className="space-y-4">
                <span className={`font-headline font-black uppercase tracking-widest px-3 py-1 border-2 border-black ${
                  item.isAward ? 'bg-milestone-bg' : (item.active ? 'bg-primary-container' : 'bg-[#eee]')
                }`}>
                  {item.period}
                </span>
                <h3 className="font-headline text-3xl font-black uppercase">{item.degree}</h3>
                {item.institution && <p className="font-headline text-xl text-on-surface-variant font-bold uppercase">{item.institution}</p>}
                <p className="font-body text-lg font-bold leading-relaxed">{item.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
