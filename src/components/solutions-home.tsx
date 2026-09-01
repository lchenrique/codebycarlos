"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Database,
  LayoutTemplate,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import winkoImage from "@/assets/portfolio/winkoapp/1.png";
import finnextImage from "@/assets/portfolio/finnext/image.png";
import softcontaImage from "@/assets/portfolio/softconta-lp/softconta-landing-page.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSiteSettings } from "@/lib/site-settings";

const copy = {
  pt: {
    nav: [
      ["servicos", "Serviços"],
      ["processo", "Como funciona"],
      ["produtos", "Produtos"],
      ["contato", "Contato"],
    ],
    available: "Agenda aberta para novos projetos",
    heroEyebrow: "Estúdio digital independente",
    heroTitle: "Seu próximo avanço digital começa aqui.",
    heroTitleAccent: "avanço digital",
    heroBody:
      "Sites que vendem, sistemas que organizam e automações que devolvem tempo para o seu negócio.",
    heroPrimary: "Falar sobre meu projeto",
    heroSecondary: "Conhecer soluções",
    heroMeta: "Atendimento remoto · Brasil e mundo",
    heroCaption: "Estratégia, design e código em um só lugar.",
    heroRole: "Carlos Henrique · fundador",
    metricOne: "anos construindo",
    metricTwo: "produtos entregues",
    metricThree: "código proprietário",
    servicesKicker: "01 / Soluções",
    servicesTitle: "O que posso construir com você",
    servicesIntro:
      "Cada projeto começa com um problema real. A solução pode ser uma página, uma operação inteira ou um produto novo.",
    serviceCta: "Quero uma solução assim",
    services: [
      {
        icon: LayoutTemplate,
        number: "01",
        title: "Sites & landing pages",
        description:
          "Presença digital com estratégia de conversão, copy clara, SEO técnico e uma experiência que representa o valor da sua marca.",
        items: ["Landing pages", "Sites institucionais", "E-commerce e páginas de campanha"],
        tone: "lime",
      },
      {
        icon: Database,
        number: "02",
        title: "Sistemas sob medida",
        description:
          "Ferramentas internas e produtos digitais feitos para o seu fluxo — sem planilhas frágeis ou processos espalhados.",
        items: ["Dashboards e portais", "Áreas logadas", "Integrações e APIs"],
        tone: "blue",
      },
      {
        icon: Bot,
        number: "03",
        title: "Automações inteligentes",
        description:
          "Conecte as ferramentas que você já usa e automatize tarefas repetitivas para a equipe focar no que realmente importa.",
        items: ["WhatsApp e atendimento", "CRM e follow-up", "Fluxos com IA"],
        tone: "coral",
      },
      {
        icon: Package,
        number: "04",
        title: "Produtos digitais",
        description:
          "Kits prontos, componentes e soluções enxutas para você lançar mais rápido — com qualidade de produto desde o primeiro dia.",
        items: ["MVPs e protótipos", "Kits de interface", "Consultoria técnica"],
        tone: "violet",
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
      ["01", "Diagnóstico", "Entendo o contexto, os objetivos e onde está o gargalo que vale resolver primeiro."],
      ["02", "Construção", "Desenho a solução, valido as decisões e transformo o plano em uma primeira versão útil."],
      ["03", "Evolução", "Coloco no ar, meço o que importa e deixo sua operação preparada para crescer."],
    ],
    processNote: "Sem caixa-preta. Você sabe o que está sendo feito e por quê.",
    productsKicker: "04 / Produtos",
    productsTitle: "Atalhos para o próximo nível.",
    productsIntro:
      "Além de projetos sob medida, existem soluções prontas para tirar tarefas da frente e acelerar sua presença digital.",
    products: [
      ["Launch Kit", "Para quem precisa vender online agora.", "Landing page, copy e analytics em uma entrega objetiva.", "a partir de R$ 2.490"],
      ["Ops Flow", "Para quem quer recuperar horas da equipe.", "Automação de atendimento, leads e follow-up com visão do processo.", "a partir de R$ 1.890"],
      ["MVP Sprint", "Para quem tem uma ideia e quer validar.", "Protótipo funcional com base sólida para testar antes de investir alto.", "a partir de R$ 4.900"],
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
    available: "Open for new projects",
    heroEyebrow: "Independent digital studio",
    heroTitle: "Your next digital leap starts here.",
    heroTitleAccent: "digital leap",
    heroBody:
      "Websites that sell, systems that organize and automations that give your business time back.",
    heroPrimary: "Talk about my project",
    heroSecondary: "Explore solutions",
    heroMeta: "Remote · Brazil and worldwide",
    heroCaption: "Strategy, design and code in one place.",
    heroRole: "Carlos Henrique · founder",
    metricOne: "years building",
    metricTwo: "products shipped",
    metricThree: "proprietary code",
    servicesKicker: "01 / Solutions",
    servicesTitle: "What we can build together",
    servicesIntro:
      "Every project starts with a real problem. The answer might be a page, an entire operation or a new product.",
    serviceCta: "I need a solution like this",
    services: [
      { icon: LayoutTemplate, number: "01", title: "Websites & landing pages", description: "A digital presence with conversion strategy, clear copy, technical SEO and an experience that represents your brand's value.", items: ["Landing pages", "Institutional websites", "E-commerce and campaign pages"], tone: "lime" },
      { icon: Database, number: "02", title: "Custom systems", description: "Internal tools and digital products built around your workflow — no fragile spreadsheets or scattered processes.", items: ["Dashboards and portals", "Logged-in areas", "Integrations and APIs"], tone: "blue" },
      { icon: Bot, number: "03", title: "Smart automations", description: "Connect the tools you already use and automate repetitive tasks so your team can focus on what matters.", items: ["WhatsApp and support", "CRM and follow-up", "AI-powered flows"], tone: "coral" },
      { icon: Package, number: "04", title: "Digital products", description: "Ready-to-use kits, components and focused solutions to launch faster — with product quality from day one.", items: ["MVPs and prototypes", "Interface kits", "Technical consulting"], tone: "violet" },
    ],
    casesKicker: "02 / Case studies",
    casesTitle: "Real projects. Solved problems.",
    casesIntro: "A sample of the kind of product and experience that ships when strategy and execution move together.",
    casesCta: "See project details",
    processKicker: "03 / Method",
    processTitle: "Clarity before code.",
    processIntro: "A lean process, visible decisions and deliverables you can follow from the first conversation to the next step.",
    process: [["01", "Discovery", "I learn the context, goals and the bottleneck worth solving first."], ["02", "Build", "I shape the solution, validate decisions and turn the plan into a useful first version."], ["03", "Evolve", "I launch, measure what matters and leave your operation ready to grow."]],
    processNote: "No black boxes. You know what is being built and why.",
    productsKicker: "04 / Products",
    productsTitle: "Shortcuts to the next level.",
    productsIntro: "Alongside custom projects, ready-to-go solutions can remove busywork and accelerate your digital presence.",
    products: [["Launch Kit", "For teams that need to sell online now.", "Landing page, copy and analytics in one focused delivery.", "from R$ 2,490"], ["Ops Flow", "For teams that want hours back.", "Automated support, leads and follow-up with process visibility.", "from R$ 1,890"], ["MVP Sprint", "For ideas that need validation.", "A functional prototype with a solid base to test before scaling investment.", "from R$ 4,900"]],
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

const caseStudies = [
  {
    title: "WinkoApp",
    category: { pt: "Produto em tempo real", en: "Real-time product" },
    description: { pt: "Ecossistema de chat desenhado para velocidade, presença e comunicação mais humana.", en: "A real-time chat ecosystem designed for speed, presence and more human communication." },
    tags: ["React", "Socket.IO", "PostgreSQL"],
    image: winkoImage,
  },
  {
    title: "FinNext",
    category: { pt: "Interface financeira", en: "Financial interface" },
    description: { pt: "Dashboard que transforma informação de mercado em uma próxima decisão mais clara.", en: "A dashboard that turns market information into a clearer next decision." },
    tags: ["Next.js", "TypeScript", "Data viz"],
    image: finnextImage,
  },
  {
    title: "Softconta",
    category: { pt: "Lançamento de produto", en: "Product launch" },
    description: { pt: "Landing page focada em explicar valor e gerar confiança desde o primeiro contato.", en: "A focused landing page built to explain value and build trust from the first touchpoint." },
    tags: ["UX strategy", "React", "Tailwind"],
    image: softcontaImage,
  },
] as const;

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
  const siteRef = useRef<HTMLElement>(null);
  const heroSystemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = siteRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(q(".gsap-reveal, .hero-system, .hero-metrics, .hero-founder-chip"), { autoAlpha: 1, y: 0, x: 0, scale: 1, clearProps: "transform" });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .fromTo(q(".hero-copy > *"), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.08 })
      .fromTo(q(".hero-system"), { y: 34, autoAlpha: 0, rotate: 2 }, { y: 0, autoAlpha: 1, rotate: 0, duration: 1.1, ease: "expo.out" }, "-=0.6")
      .fromTo(q(".hero-founder-chip"), { scale: 0.82, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(1.8)" }, "-=0.4")
      .fromTo(q(".hero-metrics > div"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 }, "-=0.35");

    gsap.to(q(".hero-grid"), {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: root.querySelector(".solutions-hero"), start: "top top", end: "bottom top", scrub: 0.8 },
    });
    gsap.to(q(".hero-glow--blue"), {
      yPercent: 22,
      xPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: root.querySelector(".solutions-hero"), start: "top top", end: "bottom top", scrub: 1 },
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

    q(".service-tab").forEach((element, index) => {
      gsap.fromTo(element, { x: -22, autoAlpha: 0 }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.65,
        delay: index * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".services-section"), start: "top 70%", once: true },
      });
    });

    q(".case-media img").forEach((element) => {
      gsap.fromTo(element, { yPercent: -5, scale: 1.06 }, {
        yPercent: 5,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    });

    gsap.to(q(".system-chart span"), {
      scaleY: 0.72,
      transformOrigin: "bottom center",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      stagger: 0.12,
      ease: "sine.inOut",
    });

    gsap.to(q(".contact-orb"), {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, { scope: siteRef });

  useEffect(() => {
    const panel = document.getElementById("service-feature-panel");
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panel, { y: 14, autoAlpha: 0.7 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", overwrite: true });
  }, [activeService]);

  useEffect(() => {
    const wrap = heroSystemRef.current;
    const card = wrap?.querySelector<HTMLElement>(".system-window");
    if (!wrap || !card || !window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (event: MouseEvent) => {
      const bounds = wrap.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `rotate(2deg) rotateX(${y * -8}deg) rotateY(${x * 10}deg)`;
    };
    const handleLeave = () => { card.style.transform = ""; };

    wrap.addEventListener("mousemove", handleMove);
    wrap.addEventListener("mouseleave", handleLeave);
    return () => {
      wrap.removeEventListener("mousemove", handleMove);
      wrap.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <main ref={siteRef} id="home" className="solutions-site">
      <section className="solutions-hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow--blue" aria-hidden="true" />
        <div className="hero-glow hero-glow--lime" aria-hidden="true" />
        <div className="page-shell hero-shell">
          <div className="hero-copy reveal is-visible">
            <Badge variant="outline" className="status-badge"><span className="status-dot" />{text.available}</Badge>
            <p className="eyebrow">{text.heroEyebrow}</p>
            <h1 id="hero-title">{text.heroTitle.split(text.heroTitleAccent)[0]}<span>{text.heroTitleAccent}</span>{text.heroTitle.split(text.heroTitleAccent)[1]}</h1>
            <p className="hero-description">{text.heroBody}</p>
            <div className="hero-actions">
              <Button asChild size="lg" className="button-primary"><a href="#contato">{text.heroPrimary}<ArrowUpRight /></a></Button>
              <Button asChild variant="outline" size="lg" className="button-secondary"><a href="#servicos">{text.heroSecondary}<ArrowRight /></a></Button>
            </div>
            <p className="hero-meta"><span className="meta-line" />{text.heroMeta}</p>
          </div>

          <div className="hero-system reveal is-visible" ref={heroSystemRef} aria-label={pt ? "Prévia de um sistema digital" : "Digital system preview"}>
            <div className="system-window">
              <div className="system-bar"><span className="system-dots"><i /><i /><i /></span><span>carlos / solutions</span><span className="system-live"><i /> live</span></div>
              <div className="system-body">
                <aside className="system-sidebar"><span className="system-logo"><Sparkles size={15} /></span><i /><i /><i /><i /></aside>
                <div className="system-content"><div className="system-content-top"><span>{pt ? "visão geral" : "overview"}</span><span>09:41 ↗</span></div><div className="system-highlight"><span>{pt ? "operações mais leves" : "lighter operations"}</span><strong>+38<span>%</span></strong><small>{pt ? "tempo devolvido à equipe" : "time returned to the team"}</small></div><div className="system-chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="system-cards"><i /><i /><i /></div></div>
              </div>
            </div>
            <div className="system-caption"><span>01</span><strong>{pt ? "Da ideia ao ar" : "From idea to live"}</strong><span>{pt ? "interfaces que trabalham" : "interfaces that work"}</span></div>

            <div className="hero-founder-chip">
              <span className="hero-founder-chip__avatar"><Image src="/carlos-portrait-v3.webp" alt="" fill sizes="42px" /></span>
              <div>
                <strong>{text.heroRole}</strong>
                <span><ShieldCheck size={12} />{pt ? "código próprio, sem terceirização" : "in-house code, no outsourcing"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-shell hero-metrics" aria-label={pt ? "Números da experiência" : "Experience in numbers"}>
          <div><Users size={16} /><strong>06<span>+</span></strong><span>{text.metricOne}</span></div>
          <div><TrendingUp size={16} /><strong>20<span>+</span></strong><span>{text.metricTwo}</span></div>
          <div><ShieldCheck size={16} /><strong>100<span>%</span></strong><span>{text.metricThree}</span></div>
          <div className="hero-scroll-hint"><span className="scroll-arrow">↓</span>{pt ? "role para conhecer" : "scroll to explore"}</div>
        </div>
      </section>

      <section id="servicos" className="services-section section-light" aria-labelledby="services-title">
        <div className="page-shell">
          <Reveal className="section-intro">
            <p className="section-kicker">{text.servicesKicker}</p>
            <div><h2 id="services-title">{text.servicesTitle}</h2><p>{text.servicesIntro}</p></div>
          </Reveal>
          <div className="services-layout">
            <div className="service-list" role="tablist" aria-label={pt ? "Tipos de solução" : "Solution types"}>
              {text.services.map((service, index) => {
                const Icon = service.icon;
                return <button type="button" role="tab" aria-selected={activeService === index} aria-controls="service-feature-panel" className={`service-tab ${activeService === index ? "is-active" : ""}`} key={service.title} onClick={() => setActiveService(index)}>
                  <span className="service-tab-index">{service.number}</span><span>{service.title}</span><ChevronRight size={17} />
                  <Icon className="service-tab-icon" size={19} />
                </button>;
              })}
              <a className="inline-cta" href="#contato">{text.serviceCta}<ArrowUpRight size={16} /></a>
            </div>
            <Reveal className="service-feature-wrap">
              {(() => { const service = text.services[activeService]; const Icon = service.icon; return <Card id="service-feature-panel" role="tabpanel" className={`service-feature tone-${service.tone}`}>
                <CardHeader className="service-feature__header"><div className="feature-icon"><Icon size={25} /></div><span className="feature-number">{service.number} / 04</span><CardTitle className="service-feature__title">{service.title}</CardTitle><CardDescription className="service-feature__description">{service.description}</CardDescription></CardHeader>
                <CardContent className="service-feature__content"><ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="feature-foot"><span>{pt ? "A partir de" : "Starting at"}</span><strong>{service.number === "01" ? "7–14" : service.number === "02" ? "3–8" : service.number === "03" ? "2–6" : "1–4"} {pt ? "semanas" : "weeks"}</strong></div></CardContent>
              </Card>; })()}
            </Reveal>
          </div>
        </div>
      </section>

      <section id="cases" className="cases-section section-dark" aria-labelledby="cases-title">
        <div className="page-shell">
          <Reveal className="section-intro section-intro--dark"><p className="section-kicker">{text.casesKicker}</p><div><h2 id="cases-title">{text.casesTitle}</h2><p>{text.casesIntro}</p></div></Reveal>
          <div className="cases-grid">{caseStudies.map((item, index) => <Reveal key={item.title}><article className={`case-card ${index === 0 ? "case-card--wide" : ""}`}><div className="case-media"><Image src={item.image} alt={`${item.title} ${pt ? "projeto" : "project"}`} fill sizes={index === 0 ? "(max-width: 720px) 100vw, 60vw" : "(max-width: 720px) 100vw, 30vw"} /><span className="case-media-index">0{index + 1} / {item.category[locale]}</span><span className="case-media-arrow"><ArrowUpRight size={17} /></span></div><div className="case-info"><div><h3>{item.title}</h3><p>{item.description[locale]}</p></div><div className="case-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article></Reveal>)}</div>
          <a className="cases-link" href="https://github.com/lchenrique" target="_blank" rel="noreferrer">{text.casesCta}<ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section id="processo" className="process-section section-dark" aria-labelledby="process-title">
        <div className="page-shell">
          <Reveal className="section-intro section-intro--dark"><p className="section-kicker">{text.processKicker}</p><div><h2 id="process-title">{text.processTitle}</h2><p>{text.processIntro}</p></div></Reveal>
          <div className="process-grid">{text.process.map(([number, title, description]) => <Reveal key={number}><Card className="process-card"><CardHeader className="process-card__header"><span className="process-number">{number}</span><CardTitle className="process-card__title">{title}</CardTitle></CardHeader><CardContent className="process-card__content"><p>{description}</p><span className="process-arrow"><ArrowUpRight size={17} /></span></CardContent></Card></Reveal>)}</div>
          <div className="process-note"><ShieldCheck size={18} /><span>{text.processNote}</span></div>
        </div>
      </section>

      <section id="produtos" className="products-section section-accent" aria-labelledby="products-title">
        <div className="page-shell">
          <Reveal className="section-intro section-intro--accent"><p className="section-kicker">{text.productsKicker}</p><div><h2 id="products-title">{text.productsTitle}</h2><p>{text.productsIntro}</p></div></Reveal>
          <div className="product-grid">{text.products.map(([name, audience, description, price], index) => <Reveal key={name}><Card className={`product-card ${index === 1 ? "product-card--featured" : ""}`}><CardHeader className="product-card__header"><div className="product-top"><Badge variant="outline" className="product-badge">{index === 1 ? (pt ? "Mais pedido" : "Most popular") : `0${index + 1}`}</Badge><ArrowUpRight size={19} /></div><CardTitle className="product-card__title">{name}</CardTitle><CardDescription className="product-card__description">{audience}</CardDescription></CardHeader><CardContent className="product-card__content"><p>{description}</p><div className="product-bottom"><strong>{price}</strong><a href="#contato">{text.productCta}<ArrowRight size={15} /></a></div></CardContent></Card></Reveal>)}</div>
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
