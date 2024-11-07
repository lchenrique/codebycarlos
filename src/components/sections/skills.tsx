"use client";
import { useEffect, useRef } from "react";
import { SectionHeading } from "../section-heading";
import { Badge } from "@/components/ui/badge";
import ShimmerButton from "../ui/shimmer-button";
import { motion } from "framer-motion";
import { Blocks, Cloud, Database, FileCode, GitBranch, Layout, Server, Type } from "lucide-react";

const skillCategories = [
  {
    title: "Front End",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    background:"radial-gradient(circle, rgba(0,50,124,1) 0%, rgba(2,6,80,1) 100%)"
  },
  {
    title: "Back End",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    background: "radial-gradient(circle, rgba(7,190,108,1) 0%, rgba(2,80,46,1) 100%)",
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Jest", "CI/CD"],
    background: "radial-gradient(circle, rgba(190,77,7,1) 0%, rgba(80,36,2,1) 100%)",
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const skills = [
    { name: "JavaScript", icon: FileCode },
    { name: "TypeScript", icon: Type },
    { name: "React", icon: Blocks },
    { name: "Next.js", icon: Server },
    { name: "Node.js", icon: Server },
    { name: "Express", icon: Server },
    { name: "MongoDB", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "GraphQL", icon: Database },
    { name: "REST APIs", icon: Server },
    { name: "HTML5", icon: Layout },
    { name: "CSS3", icon: Layout },
    { name: "Sass", icon: Layout },
    { name: "Tailwind CSS", icon: Layout },
    { name: "Git", icon: GitBranch },
    { name: "Docker", icon: Cloud },
    { name: "AWS", icon: Cloud },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-40 section-animate bg-gradient-to-b from-background to-accent/20 overflow-hidden " 
    >
      <div className="max-w-7xl mx-auto">

     <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center funnel-display">Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex items-center bg-primary/10 text-primary px-3 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <skill.icon className="w-4 h-4 mr-2" />
                <span className="text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
