"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/lib/site-settings";

const sectionIds = ["servicos", "cases", "processo", "produtos", "contato"];

export function Header() {
  const { locale, theme, toggleLocale, toggleTheme } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pt = locale === "pt";
  const links = pt
    ? [["servicos", "Serviços"], ["cases", "Cases"], ["processo", "Como funciona"], ["produtos", "Produtos"], ["contato", "Contato"]]
    : [["servicos", "Services"], ["cases", "Case studies"], ["processo", "How it works"], ["produtos", "Products"], ["contato", "Contact"]];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-26% 0px -58%", threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (id: string) => {
    const target = id === "home" ? null : document.getElementById(id);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (!target) window.scrollTo({ top: 0, behavior });
    else target.scrollIntoView({ behavior, block: "start" });
    window.history.replaceState(null, "", id === "home" ? "/" : `#${id}`);
    setOpen(false);
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="page-shell header-inner">
        <button type="button" className="brand" onClick={() => goTo("home")} aria-label={pt ? "Voltar ao início" : "Back to top"}>
          <Image src="/logo.svg" alt="" width={23} height={23} priority />
          <span>code by carlos</span>
        </button>

        <nav className="desktop-nav" aria-label={pt ? "Navegação principal" : "Primary navigation"}>
          {links.map(([id, label], index) => <button type="button" key={id} onClick={() => goTo(id)} className={cn("nav-link", activeSection === id && "is-active")} aria-current={activeSection === id ? "location" : undefined}><span>0{index + 1}</span>{label}</button>)}
        </nav>

        <div className="header-actions">
          <span className="header-status"><i />{pt ? "Disponível" : "Available"}</span>
          <Button type="button" variant="ghost" size="icon" className="header-icon-button" onClick={toggleLocale} aria-label={pt ? "Mudar para inglês" : "Mudar para português"}><span className="locale-label">{pt ? "EN" : "PT"}</span></Button>
          <Button type="button" variant="ghost" size="icon" className="header-icon-button theme-button" onClick={toggleTheme} aria-label={theme === "dark" ? (pt ? "Usar tema claro" : "Use light theme") : (pt ? "Usar tema escuro" : "Use dark theme")}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</Button>
          <Button asChild size="sm" className="header-cta"><a href="#contato">{pt ? "Começar" : "Start"}<ArrowUpRight /></a></Button>
          <Button type="button" variant="ghost" size="icon" className="mobile-menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? (pt ? "Fechar menu" : "Close menu") : (pt ? "Abrir menu" : "Open menu")} aria-expanded={open}>{open ? <X size={21} /> : <Menu size={21} />}</Button>
        </div>
      </div>

      <div className={cn("mobile-menu", open && "is-open")} aria-hidden={!open}>
        <nav aria-label={pt ? "Navegação mobile" : "Mobile navigation"}>{links.map(([id, label], index) => <button type="button" key={id} onClick={() => goTo(id)} tabIndex={open ? 0 : -1} className={cn("mobile-menu-link", activeSection === id && "is-active")}><span>0{index + 1}</span>{label}<ArrowUpRight size={18} /></button>)}</nav>
      </div>
    </header>
  );
}
