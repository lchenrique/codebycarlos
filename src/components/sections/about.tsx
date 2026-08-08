"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["08+", "statYears"],
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

    gsap.fromTo(q(".about-reveal"), { yPercent: 115, autoAlpha: 0 }, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.1,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 72%" },
    });
    gsap.fromTo(q(".about-copy, .about-photo, .about-stat"), { y: 38, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 62%" },
    });
    gsap.to(q(".about-photo img"), {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
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
              <Image src="/eu.png" alt="Carlos Henrique at work" fill sizes="(max-width: 768px) 100vw, 34vw" />
              <span className="about-photo__caption">{t("portrait")}</span>
            </div>
            <div className="about-copy">
              <p className="about-copy__lead">{t("aboutLead")}</p>
              <p>{t("aboutCopy")}</p>
              <a className="text-link" href="mailto:lc.henriquee@gmail.com">{t("aboutLink")} <ArrowUpRight size={16} /></a>
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
