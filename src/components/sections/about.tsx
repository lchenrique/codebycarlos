"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

const stats = [
  ["06+", "statYears"],
  ["20+", "statProducts"],
  ["∞", "statCuriosity"],
] as const;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q(".section-marker, .about-reveal, .about-copy, .about-stat, .about-note"), {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      gsap.set(q(".about-photo"), { clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const entry = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
      defaults: { ease: "power4.out" },
    });
    entry
      .fromTo(q(".section-marker"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 })
      .fromTo(q(".about-reveal"), { yPercent: 115, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.08,
      }, 0.08)
      .fromTo(q(".about-photo"), { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.15,
        ease: "expo.inOut",
      }, 0.2)
      .fromTo(q(".about-copy, .about-stat, .about-note"), { y: 36, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      }, 0.4);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      gsap.to(q(".about-photo img"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="about-section section-dark">
      <div className="page-gutter">
        <div className="section-marker">
          <span>02 / {t("aboutMarker")}</span>
          <span className="section-marker__rule" />
          <span>{t("aboutSub")}</span>
        </div>

        <div className="about-layout">
          <div className="about-heading">
            <p className="section-eyebrow">{t("aboutEyebrow")}</p>
            <h2>
              <span className="line-mask"><span className="about-reveal">{t("aboutTitleOne")}</span></span>
              <span className="line-mask"><span className="about-reveal about-heading__muted">{t("aboutTitleTwo")}</span></span>
              <span className="line-mask"><span className="about-reveal">{t("aboutTitleThree")}</span></span>
            </h2>
          </div>

          <div className="about-side">
            <div className="about-photo">
              <Image src="/eu.png" alt={t("portraitAlt")} fill sizes="(max-width: 768px) 100vw, 34vw" />
              <span className="about-photo__caption">{t("portrait")}</span>
            </div>
            <div className="about-copy">
              <p className="about-copy__lead">{t("aboutLead")}</p>
              <p>{t("aboutCopy")}</p>
              <a className="text-link" href="mailto:carlos@codebycarlos.dev">{t("aboutLink")} <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>

        <div className="about-stats">
          {stats.map(([value, label]) => (
            <div className="about-stat" key={label}>
              <strong>{value}</strong>
              <span>{t(label)}</span>
            </div>
          ))}
          <p className="about-note">{t("aboutNote").split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
        </div>
      </div>
    </section>
  );
}
