"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroObject = dynamic(() => import("@/components/hero-object").then((module) => module.HeroObject), { ssr: false });

const heroCopy = {
  pt: {
    available: "Agenda aberta para novos projetos",
    eyebrow: "Estúdio digital independente",
    lead: "Seu próximo",
    words: ["avanço", "site", "sistema", "produto"],
    tail: "começa aqui.",
    body: "Sites que vendem, sistemas que organizam e automações que devolvem tempo para o seu negócio.",
    primary: "Falar sobre meu projeto",
    secondary: "Conhecer soluções",
    meta: "Atendimento remoto · Brasil e mundo",
    reply: "Resposta em até 24h",
    role: "Carlos Henrique · fundador",
    seal: "código próprio, sem terceirização",
    stageLabel: "Objeto 3D decorativo do estúdio",
    captionTitle: "Da ideia ao ar",
    captionNote: "estratégia, design e código em um só núcleo",
    scroll: "role para conhecer",
    metricsLabel: "Números da experiência",
    metrics: ["anos construindo", "produtos entregues", "código proprietário"],
    marquee: [
      "Landing pages",
      "Dashboards",
      "Automação com IA",
      "Integrações e APIs",
      "E-commerce",
      "Áreas logadas",
      "WhatsApp e CRM",
      "MVPs",
    ],
  },
  en: {
    available: "Open for new projects",
    eyebrow: "Independent digital studio",
    lead: "Your next",
    words: ["leap", "website", "system", "product"],
    tail: "starts here.",
    body: "Websites that sell, systems that organize and automations that give your business time back.",
    primary: "Talk about my project",
    secondary: "Explore solutions",
    meta: "Remote · Brazil and worldwide",
    reply: "Reply within 24h",
    role: "Carlos Henrique · founder",
    seal: "in-house code, no outsourcing",
    stageLabel: "Decorative 3D studio object",
    captionTitle: "From idea to live",
    captionNote: "strategy, design and code in one core",
    scroll: "scroll to explore",
    metricsLabel: "Experience in numbers",
    metrics: ["years building", "products shipped", "proprietary code"],
    marquee: [
      "Landing pages",
      "Dashboards",
      "AI automation",
      "Integrations & APIs",
      "E-commerce",
      "Logged-in areas",
      "WhatsApp & CRM",
      "MVPs",
    ],
  },
} as const;

const metricIcons = [Users, TrendingUp, ShieldCheck];
const metricValues = [
  { value: 6, suffix: "+", pad: true },
  { value: 20, suffix: "+", pad: false },
  { value: 100, suffix: "%", pad: false },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover)").matches;

