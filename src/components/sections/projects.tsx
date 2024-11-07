import { SectionHeading } from "../section-heading";
import { ProjectCard } from "../project-card";
import { portfolioImages } from "./images";

const projects = [
  {
    title: "Reallagos",
    description:
      "System for accountants. This system offers a comprehensive solution for managing accounting and financial tasks. It facilitates the control of balance sheets, financial reports, accounting entries, and other essential operations.",
    images: [
      portfolioImages.reallagos.colaborators,
      portfolioImages.reallagos.dashboard,
      portfolioImages.reallagos.userdetails,
      portfolioImages.reallagos.img1,
      portfolioImages.reallagos.img2,
      portfolioImages.reallagos.img3,
      portfolioImages.reallagos.img4,
      portfolioImages.reallagos.img5,
      portfolioImages.reallagos.img7,
      portfolioImages.reallagos.img8,
      portfolioImages.reallagos.img9,
      portfolioImages.reallagos.img10,
      portfolioImages.reallagos.img11,
      portfolioImages.reallagos.img12,
      portfolioImages.reallagos.img13,
      portfolioImages.reallagos.img14,
      portfolioImages.reallagos.img15,
      portfolioImages.reallagos.img16,
      portfolioImages.reallagos.img17,
      portfolioImages.reallagos.img18,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
  },
  {
    title: "Softconta",
    description:
      "Landing page created to meet the needs of modern accountants. With it, it is possible to completely eliminate the reliance on spreadsheets and other manual tools.",
    images: [
      portfolioImages.softcontaLandingPage,
      portfolioImages.cadastro,
      portfolioImages.login,
      portfolioImages.recoveryPass,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
  },
  {
    title: "Medtime",
    description:
      "Web app designed to help users remember to take their medications on time. It has an intuitive interface and automatic notifications. (Under development)",
    images: [
      portfolioImages.medtime,
      portfolioImages.patients,
      portfolioImages.medtimeDark,
      portfolioImages.patientsDark,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "https://medicine-time.vercel.app/", // URL do projeto ao vivo, se houver
    githubUrl: "https://github.com/lchenrique/medicine-time", // URL do repositório do GitHub, se houver
  },
  {
    title: "Magic 🪄 Panel",
    description: "React library created to facilitate the use of modals and drawers in web applications.",
    images: [  portfolioImages.magicPanel, portfolioImages.modal,
      portfolioImages.drawer,
      portfolioImages.drawerB,],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "https://magic-panel-web.vercel.app/", // URL do projeto ao vivo, se houver
    githubUrl: "https://github.com/lchenrique/magic-panel", // URL do repositório do GitHub, se houver
  },

  {
    title: "FinNext",
    description: "FinNext is an advanced investment management platform designed to provide users with a complete, intuitive view of their financial portfolios. Featuring custom dashboards, real-time market alerts, and detailed analytics tools, FinNext supports strategic decision-making to maximize investment outcomes. The platform is tailored to meet the needs of both beginner and seasoned investors, combining ease of use with powerful features.",
    images: [
      portfolioImages.finnext.finNext1,
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "http://finnext.vercel.app/", // URL do projeto ao vivo, se houver
    // githubUrl: "https://github.com", // URL do repositório do GitHub, se houver
  },
  {
    title: "Visualab",
    description: "VisuaLab Studio is a platform designed for creators who want to generate visual content efficiently. With it, you can create carousels, slides, PDFs, and much more, all with a simple and intuitive interface.",
    images: [portfolioImages.visualab.visual1, portfolioImages.visualab.visual2, portfolioImages.visualab.visual3],
    technologies: ["React", "TypeScript", "TailwindCSS", "CSS3", "HTML5", "JavaScript"],
    liveUrl: "https://carouselio.vercel.app/editor", // URL do projeto ao vivo, se houver
    githubUrl: "https://github.com/lchenrique/carouselio", // URL do repositório do GitHub, se houver
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 ">
        <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
