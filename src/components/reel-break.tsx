"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useSiteSettings } from "@/lib/site-settings";
import { useRef } from "react";

export function ReelBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const { t } = useSiteSettings();
  const track = t("reelTrack").split(" / ");

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q(".reel-break__word"), { yPercent: 0 });
      gsap.set(q(".reel-break__shutter"), { scaleY: 0 });
      gsap.set(q(".reel-break__meta"), { autoAlpha: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          end: "bottom 18%",
          scrub: 0.65,
          onUpdate: (self) => {
            if (frameRef.current) {
              frameRef.current.textContent = String(Math.round(self.progress * 71) + 1).padStart(3, "0");
            }
          },
        },
      });

      timeline
        .fromTo(q(".reel-break__shutter"), { scaleY: 1 }, {
          scaleY: 0,
          duration: 0.52,
          stagger: { each: 0.035, from: "edges" },
          ease: "power3.inOut",
        })
        .fromTo(q(".reel-break__word"), { yPercent: 118, rotate: 2 }, {
          yPercent: 0,
          rotate: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power4.out",
        }, 0.12)
        .fromTo(q(".reel-break__track"), { xPercent: 7 }, { xPercent: -10, duration: 1 }, 0)
        .fromTo(q(".reel-break__meta"), { y: 24, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.32,
          ease: "power3.out",
        }, 0.5);
    });

    mm.add("(max-width: 900px)", () => {
      gsap.set(q(".reel-break__shutter"), { scaleY: 0 });
      gsap.fromTo(q(".reel-break__word"), { yPercent: 112 }, {
        yPercent: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="reel-break" aria-label={t("reelAria")}>
      <div className="reel-break__shutters" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <span className="reel-break__shutter" key={index} />)}
      </div>

      <div className="reel-break__track" aria-hidden="true">
        {[...track, ...track].map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}
      </div>

      <div className="reel-break__stage page-gutter">
        <div className="reel-break__top mono-label">
          <span>{t("reelKicker")}</span>
          <span>TC 00:05:<span ref={frameRef}>001</span></span>
        </div>

        <h2 className="reel-break__heading">
          <span className="reel-break__line"><span className="reel-break__word">{t("reelTitleOne")}</span></span>
          <span className="reel-break__line"><span className="reel-break__word reel-break__word--accent">{t("reelTitleTwo")}</span></span>
        </h2>

        <div className="reel-break__meta mono-label">
          <span>{t("reelMetaOne")}</span>
          <span>{t("reelMetaTwo")}</span>
        </div>
      </div>
    </section>
  );
}
