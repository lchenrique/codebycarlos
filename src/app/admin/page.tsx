import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { ADMIN_COOKIE, validSession } from "@/lib/admin-auth";
import { overview } from "@/lib/analytics";
import { AdminLogin, AdminLogout } from "@/components/admin-actions";
import "./admin.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Painel de visitas", robots: { index: false, follow: false } };

function Stat({ label, value, note }: { label: string; value: number | string; note: string }) {
  return <div className="admin-stat"><span>{label}</span><strong>{typeof value === "number" ? value.toLocaleString("pt-BR") : value}</strong><small>{note}</small></div>;
}

function Ranking({ title, rows, empty = "Sem dados neste período." }: { title: string; rows: { name: string; value: number }[]; empty?: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return <section className="admin-panel"><h2>{title}</h2>{rows.length ? <ol className="admin-ranking">
    {rows.map((row, index) => <li key={index}><div><span title={row.name}>{row.name}</span><strong>{row.value.toLocaleString("pt-BR")}</strong></div><div className="admin-track"><span style={{ width: (row.value / max * 100) + "%" }} /></div></li>)}
  </ol> : <p className="admin-empty">{empty}</p>}</section>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const cookieStore = await cookies();
  if (!validSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return <main className="admin-surface admin-login-shell"><AdminLogin /></main>;
  }

  const { days: dayParam } = await searchParams;
  const days = [7, 30, 90].includes(Number(dayParam)) ? Number(dayParam) : 30;
  let report: ReturnType<typeof overview> | null = null;
  let error = "";
  try { report = overview(days); } catch { error = "O banco de métricas não está disponível. Verifique as configurações da VPS."; }

  if (!report) return <main className="admin-surface admin-dashboard"><header className="admin-top"><h1>Painel de visitas</h1><AdminLogout /></header><p role="alert">{error}</p></main>;

  const { totals, daily } = report;
  const dailyMap = new Map(daily.map((day) => [day.day, day]));
  const series = Array.from({ length: days }, (_, index) => {
    const date = new Date(report.generatedAt - (days - index - 1) * 86400000).toISOString().slice(0, 10);
    return dailyMap.get(date) || { day: date, views: 0, visitors: 0, contacts: 0, leads: 0 };
  });
  const max = Math.max(1, ...series.map((d) => d.views));
  const rate = totals.visitors ? (totals.contacts / totals.visitors * 100).toFixed(1).replace(".", ",") + "%" : "0%";
  return <main className="admin-surface admin-dashboard">
    <header className="admin-top">
      <div><Link href="/" className="admin-back">← Voltar ao site</Link><span className="admin-kicker">Code by Carlos · crescimento</span><h1>Painel de visitas</h1><p>Entenda quem chega ao site e quais ações geram oportunidades.</p></div>
      <AdminLogout />
    </header>
    <nav className="admin-filters" aria-label="Período">
      {[7, 30, 90].map((day) => <a key={day} href={"/admin?days=" + day} aria-current={days === day ? "page" : undefined}>{day} dias</a>)}
    </nav>
    <div className="admin-stats">
      <Stat label="Visualizações de página" value={totals.views} note="Carregamentos registrados" />
      <Stat label="Visitantes estimados" value={totals.visitors} note="Identificadores únicos (não pessoas verificadas)" />
      <Stat label="Interesse em orçamento" value={totals.ctas} note="Cliques que levam à seção de contato" />
      <Stat label="Contatos iniciados" value={totals.contacts} note="Cliques em e-mail ou WhatsApp" />
      <Stat label="Taxa de cliques em contato" value={rate} note="Cliques em contato ÷ visitantes estimados" />
    </div>
    <section className="admin-panel admin-chart-panel">
      <div className="admin-panel-heading"><h2>Evolução das visitas</h2><span>Últimos {days} dias</span></div>
      <div className="admin-chart" role="img" aria-label={"Visitas por dia. Total " + totals.views}>
        {series.map((d, index) => <div className="admin-column" key={d.day} title={d.day + ": " + d.views + " visualizações"}>
          <i style={{ height: Math.max(2, (d.views / max) * 100) + "%" }} />
          {(index === 0 || index === series.length - 1 || (days === 7 && index % 2 === 0)) && <small>{d.day.slice(5).replace("-", "/")}</small>}
        </div>)}
      </div>
      <p className="admin-fine">Os dados começam a aparecer após a publicação do rastreamento. Não há histórico anterior.</p>
    </section>
    <div className="admin-grid">
      <Ranking title="De onde as pessoas chegaram" rows={report.sources} />
      <Ranking title="Países" rows={report.countries} empty="Localização indisponível para este tráfego." />
      <Ranking title="Cidades (aproximadas)" rows={report.cities} empty="A VPS precisa receber o IP do visitante pelo proxy para identificar cidades." />
      <Ranking title="Dispositivos" rows={report.devices} />
      <Ranking title="Páginas mais vistas" rows={report.pages} />
      <Ranking title="Chamadas que geraram cliques" rows={report.actions} />
      {report.campaigns.length > 0 && <Ranking title="Campanhas (UTM)" rows={report.campaigns} />}
    </div>
    <footer className="admin-bottom">Estatísticas próprias com SQLite · sem armazenar IP, nome ou e-mail do visitante · retenção configurável de 180 dias.</footer>
  </main>;
}
