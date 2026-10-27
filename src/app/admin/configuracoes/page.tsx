import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, validSession } from "@/lib/admin-auth";
import { AdminLogin, AdminLogout } from "@/components/admin-actions";
import { getPublicSiteSettings } from "@/lib/site-settings-db";
import { AdminSiteSettingsForm } from "@/components/admin-site-settings-form";
import "../admin.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Configurações do site", robots: { index: false, follow: false } };

export default async function SiteConfigPage() {
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!validSession(cookie)) return <main className="admin-surface admin-login-shell"><AdminLogin /></main>;

  let settings: ReturnType<typeof getPublicSiteSettings>;
  try { settings = getPublicSiteSettings(); }
  catch { return <main className="admin-surface"><Link href="/admin" className="admin-back">← Voltar ao painel</Link><p role="alert">Não foi possível abrir o banco de configurações.</p></main>; }

  return <main className="admin-surface admin-dashboard">
    <header className="admin-top">
      <div><Link href="/" className="admin-back">← Voltar ao site</Link><span className="admin-kicker">Code by Carlos · administração</span><h1>Configurações do site</h1><p>Edite o contato e os textos da página. As mudanças aparecem sem novo deploy.</p></div>
      <AdminLogout />
    </header>
    <nav className="admin-filters" aria-label="Navegação do painel">
      <Link href="/admin">Estatísticas</Link>
      <Link href="/admin/configuracoes" aria-current="page">Configurações</Link>
    </nav>
    <AdminSiteSettingsForm initial={settings} />
  </main>;
}
