import { cn } from "@/lib/utils";
import { ProjectCard } from "../project-card";
import { ProjectGridItem } from "../porject-grid";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid  grid-cols-1 gap-4  md:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  images,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectGridItem) => {

  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      <ProjectCard
        title={title}
        description={description}
        images={images ? images : []}
        technologies={technologies}
        githubUrl={githubUrl}
        liveUrl={liveUrl}
      />
    </div>
  )


};
