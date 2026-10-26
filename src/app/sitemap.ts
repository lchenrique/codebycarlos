import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://codebycarlos.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: "https://codebycarlos.dev/servicos/criacao-de-sites", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codebycarlos.dev/servicos/sistemas-sob-medida", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codebycarlos.dev/servicos/automacao-de-processos", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codebycarlos.dev/privacidade", changeFrequency: "yearly", priority: 0.2 },
  ];
}
