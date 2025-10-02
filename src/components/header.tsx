"use client"
import { useState, useEffect } from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { NavBar } from "./navbar";
import Image from "next/image";

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Função para lidar com o clique nos links do header
  const handleHeaderLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Usar ScrollSmoother para rolar até a seção
    const smoother = typeof window !== 'undefined' ? (window as any).ScrollSmootherInstance : null;
    if (smoother) {
      // Se for a seção home, rolar para o topo
      if (targetId === 'home') {
        smoother.scrollTop(0, true);
      } else {
        smoother.scrollTo(`#${targetId}`, true);
      }
    } else {
      // Fallback caso o ScrollSmoother não esteja disponível
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Atualizar a URL
    window.history.pushState(null, '', targetId === 'home' ? '#' : `#${targetId}`);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 gap-4 flex items-center justify-center md:justify-between">
          <a
            href="#home"
            className="text-lg font-bold flex items-center gap-2 "
            onClick={(e) => handleHeaderLinkClick(e, 'home')}
          >
            <Image alt="" src="/logo.svg" width={20} height={20} />    
            <span className="funnel-display"> Code by Carlos</span>
          </a>
          <nav className=" gap-6 item hidden md:flex">
            <NavBar />
          
          </nav>
        </div>
      </header>
      <nav className=" gap-6 item flex items-center justify-between w-screen bg- md:hidden fixed bottom-0 z-[999] bg-background/80 backdrop-blur-lg border-t  h-16 ">
        <NavBar />
      </nav>
    </>
  );
}