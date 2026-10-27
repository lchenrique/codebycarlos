"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, LogOut } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
      setPassword("");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha no acesso.");
    } finally { setBusy(false); }
  }

  return <form className="admin-login" onSubmit={submit}>
    <div className="admin-login__brand"><Image src="/logo.svg" width={29} height={29} alt="" /> code<span>by</span>carlos</div>
    <span className="admin-login__eyebrow">BACKOFFICE / ACESSO PRIVADO</span>
    <h1>Seu espaço<br />de controle<span style={{ color: "var(--a-acid)" }}>.</span></h1>
    <p>O que acontece no seu site, em um único lugar. Entre para acompanhar as métricas e fazer ajustes.</p>
    <label htmlFor="admin-password">Senha de acesso</label>
    <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required autoFocus />
    {error && <p role="alert" className="admin-error">{error}</p>}
    <button type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar no painel"} <ArrowRight size={17} style={{ verticalAlign: "middle", marginLeft: 7 }} /></button>
    <Link href="/">Voltar ao site <ArrowUpRight size={14} style={{ verticalAlign: "middle", marginLeft: 3 }} /></Link>
  </form>;
}

export function AdminLogout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return <button type="button" className="admin-logout" disabled={busy} onClick={async () => {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
    setBusy(false);
  }}><span><LogOut size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: 9 }} /> Sair do painel</span><ArrowUpRight size={15} aria-hidden="true" /></button>;
}
