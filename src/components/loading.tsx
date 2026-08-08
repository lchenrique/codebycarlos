"use client";

import { useSiteSettings } from "@/lib/site-settings";
import { useEffect, useState } from "react";

export function Loading() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { t } = useSiteSettings();

  useEffect(() => {
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / 1100) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setLeaving(true), 180);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`loading-screen ${leaving ? "is-leaving" : ""}`} aria-hidden={leaving}>
      <div className="loading-screen__top">
        <span>CH / 2026</span>
        <span>{t("loadingDigital")}</span>
      </div>
      <div className="loading-screen__center">
        <span className="loading-screen__eyebrow">{t("loadingStudio")}</span>
        <strong>{progress}%</strong>
        <div className="loading-screen__line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
      <div className="loading-screen__bottom">
        <span>{t("loadingLocation")}</span>
        <span>{t("loadingPlease")}</span>
      </div>
    </div>
  );
}
