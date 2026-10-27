"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ExternalLink, Globe2, Link2, MessageCircle, RotateCcw, Save, Smartphone, Sparkles } from "lucide-react";
import { buildWhatsappUrl, type PublicSiteSettings } from "@/lib/public-site-settings";

type Field = { key: keyof PublicSiteSettings; label: string; hint?: string; multiline?: boolean; maxLength?: number };
const ptFields: Field[] = [
  { key: "contactTitlePt", label: "Título da seção", hint: "Chamada principal antes do botão de contato.", maxLength: 100 },
  { key: "contactDescriptionPt", label: "Texto de apoio", hint: "Explique brevemente como o visitante pode iniciar uma conversa.", multiline: true, maxLength: 400 },
  { key: "whatsappButtonPt", label: "Texto do botão", maxLength: 60 },
  { key: "whatsappMessagePt", label: "Mensagem inicial", hint: "O visitante pode editar esta mensagem antes de enviar.", multiline: true, maxLength: 500 },
];
const enFields: Field[] = [
  { key: "contactTitleEn", label: "Título da seção (EN)", maxLength: 100 },
  { key: "contactDescriptionEn", label: "Texto de apoio (EN)", multiline: true, maxLength: 400 },
  { key: "whatsappButtonEn", label: "Texto do botão (EN)", maxLength: 60 },
  { key: "whatsappMessageEn", label: "Mensagem inicial (EN)", multiline: true, maxLength: 500 },
];

