"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type EventKind = "pageview" | "cta" | "contact" | "lead";
type Context = { visitorId: string; path: string; referrer: string; source: string; medium: string; campaign: string };

function getContext(): Context | null {
  try {
    if (navigator.doNotTrack === "1" || localStorage.getItem("cbc-analytics-optout") === "1") return null;
    const storageKey = "cbc-visitor";
    let visitorId = localStorage.getItem(storageKey);
    if (!visitorId || !/^[\da-f-]{36}$/i.test(visitorId)) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(storageKey, visitorId);
    }
    const params = new URLSearchParams(location.search);
    return {
      visitorId, path: location.pathname, referrer: document.referrer,
      source: (params.get("utm_source") || "").slice(0, 80),
      medium: (params.get("utm_medium") || "").slice(0, 80),
      campaign: (params.get("utm_campaign") || "").slice(0, 80),
    };
  } catch { return null; }
}

export function trackEvent(type: EventKind, target = "") {
  if (typeof window === "undefined") return;
  const context = getContext();
  if (!context || context.path.startsWith("/admin")) return;
  try {
    const payload = JSON.stringify({ ...context, type, target: target.slice(0, 90) });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true });
    }
  } catch { /* A visita ao site não depende das métricas. */ }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    trackEvent("pageview");
    const onClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!element) return;
      const href = element.getAttribute("href") || "";
      const label = element.dataset.track || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 70) || href;
      if (href.startsWith("mailto:") || /wa\.me|api\.whatsapp\.com/.test(href)) trackEvent("contact", label);
      else if (href.startsWith("#contato") || href.startsWith("/#contato")) trackEvent("cta", label);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);
  return null;
}
