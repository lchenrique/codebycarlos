"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";

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
    <span className="admin-kicker">Área reservada</span>
    <h1>Visão do seu site</h1>
    <p>Acompanhe o tráfego e os contatos gerados pelo Code by Carlos.</p>
    <label htmlFor="admin-password">Senha de acesso</label>
    <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required autoFocus />
    {error && <p role="alert" className="admin-error">{error}</p>}
    <button type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar no painel"}</button>
    <Link href="/">← Voltar ao site</Link>
  </form>;
}

export function AdminLogout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return <button disabled={busy} onClick={async () => {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
    setBusy(false);
  }}>Sair <span aria-hidden>↗</span></button>;
}
