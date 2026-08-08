"use client";

import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/lib/site-settings";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "navAbout" as const },
  { id: "projects", label: "navWork" as const },
  { id: "contact", label: "navContact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { locale, theme, t, toggleLocale, toggleTheme } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -58%", threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const goTo = (id: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (id === "home") {
      window.scrollTo({ top: 0, behavior });
    } else {
      const target = document.getElementById(id);
      if (!target) return;
      const header = document.querySelector(".site-header");
      const offset = header instanceof HTMLElement ? header.offsetHeight + 12 : 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior });
    }

    window.history.replaceState(null, "", id === "home" ? "/" : `#${id}`);
    setOpen(false);
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="site-header__inner">
        <button className="brand" onClick={() => goTo("home")} aria-label={t("backTop")}>
          <Image src="/logo.svg" alt="" width={22} height={22} priority />
          <span>code by carlos</span>
        </button>

        <nav className="desktop-nav" aria-label={t("primaryNavigation")}>
          {links.map((link, index) => (
            <button key={link.id} onClick={() => goTo(link.id)} className={cn("nav-link", activeSection === link.id && "is-active")} aria-current={activeSection === link.id ? "location" : undefined}>
              <span className="nav-link__index">0{index + 1}</span>
              {t(link.label)}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-status">
            <span className="status-dot" />
            <span>{t("available")}</span>
          </div>
          <button className="header-control locale-control" onClick={toggleLocale} aria-label={t("languageSwitch")}>
            <span>{locale === "en" ? "PT" : "EN"}</span>
          </button>
          <button className="header-control theme-control" onClick={toggleTheme} aria-label={t(theme === "dark" ? "useLight" : "useDark")}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={cn("mobile-menu", open && "is-open")} aria-hidden={!open}>
        {links.map((link, index) => (
          <button key={link.id} onClick={() => goTo(link.id)} className={cn("mobile-menu__link", activeSection === link.id && "is-active")} tabIndex={open ? 0 : -1}>
            <span>0{index + 1}</span>
            {t(link.label)}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
    </header>
  );
}
