"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import type { StaticImageData } from "next/image";
import { Locale, useSiteSettings } from "@/lib/site-settings";
import { portfolioImages } from "./images";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type LocalizedText = Record<Locale, string>;

type PortfolioProject = {
  title: string;
  index: string;
  category: LocalizedText;
  year: string;
  description: LocalizedText;
  image: StaticImageData;
  gallery: StaticImageData[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const projects: PortfolioProject[] = [
  {
    title: "WinkoApp",
    index: "01",
    category: { en: "Real-time product", pt: "Produto em tempo real" },
    year: "2023",
    description: { en: "A real-time chat ecosystem designed around speed, presence and the little details that make communication feel human.", pt: "Um ecossistema de chat em tempo real pensado para velocidade, presença e os detalhes que tornam a comunicação mais humana." },
    image: portfolioImages.winkoapp.winkoapp1,
    gallery: [portfolioImages.winkoapp.winkoapp1, portfolioImages.winkoapp.winkoapp2, portfolioImages.winkoapp.winkoapp3, portfolioImages.winkoapp.winkoapp4],
    technologies: ["React", "Socket.IO", "PostgreSQL"],
    githubUrl: "https://github.com/lchenrique/winkoapp-mono",
  },
  {
    title: "FinNext",
    index: "02",
    category: { en: "Financial interface", pt: "Interface financeira" },
    year: "2024",
    description: { en: "A calmer way to see complex financial information — with dashboards that turn market noise into a clear next move.", pt: "Uma forma mais calma de enxergar informações financeiras complexas — dashboards que transformam ruído em uma decisão clara." },
    image: portfolioImages.finnext.finNext1,
    gallery: [portfolioImages.finnext.finNext1],
    technologies: ["Next.js", "TypeScript", "Data viz"],
    liveUrl: "http://finnext.vercel.app/",
  },
  {
    title: "Visualab",
    index: "03",
    category: { en: "Creative platform", pt: "Plataforma criativa" },
    year: "2024",
    description: { en: "A visual playground for ideas, built to make exploration feel as fluid as the work it helps create.", pt: "Um playground visual para ideias, feito para tornar a exploração tão fluida quanto o trabalho que ele ajuda a criar." },
    image: portfolioImages.visualab.visual1,
    gallery: [portfolioImages.visualab.visual1, portfolioImages.visualab.visual2, portfolioImages.visualab.visual3],
    technologies: ["React", "Motion", "WebGL"],
  },
  {
    title: "Softconta",
    index: "04",
    category: { en: "Product launch", pt: "Lançamento de produto" },
    year: "2023",
    description: { en: "A focused landing experience that gives accounting teams a more modern and more confident first impression.", pt: "Uma landing page focada que entrega a times contábeis uma primeira impressão mais moderna e confiante." },
    image: portfolioImages.softcontaLandingPage,
    gallery: [portfolioImages.softcontaLandingPage, portfolioImages.cadastro, portfolioImages.login, portfolioImages.recoveryPass],
    technologies: ["React", "Tailwind", "UX strategy"],
  },
  {
    title: "Kairos",
    index: "05",
    category: { en: "Productivity system", pt: "Sistema de produtividade" },
    year: "2022",
    description: { en: "Time tracking without the friction — a productivity tool shaped around focus, rhythm and useful feedback.", pt: "Controle de tempo sem atrito — uma ferramenta de produtividade construída em torno de foco, ritmo e feedback útil." },
    image: portfolioImages.kairos.kairos1,
    gallery: [portfolioImages.kairos.kairos1, portfolioImages.kairos.kairos2, portfolioImages.kairos.kairos3],
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/lchenrique/kairos",
  },
  {
    title: "Magic Panel",
    index: "06",
    category: { en: "Open source library", pt: "Biblioteca open source" },
    year: "2024",
    description: { en: "A tiny interaction layer that gives modals and drawers a little more presence, control and polish.", pt: "Uma camada de interação que dá a modais e drawers mais presença, controle e acabamento." },
    image: portfolioImages.magicPanel,
    gallery: [portfolioImages.magicPanel, portfolioImages.drawerB, portfolioImages.modal, portfolioImages.drawer],
    technologies: ["React", "TypeScript", "Open source"],
    githubUrl: "https://github.com/lchenrique/magic-panel",
    liveUrl: "https://magic-panel-web.vercel.app/",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale, t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    gsap.fromTo(q(".projects-intro"), { y: 50, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 72%" },
    });

    q(".project-card").forEach((element, index) => {
      const card = element as HTMLElement;
      const image = card.querySelector(".project-media__image");
      gsap.fromTo(card, { y: 70, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        delay: (index % 2) * 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: card, start: "top 84%" },
      });
      if (image) {
        gsap.fromTo(image, { yPercent: -8, scale: 1.1 }, {
          yPercent: 8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="projects-section section-dark">
      <div className="page-gutter">
        <div className="section-marker">
          <span>04 / {t("selectedWork")}</span>
          <span className="section-marker__rule" />
          <span>{t("selectedWorkSub")}</span>
        </div>

        <div className="projects-intro">
          <p className="section-eyebrow">{t("projectsEyebrow")}</p>
          <div className="projects-intro__row">
            <h2>{t("projectsTitleOne")}<br /><em>{t("projectsTitleTwo")}</em></h2>
            <p>{t("projectsIntro")}</p>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-card ${index === 0 || index === 3 ? "project-card--wide" : ""}`} key={project.title}>
              <div className="project-card__top">
                <span>{project.index} / {project.category[locale]}</span>
                <span>{project.year}</span>
              </div>
              <PhotoProvider>
                <PhotoView src={project.image.src}>
                  <div className="project-media" data-cursor="view">
                    <Image
                      src={project.image}
                      alt={`${project.title} project interface`}
                      fill
                      sizes={index === 0 || index === 3 ? "(max-width: 768px) 100vw, 65vw" : "(max-width: 768px) 100vw, 35vw"}
                      className="project-media__image"
                    />
                    <div className="project-media__veil" />
                    <span className="project-media__view">{t("openCase")} <ArrowUpRight size={16} /></span>
                  </div>
                </PhotoView>
                {project.gallery.slice(1).map((image) => <PhotoView key={image.src} src={image.src} />)}
              </PhotoProvider>
              <div className="project-card__info">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description[locale]}</p>
                </div>
                <div className="project-card__details">
                  <div className="project-tags">
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <div className="project-links">
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`}><ExternalLink size={16} /></a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} source code`}><Github size={16} /></a>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-footer">
          <span>{t("projectsMore")}</span>
          <a className="text-link" href="https://github.com/lchenrique" target="_blank" rel="noreferrer">{t("projectsGithub")} <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
