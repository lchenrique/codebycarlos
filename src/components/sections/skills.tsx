"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

const rowOne = ["React", "TypeScript", "Next.js", "GSAP", "Three.js", "Design systems", "Motion"];
const rowTwo = ["Node.js", "PostgreSQL", "Tailwind", "Figma", "WebGL", "Prototyping", "Storytelling"];

function SkillRow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`skills-track ${className}`}>
      {[...items, ...items].map((skill, index) => (
        <span className="skill-pill" key={`${skill}-${index}`}>
          <i />{skill}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q(".section-marker, .skills-heading > *, .skills-bottom"), {
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 74%", once: true },
      defaults: { ease: "power4.out" },
    })
      .fromTo(q(".section-marker"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
      .fromTo(q(".skills-heading > *"), { y: 48, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        stagger: 0.1,
      }, 0.08)
      .fromTo(q(".skills-bottom"), { y: 22, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
      }, 0.35);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      gsap.to(q(".skills-track--one"), {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(q(".skills-track--two"), {
        xPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="skills" className="skills-section section-acid">
      <div className="page-gutter">
        <div className="section-marker section-marker--dark">
          <span>03 / {t("toolkit")}</span>
          <span className="section-marker__rule" />
          <span>{t("toolkitSub")}</span>
        </div>

        <div className="skills-heading">
          <div>
            <p className="section-eyebrow">{t("toolkitEyebrow")}</p>
            <h2>{t("toolkitTitleOne")}<br /><em>{t("toolkitTitleTwo")}</em></h2>
          </div>
          <p className="skills-intro">{t("toolkitIntro")}</p>
        </div>
      </div>

      <div className="skills-marquee" aria-label={t("skillsAria")}>
        <SkillRow items={rowOne} className="skills-track--one" />
        <SkillRow items={rowTwo} className="skills-track--two" />
      </div>

      <div className="page-gutter skills-bottom">
        <span>{t("toolkitBottom")}</span>
        <ArrowDownRight size={18} />
      </div>
    </section>
  );
}
