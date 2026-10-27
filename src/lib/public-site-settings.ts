import { z } from "zod";

// Valores iniciais. Depois de salvo pelo admin, o SQLite passa a ser a fonte oficial.
export const defaultSiteSettings = {
  whatsappNumber: "21981686736",
  whatsappMessagePt: "Olá, Carlos! Vim pelo seu site e gostaria de conversar sobre um projeto.",
  whatsappMessageEn: "Hi Carlos! I found your website and would like to discuss a project.",
  contactTitlePt: "Vamos conversar sobre sua ideia?",
  contactDescriptionPt: "Não precisa ter um briefing pronto. Conte o que você quer melhorar ou construir, e conversamos sobre a melhor solução.",
  whatsappButtonPt: "Conversar no WhatsApp",
  contactTitleEn: "Let's talk about your idea.",
  contactDescriptionEn: "Tell me about the project you want to build or improve. We can figure out the best next step together.",
  whatsappButtonEn: "Chat on WhatsApp",
  linkedinUrl: "https://www.linkedin.com/in/lc-henrique",
};

export const siteSettingsSchema = z.object({
  whatsappNumber: z.string().trim().regex(/^\d{10,15}$/, "Informe apenas os números, incluindo DDD."),
  whatsappMessagePt: z.string().trim().min(5).max(500),
  whatsappMessageEn: z.string().trim().min(5).max(500),
  contactTitlePt: z.string().trim().min(3).max(100),
  contactDescriptionPt: z.string().trim().min(10).max(400),
  whatsappButtonPt: z.string().trim().min(3).max(60),
  contactTitleEn: z.string().trim().min(3).max(100),
  contactDescriptionEn: z.string().trim().min(10).max(400),
  whatsappButtonEn: z.string().trim().min(3).max(60),
  linkedinUrl: z.string().trim().url().refine((url) => {
    try { const parsed = new URL(url); return parsed.protocol === "https:" && (parsed.hostname === "linkedin.com" || parsed.hostname === "www.linkedin.com"); }
    catch { return false; }
  }, "Use uma URL https://www.linkedin.com/..."),
}).strict();

export type PublicSiteSettings = z.infer<typeof siteSettingsSchema>;

export function buildWhatsappUrl(number: string, message: string) {
  const normalized = number.startsWith("55") && number.length >= 12 ? number : "55" + number;
  return "https://wa.me/" + normalized + "?text=" + encodeURIComponent(message);
}
