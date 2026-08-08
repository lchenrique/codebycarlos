"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: "home", number: "01", en: "Opening frame", pt: "Cena de abertura" },
  { id: "about", number: "02", en: "The maker", pt: "Quem cria" },
  { id: "skills", number: "03", en: "The craft", pt: "O ofício" },
  { id: "projects", number: "04", en: "Selected work", pt: "Trabalhos" },
  { id: "contact", number: "05", en: "Next story", pt: "Próxima história" },
] as const;

export function CinematicFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { locale } = useSiteSettings();

  useGSAP(() => {
    const frame = frameRef.current;
    const progress = progressRef.current;
    const number = numberRef.current;
    const label = labelRef.current;
    if (!frame || !progress || !number || !label) return;

    const setChapter = (chapter: (typeof chapters)[number]) => {
      number.textContent = chapter.number;
      label.textContent = chapter[locale];
      frame.dataset.chapter = chapter.id;
      window.dispatchEvent(new CustomEvent("codebycarlos:chapter", { detail: chapter.id }));
    };

    setChapter(chapters[0]);
    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progress, { scaleY: self.progress }),
    });

    const chapterTriggers = chapters.map((chapter) => {
      const section = document.getElementById(chapter.id);
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setChapter(chapter),
        onEnterBack: () => setChapter(chapter),
      });
    });

    return () => {
      progressTrigger.kill();
      chapterTriggers.forEach((trigger) => trigger?.kill());
    };
  }, { scope: frameRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <div ref={frameRef} className="cinematic-frame" aria-hidden="true">
      <div className="cinematic-frame__rail"><span ref={progressRef} /></div>
      <div className="cinematic-frame__chapter">
        <span ref={numberRef}>01</span>
        <span className="cinematic-frame__divider" />
        <span ref={labelRef}>{chapters[0][locale]}</span>
      </div>
      <span className="cinematic-frame__format">16:9 / CH</span>
    </div>
  );
}
