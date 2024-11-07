import { Button } from "@/components/ui/button";
import { ArrowDownIcon, Download, Mail } from "lucide-react";
import GradualSpacing from "../../../components/ui/gradual-spacing";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProfilePic from "../../assets/profile-pic2.png";
import Particles from "../ui/particles";
import Meteors from "../ui/meteors";

export function Hero() {
  return (
    <section className="min-h-screen px-10 md:px-0 flex items-center justify-evenly  w-full relative pt-16 gradient-bg  overflow-hidden">
      <Particles className="absolute inset-0 z-0" />
      <Meteors />
      <div className="flex md:items-start justify-center items-center flex-col p-30">
        <div className="flex gap-1 funnel-display">
          {"Carlos Henrique_".split("").map((char, i) => (
            <span
              key={i}
              className={cn(
                "text-3xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400",
                "animate-fade-right"
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </span>
          ))}
        </div>
        <div className="flex gap-4 funnel-display w-full justify-center md:justify-start">
          <span
            className={cn(
              "text-lg text-center md:text-4xl font-bold tracking-[6px] md:tracking-[12px] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400",
              "animate-fade-right"
            )}
          >
            Front End Developer
          </span>
        </div>

        <p className="text-xl text-center md:text-left md:text-2xl text-muted-foreground max-w-[600px] mb-8 leading-relaxed animate-fade-up">
          Building modern web applications with a focus on user experience and performance
        </p>
        <div className="flex gap-4 flex-wrap justify-center w-full md:w-max">
          <Button size="lg" className="group transition-all duration-300 hover:scale-105" asChild>
            <a href="#contact">
              Get in touch
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Button>
          <Button size="lg" variant="outline" className="group transition-all duration-300 hover:scale-105" asChild>
            <a href="#projects">
              View my work
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Button>
        </div>
      </div>
      <div className="relative hidden lg:block animate-fade-left">
        <div className="w-48 h-48 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-primary/20 relative z-10">
          <Image loading="lazy" src={ProfilePic} alt="Profile" width={400} height={400} className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-3xl animate-pulse animate-infinite animate-duration-[8000ms] animate-ease-in-out " />
        <div className="absolute z-[-1] inset-0 rounded-full brilho-circulo  left-0 animate-spin "></div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse transition-colors duration-300 hover:text-primary"
        aria-label="Scroll to About section"
      >
        <ArrowDownIcon className="h-8 w-8" />
      </a>
    </section>
  );
}
