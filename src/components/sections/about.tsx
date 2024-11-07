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
  const download = () => {
    // local pdf
    const url = 'https://drive.google.com/file/d/1tG8swJGAQ3Upq__8fezvzC7eb6AoUUOK/view?usp=sharing'
    window.open(url, '_blank')
  }


  
  return (
    <section id="about" className="py-20 bg-muted/50 w-full">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <SectionHeading title="About Me" subtitle="Passionate about creating impactful web solutions" />
        
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
          <Button onClick={download} variant="outline">Download Resume</Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  )
}