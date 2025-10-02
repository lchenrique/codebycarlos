"use client";
import { useEffect, useRef } from "react";
import { SectionHeading } from "../section-heading";
import { Badge } from "@/components/ui/badge";
import ShimmerButton from "../ui/shimmer-button";
import { motion } from "framer-motion";
import { Blocks, Cloud, Database, FileCode, GitBranch, Layout, Server, Type } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVelocityContainer, ScrollVelocityRow } from "../ui/scroll-based-velocity";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Angular", "TypeScript", "React", "Next.js", "Angular", "Tailwind CSS", "Sass", "HTML5", "CSS3"],
    color: "rgba(0,50,200,1)"
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", ""],
    color: "rgba(7,190,108,1)"
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL"],
    color: "rgb(233, 77, 176)"
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "AWS", "Jest", "CI/CD"],
    color: "rgba(190,77,7,1)",
  },
  {
    category: "Other",
    skills: ["Jira", "Confluence", "Slack", "Zoom", "Microsoft Office"],
    color: "rgb(177, 200, 0)"
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "JavaScript", icon: FileCode },
    { name: "TypeScript", icon: Type },
    { name: "React", icon: Blocks },
    { name: "Next.js", icon: Server },
    { name: "Angular", icon: Blocks },
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

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Initial states
    gsap.set([headingRef.current, skillsRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate heading
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate skills
    gsap.to(skillsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 overflow-hidden"
    >
      <div className=" mx-auto">
        <div ref={headingRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-10 text-center funnel-display">Skills & Technologies</h3>
            <div ref={skillsRef} className="flex flex-wrap justify-center gap-4">
              <ScrollVelocityContainer className="w-full">
                <ScrollVelocityRow baseVelocity={3} direction={1} className="py-4">
                  {skills.map((skill) => {
                    const color = skillCategories.find(category => category.skills.includes(skill.name))?.color
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex mx-4 items-center border  text-primary px-3 py-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          borderColor: color
                        }}
                      >
                        <skill.icon
                          className="w-6 h-6 mr-2"
                          color={color}
                        />
                        <span className="text-lg">{skill.name}</span>
                      </motion.div>
                    )
                  })}
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={3} direction={-1} className="py-4">
                  {skills.map((skill) => {
                    const color = skillCategories.find(category => category.skills.includes(skill.name))?.color
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex mx-4 items-center border  text-primary px-3 py-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          borderColor: color
                        }}
                      >
                        <skill.icon className="w-6 h-6 mr-2"
                          color={color}
                        />
                        <span className="text-lg">{skill.name}</span>
                      </motion.div>
                    )
                  })}
                </ScrollVelocityRow>
              </ScrollVelocityContainer>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}