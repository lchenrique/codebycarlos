"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { buildWhatsappUrl, type PublicSiteSettings } from "@/lib/public-site-settings";

type Field = { key: keyof PublicSiteSettings; label: string; help?: string; multiline?: boolean; maxLength?: number };

const portugueseFields: Field[] = [
  { key: "contactTitlePt", label: "Título da seção de contato", maxLength: 100 },
  { key: "contactDescriptionPt", label: "Texto abaixo do título", multiline: true, maxLength: 400 },
  { key: "whatsappButtonPt", label: "Texto do botão de WhatsApp", maxLength: 60 },
  { key: "whatsappMessagePt", label: "Mensagem preenchida no WhatsApp", multiline: true, maxLength: 500 },
];
const englishFields: Field[] = [
  { key: "contactTitleEn", label: "Título em inglês", maxLength: 100 },
  { key: "contactDescriptionEn", label: "Descrição em inglês", multiline: true, maxLength: 400 },
  { key: "whatsappButtonEn", label: "Texto do botão em inglês", maxLength: 60 },
  { key: "whatsappMessageEn", label: "Mensagem automática em inglês", multiline: true, maxLength: 500 },
];

export function AdminSiteSettingsForm({ initial }: { initial: PublicSiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const changed = Object.keys(initial).some((key) => form[key as keyof PublicSiteSettings] !== initial[key as keyof PublicSiteSettings]);

  function update(key: keyof PublicSiteSettings, value: string) {
    setForm((previous) => ({ ...previous, [key]: key === "whatsappNumber" ? value.replace(/\D/g, "") : value }));
    setMessage("");
    setError("");
  }

  function fields(items: Field[]) {
    return items.map((field) => <label className="admin-config-field" key={field.key}>
      <span>{field.label}</span>
      {field.multiline ?
        <textarea rows={3} maxLength={field.maxLength} minLength={5} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} required /> :
        <input type="text" maxLength={field.maxLength} minLength={3} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} required />}
      {field.help && <small>{field.help}</small>}
    </label>);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao salvar.");
      setMessage("Salvo no servidor. As próximas visitas ao site já verão estas informações, sem deploy.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível salvar.");
    } finally { setSaving(false); }
  }

  const previewUrl = buildWhatsappUrl(form.whatsappNumber, form.whatsappMessagePt);
  return <form className="admin-config-layout" onSubmit={submit}>
    <section className="admin-panel admin-config-card">
      <h2>WhatsApp e redes</h2>
      <p className="admin-config-note">Altere o contato sem mexer no código. DDD + número, com ou sem 55.</p>
      <label className="admin-config-field">
        <span>Número do WhatsApp</span>
        <input type="tel" inputMode="numeric" minLength={10} maxLength={15} pattern="[0-9]{10,15}" value={form.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} required />
        <small>Atual: {form.whatsappNumber}. O link recebe o código do Brasil automaticamente.</small>
      </label>
      <label className="admin-config-field">
        <span>Link do LinkedIn</span>
        <input type="url" maxLength={300} value={form.linkedinUrl} onChange={(event) => update("linkedinUrl", event.target.value)} required />
      </label>
      <a className="admin-config-preview" href={previewUrl} target="_blank" rel="noopener noreferrer">Testar abertura do WhatsApp ↗</a>
    </section>
    <section className="admin-panel admin-config-card">
      <h2>Conteúdo em português</h2>
      {fields(portugueseFields)}
    </section>
    <section className="admin-panel admin-config-card">
      <h2>Conteúdo em inglês</h2>
      <p className="admin-config-note">Utilizado quando o visitante muda o idioma da página.</p>
      {fields(englishFields)}
    </section>
    <div className="admin-config-save">
      <div aria-live="polite">
        {message && <p className="admin-config-success">{message}</p>}
        {error && <p className="admin-config-error" role="alert">{error}</p>}
        {!message && !error && <p className="admin-config-note">Os dados permanecem salvos no SQLite da VPS, mesmo depois de publicar outras versões.</p>}
      </div>
      <button type="submit" disabled={saving || !changed}>{saving ? "Salvando…" : "Salvar alterações"}</button>
    </div>
  </form>;
}
