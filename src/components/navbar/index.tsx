"use client";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';

export const NavBar = () => {
    const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

    useEffect(() => {
      const handleHashChange = () => {
        setHash(window.location.hash);
      };
  
      window.addEventListener('hashchange', handleHashChange);
  
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []);

    /// detect section and update hash state
    useEffect(() => {
      const sections = ["about", "skills", "projects", "contact"];
      const handleScroll = () => {
        // Verificar se há um smoother ativo
        const smoother = typeof window !== 'undefined' ? (window as any).ScrollSmootherInstance : null;
        const scrollPosition = smoother ? 
          smoother.scrollTrigger.scroll() : 
          window.scrollY;

        // Verificar se estamos no topo da página
        if (scrollPosition <= 10) {
          setHash('#home');
          return;
        }

        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            
            if (
              scrollPosition >= offsetTop - 100 && 
              scrollPosition < offsetTop + offsetHeight - 100
            ) {
              if (hash !== `#${section}`) {
                setHash(`#${section}`);
              }
            }
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [hash]);    
    
    // Função para lidar com o clique nos links de navegação
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      
      // Usar ScrollSmoother para rolar até a seção
      const smoother = typeof window !== 'undefined' ? (window as any).ScrollSmootherInstance : null;
      if (smoother) {
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
      setHash(targetId === 'home' ? '#home' : `#${targetId}`);
    };

    return (
      <nav className="flex  justify-evenly gap-0 md:gap-6 items-center w-full h-full">
        {["About", "Skills", "Projects", "Contact"].map((item, i) => (
          <div className="h-full w-full flex items-center text-center" key={i}>
           { i === 0 ? null: <Separator orientation="vertical" />}
            <a
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className={cn("text-muted-foreground h-full w-full flex items-center justify-center hover:text-foreground transition-colors   funnel-display hover:[text-shadow:0px_0px_10px_var(--tw-shadow-color)] shadow-white mx-auto", {
                 "text-foreground [text-shadow:0px_0px_10px_var(--tw-shadow-color)]": hash === `#${item.toLowerCase()}`
              })}
            >
              {item}
            </a>
          </div>
        ))}
      </nav>
    );
  };