"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Database,
  Image as ImageIcon,
  LayoutTemplate,
  MessageCircle,
  Package,
  ShieldCheck,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { portfolioImages } from "@/components/sections/images";
import lumeStudioProduct from "@/assets/portfolio/product-showcase/lume-studio.png";
import lumeStudioFormat from "@/assets/portfolio/product-showcase/lume-studio-format.png";
import lumeStudioInspirations from "@/assets/portfolio/product-showcase/lume-studio-inspirations.png";
import lumeStudioLibrary from "@/assets/portfolio/product-showcase/lume-studio-library.png";
import lumeStudioBrand from "@/assets/portfolio/product-showcase/lume-studio-brand.png";
import focusBrewProduct from "@/assets/portfolio/product-showcase/focus-brew.png";
import focusBrewOverview from "@/assets/portfolio/product-showcase/focus-brew-overview.png";
import focusBrewWallpaper from "@/assets/portfolio/product-showcase/focus-brew-wallpaper.webp";
import focusBrewWallpaperNight from "@/assets/portfolio/product-showcase/focus-brew-wallpaper-night.webp";
import medtimePulseProduct from "@/assets/portfolio/product-showcase/medtime-pulse.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SolutionsHero } from "@/components/solutions-hero";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Locale, useSiteSettings } from "@/lib/site-settings";

