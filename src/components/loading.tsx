"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useSiteSettings } from "@/lib/site-settings";
import { useRef } from "react";

export function Loading() {
  const screenRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = screenRef.current;
    const counter = counterRef.current;
    if (!root || !counter) return;

    const finish = () => {
      document.body.classList.remove("is-loading");
      document.body.dataset.intro = "complete";
      window.dispatchEvent(new Event("codebycarlos:intro-complete"));
    };

    const params = new URLSearchParams(window.location.search);
    const skipIntro = params.has("noIntro") || window.sessionStorage.getItem("codebycarlos-intro-seen") === "true";

    if (skipIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root, { display: "none" });
      finish();
      return;
    }

    document.body.classList.add("is-loading");
    const progress = { value: 0 };
    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    timeline
      .fromTo(".loading-screen__top span, .loading-screen__bottom span", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05 })
      .fromTo(".loading-screen__eyebrow", { letterSpacing: "0.45em", autoAlpha: 0 }, { letterSpacing: "0.18em", autoAlpha: 1, duration: 0.55 }, 0.08)
      .to(progress, {
        value: 100,
        duration: 1.15,
        ease: "power2.inOut",
        onUpdate: () => {
          const value = Math.round(progress.value);
          counter.textContent = `${value}%`;
          root.style.setProperty("--loading-progress", String(value / 100));
        },
      }, 0.1)
      .to(".loading-screen__center", { y: -18, autoAlpha: 0, duration: 0.35 }, 1.12)
      .to(".loading-screen__shutter--top", { yPercent: -102, duration: 0.8, ease: "power4.inOut" }, 1.18)
      .to(".loading-screen__shutter--bottom", { yPercent: 102, duration: 0.8, ease: "power4.inOut" }, 1.18)
      .to(root, { autoAlpha: 0, duration: 0.15, onComplete: () => {
        window.sessionStorage.setItem("codebycarlos-intro-seen", "true");
        finish();
      } }, 1.86)
      .set(root, { display: "none" });

    return () => {
      timeline.kill();
      document.body.classList.remove("is-loading");
    };
  }, { scope: screenRef });

  return (
    <div ref={screenRef} className="loading-screen" role="status" aria-label={t("loadingPlease")}>
      <div className="loading-screen__shutter loading-screen__shutter--top" aria-hidden="true" />
      <div className="loading-screen__shutter loading-screen__shutter--bottom" aria-hidden="true" />
      <div className="loading-screen__top">
        <span>CH / 2026</span>
        <span>{t("loadingDigital")}</span>
      </div>
      <div className="loading-screen__center">
        <span className="loading-screen__eyebrow">{t("loadingStudio")}</span>
        <strong ref={counterRef}>0%</strong>
        <div className="loading-screen__line"><span /></div>
      </div>
      <div className="loading-screen__bottom">
        <span>{t("loadingLocation")}</span>
        <span>{t("loadingPlease")}</span>
      </div>
    </div>
  );
}
