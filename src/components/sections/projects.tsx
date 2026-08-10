"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import type { StaticImageData } from "next/image";
import { Locale, useSiteSettings } from "@/lib/site-settings";
import { portfolioImages } from "./images";

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
    description: { en: "A real-time chat ecosystem designed around speed, presence, and the little details that make communication feel human.", pt: "Um ecossistema de chat em tempo real pensado para velocidade, presença e os detalhes que tornam a comunicação mais humana." },
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
    description: { en: "A calmer way to understand complex financial information — with dashboards that turn market noise into a clear next step.", pt: "Uma forma mais tranquila de compreender informações financeiras complexas — com painéis que transformam o ruído do mercado em uma decisão clara." },
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
    description: { en: "A visual playground for ideas, built to make exploration feel as fluid as the work it helps create.", pt: "Um laboratório visual de ideias, criado para tornar a exploração tão fluida quanto o próprio processo criativo." },
    image: portfolioImages.visualab.visual1,
    gallery: [portfolioImages.visualab.visual1, portfolioImages.visualab.visual2, portfolioImages.visualab.visual3],
    technologies: ["React", "Motion", "WebGL"],
  },
  {
    title: "Softconta",
    index: "04",
    category: { en: "Product launch", pt: "Lançamento de produto" },
    year: "2023",
    description: { en: "A focused landing experience that gives accounting teams a modern, confident first impression.", pt: "Uma landing page objetiva que oferece às equipes de contabilidade uma primeira impressão moderna e segura." },
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
    category: { en: "Open source library", pt: "Biblioteca de código aberto" },
    year: "2024",
    description: { en: "A tiny interaction layer that gives modals and drawers a little more presence, control, and polish.", pt: "Uma camada de interação enxuta que dá mais presença, controle e acabamento a modais e painéis laterais." },
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q(".section-marker, .projects-intro, .project-card, .project-media__hud, .project-card__info > *"), {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(q(".project-media"), { clipPath: "inset(0% 0 0% 0)" });
      gsap.set(q(".project-media__curtain"), { scaleY: 0 });
      return;
    }

    gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 74%", once: true },
      defaults: { ease: "power4.out" },
    })
      .fromTo(q(".section-marker"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
      .fromTo(q(".projects-intro"), { y: 48, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
      }, 0.08);

    q(".project-card").forEach((element) => {
      const card = element as HTMLElement;
      const media = card.querySelector(".project-media");
      const curtain = card.querySelector(".project-media__curtain");
      const hud = card.querySelector(".project-media__hud");
      const info = card.querySelectorAll(".project-card__info > *");

      const reveal = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 86%", once: true, fastScrollEnd: true },
        defaults: { ease: "power4.out" },
      });

      reveal
        .fromTo(card, { y: 72, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.05 })
        .fromTo(media, { clipPath: "inset(8% 0 8% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 1.15 }, 0.08)
        .to(curtain, { scaleY: 0, duration: 1.05, ease: "expo.inOut" }, 0.12)
        .fromTo(hud, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.8)
        .fromTo(info, { y: 24, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.62);
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      q(".project-card--wide").forEach((element) => {
        const card = element as HTMLElement;
        const image = card.querySelector(".project-media__image");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -6, scale: 1.07 }, {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    });
    return () => mm.revert();
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
                  <button
                    type="button"
                    className="project-media"
                    data-cursor="view"
                    aria-label={locale === "pt" ? `Abrir a galeria do projeto ${project.title}` : `Open the ${project.title} project gallery`}
                  >
                    <Image
                      src={project.image}
                      alt={locale === "pt" ? `Interface do projeto ${project.title}` : `${project.title} project interface`}
                      fill
                      sizes={index === 0 || index === 3 ? "(max-width: 768px) 100vw, 65vw" : "(max-width: 768px) 100vw, 35vw"}
                      className="project-media__image"
                    />
                    <span className="project-media__curtain" aria-hidden="true" />
                    <div className="project-media__veil" />
                    <span className="project-media__hud" aria-hidden="true">
                      <span>SC {project.index} / TAKE 01</span>
                      <span>REC <i /> 00:{String(index * 7 + 3).padStart(2, "0")}:24</span>
                    </span>
                    <span className="project-media__corners" aria-hidden="true" />
                    <span className="project-media__view">{t("openCase")} <ArrowUpRight size={16} /></span>
                  </button>
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
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={locale === "pt" ? `Visitar o site do projeto ${project.title}` : `Visit the ${project.title} website`}><ExternalLink size={16} /></a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={locale === "pt" ? `Ver o código-fonte de ${project.title}` : `View the ${project.title} source code`}><Github size={16} /></a>}
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
