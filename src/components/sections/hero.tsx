'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ShapeBlur from "../ShapeBlur";
import { BlurFade } from "../ui/blur-fade";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import Shuffle from "../Shuffle";
import { goToSection } from "@/lib/go-to-section";
// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLAnchorElement>(null);
  

  useGSAP(() => {
    if (!heroRef.current) return;

    // Initial states
    gsap.set([nameRef.current, titleRef.current, descriptionRef.current, buttonsRef.current, profileRef.current, arrowRef.current], {
      opacity: 0,
    });

    // Name animation
    gsap.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Description animation
    gsap.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power2.out",
      delay: 0.4,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Buttons animation
    gsap.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power2.out",
      delay: 0.6,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Profile image animation
    gsap.to(profileRef.current, {
      opacity: 1,
      scale: 1,
      duration: 4,
      ease: "elastic.out(1, 0.3)",
      delay: 0.8,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Arrow animation
    gsap.to(arrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Continuous floating animation for profile image
    gsap.to(profileRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();
  }, []);

  // on mount go to section if hash is in the url
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        goToSection(null, window.location.hash.replace("#", ""));
      }, 1000);
    }
  }, []);
 

  return (
    <section ref={heroRef} className="min-h-screen    px-10 flex items-center justify-evenly w-full relative pt-16  overflow-hidden">
      {/* <Particles className="absolute inset-0 z-0" /> */}
      {/* <Meteors /> */}
      <InteractiveGridPattern
        width={80}
        height={80}
        squares={[30, 30]}
        className={cn(
          "[mask-image:radial-gradient(1000px,white,transparent)]",
          "inset-x-0 inset-y-[-10%]  h-[250%] -skew-y-12",
        )}
      />
      <div className="flex md:items-start justify-center items-center flex-col p-10">
        <div ref={nameRef} className="flex gap-1 text-7xl funnel-display opacity-0 translate-y-10">
          <BlurFade delay={0.55} inView >
            <Shuffle
              text="Carlos Henrique"
              shuffleDirection="right"
              duration={1}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              className="text-center md:text-left"
            />

          </BlurFade>

        </div>
        <div ref={titleRef} className="flex gap-4 funnel-display w-full  opacity-0 translate-y-10">
          <BlurFade delay={0.25 * 2} inView className="w-full">
            <div
              className={cn(
                "share-tech-mono-regular w-full text-2xl text-center md:text-left md:text-4xl font-bold tracking-[6px] md:tracking-[12px] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-gray-400"
              )}
            >
              Front End Developer
            </div>
          </BlurFade>

        </div>

        <p ref={descriptionRef} className="text-xl text-center md:text-left md:text-2xl text-muted-foreground max-w-[600px] my-8 leading-relaxed opacity-0 translate-y-10">
          Building modern web applications with a focus on user experience and performance
        </p>
        <div ref={buttonsRef} className="flex gap-4 flex-wrap justify-center w-full md:w-max opacity-0 translate-y-10">
          <Button size="lg" className="group transition-all duration-300 hover:scale-105" asChild>
            <a href="#contact" onClick={(e) => goToSection(e, "contact")}>
              Get in touch
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Button>
          <Button size="lg" variant="outline" className="group transition-all duration-300 hover:scale-105" asChild>
            <a href="#projects" onClick={(e) => goToSection(e, "projects")}>
              View my work
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Button>
        </div>
      </div>
      <div ref={profileRef} className="relative hidden lg:block opacity-0 scale-75 ">
        <div className="h-[500px] w-[500px] flex items-center justify-center overflow-hidden relative z-10">
          <ShapeBlur
            className="w-[200px] h-[200px] z-30"
            variation={0}
            pixelRatioProp={1}
            shapeSize={1.8}
            roundness={0.2}
            borderSize={.05}
            circleSize={.5}
            circleEdge={1}
            imageUrl="/eu.jpg"
          />
        </div>


       
      </div>

      <a
        ref={arrowRef}
        href="#about"
        onClick={(e) => goToSection(e, "about")}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 opacity-0 translate-y-10 transition-colors duration-300 hover:text-primary cursor-pointer"
        aria-label="Scroll to About section"
      >
        <ArrowDownIcon className="h-8 w-8" />
      </a>
    </section >
  );
}