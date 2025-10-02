"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export interface ProjectGrid {
    items: ProjectGridItem[];
}

export interface ProjectGridItem {
    title: string;
    description: string;
    images: StaticImageData[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    className?: string;
}

interface ProjectShowcaseProps {
  projects:ProjectGridItem[]
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  // Span patterns pra efeito "Bento"
  const spanClasses = [
    "md:col-span-2 row-span-1 col-span-3",
    "md:col-span-1 row-span-1 col-span-3",
    "md:col-span-1 row-span-1 col-span-3",
    "md:col-span-2 row-span-1 col-span-3",
    "md:col-span-2 row-span-1 col-span-3",
    "md:col-span-1 row-span-1 col-span-3",
    "md:col-span-1 row-span-1 col-span-3",
    "md:col-span-2 row-span-1 col-span-3",
  ];

  return (
    <div className="grid grid-cols-3 auto-rows-[400px] gap-4 w-full">
      {projects.map((project, index) => {
        const spanClass = spanClasses[index % spanClasses.length];

        return (
          <motion.div
            key={index}
            className={`relative group overflow-hidden  z-0  border p-4 border-border   hover:z-50 rounded-xl shadow-lg ${spanClass}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {project.images[0] && (
              <PhotoProvider>
                <PhotoView key={project.images[0].src} src={project.images[0].src}>
                  <div className="absolute inset-0 cursor-pointer">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                      style={{
                        backgroundPosition: 'right bottom',
                      }}
                    />
                  </div>
                </PhotoView>
                {project.images.slice(1).map((item, idx) => (
                  <PhotoView key={item.src} src={item.src} />
                ))}
              </PhotoProvider>
            )}
            <div className="absolute left-0 bottom-0 h-48 w-full bg-background/90  opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-sm line-clamp-3">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span
                  
                    key={i}
                    className="bg-white/20 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};