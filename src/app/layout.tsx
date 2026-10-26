import { Header } from "@/components/header";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { SkipLink } from "@/components/skip-link";
import { cn } from "@/lib/utils";
import { SiteSettingsProvider } from "@/lib/site-settings";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codebycarlos.dev"),
  title: {
    default: "Criação de Sites, Sistemas e Automações | Code by Carlos",
    template: "%s — Code by Carlos",
  },
  description:
    "Criação de sites profissionais, sistemas sob medida e automações para empresas e profissionais no Brasil. Fale direto com o desenvolvedor e peça um orçamento.",
  applicationName: "Code by Carlos",
  authors: [{ name: "Carlos Henrique", url: "https://codebycarlos.dev" }],
  creator: "Carlos Henrique",
  keywords: ["criação de sites", "desenvolvimento de sites", "sistemas sob medida", "automação de processos", "desenvolvedor web", "Rio de Janeiro", "Code by Carlos"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Criação de Sites e Sistemas | Code by Carlos",
    description: "Sites profissionais, sistemas e automações para o seu negócio. Atendimento para todo o Brasil.",
    url: "/",
    siteName: "Code by Carlos",
    locale: "pt_BR",
    images: [{ url: "/carlos-portrait-v3.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites e Sistemas | Code by Carlos",
    description: "Criação de sites profissionais e sistemas para empresas no Brasil.",
    images: ["/carlos-portrait-v3.webp"],
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, inter.variable, "bg-background text-foreground antialiased")} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Code by Carlos",
          url: "https://codebycarlos.dev",
          description: "Criação de sites profissionais, sistemas sob medida e automações para empresas.",
          email: "carlos@codebycarlos.dev",
          areaServed: { "@type": "Country", name: "Brasil" },
          founder: { "@type": "Person", name: "Carlos Henrique" },
          knowsAbout: ["Desenvolvimento web", "Sites institucionais", "Sistemas web", "Automação de processos"]
        }).replace(/</g, "\\u003c") }} />
        <SiteSettingsProvider>
          <SkipLink />
          <Header />
          <AnalyticsTracker />
          <div id="smooth-content">{children}</div>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
