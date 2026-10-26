"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/components/analytics-tracker";

export function ContactForm({ locale }: { locale: "pt" | "en" }) {
  const pt = locale === "pt";
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("loading");
    try {
      const response = await fetch("/api/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("send failed");
      trackEvent("lead", "Formulário de orçamento");
      form.reset();
      setState("sent");
    } catch { setState("error"); }
  }

  return <form onSubmit={submit} className="lead-form" aria-label={pt ? "Pedir orçamento" : "Request a quote"}>
    <div className="lead-form__head">
      <h3>{pt ? "Peça um orçamento sem compromisso" : "Request a free quote"}</h3>
      <p>{pt ? "Explique sua ideia em poucas linhas. Eu mesmo vou responder por e-mail." : "Briefly describe your idea. I will reply personally by email."}</p>
    </div>
    <div className="lead-form__row">
      <label>{pt ? "Seu nome" : "Your name"}<input name="name" type="text" minLength={2} maxLength={80} autoComplete="name" required placeholder={pt ? "Como posso te chamar?" : "Your name"} /></label>
      <label>E-mail<input name="email" type="email" maxLength={160} autoComplete="email" required placeholder="voce@empresa.com" /></label>
    </div>
    <label>{pt ? "O que você precisa?" : "What do you need?"}<textarea name="message" rows={4} minLength={10} maxLength={4000} required placeholder={pt ? "Ex.: quero um site para minha loja com catálogo de produtos e botão de WhatsApp…" : "Tell me about your project…"} /></label>
    <div className="lead-form__trap" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="lead-form__bottom">
      <button disabled={state === "loading"} type="submit">{state === "loading" ? (pt ? "Enviando…" : "Sending…") : (pt ? "Enviar meu pedido →" : "Send request →")}</button>
      <span>{pt ? "Seus dados serão usados apenas para responder ao contato." : "Your data is used only to reply to your request."}</span>
    </div>
    {state === "sent" && <p role="status" className="lead-form__success">{pt ? "Mensagem enviada! Vou responder no e-mail informado." : "Message sent! I'll reply by email."}</p>}
    {state === "error" && <p role="alert" className="lead-form__error">{pt ? "Não foi possível enviar agora. Use o e-mail abaixo para falar comigo." : "Unable to send. Please use the email below."}</p>}
  </form>;
}
