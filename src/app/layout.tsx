import { Header } from "@/components/header";
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
    default: "Code by Carlos — Soluções digitais para negócios em movimento",
    template: "%s — Code by Carlos",
  },
  description:
    "Sites, sistemas sob medida, automações e produtos digitais para transformar ideias em operações que crescem.",
  applicationName: "Code by Carlos",
  authors: [{ name: "Carlos Henrique", url: "https://codebycarlos.dev" }],
  creator: "Carlos Henrique",
  keywords: ["sites profissionais", "sistemas sob medida", "automação de processos", "produtos digitais", "desenvolvimento web", "Code by Carlos"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Code by Carlos — Soluções digitais para negócios em movimento",
    description: "Sites, sistemas, automações e produtos digitais feitos sob medida.",
    url: "/",
    siteName: "Code by Carlos",
    images: [{ url: "/carlos-portrait-v3.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code by Carlos — Soluções digitais para negócios em movimento",
    description: "Sites, sistemas, automações e produtos digitais feitos sob medida.",
    images: ["/carlos-portrait-v3.webp"],
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, inter.variable, "bg-background text-foreground antialiased")} suppressHydrationWarning>
        <SiteSettingsProvider>
          <SkipLink />
          <Header />
          <div id="smooth-content">{children}</div>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