export function SolutionsHero({ locale }: { locale: "pt" | "en" }) {
  const text = heroCopy[locale];
  const heroRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLSpanElement>(null);

  /* Entrance timeline, rotating headline word, counters and ambient loops. */
  useGSAP(() => {
    const root = heroRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const pick = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

    const counters = pick<HTMLElement>(".count-up");
    const words = Array.from(rotatorRef.current?.querySelectorAll<HTMLElement>(".hero-rotator__word") ?? []);
    const bar = rotatorRef.current?.querySelector<HTMLElement>(".hero-rotator__bar") ?? null;

    if (prefersReducedMotion()) {
      gsap.set(
        q(".hero-badge, .hero-eyebrow, .hero-line__inner, .hero-rotator, .hero-description, .hero-actions, .hero-trust, .hero-stage, .hero-founder-chip, .hero-metrics > div, .hero-marquee"),
        { autoAlpha: 1, y: 0, x: 0, yPercent: 0, scale: 1, rotate: 0, clearProps: "transform,filter" },
      );
      gsap.set(words, { autoAlpha: 0 });
      if (words[0]) gsap.set(words[0], { autoAlpha: 1 });
      counters.forEach((node) => {
        node.textContent = node.dataset.value ?? node.textContent;
      });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

    intro
      .fromTo(q(".hero-badge"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
      .fromTo(q(".hero-eyebrow"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.42")
      /* y: 0 is explicit — GSAP reads the CSS anti-flash transform as a px offset and would keep it otherwise. */
      .fromTo(
        q(".hero-line__inner"),
        { yPercent: 118, y: 0, autoAlpha: 0 },
        { yPercent: 0, y: 0, autoAlpha: 1, duration: 1.05, stagger: 0.1, ease: "expo.out" },
        "-=0.34",
      )
      .fromTo(q(".hero-rotator"), { autoAlpha: 0, filter: "blur(10px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.75 }, "-=0.72")
      .fromTo(q(".hero-description, .hero-actions, .hero-trust"), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09 }, "-=0.5")
      .fromTo(q(".hero-stage"), { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1.3, ease: "expo.out" }, "-=1")
      .fromTo(q(".hero-founder-chip"), { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(1.9)" }, "-=0.7")
      .fromTo(q(".hero-stage-caption"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, "-=0.4")
      .fromTo(q(".hero-metrics > div"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, "-=0.45")
      .fromTo(q(".hero-marquee"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.55");

    counters.forEach((node) => {
      const target = Number(node.dataset.count ?? 0);
      const pad = node.dataset.pad === "true";
      const proxy = { value: 0 };
      intro.to(
        proxy,
        {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            const current = Math.round(proxy.value);
            node.textContent = pad ? String(current).padStart(2, "0") : String(current);
          },
        },
        1.05,
      );
    });

    /* Rotating accent word: blur/slide swap, with the acid underline resizing along. */
    let rotatorLoop: gsap.core.Timeline | null = null;
    let onResize: (() => void) | null = null;

    if (rotatorRef.current && words.length > 1) {
      const rotator = rotatorRef.current;

      const build = () => {
        rotatorLoop?.kill();
        const widths = words.map((word) => word.getBoundingClientRect().width);
        gsap.set(rotator, { width: widths[0] });
        gsap.set(words, { autoAlpha: 0, yPercent: 45, filter: "blur(6px)" });
        gsap.set(words[0], { autoAlpha: 1, yPercent: 0, filter: "blur(0px)" });
        if (bar) gsap.set(bar, { width: widths[0] });

        const loop = gsap.timeline({ repeat: -1, delay: 3 });
        words.forEach((word, index) => {
          const next = words[(index + 1) % words.length];
          const nextWidth = widths[(index + 1) % words.length];
          loop
            .to(word, { yPercent: -45, autoAlpha: 0, filter: "blur(6px)", duration: 0.42, ease: "power2.in" })
            .to(rotator, { width: nextWidth, duration: 0.5, ease: "power3.inOut" }, "<");
          if (bar) loop.to(bar, { width: nextWidth, duration: 0.5, ease: "power3.inOut" }, "<");
          loop
            .fromTo(
              next,
              { yPercent: 45, autoAlpha: 0, filter: "blur(6px)" },
              { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
              "-=0.22",
            )
            .to({}, { duration: 2.2 });
        });
        rotatorLoop = loop;
      };

      if (typeof document.fonts?.ready?.then === "function") document.fonts.ready.then(build).catch(build);
      else build();

      onResize = () => build();
      window.addEventListener("resize", onResize);
    }

    /* The 3D object carries the motion; background layers only settle into place once. */
    if (window.matchMedia("(hover: hover)").matches) {
      gsap.to(q(".hero-orbit"), { rotation: 360, duration: 68, repeat: -1, ease: "none" });
      gsap.to(q(".hero-aurora--acid"), { xPercent: 12, yPercent: -14, duration: 15, ease: "sine.inOut" });
      gsap.to(q(".hero-aurora--blue"), { xPercent: -16, yPercent: 12, duration: 19, ease: "sine.inOut" });
      gsap.to(q(".hero-aurora--coral"), { xPercent: 10, yPercent: 16, duration: 23, ease: "sine.inOut" });
    }

    /* Scroll parallax across the hero layers. */
    gsap.to(q(".hero-grid"), {
      yPercent: 14,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
    });
    gsap.to(q(".hero-copy"), {
      y: -50,
      autoAlpha: 0.32,
      ease: "none",
      scrollTrigger: { trigger: root, start: "center center", end: "bottom top", scrub: 0.6 },
    });
    gsap.to(q(".hero-stage-wrap"), {
      y: -86,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.7 },
    });

    return () => {
      rotatorLoop?.kill();
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, { scope: heroRef });

  /* Background layer parallax, throttled to one rAF per frame. */
  useEffect(() => {
    const root = heroRef.current;
    if (!root || !canHover() || prefersReducedMotion()) return;

    let frame = 0;
    let px = 0.5;
    let py = 0.5;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--px", `${(px - 0.5) * 20}px`);
      root.style.setProperty("--py", `${(py - 0.5) * 15}px`);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      px = (event.clientX - bounds.left) / bounds.width;
      py = (event.clientY - bounds.top) / bounds.height;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Magnetic pull on the hero call to actions. */
  useEffect(() => {
    const root = heroRef.current;
    if (!root || !canHover() || prefersReducedMotion()) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups = targets.map((target) => {
      const onMove = (event: PointerEvent) => {
        const bounds = target.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        gsap.to(target, { x: dx * 0.2, y: dy * 0.28, duration: 0.4, ease: "power3.out" });
      };
      const onLeave = () => gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerleave", onLeave);
      return () => {
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(target);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={heroRef} className="solutions-hero" aria-labelledby="hero-title">
      <div className="hero-canvas" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orbit" />
        <div className="hero-aurora hero-aurora--acid" />
        <div className="hero-aurora hero-aurora--blue" />
        <div className="hero-aurora hero-aurora--coral" />
        <div className="hero-vignette" />
      </div>

      {/* Full-bleed WebGL layer: the star field spans the hero, the planet anchors to .hero-stage. */}
      <HeroObject />
      <span className="sr-only">{text.stageLabel}</span>

      <div className="page-shell hero-shell">
        <div className="hero-copy">
          <Badge variant="outline" className="status-badge hero-badge">
            <span className="status-dot" />
            {text.available}
          </Badge>
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-bar" />
            {text.eyebrow}
          </p>

          <h1 id="hero-title" className="hero-title" aria-label={`${text.lead} ${text.words[0]} ${text.tail}`}>
            <span aria-hidden="true">
              <span className="hero-line">
                <span className="hero-line__inner">{text.lead}</span>
              </span>
              <span className="hero-rotator-line">
                <span className="hero-rotator" ref={rotatorRef}>
                  {text.words.map((word) => (
                    <span className="hero-rotator__word" key={word}>
                      {word}
                    </span>
                  ))}
                  <span className="hero-rotator__bar" />
                </span>
              </span>
              <span className="hero-line">
                <span className="hero-line__inner">{text.tail}</span>
              </span>
            </span>
          </h1>

          <p className="hero-description">{text.body}</p>

          <div className="hero-actions">
            <Button asChild size="lg" className="button-primary magnetic">
              <a href="#contato">
                <span className="button-shine" aria-hidden="true" />
                {text.primary}
                <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="button-secondary magnetic">
              <a href="#servicos">
                {text.secondary}
                <ArrowRight />
              </a>
            </Button>
          </div>

          <div className="hero-trust">
            <p className="hero-meta">
              <span className="meta-line" />
              {text.meta}
            </p>
            <p className="hero-meta hero-meta--reply">
              <Check size={13} />
              {text.reply}
            </p>
          </div>
        </div>

        <div className="hero-stage-wrap" ref={systemRef}>
          {/* Empty on purpose: it reserves the column and tells the WebGL layer where to park the planet. */}
          <div className="hero-stage" aria-hidden="true">
            <span className="hero-stage__halo" />
          </div>

          <div className="hero-stage-caption">
            <span>01</span>
            <strong>{text.captionTitle}</strong>
            <span>{text.captionNote}</span>
          </div>

          <div className="hero-founder-chip">
            <span className="hero-founder-chip__avatar">
              <Image src="/carlos-portrait-v3.webp" alt="" fill sizes="48px" />
            </span>
            <div>
              <strong>{text.role}</strong>
              <span>
                <ShieldCheck size={12} />
                {text.seal}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee__track">
          {[0, 1].map((group) => (
            <div className="hero-marquee__group" key={group}>
              {text.marquee.map((item) => (
                <span key={`${group}-${item}`}>
                  <Activity size={12} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="page-shell hero-metrics" aria-label={text.metricsLabel}>
        {text.metrics.map((label, index) => {
          const Icon = metricIcons[index];
          const metric = metricValues[index];
          const display = metric.pad ? String(metric.value).padStart(2, "0") : String(metric.value);
          return (
            <div key={label}>
              <Icon size={16} />
              <strong>
                <span className="count-up" data-count={metric.value} data-value={display} data-pad={String(metric.pad)}>
                  {metric.pad ? "00" : "0"}
                </span>
                <span>{metric.suffix}</span>
              </strong>
              <span>{label}</span>
            </div>
          );
        })}
        <div className="hero-scroll-hint">
          <span className="scroll-arrow">
            <span className="scroll-arrow__dot" />
          </span>
          {text.scroll}
        </div>
      </div>
    </section>
  );
}
