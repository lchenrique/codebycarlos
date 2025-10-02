'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export function ScrollSmootherComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined' && ScrollSmoother) {
      // Kill any existing smoother to prevent conflicts
      const existingSmoother = ScrollSmoother.get();
      if (existingSmoother) {
        existingSmoother.kill();
      }
      
      // Wait for the next tick to ensure DOM is ready
      const initSmoother = () => {
        // Check if wrapper and content elements exist
        const wrapper = document.querySelector("#smooth-wrapper");
        const content = document.querySelector("#smooth-content");
        
        if (wrapper && content) {
          const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1, // Smoothness factor
            effects: true, // Enable data-speed and data-lag attributes
            smoothTouch: 0.1, // Less smoothing on touch devices
          });
          
          // Make smoother globally available
          (window as any).ScrollSmootherInstance = smoother;
          
          // Refresh ScrollTrigger after page load
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
          
          return smoother;
        }
        
        return null;
      };

      // Initialize smoother
      let smoother = initSmoother();
      
      // If initialization failed, try again after a short delay
      if (!smoother) {
        const retryInterval = setInterval(() => {
          smoother = initSmoother();
          if (smoother) {
            clearInterval(retryInterval);
          }
        }, 500);
        
        // Stop retrying after 5 seconds
        setTimeout(() => {
          clearInterval(retryInterval);
        }, 5000);
      }

      // Cleanup function
      return () => {
        if (smoother) {
          smoother.kill();
        }
      };
    }
  }, []);

  return null;
}