'use client';

import { useRef } from 'react';
import { SectionHeading } from '../section-heading';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, MessageCircle } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contactRef.current) return;

    // Initial states
    gsap.set([headingRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate heading
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate buttons
    gsap.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();
  }, []);

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number in international format (only numbers)
    // Example: 5511999999999 for Brazil
    window.open('https://wa.me/5521981686736', '_blank');
  };

  // Function to handle LinkedIn click
  const handleLinkedInClick = () => {
    // Replace with your LinkedIn profile URL
    window.open('https://www.linkedin.com/in/lc-henrique', '_blank');
  };

  // Function to handle email click
  const handleEmailClick = () => {
    // Replace with your email address
    window.location.href = 'mailto:lc.henriquee@gmail.com';
  };

  return (
    <section ref={contactRef} id="contact" className="py-80 ">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <div ref={headingRef}>
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a project in mind? Let's talk about it."
          />
        </div>
        <div ref={buttonsRef} className="max-w-md  mx-auto space-y-6 bg-muted p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full h-20 flex flex-col gap-2 group transition-all duration-300 hover:scale-105"
              variant="outline"
            >
              <MessageCircle className="h-6 w-6 group-hover:text-green-500 transition-colors" />
              <span>WhatsApp</span>
            </Button>
            
            <Button 
              onClick={handleLinkedInClick}
              className="w-full h-20 flex flex-col gap-2 group transition-all duration-300 hover:scale-105"
              variant="outline"
            >
              <Linkedin className="h-6 w-6 group-hover:text-blue-600 transition-colors" />
              <span>LinkedIn</span>
            </Button>
            
            <Button 
              onClick={handleEmailClick}
              className="w-full h-20 flex flex-col gap-2 group transition-all duration-300 hover:scale-105"
              variant="outline"
            >
              <Mail className="h-6 w-6 group-hover:text-red-500 transition-colors" />
              <span>Email</span>
            </Button>
          </div>
          
          <div className="text-center text-muted-foreground text-sm pt-4">
            <p>Feel free to reach out through any of these channels</p>
          </div>
        </div>
      </div>
    </section>
  );
}