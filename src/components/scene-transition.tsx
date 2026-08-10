"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

export function SceneTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(q(".scene-word"), { yPercent: 0 });
      gsap.set(q(".scene-line--impact"), { overflow: "visible" });
      return;
    }

    const updateFrame = (progress: number) => {
      if (frameRef.current) {
        frameRef.current.textContent = String(Math.round(progress * 96) + 1).padStart(3, "0");
      }
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=165%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (self) => updateFrame(self.progress),
        },
      });

      timeline
        .fromTo(q(".scene-word"), { yPercent: 120 }, { yPercent: 0, duration: 1.1, stagger: 0.13, ease: "power4.out" })
        .fromTo(q(".scene-transition__aperture"), { clipPath: "inset(49% 0 49% 0)" }, { clipPath: "inset(0% 0 0% 0)", duration: 1.1, ease: "power3.inOut" }, 0.35)
        .fromTo(q(".scene-transition__flare"), { xPercent: -160, autoAlpha: 0 }, { xPercent: 160, autoAlpha: 1, duration: 1.65, ease: "power2.inOut" }, 0.2)
        .to(q(".scene-word--one"), { xPercent: -10, autoAlpha: 0.18, duration: 1 }, 1.05)
        .set(q(".scene-line--impact"), { overflow: "visible" }, 0.96)
        .to(q(".scene-word--three"), { xPercent: -2, color: "#d9ff45", duration: 1 }, 1.05)
        .fromTo(q(".scene-transition__meta"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 1.15);
    });

    mm.add("(max-width: 900px)", () => {
      gsap.fromTo(q(".scene-word"), { yPercent: 115 }, {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
        onComplete: () => gsap.set(q(".scene-line--impact"), { overflow: "visible" }),
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="interlude" className="scene-transition" aria-label={t("sceneAria")}>
      <div className="scene-transition__aperture" aria-hidden="true">
        <span className="scene-transition__flare" />
        <span className="scene-transition__cross scene-transition__cross--left" />
        <span className="scene-transition__cross scene-transition__cross--right" />
      </div>

      <div className="scene-transition__stage page-gutter">
        <div className="scene-transition__top mono-label">
          <span>{t("sceneKicker")}</span>
          <span>TC 00:04:<span ref={frameRef}>001</span></span>
        </div>

        <h2 className="scene-transition__heading">
          <span className="scene-line"><span className="scene-word scene-word--one">{t("sceneTitleOne")}</span></span>
          <span className="scene-line"><span className="scene-word scene-word--two">{t("sceneTitleTwo")}</span></span>
          <span className="scene-line scene-line--impact"><span className="scene-word scene-word--three">{t("sceneTitleThree")}</span></span>
        </h2>

        <div className="scene-transition__meta mono-label">
          <span>{t("sceneMetaOne")}</span>
          <span>{t("sceneMetaTwo")}</span>
        </div>
      </div>
    </section>
  );
}
