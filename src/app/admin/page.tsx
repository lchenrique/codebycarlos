import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, ChartNoAxesCombined, Clock3, Globe2, MousePointerClick, Radio, UsersRound, Zap } from "lucide-react";
import { ADMIN_COOKIE, validSession } from "@/lib/admin-auth";
import { overview } from "@/lib/analytics";
import { AdminLogin } from "@/components/admin-actions";
import { AdminShell } from "@/components/admin-shell";
import "./admin.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Visão geral | Admin", robots: { index: false, follow: false } };

function fmt(n: number) { return n.toLocaleString("pt-BR"); }

function Metric({ label, value, note, icon: Icon, accent = "neutral", index }: {
  label: string; value: string | number; note: string; icon: typeof Activity; accent?: string; index: string;
}) {
  return <article className={"admin-metric admin-metric--" + accent}>
    <div className="admin-metric__top"><span className="admin-metric__icon"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span><span className="admin-metric__index">{index}</span></div>
    <div><p>{label}</p><strong>{typeof value === "number" ? fmt(value) : value}</strong></div>
    <span className="admin-metric__note">{note}</span>
  </article>;
}

type Day = { day: string; views: number; visitors: number };

function TrafficChart({ series, days }: { series: Day[]; days: number }) {
  const actualMax = Math.max(0, ...series.map((item) => item.views));
  const max = Math.max(1, actualMax);
  const ceiling = Math.max(4, Math.ceil(max / 4) * 4);
  const left = 42, right = 924, top = 23, bottom = 230;
  const points = series.map((item, index) => ({
    x: left + index * (right - left) / Math.max(1, series.length - 1),
    y: bottom - item.views / ceiling * (bottom - top),
    ...item,
  }));
  const line = points.map((point, i) => (i ? "L" : "M") + point.x.toFixed(2) + "," + point.y.toFixed(2)).join(" ");
  const area = line + " L" + right + "," + bottom + " L" + left + "," + bottom + " Z";
  const interval = days === 7 ? 1 : days === 30 ? 5 : 15;
  return <div className="admin-traffic">
    <svg className="admin-traffic__svg" viewBox="0 0 970 264" role="img" aria-label={`Visualizações de página nos últimos ${days} dias. Máximo diário: ${actualMax} visitas.`} preserveAspectRatio="none">
      <defs><linearGradient id="admin-chart-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d9ff45" stopOpacity=".24" /><stop offset="100%" stopColor="#d9ff45" stopOpacity="0" /></linearGradient></defs>
      {[0,1,2,3,4].map((tick) => {
        const y = bottom - tick / 4 * (bottom - top);
        return <g key={tick}><line x1={left} x2={right} y1={y} y2={y} stroke="rgba(243,245,232,.12)" strokeDasharray={tick === 0 ? "0" : "3 7"}/>
          <text x={left - 13} y={y + 4} fill="#87908a" fontSize="12" textAnchor="end">{fmt(Math.round(ceiling * tick / 4))}</text></g>;
      })}
      {points.length > 1 && <><path d={area} fill="url(#admin-chart-glow)" /><path d={line} fill="none" stroke="#d9ff45" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" /></>}
      {points.map((point, i) => (i % interval === 0 || i === points.length - 1) ? <text key={point.day} x={point.x} y="257" textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} fontSize="12" fill="#88918c">{point.day.slice(5).replace("-", "/")}</text> : null)}
      {points.length === 1 && <circle cx={points[0].x} cy={points[0].y} r="5" fill="#d9ff45" />}
    </svg>
    {actualMax === 0 && <div className="admin-traffic__empty"><Activity size={20} />Aguardando as primeiras visualizações</div>}
    <table className="admin-sr-only"><caption>Visualizações e visitantes por dia</caption><thead><tr><th>Data</th><th>Visualizações</th><th>Visitantes</th></tr></thead><tbody>{series.map(item => <tr key={item.day}><td>{item.day}</td><td>{item.views}</td><td>{item.visitors}</td></tr>)}</tbody></table>
  </div>;
}

