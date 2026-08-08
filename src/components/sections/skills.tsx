"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

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

    gsap.fromTo(q(".skills-heading"), { y: 50, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 72%" },
    });

    gsap.to(q(".skills-track--one"), {
      xPercent: -18,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.to(q(".skills-track--two"), {
      xPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
    });
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

      <div className="skills-marquee" aria-label="Technologies used">
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
