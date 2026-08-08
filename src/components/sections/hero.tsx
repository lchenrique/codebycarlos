"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { locale, t } = useSiteSettings();

  useGSAP(() => {
    const root = heroRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    const intro = gsap.timeline({ delay: 1.22, defaults: { ease: "power4.out" } });
    intro
      .fromTo(q(".hero-kicker"), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 })
      .fromTo(q(".hero-line"), { yPercent: 120, skewY: 6 }, { yPercent: 0, skewY: 0, duration: 1.35, stagger: 0.08 }, "-=0.45")
      .fromTo(q(".hero-copy"), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.65")
      .fromTo(q(".hero-orbit"), { scale: 0.65, autoAlpha: 0, rotation: -20 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.6, ease: "expo.out" }, "-=1.15")
      .fromTo(q(".hero-footer"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.75");

    gsap.to(q(".hero-orbit__spin"), { rotation: 360, duration: 24, repeat: -1, ease: "none" });
    gsap.to(q(".hero-orbit__image"), { y: -14, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    })
      .to(q(".hero-stage"), { yPercent: -15, scale: 0.94, ease: "none" }, 0)
      .to(q(".hero-grid"), { yPercent: 18, scale: 1.12, ease: "none" }, 0)
      .to(q(".hero-orbit"), { yPercent: 34, rotation: 12, ease: "none" }, 0)
      .to(q(".hero-ghost"), { xPercent: -12, opacity: 0.28, ease: "none" }, 0);
  }, { scope: heroRef });

  useEffect(() => {
    const root = heroRef.current;
    const orbit = root?.querySelector<HTMLElement>(".hero-orbit");
    const photo = root?.querySelector<HTMLImageElement>(".hero-orbit__image img");
    const shine = root?.querySelector<HTMLElement>(".hero-orbit__image-shine");

    if (!root || !orbit || !photo || !shine || !window.matchMedia("(hover: hover)").matches) return;




    const handleMove = (event: MouseEvent) => {
      const bounds = orbit.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));

      photo.style.transform = `translate3d(${x * 7}px, ${y * 7}px, 0) scale(1.06)`;

      shine.style.setProperty("--pointer-x", `${50 + x * 70}%`);
      shine.style.setProperty("--pointer-y", `${50 + y * 70}%`);
      orbit.classList.add("is-hovered");
    };

    const handleLeave = () => {
      photo.style.transform = "";

      shine.style.setProperty("--pointer-x", "50%");
      shine.style.setProperty("--pointer-y", "50%");
      orbit.classList.remove("is-hovered");
    };

    orbit.addEventListener("mousemove", handleMove);
    orbit.addEventListener("mouseleave", handleLeave);

    return () => {
      orbit.removeEventListener("mousemove", handleMove);
      orbit.removeEventListener("mouseleave", handleLeave);

    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section" aria-label="Introduction">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-stage page-gutter">
        <div className="hero-kicker mono-label">
          <span>01 / 05</span>
          <span className="hero-kicker__line" />
          <span>{t("heroKicker")}</span>
        </div>

        <div className="hero-main">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t("heroEyebrow")}</p>
            <h1 className="hero-title">
              <span className="hero-title__line"><span className="hero-line">{t("heroTitleOne")}</span></span>
              <span className="hero-title__line hero-title__line--offset"><span className="hero-line hero-title__accent">{t("heroTitleTwo")}</span></span>
              <span className="hero-title__line"><span className="hero-line">{t("heroTitleThree")} <em>{t("heroTitleFour")}</em></span></span>
            </h1>
            <div className="hero-copy__bottom">
              <p>{t("heroDescription")}</p>
              <a className="circle-link" href="#projects" aria-label={t("heroWork")}>
                <span>{t("heroSee")}<br />{t("heroWork")}</span>
                <ArrowDownRight size={17} />
              </a>
            </div>
          </div>

        </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="hero-orbit__spin">
              <span className="hero-orbit__label hero-orbit__label--top">{locale === "pt" ? "movimento / código / sensação" : "motion / code / feeling"}</span>
              <span className="hero-orbit__label hero-orbit__label--bottom">{locale === "pt" ? "role para explorar · role para explorar ·" : "scroll to explore · scroll to explore ·"}</span>
              <div className="hero-orbit__ring hero-orbit__ring--outer" />
              <div className="hero-orbit__ring hero-orbit__ring--inner" />
            </div>
            <div className="hero-orbit__image">
              <Image src="/eu.jpg" alt="Carlos Henrique" fill priority sizes="(max-width: 1024px) 50vw, 420px" />
              <div className="hero-orbit__image-shine" />
            </div>
            <span className="hero-orbit__number">CH<br /><b>01</b></span>
          </div>

        <div className="hero-footer">
          <span className="hero-footer__location">{t("heroLocation")} <i>↗</i></span>
          <span className="hero-footer__scroll"><span className="scroll-line" /> {t("heroScroll")}</span>
          <a href="#about" className="hero-footer__next">{t("heroNext")} <ArrowUpRight size={15} /></a>
        </div>
      </div>

      <div className="hero-ghost" aria-hidden="true">feel</div>
    </section>
  );
}
