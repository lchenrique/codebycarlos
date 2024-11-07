"use client"
import { useState, useEffect, type CSSProperties } from "react";
import { Separator } from "./ui/separator";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { NavBar } from "./navbar";
import Image from "next/image";



export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 gap-4 flex items-center justify-center md:justify-between">
          <a
            href="#home"
            className="text-lg font-bold flex items-center gap-2 "
            onClick={(e) => {
              e.preventDefault();
              const { hash } = window.location;
              window.location.hash = hash === "#home" ? "" : "#home";
              const { pathname } = window.location;
              window.history.pushState({}, "", pathname);

            }}
          >
        <Image alt="" src="/logo.svg" width={20} height={20} />    <span className="funnel-display"> Code by Carlos</span>
          </a>
          <nav className=" gap-6 item hidden md:flex">
            <NavBar />
          </nav>

          {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}
        </div>
      </header>
      <nav className=" gap-6 item flex items-center justify-between w-screen bg- md:hidden fixed bottom-0 z-[999] bg-background/80 backdrop-blur-lg border-t  h-16 ">
        <NavBar />
      </nav>
    </>
  );
}
