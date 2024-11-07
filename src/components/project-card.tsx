"use client";
import Image, { type StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLinkIcon, GithubIcon, LockKeyhole } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { cn } from "@/lib/utils";
interface ProjectCardProps {
  title: string;
  description: string;
  images: StaticImageData[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({ title, description, images, technologies, liveUrl, githubUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover-card-effect group">
      <div className="relative h-48 w-full overflow-hidden">
      
        <PhotoProvider>
          <div className="cursor-pointer flex itemms-center justify-center ">
            <div className="absolute pointer-events-none inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <PhotoView key={images[0].src} src={images[0].src}>
              <img src={images[0].src} />
            </PhotoView>
            {images.slice(1).map((item, index) => (
              <PhotoView key={item.src} src={item.src} />
            ))}
          </div>
        </PhotoProvider>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-4">
        {liveUrl && (
          <>
            <Button asChild className="flex-1 group/button transition-all duration-300 hover:scale-105">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <ExternalLinkIcon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:rotate-45" />
                View
              </a>
            </Button>
          </>
        )}

        <Button variant="outline"  className={cn("flex-1 group/button transition-all duration-300 hover:scale-105", {
          "pointer-events-none": !githubUrl
        })} asChild>
          <a href={githubUrl || ""} onClick={(e) =>  !githubUrl ?e.preventDefault(): {}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
            {githubUrl ?<GithubIcon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110" /> : <LockKeyhole className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110" />}
            
            {githubUrl ? "Source Code" : "Private"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
