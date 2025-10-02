'use client'

import { SectionHeading } from "../section-heading";
import { ProjectCard } from "../project-card";
import { portfolioImages } from "./images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import MagicBento from "../MagicBento";
import { ProjectShowcase } from "../porject-grid";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "WinkoApp",
    description: "A monorepo containing backend API and multiple frontends for a real-time chat application similar to WhatsApp. Features include Fastify backend with Socket.IO for real-time communication, PostgreSQL database, and both modern React/Vite and legacy HTML/CSS frontends.",
    images: [
      portfolioImages.winkoapp.winkoapp1,
      portfolioImages.winkoapp.winkoapp2,
      portfolioImages.winkoapp.winkoapp3,
      portfolioImages.winkoapp.winkoapp4,
      portfolioImages.winkoapp.winkoapp5,
      portfolioImages.winkoapp.winkoapp6,
      portfolioImages.winkoapp.winkoapp7,
      portfolioImages.winkoapp.winkoapp8,
      portfolioImages.winkoapp.winkoapp9,
      portfolioImages.winkoapp.winkoapp10,
      portfolioImages.winkoapp.winkoapp11,
      portfolioImages.winkoapp.winkoapp12,
    ], // No images available
    technologies: ["React", "TypeScript", "TailwindCSS", "Fastify", "Socket.IO", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/lchenrique/winkoapp-mono",
  },
  {
    title: "Kairos",
    description: "Time tracking and productivity application designed to help users manage their tasks and monitor time spent on different activities. Features include project management, time reports, and team collaboration tools.",
    images: [
      portfolioImages.kairos.kairos1,
      portfolioImages.kairos.kairos2,
      portfolioImages.kairos.kairos3,
      portfolioImages.kairos.kairos4,
      portfolioImages.kairos.kairos5,
      portfolioImages.kairos.kairos6,
      portfolioImages.kairos.kairos7,
      portfolioImages.kairos.kairos8,
      portfolioImages.kairos.kairos9,
    ], // No images available
    technologies: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/lchenrique/kairos",
  },

  {
    title: "Reallagos",
    description:
      "System for accountants. This system offers a comprehensive solution for managing accounting and financial tasks. It facilitates the control of balance sheets, financial reports, accounting entries, and other essential operations.",
    images: [
      portfolioImages.reallagos.colaborators,
      portfolioImages.reallagos.dashboard,
      portfolioImages.reallagos.userdetails,
      portfolioImages.reallagos.img1,
      portfolioImages.reallagos.img2,
      portfolioImages.reallagos.img3,
      portfolioImages.reallagos.img4,
      portfolioImages.reallagos.img5,
      portfolioImages.reallagos.img7,
      portfolioImages.reallagos.img8,
      portfolioImages.reallagos.img9,
      portfolioImages.reallagos.img10,
      portfolioImages.reallagos.img11,
      portfolioImages.reallagos.img12,
      portfolioImages.reallagos.img13,
      portfolioImages.reallagos.img14,
      portfolioImages.reallagos.img15,
      portfolioImages.reallagos.img16,
      portfolioImages.reallagos.img17,
      portfolioImages.reallagos.img18,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
  },
  {
    title: "Softconta",
    description:
      "Landing page created to meet the needs of modern accountants. With it, it is possible to completely eliminate the reliance on spreadsheets and other manual tools.",
    images: [
      portfolioImages.softcontaLandingPage,
      portfolioImages.cadastro,
      portfolioImages.login,
      portfolioImages.recoveryPass,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
  },
  {
    title: "Medtime",
    description:
      "Web app designed to help users remember to take their medications on time. It has an intuitive interface and automatic notifications. (Under development)",
    images: [
      portfolioImages.medtime.medtime16,
      portfolioImages.medtime.medtime14,
      portfolioImages.medtime.medtime15,
      portfolioImages.medtime.medtime1,
      portfolioImages.medtime.medtime2,
      portfolioImages.medtime.medtime3,
      portfolioImages.medtime.medtime4,
      portfolioImages.medtime.medtime5,
      portfolioImages.medtime.medtime6,
      portfolioImages.medtime.medtime7,
      portfolioImages.medtime.medtime8,
      portfolioImages.medtime.medtime9,
      portfolioImages.medtime.medtime10,
      portfolioImages.medtime.medtime11,
      portfolioImages.medtime.medtime12,
      portfolioImages.medtime.medtime13,


    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    githubUrl: "https://github.com/lchenrique/medicine-time", // URL do repositório do GitHub, se houver
  },
  {
    title: "Magic 🪄 Panel",
    description: "React library created to facilitate the use of modals and drawers in web applications.",
    images: [
      portfolioImages.magicPanel,
      portfolioImages.drawerB,
      portfolioImages.modal,
      portfolioImages.drawer,
     ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "https://magic-panel-web.vercel.app/", // URL do projeto ao vivo, se houver
    githubUrl: "https://github.com/lchenrique/magic-panel", // URL do repositório do GitHub, se houver
  },

  {
    title: "FinNext",
    description: "FinNext is an advanced investment management platform designed to provide users with a complete, intuitive view of their financial portfolios. Featuring custom dashboards, real-time market alerts, and detailed analytics tools, FinNext supports strategic decision-making to maximize investment outcomes. The platform is tailored to meet the needs of both beginner and seasoned investors, combining ease of use with powerful features.",
    images: [
      portfolioImages.finnext.finNext1,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "http://finnext.vercel.app/", // URL do projeto ao vivo, se houver
    // githubUrl: "https://github.com", // URL do repositório do GitHub, se houver
  },
  {
    title: "Resume AI",
    description: "An innovative platform for resume creation and editing with artificial intelligence. Allows users to create professional resumes quickly and personalized, using AI technology to optimize content and increase chances of professional success.",
    images: [portfolioImages.resumeai.resumeai1, portfolioImages.resumeai.resumeai2],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript", "AI"],
    githubUrl: "https://github.com/lchenrique/resumeAi", // URL do repositório do GitHub, se houver
  },
];

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!projectsRef.current) return;

    // Initial states
    gsap.set(headingRef.current, {
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
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate cards
    cardsRef.current.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 30 });
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1 * i,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();
  }, []);

  return (
    <section ref={projectsRef} id="projects" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headingRef}>
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />
        </div>
        <ProjectShowcase projects={projects} />
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) {
                  cardsRef.current[i] = el;
                }
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
