"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../common/Card';
import { Tag } from '../common/Tag';
import { Button } from '../common/Button';
import { Project } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectsSectionProps {
  showAll?: boolean;
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ showAll = false, projects }) => {
  // Take maximum 3 projects for home, or all for projects page
  const displayProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="space-y-6 md:space-y-12 mb-12 md:mb-24">
      <h2 className="font-headline text-2xl md:text-6xl font-black uppercase tracking-tighter border-b-[4px] md:border-b-[8px] border-black pb-3 md:pb-4">
        {showAll ? 'All_Deployments' : 'Selected_Deployments'}
      </h2>
      
      <div className="space-y-6 md:space-y-12">
        {displayProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Details Section */}
                  <div className={`p-5 md:p-12 flex flex-col justify-center space-y-3 md:space-y-6 ${isEven ? 'order-1' : 'md:order-2'}`}>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.tags.map((tag, tIndex) => (
                        <Tag 
                          key={tag} 
                          shape={tIndex % 2 === 0 ? 'ribbon-left' : 'ribbon-right'}
                          color="bg-primary-container"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <h3 className="font-headline text-xl md:text-4xl font-black uppercase">{project.title}</h3>
                    <p className="font-body text-sm md:text-lg leading-relaxed font-bold text-on-surface-variant">
                      {project.description}
                    </p>
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-headline font-black uppercase text-sm md:text-xl hover:text-hero-bg transition-colors group"
                    >
                      View Deployment <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>

                  {/* Preview Section */}
                  <div className={`h-48 md:h-170 border-black ${isEven ? 'md:border-l-[5px] order-2' : 'md:border-r-[5px] md:order-1'} bg-black relative overflow-hidden group`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                       <Tag shape="capsule" color="bg-white" className="text-black text-lg py-2 px-6">Live Preview</Tag>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {!showAll && projects.length > 3 && (
        <div className="flex justify-center pt-8">
          <Link href="/projects">
            <Button size="md" variant="outline" className="text-lg md:text-2xl md:px-12 md:py-5">
              Show More Projects →
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};
