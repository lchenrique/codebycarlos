import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { SceneCursor } from "@/components/SceneCursor";
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
  title: "Carlos Henrique — Creative Front-end Developer",
  description:
    "Carlos Henrique creates high-performance digital experiences where interface, motion and code meet.",
  openGraph: {
    title: "Carlos Henrique — Creative Front-end Developer",
    description:
      "High-performance digital experiences where interface, motion and code meet.",
    url: "/",
    siteName: "Code by Carlos",
    images: [{ url: "/portifolio.png" }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={cn(inter.className, "bg-background text-foreground antialiased")} suppressHydrationWarning>
        <SiteSettingsProvider>
          <Loading />
          <Header />
          <SceneCursor />
          <div id="smooth-content">{children}</div>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