export function AdminSiteSettingsForm({ initial }: { initial: PublicSiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<PublicSiteSettings>(initial);
  const [savedBaseline, setSavedBaseline] = useState<PublicSiteSettings>(initial);
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const changed = Object.keys(form).some((key) => form[key as keyof PublicSiteSettings] !== savedBaseline[key as keyof PublicSiteSettings]);
  const number = form.whatsappNumber;
  const previewUrl = buildWhatsappUrl(number, language === "pt" ? form.whatsappMessagePt : form.whatsappMessageEn);
  const title = language === "pt" ? form.contactTitlePt : form.contactTitleEn;
  const description = language === "pt" ? form.contactDescriptionPt : form.contactDescriptionEn;
  const button = language === "pt" ? form.whatsappButtonPt : form.whatsappButtonEn;

  function update(key: keyof PublicSiteSettings, value: string) {
    setForm(previous => ({ ...previous, [key]: key === "whatsappNumber" ? value.replace(/\D/g, "") : value }));
    setMessage("");
    setError("");
  }

  function field(item: Field) {
    const id = "setting-" + item.key;
    return <div className="admin-field" key={item.key}>
      <label htmlFor={id}>{item.label}</label>
      {item.multiline
        ? <textarea id={id} value={form[item.key]} maxLength={item.maxLength} minLength={5} rows={3} onChange={event => update(item.key, event.target.value)} required />
        : <input id={id} value={form[item.key]} maxLength={item.maxLength} minLength={3} onChange={event => update(item.key, event.target.value)} required />}
      <div className="admin-field__foot"><span>{item.hint || ""}</span>{item.maxLength && <span>{form[item.key].length}/{item.maxLength}</span>}</div>
    </div>;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!changed || saving) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Falha ao salvar as informações.");
      const saved = result.settings as PublicSiteSettings;
      setForm(saved);
      setSavedBaseline(saved);
      setMessage("Alterações publicadas! O site já está usando as novas informações.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível salvar. Tente novamente.");
    } finally { setSaving(false); }
  }

  function revert() {
    setForm(savedBaseline);
    setMessage("");
    setError("");
  }

  return <form className="admin-settings" onSubmit={submit}>
    <div className="admin-settings__main">
      <section className="admin-settings-section">
        <div className="admin-settings-section__heading">
          <span className="admin-settings-section__number">01</span>
          <div><p>SEUS CANAIS</p><h2>Contato e presença</h2><span>Para onde você quer levar seus visitantes.</span></div>
          <span className="admin-settings-section__icon"><Link2 size={21} /></span>
        </div>
        <div className="admin-settings-section__content">
          <div className="admin-field">
            <label htmlFor="settings-whatsapp">Número do WhatsApp <span className="admin-field__optional">CANAL PRINCIPAL</span></label>
            <div className="admin-field__prefix"><span>BR +55</span><input id="settings-whatsapp" type="tel" inputMode="numeric" minLength={10} maxLength={15} pattern="[0-9]{10,15}" value={number} onChange={event => update("whatsappNumber", event.target.value)} autoComplete="tel-national" required /></div>
            <div className="admin-field__foot"><span>DDD + número, sem espaços. O sistema inclui o código do Brasil se necessário.</span><span>OBRIGATÓRIO</span></div>
          </div>
          <div className="admin-field">
            <label htmlFor="settings-linkedin">Perfil do LinkedIn</label>
            <input id="settings-linkedin" type="url" maxLength={300} value={form.linkedinUrl} onChange={event => update("linkedinUrl", event.target.value)} required />
            <div className="admin-field__foot"><span>Link exibido ao lado do botão de contato.</span></div>
          </div>
        </div>
      </section>
      <section className="admin-settings-section">
        <div className="admin-settings-section__heading">
          <span className="admin-settings-section__number">02</span>
          <div><p>COMUNICAÇÃO</p><h2>Textos e mensagens</h2><span>Defina como seu site conversa com futuros clientes.</span></div>
          <span className="admin-settings-section__icon"><MessageCircle size={21} /></span>
        </div>
        <div className="admin-settings-section__content">
          <div className="admin-settings__language" role="group" aria-label="Idioma dos textos">
            <button type="button" className={language === "pt" ? "is-active" : ""} aria-pressed={language === "pt"} onClick={() => setLanguage("pt")}><Globe2 size={16} /> Português <span>PT-BR</span></button>
            <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}><Globe2 size={16} /> Inglês <span>EN-US</span></button>
          </div>
          <div className="admin-settings__language-hint"><Sparkles size={16} /> A prévia ao lado muda conforme o idioma selecionado.</div>
          <div className="admin-settings__fields">{(language === "pt" ? ptFields : enFields).map(field)}</div>
        </div>
      </section>
    </div>
    <aside className="admin-settings__aside">
      <div className="admin-preview">
        <div className="admin-preview__top"><span><span className="admin-preview__indicator" /> PRÉ-VISUALIZAÇÃO</span><span>{language === "pt" ? "PT-BR" : "EN-US"}</span></div>
        <div className="admin-preview__canvas">
          <span className="admin-preview__eyebrow">06 / {language === "pt" ? "VAMOS CONVERSAR" : "LET'S TALK"}</span>
          <h3>{title}<span>.</span></h3>
          <p>{description}</p>
          <span className="admin-preview__button"><MessageCircle size={17}/>{button}<ArrowUpRight size={17}/></span>
        </div>
        <div className="admin-preview__bottom"><Smartphone size={16}/><span>Prévia dos textos da seção de contato. O restante do site não muda.</span></div>
      </div>
      <div className="admin-preview-message">
        <div><MessageCircle size={18} /><span>MENSAGEM PRONTA</span></div>
        <p>“{language === "pt" ? form.whatsappMessagePt : form.whatsappMessageEn}”</p>
        <a href={previewUrl} target="_blank" rel="noopener noreferrer">Testar link do WhatsApp <ExternalLink size={15}/></a>
      </div>
      <div className="admin-settings__help"><CheckCircle2 size={18}/><span>Alterações salvas ficam no banco da VPS e aparecem na próxima visita. Nenhum deploy é necessário.</span></div>
    </aside>
    <div className="admin-settings-save" role="region" aria-label="Salvar configurações">
      <div className="admin-settings-save__status">
        <span className={"admin-settings-save__dot" + (changed ? " is-dirty" : "")}/>
        <div aria-live="polite">
          {error ? <p className="admin-settings-save__error">{error}</p> : message ? <p className="admin-settings-save__success"><Check size={16}/>{message}</p> : <><strong>{changed ? "Alterações não salvas" : "Tudo atualizado"}</strong><small>{changed ? "Revise a prévia e salve para publicar." : "As configurações estão sincronizadas com o site."}</small></>}
        </div>
      </div>
      <div className="admin-settings-save__actions">
        <button type="button" onClick={revert} disabled={!changed || saving} className="admin-settings-save__reset"><RotateCcw size={16}/> Descartar</button>
        <button type="submit" disabled={!changed || saving} className="admin-settings-save__submit">{saving ? <span className="admin-settings-save__loading"/> : <Save size={18}/>} {saving ? "Salvando..." : "Salvar alterações"} <ArrowRight size={17}/></button>
      </div>
    </div>
  </form>;
}
