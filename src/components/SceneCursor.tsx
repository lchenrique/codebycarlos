"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function SceneCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    let isVisible = false;

    const handleMove = (event: MouseEvent) => {
      if (!isVisible) {
        gsap.set([cursor, ring], { autoAlpha: 1 });
        isVisible = true;
      }
      moveX(event.clientX);
      moveY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const getInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest("a, button, [data-cursor='view']");
    };

    const handleOver = (event: MouseEvent) => {
      const interactive = getInteractive(event.target);
      if (!interactive) return;
      ring.classList.add("is-active");
      ring.classList.toggle("is-view", interactive.matches("[data-cursor='view']"));
    };

    const handleOut = (event: MouseEvent) => {
      const interactive = getInteractive(event.relatedTarget);
      if (!interactive) {
        ring.classList.remove("is-active", "is-view");
      }
    };

    const handleLeave = () => {
      gsap.set([cursor, ring], { autoAlpha: 0 });
      isVisible = false;
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="scene-cursor" aria-hidden="true" />
      <div ref={ringRef} className="scene-cursor-ring" aria-hidden="true">
        <span>view</span>
      </div>
    </>
  );
}
