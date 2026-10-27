import { SolutionsHome } from "@/components/solutions-home";
import { defaultSiteSettings } from "@/lib/public-site-settings";
import { getPublicSiteSettings } from "@/lib/site-settings-db";

// Conteúdo administrável não deve ser congelado durante o build/deploy.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Home() {
  let settings = defaultSiteSettings;
  try { settings = getPublicSiteSettings(); }
  catch (error) { console.error("Configurações do site indisponíveis:", error instanceof Error ? error.message : "error"); }
  return <SolutionsHome settings={settings} />;
}
