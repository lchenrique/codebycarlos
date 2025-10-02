import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers";
import { Toaster } from "../components/ui/toaster";
import { ScrollSmootherComponent } from "@/components/scroll-smoother";
import { Header } from "@/components/header";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggle";
import {Loading} from "@/components/loading";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.codebycarlos.dev'),
  title: "Code by Carlos - Front-End Development",
  description:
    "Front-end developer specialized in creating intuitive and attractive user interfaces for web and mobile applications, including Progressive Web Apps (PWAs). View his projects and learn more about his work.",
  openGraph: {
    title: "Code by Carlos - Front-End Development",
    description:
      "Front-end developer specialized in creating intuitive and attractive user interfaces for web and mobile applications, including Progressive Web Apps (PWAs). View his projects and learn more about his work.",
    url: "/",
    siteName: "Code by Carlos",
    images: [
      {
        url: "/portifolio.png",
      },
    ],
    type: "website",
  },
  other: {
    "linkedin:title": "Code by Carlos - Front-End Development",
    "linkedin:description":
      "Front-end developer specialized in creating intuitive and attractive user interfaces for web and mobile applications, including Progressive Web Apps (PWAs). View his projects and learn more about his work.",
    "linkedin:image": "/portifolio.png",
    "linkedin:url": "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={cn(inter.className, "container relative")}>
          <Loading />
          <Header />

          <ScrollSmootherComponent />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <Toaster />
            </div>
          </div>
      </body>
    </html>
  );
}
