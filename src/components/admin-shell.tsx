import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BarChart3, ExternalLink, Globe2, LayoutDashboard, Settings2, ShieldCheck } from "lucide-react";
import { AdminLogout } from "@/components/admin-actions";

type Section = "overview" | "settings";

export function AdminShell({
  section, eyebrow, title, description, children, actions,
}: {
  section: Section;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const menu = [
    { label: "Visão geral", href: "/admin", icon: LayoutDashboard, current: section === "overview", count: "01" },
    { label: "Configurações", href: "/admin/configuracoes", icon: Settings2, current: section === "settings", count: "02" },
  ];
  return (
    <main className="admin-surface admin-app">
      <a href="#admin-main" className="admin-skip">Pular para o conteúdo</a>
      <aside className="admin-sidebar" aria-label="Menu de administração">
        <div className="admin-sidebar__brand">
          <Link href="/" aria-label="Code by Carlos — site" className="admin-brand">
            <span className="admin-brand__mark"><Image src="/logo.svg" width={29} height={29} alt="" /></span>
            <span className="admin-brand__wordmark">code<span>by</span>carlos<small>STUDIO / ADMIN</small></span>
          </Link>
          <div className="admin-sidebar__project"><span className="admin-sidebar__signal" /> <span>SEU ESPAÇO DE TRABALHO</span></div>
        </div>
        <div className="admin-sidebar__body">
          <div className="admin-sidebar__caption">NAVEGAÇÃO <span>01 / 02</span></div>
          <nav className="admin-nav" aria-label="Seções do painel">
            {menu.map(({ label, href, icon: Icon, current, count }) => (
              <Link key={href} href={href} className={"admin-nav__link" + (current ? " is-active" : "")} aria-current={current ? "page" : undefined}>
                <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                <span>{label}</span>
                <small>{count}</small>
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar__caption admin-sidebar__caption--tools">ACESSO RÁPIDO</div>
          <Link className="admin-nav__link admin-nav__link--subtle" href="/" target="_blank" rel="noopener noreferrer">
            <Globe2 size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>Visualizar site</span><ExternalLink size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__footer-info"><ShieldCheck size={16} /><span>Área privada</span><span className="admin-sidebar__footer-dot" /></div>
          <AdminLogout />
        </div>
      </aside>
      <div className="admin-workspace" id="admin-main">
        <header className="admin-mobile-nav" aria-label="Navegação mobile">
          <Link className="admin-mobile-nav__brand" href="/"><Image src="/logo.svg" width={22} height={22} alt="" />code<span>by</span>carlos</Link>
          <div className="admin-mobile-nav__links">
            {menu.map(({ label, href, icon: Icon, current }) => (
              <Link key={href} href={href} aria-label={label} aria-current={current ? "page" : undefined} className={"admin-mobile-nav__link" + (current ? " is-active" : "")}>
                <Icon size={17} />{label}
              </Link>
            ))}
          </div>
        </header>
        <div className="admin-workspace__top">
          <span className="admin-workspace__breadcrumb">CODE BY CARLOS <span>/</span> BACKOFFICE <span>/</span> {section === "overview" ? "VISÃO GERAL" : "CONFIGURAÇÕES"}</span>
          <div className="admin-workspace__right"><span className="admin-live"><span /> SISTEMA ATIVO</span><a href="/" target="_blank" rel="noopener noreferrer" className="admin-preview-link">Ver site <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <div className="admin-overline"><span className="admin-overline__bar" /> {eyebrow}</div>
              <h1>{title}<span className="admin-page-heading__period">.</span></h1>
              <p>{description}</p>
            </div>
            {actions && <div className="admin-page-heading__actions">{actions}</div>}
          </div>
          {children}
          <footer className="admin-page-footer"><span>© {new Date().getFullYear()} CODE BY CARLOS</span><span><BarChart3 size={14} /> BUILT TO GROW / PRIVATE DASHBOARD</span></footer>
        </div>
      </div>
    </main>
  );
}