function Ranking({ title, subtitle, rows, empty = "Sem dados registrados neste período.", icon: Icon }: {
  title: string; subtitle: string; rows: { name: string; value: number }[]; empty?: string; icon: typeof Activity;
}) {
  const max = Math.max(1, ...rows.map(row => row.value));
  return <section className="admin-panel admin-rank">
    <div className="admin-panel__header"><div className="admin-panel__head-title"><span className="admin-panel__icon"><Icon size={17} /></span><div><h2>{title}</h2><p>{subtitle}</p></div></div><span className="admin-panel__more">TOP {rows.length || "—"}</span></div>
    {rows.length ? <ol className="admin-ranking">{rows.map((row, index) =>
      <li key={row.name}>
        <span className="admin-rank__index">{String(index + 1).padStart(2, "0")}</span>
        <div className="admin-rank__body"><div className="admin-rank__label"><span title={row.name}>{row.name}</span><strong>{fmt(row.value)}</strong></div><div className="admin-track"><span style={{ width: (row.value / max * 100) + "%" }} /></div></div>
      </li>
    )}</ol> : <div className="admin-empty"><Clock3 size={21} aria-hidden="true" /><span>{empty}</span></div>}
  </section>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!validSession(session)) return <main className="admin-surface admin-login-shell"><AdminLogin /></main>;

  const { days: input } = await searchParams;
  const days = [7, 30, 90].includes(Number(input)) ? Number(input) : 30;
  let report: ReturnType<typeof overview> | null = null;
  try { report = overview(days); }
  catch { /* Exibe erro dentro do layout mantendo a navegação. */ }

  if (!report) return <AdminShell section="overview" eyebrow="CENTRAL DE OPERAÇÕES / 01" title="Visão geral" description="Acompanhe a movimentação do seu site em um único lugar.">
    <div className="admin-alert" role="alert">Não foi possível acessar o banco de métricas. Confira o armazenamento da VPS.</div>
  </AdminShell>;

  const { totals, daily } = report;
  const byDay = new Map(daily.map(item => [item.day, item]));
  const series = Array.from({ length: days }, (_, index) => {
    const day = new Date(report.generatedAt - (days - index - 1) * 86400000).toISOString().slice(0, 10);
    return byDay.get(day) || { day, views: 0, visitors: 0, contacts: 0, leads: 0 };
  });
  const rate = totals.visitors ? (100 * totals.contacts / totals.visitors).toFixed(1).replace(".", ",") + "%" : "0%";
  const topSource = report.sources[0]?.name || "Aguardando dados";
  return <AdminShell section="overview" eyebrow="CENTRAL DE OPERAÇÕES / 01" title="Visão geral" description="Uma visão clara do tráfego, dos interesses e das oportunidades que chegam ao seu site." actions={
    <div className="admin-period-control"><CalendarDays size={17} aria-hidden="true" /><span>ÚLTIMOS</span>
      {[7,30,90].map(num => <Link href={"/admin?days="+num} key={num} aria-current={days === num ? "page" : undefined}>{num}D</Link>)}
    </div>
  }>
    <div className="admin-dashboard-intro"><span><Radio size={15} /> DADOS DO SEU SITE</span><span>VISITANTES ESTIMADOS • ATUALIZADO AO ABRIR</span></div>
    <div className="admin-metrics">
      <Metric label="Visualizações" value={totals.views} icon={ChartNoAxesCombined} accent="lime" index="01" note="Páginas carregadas no período" />
      <Metric label="Visitantes únicos" value={totals.visitors} icon={UsersRound} index="02" note="Navegadores identificados" />
      <Metric label="Cliques em contato" value={totals.contacts} icon={MousePointerClick} index="03" note="E-mail e WhatsApp" />
      <Metric label="Interesse em orçamento" value={totals.ctas} icon={Zap} index="04" note="Cliques para a seção de contato" />
      <Metric label="Taxa de interação" value={rate} icon={Activity} index="05" note="Cliques em contato / visitantes" />
    </div>
    <div className="admin-analytics-row">
      <section className="admin-panel admin-chart-panel">
        <div className="admin-panel__header"><div><p className="admin-chart__eyebrow">PERFORMANCE / {String(days).padStart(2, "0")} DIAS</p><h2>Evolução das visitas<span className="admin-dot">.</span></h2><p>Acompanhe como o interesse pelo seu trabalho muda com o tempo.</p></div><span className="admin-chart__legend"><span /> Visualizações</span></div>
        <TrafficChart series={series} days={days} />
        <div className="admin-chart__footer"><span><Activity size={15} /> Dados registrados desde a publicação do rastreamento.</span><span>NÃO INCLUI HISTÓRICO ANTERIOR</span></div>
      </section>
      <section className="admin-panel admin-pulse-panel">
        <div className="admin-panel__header"><div><p className="admin-chart__eyebrow">RESUMO / TRÁFEGO</p><h2>De onde vêm<span className="admin-dot">.</span></h2></div><Globe2 size={20} className="admin-pulse-icon" /></div>
        <div className="admin-pulse-feature"><span>ORIGEM MAIS FREQUENTE</span><strong title={topSource}>{topSource}</strong><p>{report.sources[0] ? fmt(report.sources[0].value) + " eventos registrados" : "Assim que houver visitas, aparecerá aqui."}</p></div>
        <div className="admin-pulse-bottom"><div><span>PÁGINAS COM TRÁFEGO</span><strong>{fmt(report.pages.length)}</strong><small>Até 8 mais acessadas</small></div><div><span>FONTES DETECTADAS</span><strong>{fmt(report.sources.length)}</strong><small>Até 8 mais frequentes</small></div></div>
        <Link className="admin-pulse-link" href="/admin/configuracoes">Ajustar dados de contato <ArrowRight size={17} /></Link>
      </section>
    </div>
    <div className="admin-section-heading"><div><span>02 / INSIGHTS</span><h2>Entenda sua audiência<span className="admin-dot">.</span></h2><p>Fontes e locais estimados, dispositivos e ações registradas.</p></div><ArrowDownRight size={25} strokeWidth={1.4} aria-hidden="true" /></div>
    <div className="admin-insights-grid">
      <Ranking title="Origem das visitas" subtitle="Como chegaram até você" rows={report.sources} icon={Globe2} />
      <Ranking title="Páginas populares" subtitle="Conteúdos com mais visualizações" rows={report.pages} icon={ChartNoAxesCombined} />
      <Ranking title="Ações e contatos" subtitle="Botões e links mais utilizados" rows={report.actions} icon={MousePointerClick} />
      <Ranking title="Dispositivos" subtitle="Onde seu site é acessado" rows={report.devices} icon={UsersRound} />
      <Ranking title="Países" subtitle="Localização aproximada" rows={report.countries} icon={Globe2} empty="Não foi possível identificar a localização deste tráfego." />
      <Ranking title="Cidades" subtitle="Estimativas com base no IP" rows={report.cities} icon={Globe2} empty="O proxy precisa encaminhar o IP do visitante para identificar a cidade." />
      {report.campaigns.length > 0 && <Ranking title="Campanhas" subtitle="Origens identificadas com UTM" rows={report.campaigns} icon={Zap} />}
    </div>
    <div className="admin-data-note"><span><Activity size={15} /> NOTA SOBRE OS DADOS</span><p>Visitantes são estimativas por navegador. Cliques no WhatsApp não confirmam que uma mensagem foi enviada. Dados próprios salvos no SQLite, sem armazenar o IP original.</p><a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade <ArrowUpRight size={15} /></a></div>
  </AdminShell>;
}
