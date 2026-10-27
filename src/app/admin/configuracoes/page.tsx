import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, validSession } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin-actions";
import { AdminShell } from "@/components/admin-shell";
import { getPublicSiteSettings } from "@/lib/site-settings-db";
import { AdminSiteSettingsForm } from "@/components/admin-site-settings-form";
import "../admin.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Configurações | Admin", robots: { index: false, follow: false } };

export default async function SiteConfigPage() {
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!validSession(cookie)) return <main className="admin-surface admin-login-shell"><AdminLogin /></main>;

  let settings: ReturnType<typeof getPublicSiteSettings>;
  try { settings = getPublicSiteSettings(); }
  catch { return <AdminShell section="settings" eyebrow="CENTRAL DE OPERAÇÕES / 02" title="Configurações" description="Gerencie seu site sem depender de novas publicações."><div className="admin-alert" role="alert">Não foi possível abrir o banco de configurações. <Link href="/admin">Voltar às estatísticas.</Link></div></AdminShell>; }

  return <AdminShell section="settings" eyebrow="CENTRAL DE OPERAÇÕES / 02" title="Configurações" description="Seu conteúdo no seu controle. Ajuste os canais de contato e os textos sem tocar no código.">
    <AdminSiteSettingsForm initial={settings} />
  </AdminShell>;
}