const copy = {
  pt: {
    nav: [
      ["servicos", "Serviços"],
      ["processo", "Como funciona"],
      ["produtos", "Produtos"],
      ["contato", "Contato"],
    ],
    heroRole: "Carlos Henrique · fundador",
    servicesKicker: "01 / Soluções",
    servicesTitle: "O que posso construir com você",
    servicesIntro:
      "Cada projeto começa com um problema real. A solução pode ser uma página, uma operação inteira ou um produto novo.",
    serviceCta: "Quero uma solução assim",
    serviceCtaShort: "Falar sobre isso",
    services: [
      {
        icon: LayoutTemplate,
        number: "01",
        title: "Sites & landing pages",
        description:
          "Presença digital com estratégia de conversão, copy clara, SEO técnico e uma experiência que representa o valor da sua marca.",
        items: ["Landing pages", "Sites institucionais", "E-commerce e páginas de campanha"],
        tone: "lime",
        weeks: "2–5",
      },
      {
        icon: Database,
        number: "02",
        title: "Sistemas sob medida",
        description:
          "Ferramentas internas e produtos digitais feitos para o seu fluxo — sem planilhas frágeis ou processos espalhados.",
        items: ["Dashboards e portais", "Áreas logadas", "Integrações e APIs"],
        tone: "blue",
        weeks: "6–12",
      },
      {
        icon: Bot,
        number: "03",
        title: "Automações inteligentes",
        description:
          "Conecte as ferramentas que você já usa e automatize tarefas repetitivas para a equipe focar no que realmente importa.",
        items: ["WhatsApp e atendimento", "CRM e follow-up", "Fluxos com IA"],
        tone: "coral",
        weeks: "2–6",
      },
      {
        icon: Package,
        number: "04",
        title: "Produtos digitais",
        description:
          "Kits prontos, componentes e soluções enxutas para você lançar mais rápido — com qualidade de produto desde o primeiro dia.",
        items: ["MVPs e protótipos", "Kits de interface", "Consultoria técnica"],
        tone: "violet",
        weeks: "1–4",
      },
    ],
    casesKicker: "02 / Cases",
    casesTitle: "Projetos reais. Problemas resolvidos.",
    casesIntro: "Uma amostra do tipo de produto e experiência que entra em produção quando estratégia e execução caminham juntas.",
    casesCta: "Ver mais detalhes",
    processKicker: "03 / Método",
    processTitle: "Clareza antes do código.",
    processIntro:
      "Um processo enxuto, com decisões visíveis e entregas que você consegue acompanhar do começo ao próximo passo.",
    process: [
      {
        number: "01",
        title: "Diagnóstico",
        description: "Entendo o contexto, os objetivos e onde está o gargalo que vale resolver primeiro.",
        outputs: ["Escopo e prioridades", "Riscos mapeados", "Proposta com prazo"],
        span: "3–5 dias",
      },
      {
        number: "02",
        title: "Construção",
        description: "Desenho a solução, valido as decisões e transformo o plano em uma primeira versão útil.",
        outputs: ["Protótipo navegável", "Entregas semanais", "Ajuste a cada versão"],
        span: "2–10 semanas",
      },
      {
        number: "03",
        title: "Evolução",
        description: "Coloco no ar, meço o que importa e deixo sua operação preparada para crescer.",
        outputs: ["Deploy e monitoramento", "Métricas do que importa", "Suporte e melhorias"],
        span: "contínuo",
      },
    ],
    processOutputs: "Você recebe",
    processNote: "Sem caixa-preta. Você sabe o que está sendo feito e por quê.",
    productsKicker: "04 / Produtos",
    productsTitle: "Atalhos para o próximo nível.",
    productsIntro:
      "Depois dos cases, estas são ofertas prontas para tirar tarefas da frente e acelerar sua presença digital.",
    products: [
      ["Launch Kit", "Para quem precisa vender online agora.", "Landing page, copy e analytics em uma entrega objetiva."],
      ["Ops Flow", "Para quem quer recuperar horas da equipe.", "Automação de atendimento, leads e follow-up com visão do processo."],
      ["MVP Sprint", "Para quem tem uma ideia e quer validar.", "Protótipo funcional com base sólida para testar antes de investir alto."],
    ],
    productCta: "Quero conhecer",
    fitKicker: "05 / Para quem é",
    fitTitle: "Se a tecnologia virou um gargalo, a gente conversa.",
    fitText:
      "Trabalho com negócios que precisam de mais clareza, velocidade e autonomia — de profissionais independentes a equipes em crescimento.",
    fitItems: ["Você tem uma ideia, mas não sabe por onde começar.", "Sua operação cresceu e as ferramentas não acompanharam.", "Você quer vender melhor sem depender de soluções genéricas."],
    fitCta: "Destravar meu próximo passo",
    contactKicker: "06 / Vamos conversar",
    contactTitle: "Conte o que você precisa. Eu penso no caminho.",
    contactText:
      "Me mande uma mensagem com o contexto, objetivo e prazo. Eu retorno com perguntas objetivas e um próximo passo claro.",
    contactCta: "carlos@codebycarlos.dev",
    contactSecondary: "Ver LinkedIn",
    footer: "Sites · Sistemas · Automações · Produtos digitais",
    menu: "Menu",
    close: "Fechar menu",
    switchLanguage: "Mudar para inglês",
  },
  en: {
    nav: [
      ["servicos", "Services"],
      ["processo", "How it works"],
      ["produtos", "Products"],
      ["contato", "Contact"],
    ],
    heroRole: "Carlos Henrique · founder",
    servicesKicker: "01 / Solutions",
    servicesTitle: "What we can build together",
    servicesIntro:
      "Every project starts with a real problem. The answer might be a page, an entire operation or a new product.",
    serviceCta: "I need a solution like this",
    serviceCtaShort: "Talk about this",
    services: [
      { icon: LayoutTemplate, number: "01", title: "Websites & landing pages", description: "A digital presence with conversion strategy, clear copy, technical SEO and an experience that represents your brand's value.", items: ["Landing pages", "Institutional websites", "E-commerce and campaign pages"], tone: "lime", weeks: "2–5" },
      { icon: Database, number: "02", title: "Custom systems", description: "Internal tools and digital products built around your workflow — no fragile spreadsheets or scattered processes.", items: ["Dashboards and portals", "Logged-in areas", "Integrations and APIs"], tone: "blue", weeks: "6–12" },
      { icon: Bot, number: "03", title: "Smart automations", description: "Connect the tools you already use and automate repetitive tasks so your team can focus on what matters.", items: ["WhatsApp and support", "CRM and follow-up", "AI-powered flows"], tone: "coral", weeks: "2–6" },
      { icon: Package, number: "04", title: "Digital products", description: "Ready-to-use kits, components and focused solutions to launch faster — with product quality from day one.", items: ["MVPs and prototypes", "Interface kits", "Technical consulting"], tone: "violet", weeks: "1–4" },
    ],
    casesKicker: "02 / Case studies",
    casesTitle: "Real projects. Solved problems.",
    casesIntro: "A sample of the kind of product and experience that ships when strategy and execution move together.",
    casesCta: "See project details",
    processKicker: "03 / Method",
    processTitle: "Clarity before code.",
    processIntro: "A lean process, visible decisions and deliverables you can follow from the first conversation to the next step.",
    process: [
      { number: "01", title: "Discovery", description: "I learn the context, goals and the bottleneck worth solving first.", outputs: ["Scope and priorities", "Mapped risks", "Proposal with a timeline"], span: "3–5 days" },
      { number: "02", title: "Build", description: "I shape the solution, validate decisions and turn the plan into a useful first version.", outputs: ["Clickable prototype", "Weekly deliveries", "Adjustments every version"], span: "2–10 weeks" },
      { number: "03", title: "Evolve", description: "I launch, measure what matters and leave your operation ready to grow.", outputs: ["Deploy and monitoring", "Metrics that matter", "Support and improvements"], span: "ongoing" },
    ],
    processOutputs: "You get",
    processNote: "No black boxes. You know what is being built and why.",
    productsKicker: "04 / Products",
    productsTitle: "Shortcuts to the next level.",
    productsIntro: "After the case studies, these ready-to-go offers remove busywork and accelerate your digital presence.",
    products: [["Launch Kit", "For teams that need to sell online now.", "Landing page, copy and analytics in one focused delivery."], ["Ops Flow", "For teams that want hours back.", "Automated support, leads and follow-up with process visibility."], ["MVP Sprint", "For ideas that need validation.", "A functional prototype with a solid base to test before scaling investment."]],
    productCta: "I want to know more",
    fitKicker: "05 / Who it is for",
    fitTitle: "If technology became a bottleneck, let's talk.",
    fitText: "I work with businesses that need more clarity, speed and autonomy — from independent professionals to growing teams.",
    fitItems: ["You have an idea but do not know where to start.", "Your operation grew and the tools did not keep up.", "You want to sell better without relying on generic solutions."],
    fitCta: "Unlock my next step",
    contactKicker: "06 / Let's talk",
    contactTitle: "Tell me what you need. I will think through the path.",
    contactText: "Send a message with context, goal and timing. I will reply with focused questions and a clear next step.",
    contactCta: "carlos@codebycarlos.dev",
    contactSecondary: "View LinkedIn",
    footer: "Websites · Systems · Automations · Digital products",
    menu: "Menu",
    close: "Close menu",
    switchLanguage: "Mudar para português",
  },
} as const;

