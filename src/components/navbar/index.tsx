"use client";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const NavBar = () => {

    const [hash, setHash] = useState(window.location.hash);

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
            const scrollPosition = window.scrollY;
            
            if (scrollPosition === 0) {
              window.history.pushState(null, '', '#');
              setHash('');
              return;
            }

            sections.forEach(section => {
              const element = document.getElementById(section);
              if (element) {
                const { offsetTop, offsetHeight } = element;
                if (
                  scrollPosition >= offsetTop - 100 && 
                  scrollPosition < offsetTop + offsetHeight -100
                ) {
                  if (hash !== `#${section}`) {
                    window.history.pushState(null, '', `#${section}`);
                    setHash(`#${section}`);
                  }
                }
              }
            });
          };
    
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [hash]);    
    
  
    return (
      <nav className="flex  justify-evenly gap-0 md:gap-6 items-center w-full h-full">
        {["About", "Skills", "Projects", "Contact"].map((item, i) => (
          <div className="h-full w-full flex items-center text-center">
           { i === 0 ? null: <Separator orientation="vertical" />}
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
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