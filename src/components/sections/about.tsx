'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Code2,
  Globe,
  Users,
  Brain,
  Rocket,
  Heart,
  FileCode,
  Type,
  Blocks,
  Server,
  Database,
  Layout,
  GitBranch,
  Cloud
} from "lucide-react"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { HoverEffect } from "../ui/card-hover-effects"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Define the SectionHeading component
function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-2 funnel-display">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  )
}

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices and SOLID principles.",
  },
  {
    icon: Globe,
    title: "Modern Stack",
    description: "Leveraging cutting-edge technologies like React, Next.js, and TypeScript to build powerful web applications.",
  },
  {
    icon: Users,
    title: "User-Focused",
    description: "Creating intuitive interfaces with exceptional user experiences, always putting the end-user first.",
  },
  {
    icon: Brain,
    title: "Problem Solver",
    description: "Approaching complex challenges with analytical thinking and creative solutions.",
  },
  {
    icon: Rocket,
    title: "Performance Optimized",
    description: "Ensuring lightning-fast load times and smooth interactions for optimal user satisfaction.",
  },
  {
    icon: Heart,
    title: "Passionate Learner",
    description: "Continuously expanding knowledge and staying up-to-date with the latest industry trends.",
  },
]

export function About() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const download = (en?: boolean) => {
    if (en) {
      const url = 'https://drive.google.com/file/d/1a9ZxuXRQc_Gjcf6PZXAneIz30oCJj03C/view?usp=sharing'
      window.open(url, '_blank')
    } else {
      const url = 'https://drive.google.com/file/d/1lH2fPVJ-skJixMbzHTQz5HbTNc4heirr/view?usp=sharing'
      window.open(url, '_blank')
    }
  }

  useGSAP(() => {
    if (!aboutRef.current) return

    // Initial states
    gsap.set([headingRef.current, descriptionRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    })

    // Animate heading
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate description
    gsap.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate buttons
    gsap.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate cards
    cardsRef.current.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 30 })
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1 * i,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();
  }, [])

  return (
    <section ref={aboutRef} id="about" className="py-20 bg-muted/50 w-full">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <div ref={headingRef}>
          <SectionHeading title="About Me" subtitle="Passionate about creating impactful web solutions" />
        </div>

        <div ref={descriptionRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-lg mb-4">
              Hi there! I'm a passionate front end developer with a keen eye for design and a love for clean, efficient code.
              With years of experience in web development, I specialize in creating robust and scalable applications
              that not only meet but exceed client expectations.
            </p>
            <div ref={buttonsRef} className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <Button onClick={() => download(true)} variant="outline">Download Resume (English)</Button>
              <Button onClick={() => download(false)} variant="outline">Download Resume (Portuguese)</Button>
            </div>
          </motion.div>
        </div>

        <HoverEffect items={features} />


      </div>
    </section>
  )
}