type LocaleCopy = (typeof copy)[keyof typeof copy];

type CaseStudy = {
  title: string;
  category: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  url: string | null;
  gallery: StaticImageData[];
};

/* Cover first, then everything else from the folder, without repeating it. */
function gallery(cover: StaticImageData, rest: Record<string, StaticImageData> | StaticImageData[]): StaticImageData[] {
  const all = [cover, ...(Array.isArray(rest) ? rest : Object.values(rest))];
  return all.filter((image, index) => all.indexOf(image) === index);
}

const caseStudies: CaseStudy[] = [
  {
    title: "WinkoApp",
    category: { pt: "Produto em tempo real", en: "Real-time product" },
    description: { pt: "Ecossistema de chat desenhado para velocidade, presença e comunicação mais humana.", en: "A real-time chat ecosystem designed for speed, presence and more human communication." },
    tags: ["React", "Socket.IO", "PostgreSQL"],
    url: "https://github.com/lchenrique/winkoapp-mono",
    gallery: gallery(portfolioImages.winkoapp.winkoapp1, portfolioImages.winkoapp),
  },
  {
    title: "FinNext",
    category: { pt: "Interface financeira", en: "Financial interface" },
    description: { pt: "Dashboard que transforma informação de mercado em uma próxima decisão mais clara.", en: "A dashboard that turns market information into a clearer next decision." },
    tags: ["Next.js", "TypeScript", "Data viz"],
    url: "http://finnext.vercel.app/",
    gallery: gallery(portfolioImages.finnext.finNext1, portfolioImages.finnext),
  },
  {
    title: "Softconta",
    category: { pt: "Lançamento de produto", en: "Product launch" },
    description: { pt: "Landing page focada em explicar valor e gerar confiança desde o primeiro contato.", en: "A focused landing page built to explain value and build trust from the first touchpoint." },
    tags: ["UX strategy", "React", "Tailwind"],
    url: null,
    gallery: gallery(portfolioImages.softcontaLandingPage, [portfolioImages.cadastro, portfolioImages.login, portfolioImages.recoveryPass]),
  },
  {
    title: "Reallagos",
    category: { pt: "Sistema contábil", en: "Accounting system" },
    description: { pt: "Sistema completo para contadores: balanços, relatórios financeiros e lançamentos em um só lugar.", en: "A complete system for accountants: balance sheets, financial reports and entries in one place." },
    tags: ["React", "TypeScript", "Dashboards"],
    url: null,
    gallery: gallery(portfolioImages.reallagos.dashboard, portfolioImages.reallagos),
  },
  {
    title: "Kairos",
    category: { pt: "Sistema de produtividade", en: "Productivity system" },
    description: { pt: "Controle de tempo e tarefas sem atrito, com relatórios e colaboração para times pequenos.", en: "Frictionless time and task tracking, with reports and collaboration for small teams." },
    tags: ["React", "Node.js", "MongoDB"],
    url: "https://github.com/lchenrique/kairos",
    gallery: gallery(portfolioImages.kairos.kairos1, portfolioImages.kairos),
  },
  {
    title: "Medtime",
    category: { pt: "App de saúde", en: "Health app" },
    description: { pt: "Aplicativo que lembra o horário dos medicamentos com notificações automáticas e interface direta.", en: "An app that reminds users to take medication on time, with automatic notifications and a direct interface." },
    tags: ["React", "TypeScript", "Tailwind"],
    url: "https://github.com/lchenrique/medicine-time",
    gallery: gallery(portfolioImages.medtime.medtime16, [...Object.values(portfolioImages.medtime), medtimePulseProduct]),
  },
  {
    title: "Visualab",
    category: { pt: "Plataforma criativa", en: "Creative platform" },
    description: { pt: "Laboratório visual de ideias, feito para que explorar seja tão fluido quanto criar.", en: "A visual playground for ideas, built to make exploring as fluid as creating." },
    tags: ["React", "Motion", "WebGL"],
    url: null,
    gallery: gallery(portfolioImages.visualab.visual1, portfolioImages.visualab),
  },
  {
    title: "Resume AI",
    category: { pt: "Produto com IA", en: "AI product" },
    description: { pt: "Plataforma que cria e edita currículos com IA, otimizando o conteúdo para cada vaga.", en: "A platform that builds and edits resumes with AI, optimizing content for each opening." },
    tags: ["React", "TypeScript", "IA"],
    url: "https://github.com/lchenrique/resumeAi",
    gallery: gallery(portfolioImages.resumeai.resumeai1, portfolioImages.resumeai),
  },
  {
    title: "Magic Panel",
    category: { pt: "Biblioteca open source", en: "Open source library" },
    description: { pt: "Camada de interação que dá presença e acabamento a modais e drawers em React.", en: "An interaction layer that gives React modals and drawers more presence and polish." },
    tags: ["React", "TypeScript", "Open source"],
    url: "https://magic-panel-web.vercel.app/",
    gallery: gallery(portfolioImages.magicPanel, [portfolioImages.drawerB, portfolioImages.modal, portfolioImages.drawer]),
  },
  {
    title: "Lume Studio",
    category: { pt: "Produto de conteúdo", en: "Content product" },
    description: {
      pt: "Workspace com IA para transformar briefing em conteúdo de marca.",
      en: "An AI workspace that turns a brief into on-brand content.",
    },
    tags: ["Vite", "React", "IA"],
    url: null,
    gallery: gallery(lumeStudioProduct, [lumeStudioFormat, lumeStudioInspirations, lumeStudioLibrary, lumeStudioBrand]),
  },
  {
    title: "Focus Brew",
    category: { pt: "Produto de produtividade", en: "Productivity product" },
    description: {
      pt: "Pomodoro, hábitos e mídia ambiente reunidos em uma única mesa de foco.",
      en: "Pomodoro, habits and ambient media brought together in one focus desk.",
    },
    tags: ["Next.js", "shadcn/ui", "Framer Motion"],
    url: "https://focusbrew.vercel.app/",
    gallery: gallery(focusBrewProduct, [focusBrewOverview, focusBrewWallpaper, focusBrewWallpaperNight]),
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal gsap-reveal ${className}`}>{children}</div>;
}

function Mark({ className = "" }: { className?: string }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true"><span /><span /><span /></span>;
}

export function SolutionsHome() {
  const { locale } = useSiteSettings();
  const text: LocaleCopy = copy[locale];
  const pt = locale === "pt";
  const [activeService, setActiveService] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const siteRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = siteRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Panels drive the sticky rail on both paths, so this runs before the reduced-motion bail-out. */
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".service-panel"));
    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 60%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActiveService(index);
        },
      });
    });

    /* Same idea for the cases viewer: scrolling picks the project, hovering a row overrides it. */
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".case-row"));
    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 62%",
        end: "bottom 48%",
        onToggle: (self) => {
          if (self.isActive) setActiveCase(index);
        },
      });
    });

    if (reduced) {
      gsap.set(q(".gsap-reveal, .service-panel, .case-row, .process-step"), { autoAlpha: 1, y: 0, x: 0, scale: 1, clearProps: "transform" });
      root.querySelectorAll(".process-step").forEach((step) => step.classList.add("is-reached"));
      gsap.set(q(".track-fill"), { "--p": 1 });
      return;
    }

    /* One scrubbed trigger drives the rail and lights each node as the scroll passes it. */
    const track = root.querySelector<HTMLElement>(".process-track");
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".process-step"));
    if (track && steps.length) {
      gsap.fromTo(track.querySelector(".track-fill"), { "--p": 0 }, {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 72%",
          end: "bottom 62%",
          scrub: 0.5,
          onUpdate: (self) => {
            steps.forEach((step, index) => {
              step.classList.toggle("is-reached", self.progress >= index / steps.length);
            });
          },
        },
      });

      steps.forEach((step, index) => {
        gsap.fromTo(step, { y: 42, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 82%", once: true },
        });
      });
    }

    rows.forEach((row, index) => {
      gsap.fromTo(row, { x: 26, autoAlpha: 0 }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.7,
        delay: (index % 3) * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 92%", once: true },
      });
    });

    panels.forEach((panel) => {
      gsap.fromTo(panel, { y: 54, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 88%", once: true },
      });
    });

    q(".gsap-reveal").forEach((element) => {
      gsap.fromTo(element, { y: 46, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 84%", once: true },
      });
    });

    q(".rail-list li").forEach((element, index) => {
      gsap.fromTo(element, { x: -18, autoAlpha: 0 }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: index * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".services-split"), start: "top 78%", once: true },
      });
    });

    gsap.to(q(".contact-orb"), {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, { scope: siteRef });

  const goToService = (index: number) => {
    const panel = document.getElementById(`service-panel-${index}`);
    if (!panel) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    panel.scrollIntoView({ behavior, block: "center" });
  };

  return (
    <main ref={siteRef} id="home" className="solutions-site">
      <SolutionsHero locale={locale} />

      <section id="servicos" className="services-section section-light" aria-labelledby="services-title">
        <div className="page-shell">
          <Reveal className="services-head">
            <p className="section-kicker">{text.servicesKicker}</p>
            <h2 id="services-title">{text.servicesTitle}</h2>
            <p className="services-lead">{text.servicesIntro}</p>
          </Reveal>

          <div className="services-split">
            <aside className="services-rail" aria-hidden="true">
              <div className="rail-progress">
                <strong>{text.services[activeService].number}</strong>
                <span>/ 04</span>
                <i style={{ transform: `scaleX(${(activeService + 1) / text.services.length})` }} />
              </div>
              <ul className="rail-list">
                {text.services.map((service, index) => (
                  <li key={service.title} className={activeService === index ? "is-active" : ""}>
                    <button type="button" tabIndex={-1} onClick={() => goToService(index)}>
                      <span>{service.number}</span>
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
              <a className="inline-cta" href="#contato" tabIndex={-1}>
                {text.serviceCta}
                <ArrowUpRight size={16} />
              </a>
            </aside>

            <div className="services-stack">
              {text.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article id={`service-panel-${index}`} key={service.title} className={`service-panel tone-${service.tone}`}>
                    <span className="panel-ghost" aria-hidden="true">{service.number}</span>
                    <div className="panel-lead">
                      <span className="panel-icon"><Icon size={26} /></span>
                      <span className="panel-index">{service.number} / 04</span>
                      <h3>{service.title}</h3>
                    </div>
                    <div className="panel-body">
                      <p>{service.description}</p>
                      <ul>
                        {service.items.map((item) => (
                          <li key={item}><Check size={15} />{item}</li>
                        ))}
                      </ul>
                      <div className="panel-foot">
                        <span>{pt ? "A partir de" : "Starting at"} <strong>{service.weeks} {pt ? "semanas" : "weeks"}</strong></span>
                        <a href="#contato">{text.serviceCtaShort}<ArrowUpRight size={15} /></a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="cases-section section-dark" aria-labelledby="cases-title">
        <div className="page-shell">
          <Reveal className="cases-head">
            <p className="section-kicker">{text.casesKicker}</p>
            <h2 id="cases-title">{text.casesTitle}</h2>
            <div className="cases-head__aside">
              <p>{text.casesIntro}</p>
              <span className="cases-count">
                <strong>{String(caseStudies.length).padStart(2, "0")}</strong>
                {pt ? "projetos" : "projects"}
              </span>
            </div>
          </Reveal>

          <div className="cases-board">
            <div className="cases-viewer" aria-hidden="true">
              <div className="viewer-frame">
                {caseStudies.map((item, index) => (
                  <figure key={item.title} className={activeCase === index ? "is-active" : ""}>
                    <Image src={item.gallery[0]} alt="" fill sizes="(max-width: 980px) 92vw, 44vw" />
                  </figure>
                ))}
                <span className="viewer-scrim" />
                <span className="viewer-tag">{String(activeCase + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}</span>
              </div>
              <div className="viewer-caption">
                <strong>{caseStudies[activeCase].title}</strong>
                <span>{caseStudies[activeCase].category[locale]}</span>
                <em>
                  <ImageIcon size={13} />
                  {caseStudies[activeCase].gallery.length} {pt ? "imagens" : "images"}
                </em>
              </div>
            </div>

            <div className="cases-index">
              {caseStudies.map((item, index) => (
                <PhotoProvider key={item.title} maskOpacity={0.94}>
                  <div className={`case-row ${activeCase === index ? "is-active" : ""}`} onMouseEnter={() => setActiveCase(index)}>
                    {/* Only the first PhotoView is visible; the rest just register the project's other shots. */}
                    {item.gallery.map((image, imageIndex) => (
                      <PhotoView key={image.src} src={image.src}>
                        {imageIndex === 0 ? (
                          <button
                            type="button"
                            className="case-row__open"
                            onFocus={() => setActiveCase(index)}
                            aria-label={`${pt ? "Ver galeria de" : "View gallery of"} ${item.title} — ${item.gallery.length} ${pt ? "imagens" : "images"}`}
                          >
                            <span className="case-row__index">{String(index + 1).padStart(2, "0")}</span>
                            <span className="case-row__thumb">
                              <Image src={item.gallery[0]} alt="" fill sizes="88px" />
                            </span>
                            <span className="case-row__main">
                              <strong>{item.title}</strong>
                              <span className="case-row__category">{item.category[locale]}</span>
                              <span className="case-row__description">{item.description[locale]}</span>
                              <span className="case-row__tags">
                                {item.tags.map((tag) => (
                                  <i key={tag}>{tag}</i>
                                ))}
                              </span>
                            </span>
                            <span className="case-row__count">
                              <ImageIcon size={14} />
                              {item.gallery.length}
                            </span>
                          </button>
                        ) : (
                          <span className="case-row__seed" />
                        )}
                      </PhotoView>
                    ))}
                    {item.url ? (
                      <a
                        className="case-row__link"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${pt ? "Abrir" : "Open"} ${item.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                </PhotoProvider>
              ))}
            </div>
          </div>

          <a className="cases-link" href="https://github.com/lchenrique" target="_blank" rel="noreferrer">{text.casesCta}<ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section id="processo" className="process-section section-dark" aria-labelledby="process-title">
        <div className="page-shell">
          <Reveal className="process-head">
            <p className="section-kicker">{text.processKicker}</p>
            <h2 id="process-title">{text.processTitle}</h2>
            <p className="process-lead">{text.processIntro}</p>
          </Reveal>

          <div className="process-track">
            <span className="track-rail" aria-hidden="true">
              <i className="track-fill" />
            </span>
            {text.process.map((step, index) => (
              <article className="process-step" key={step.number} data-step={index}>
                <span className="step-node" aria-hidden="true" />
                <span className="step-ghost" aria-hidden="true">{step.number}</span>
                <div className="step-card">
                  <div className="step-top">
                    <span className="step-number">{step.number}</span>
                    <span className="step-span">{step.span}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-outputs">
                    <span>{text.processOutputs}</span>
                    <ul>
                      {step.outputs.map((output) => (
                        <li key={output}><Check size={14} />{output}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="process-note"><ShieldCheck size={18} /><span>{text.processNote}</span></div>
        </div>
      </section>

      <section id="produtos" className="products-section section-accent" aria-labelledby="products-title">
        <div className="page-shell">
          <Reveal className="section-intro section-intro--accent"><p className="section-kicker">{text.productsKicker}</p><div><h2 id="products-title">{text.productsTitle}</h2><p>{text.productsIntro}</p></div></Reveal>
          <div className="product-grid">{text.products.map(([name, audience, description], index) => <Reveal key={name}><Card className={`product-card ${index === 1 ? "product-card--featured" : ""}`}><CardHeader className="product-card__header"><div className="product-top"><Badge variant="outline" className="product-badge">{index === 1 ? (pt ? "Mais pedido" : "Most popular") : `0${index + 1}`}</Badge><ArrowUpRight size={19} /></div><CardTitle className="product-card__title">{name}</CardTitle><CardDescription className="product-card__description">{audience}</CardDescription></CardHeader><CardContent className="product-card__content"><p>{description}</p><div className="product-bottom"><a href="#contato">{text.productCta}<ArrowRight size={15} /></a></div></CardContent></Card></Reveal>)}</div>
        </div>
      </section>

      <section className="fit-section section-light" aria-labelledby="fit-title">
        <div className="page-shell fit-layout"><Reveal><p className="section-kicker">{text.fitKicker}</p><h2 id="fit-title">{text.fitTitle}</h2></Reveal><Reveal className="fit-copy"><p>{text.fitText}</p><ul>{text.fitItems.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><Button asChild className="button-primary"><a href="#contato">{text.fitCta}<ArrowUpRight /></a></Button><div className="founder-card"><div className="founder-avatar"><Image src="/carlos-portrait-v3.webp" alt={pt ? "Carlos Henrique" : "Carlos Henrique"} fill sizes="64px" /></div><div><strong>{text.heroRole}</strong><span>{pt ? "Você fala direto com quem constrói." : "You talk directly to the person building it."}</span></div></div></Reveal></div>
      </section>

      <section id="contato" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-orb" aria-hidden="true" /><div className="page-shell contact-shell"><Reveal><p className="section-kicker">{text.contactKicker}</p><h2 id="contact-title">{text.contactTitle}</h2></Reveal><Reveal className="contact-content"><p>{text.contactText}</p><div className="contact-actions"><Button asChild size="lg" className="button-contact"><a href="mailto:carlos@codebycarlos.dev">{text.contactCta}<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg" className="button-contact-secondary"><a href="https://www.linkedin.com/in/lc-henrique" target="_blank" rel="noreferrer"><MessageCircle />{text.contactSecondary}</a></Button></div></Reveal><footer className="site-footer"><div><Mark /><span>code by carlos</span></div><span>{text.footer}</span><span>© {new Date().getFullYear()} Carlos Henrique</span></footer></div>
      </section>
    </main>
  );
}

export { Mark };
