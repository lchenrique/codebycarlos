import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { SceneTransition } from "@/components/scene-transition";
import { ReelBreak } from "@/components/reel-break";

export default function Home() {
  return (
    <main id="home" className="site-main">
      <Hero />
      <About />
      <Skills />
      <SceneTransition />
      <Projects />
      <ReelBreak />
      <Contact />
    </main>
  );
}
