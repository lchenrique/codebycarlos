"use client";

import { useEffect, useState } from "react";

export function PrivacyChoice() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => { const id = window.requestAnimationFrame(() => setEnabled(localStorage.getItem("cbc-analytics-optout") !== "1")); return () => window.cancelAnimationFrame(id); }, []);
  return <div className="privacy-preferences">
    <p>Estatísticas anônimas neste navegador: <strong>{enabled === null ? "Verificando…" : enabled ? "Ativadas" : "Desativadas"}</strong></p>
    <button type="button" onClick={() => {
      const next = !enabled;
      if (next) localStorage.removeItem("cbc-analytics-optout");
      else { localStorage.setItem("cbc-analytics-optout", "1"); localStorage.removeItem("cbc-visitor"); }
      setEnabled(next);
    }}>{enabled ? "Desativar estatísticas" : "Ativar estatísticas"}</button>
  </div>;
}
