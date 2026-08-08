"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "pt";
export type ThemeMode = "dark" | "light";

type Messages = { [key: string]: string };

export const messages: Record<Locale, Messages> = {
  en: {
    navAbout: "About",
    navWork: "Selected work",
    navContact: "Contact",
    backTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    available: "Available for select projects",
    languageSwitch: "Switch language",
    useLight: "Use light theme",
    useDark: "Use dark theme",
    loadingStudio: "entering the studio",
    loadingPlease: "please wait",
    loadingLocation: "São Paulo / Brazil",
    loadingDigital: "digital experience design",
    heroKicker: "creative front-end developer",
    heroEyebrow: "Interfaces with a pulse.",
    heroTitleOne: "Designing",
    heroTitleTwo: "moments",
    heroTitleThree: "for the",
    heroTitleFour: "web.",
    heroDescription: "I turn complex ideas into digital experiences that feel clear, tactile and impossible to ignore.",
    heroSee: "see",
    heroWork: "the work",
    heroLocation: "Based in Brazil",
    heroScroll: "scroll to move",
    heroNext: "next chapter",
    aboutMarker: "about",
    aboutSub: "the person behind the pixels",
    aboutEyebrow: "A little context",
    aboutTitleOne: "Good work should",
    aboutTitleTwo: "feel like a",
    aboutTitleThree: "discovery.",
    aboutLead: "I'm Carlos — a front-end developer obsessed with the space between a good idea and the feeling it creates.",
    aboutCopy: "I build thoughtful interfaces, expressive motion systems and reliable products for people who care about the details. The stack changes. The intention doesn't.",
    aboutLink: "Let's make something",
    portrait: "portrait / 2024",
    statYears: "years making",
    statProducts: "digital products",
    statCuriosity: "curiosity",
    aboutNote: "Crafted with restraint, precision\nand a little bit of magic.",
    toolkit: "toolkit",
    toolkitSub: "the ingredients",
    toolkitEyebrow: "A flexible toolkit",
    toolkitTitleOne: "Technology is",
    toolkitTitleTwo: "the accent.",
    toolkitIntro: "The best tool is the one that makes the idea feel inevitable. I choose the stack around the story, not the other way around.",
    toolkitBottom: "Always learning / always shipping",
    selectedWork: "selected work",
    selectedWorkSub: "built for the feeling",
    projectsEyebrow: "A few things I've made",
    projectsTitleOne: "Selected",
    projectsTitleTwo: "frames.",
    projectsIntro: "Not just screens. Systems, stories and small moments of interaction that stayed with me.",
    projectsMore: "More experiments in the lab",
    projectsGithub: "Visit GitHub",
    openCase: "open case",
    contact: "contact",
    contactSub: "the next scene is yours",
    contactTitleOne: "Have a story?",
    contactTitleTwo: "Let's make it",
    contactTitleThree: "move.",
    current: "currently available",
    contactSunOne: "let's make",
    contactSunTwo: "something",
  },
  pt: {
    navAbout: "Sobre",
    navWork: "Trabalhos",
    navContact: "Contato",
    backTop: "Voltar ao topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    available: "Disponível para projetos selecionados",
    languageSwitch: "Mudar idioma",
    useLight: "Usar tema claro",
    useDark: "Usar tema escuro",
    loadingStudio: "entrando no estúdio",
    loadingPlease: "aguarde",
    loadingLocation: "São Paulo / Brasil",
    loadingDigital: "design de experiências digitais",
    heroKicker: "desenvolvedor front-end criativo",
    heroEyebrow: "Interfaces com pulso.",
    heroTitleOne: "Criando",
    heroTitleTwo: "momentos",
    heroTitleThree: "para a",
    heroTitleFour: "web.",
    heroDescription: "Transformo ideias complexas em experiências digitais claras, táteis e impossíveis de ignorar.",
    heroSee: "ver",
    heroWork: "o trabalho",
    heroLocation: "Brasil",
    heroScroll: "role para explorar",
    heroNext: "próximo capítulo",
    aboutMarker: "sobre",
    aboutSub: "a pessoa por trás dos pixels",
    aboutEyebrow: "Um pouco de contexto",
    aboutTitleOne: "Um bom trabalho deve",
    aboutTitleTwo: "provocar uma",
    aboutTitleThree: "descoberta.",
    aboutLead: "Eu sou Carlos — desenvolvedor front-end obcecado pelo espaço entre uma boa ideia e a sensação que ela desperta.",
    aboutCopy: "Crio interfaces cuidadosas, sistemas de movimento expressivos e produtos confiáveis para quem se importa com os detalhes. A tecnologia muda. A intenção permanece.",
    aboutLink: "Vamos criar algo",
    portrait: "retrato / 2024",
    statYears: "anos criando",
    statProducts: "produtos digitais",
    statCuriosity: "curiosidade",
    aboutNote: "Feito com precisão, intenção\ne um pouco de magia.",
    toolkit: "ferramentas",
    toolkitSub: "os ingredientes",
    toolkitEyebrow: "Uma stack flexível",
    toolkitTitleOne: "A tecnologia é",
    toolkitTitleTwo: "o meio.",
    toolkitIntro: "A melhor ferramenta é aquela que faz a ideia parecer inevitável. Escolho a tecnologia em torno da história, nunca o contrário.",
    toolkitBottom: "Sempre aprendendo / sempre construindo",
    selectedWork: "trabalhos selecionados",
    selectedWorkSub: "criados para gerar sensação",
    projectsEyebrow: "Algumas coisas que criei",
    projectsTitleOne: "Projetos",
    projectsTitleTwo: "selecionados.",
    projectsIntro: "Não são apenas telas. São sistemas, histórias e pequenos gestos de interação que fazem a diferença.",
    projectsMore: "Mais experimentos no laboratório",
    projectsGithub: "Visitar GitHub",
    openCase: "abrir projeto",
    contact: "contato",
    contactSub: "a próxima cena é sua",
    contactTitleOne: "Tem uma história?",
    contactTitleTwo: "Vamos colocá-la",
    contactTitleThree: "em movimento.",
    current: "disponível no momento",
    contactSunOne: "vamos criar",
    contactSunTwo: "algo",
  },
};

type SiteSettingsValue = {
  locale: Locale;
  theme: ThemeMode;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
  t: (key: keyof typeof messages.en) => string;
};

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("codebycarlos-locale");
    const storedTheme = window.localStorage.getItem("codebycarlos-theme");
    if (storedLocale === "en" || storedLocale === "pt") setLocale(storedLocale);
    if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.body.classList.toggle("theme-light", theme === "light");
    window.localStorage.setItem("codebycarlos-locale", locale);
    window.localStorage.setItem("codebycarlos-theme", theme);
  }, [locale, theme, ready]);

  const value = useMemo<SiteSettingsValue>(() => ({
    locale,
    theme,
    setLocale,
    setTheme,
    toggleLocale: () => setLocale((current) => current === "en" ? "pt" : "en"),
    toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    t: (key) => messages[locale][key],
  }), [locale, theme]);

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  return context;
}
