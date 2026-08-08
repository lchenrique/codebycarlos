import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { SceneCursor } from "@/components/SceneCursor";
import { CinematicFrame } from "@/components/cinematic-frame";
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
  metadataBase: new URL("https://www.codebycarlos.dev"),
  title: {
    default: "Carlos Henrique — Creative Front-end Developer",
    template: "%s — Code by Carlos",
  },
  description:
    "Carlos Henrique creates high-performance digital experiences where interface, motion and code meet.",
  applicationName: "Code by Carlos",
  authors: [{ name: "Carlos Henrique", url: "https://www.codebycarlos.dev" }],
  creator: "Carlos Henrique",
  keywords: [
    "creative developer",
    "front-end developer",
    "GSAP",
    "Next.js",
    "motion design",
    "web development",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Carlos Henrique — Creative Front-end Developer",
    description:
      "High-performance digital experiences where interface, motion and code meet.",
    url: "/",
    siteName: "Code by Carlos",
    images: [{ url: "/portifolio.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Henrique — Creative Front-end Developer",
    description: "High-performance digital experiences where interface, motion and code meet.",
    images: ["/portifolio.png"],
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground antialiased")} suppressHydrationWarning>
        <SiteSettingsProvider>
          <a className="skip-link" href="#home">Skip to content / Pular para o conteúdo</a>
          <Loading />
          <Header />
          <SceneCursor />
          <CinematicFrame />
          <div id="smooth-content">{children}</div>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
