import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import "./service.css";

const services = {
  "criacao-de-sites": {
    name: "Criação de sites profissionais",
    title: "Criação de sites para empresas que querem conquistar clientes",
    description: "Desenvolvo sites profissionais, rápidos e fáceis de usar para pequenas empresas e profissionais. Seu negócio com presença digital e um caminho claro para pedir orçamento.",
    keyword: "Criação de sites profissionais",
    intro: "Seu cliente precisa entender o que você oferece, confiar no seu trabalho e saber como falar com você. Um site bem planejado pode ajudar nas três etapas.",
    benefits: ["Página responsiva, pensada para celular e computador", "Explicação simples dos seus produtos ou serviços", "Botões claros para contato e solicitação de orçamento", "Estrutura de títulos e metadados para os mecanismos de busca", "Métricas para saber de onde chegam as visitas"],
    types: [["Site institucional", "Apresente a empresa, serviços e formas de contato."], ["Página de campanha", "Uma página focada em uma oferta ou serviço."], ["Portfólio ou catálogo", "Mostre trabalhos, produtos e diferenciais com clareza."]],
    faqs: [["Meu site vai aparecer em primeiro no Google?", "Ninguém pode prometer a primeira posição. Entrego uma base técnica preparada para indexação e ajudo a orientar os próximos passos de conteúdo e divulgação."], ["Consigo atualizar o conteúdo depois?", "Sim. Podemos planejar um painel de edição ou outra forma de atualização, conforme a necessidade do projeto."], ["Vocês cuidam da hospedagem?", "Posso ajudar a configurar domínio, hospedagem e publicação. Esses itens entram no orçamento de acordo com o projeto."]],
  },
  "sistemas-sob-medida": {
    name: "Sistemas sob medida",
    title: "Sistemas sob medida para organizar e simplificar sua empresa",
    description: "Desenvolvimento de sistemas web, painéis e áreas de clientes personalizados para processos reais do seu negócio, com integração entre ferramentas e atendimento direto.",
    keyword: "Desenvolvimento de sistemas web",
    intro: "Sua empresa ainda depende de planilhas espalhadas, mensagens perdidas ou retrabalho? Um sistema personalizado pode colocar as informações certas no mesmo lugar.",
    benefits: ["Painel com as informações que importam para o negócio", "Cadastro de clientes, serviços e registros conforme sua rotina", "Controle de acesso para equipe e administradores", "Integração com ferramentas já usadas pela empresa", "Evolução por etapas, começando pelo que traz mais valor"],
    types: [["Agendamentos e atendimento", "Organize horários, disponibilidade e acompanhamento."], ["Painel interno", "Centralize tarefas, indicadores e processos."], ["Portal do cliente", "Dê acesso a solicitações e informações em um só lugar."]],
    faqs: [["Preciso saber exatamente como o sistema será?", "Não. Primeiro conversamos sobre o problema e definimos as funções prioritárias."], ["Dá para começar pequeno?", "Sim. Uma primeira versão focada reduz complexidade e permite validar o uso antes de expandir."], ["O sistema pode integrar ferramentas existentes?", "Em muitos casos, sim. Avalio as APIs e limitações de cada ferramenta antes de fechar o escopo."]],
  },
  "automacao-de-processos": {
    name: "Automação de processos",
    title: "Automação de tarefas para sua empresa ganhar tempo",
    description: "Automatize atendimentos, avisos, cadastros e rotinas repetitivas. Soluções integradas para empresas brasileiras, com ou sem inteligência artificial.",
    keyword: "Automação de processos para empresas",
    intro: "Aquelas tarefas que sua equipe repete todos os dias podem consumir horas de trabalho. A automação ajuda a diminuir etapas manuais e evitar esquecimentos.",
    benefits: ["Mapeamento das tarefas repetitivas que fazem sentido automatizar", "Fluxos de atendimento e acompanhamento de pedidos", "Avisos e lembretes automáticos", "Integrações entre sistemas e planilhas", "Acompanhamento do que foi automatizado e seus resultados"],
    types: [["Atendimento", "Organize entradas de contatos, perguntas e encaminhamentos."], ["Rotinas administrativas", "Diminua trabalho manual de atualização e conferência."], ["Integrações", "Faça diferentes ferramentas compartilharem informações."]],
    faqs: [["Preciso de inteligência artificial para automatizar?", "Não. Muitas automações eficientes usam regras simples e integrações. A IA só entra quando faz sentido."], ["Funciona com WhatsApp?", "Depende do tipo de fluxo e das integrações oficiais disponíveis para sua operação. Avalio isso no diagnóstico."], ["É possível medir o tempo economizado?", "Sim, podemos definir indicadores antes de implementar a automação e comparar as etapas depois."]],
  },
} as const;

type ServiceSlug = keyof typeof services;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in services)) return {};
  const s = services[slug as ServiceSlug];
  return {
    title: s.name,
    description: s.description,
    alternates: { canonical: "/servicos/" + slug },
    openGraph: { title: s.title, description: s.description, url: "/servicos/" + slug, locale: "pt_BR", type: "website" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in services)) notFound();
  const s = services[slug as ServiceSlug];

  return <main className="service-detail">
    <section className="service-detail__hero">
      <div className="service-detail__shell">
        <nav aria-label="Caminho de navegação" className="service-detail__breadcrumb"><Link href="/">Início</Link><span>/</span><span>{s.name}</span></nav>
        <span className="service-detail__eyebrow">Code by Carlos · Soluções para negócios</span>
        <h1>{s.title}</h1>
        <p>{s.description}</p>
        <Link className="service-detail__cta" href="/#contato">Conversar sobre meu projeto <ArrowUpRight size={18} /></Link>
        <span className="service-detail__mini">Atendimento direto · Todo o Brasil · Orçamento sob medida</span>
      </div>
    </section>
    <section className="service-detail__section">
      <div className="service-detail__shell service-detail__columns">
        <div><span className="service-detail__eyebrow">Por que investir nisso</span><h2>Tecnologia que ajuda no dia a dia.</h2><p>{s.intro}</p></div>
        <ul className="service-detail__benefits">{s.benefits.map((item) => <li key={item}><Check size={20} /><span>{item}</span></li>)}</ul>
      </div>
    </section>
    <section className="service-detail__section service-detail__section--dark">
      <div className="service-detail__shell"><span className="service-detail__eyebrow">Possibilidades</span><h2>Exemplos do que podemos construir</h2><div className="service-detail__cards">{s.types.map(([title, desc], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></div>
    </section>
    <section className="service-detail__section">
      <div className="service-detail__shell"><span className="service-detail__eyebrow">Dúvidas frequentes</span><h2>Perguntas antes de começar</h2><div className="service-detail__faq">{s.faqs.map(([question, answer]) => <details key={question}><summary><CircleHelp size={18} />{question}</summary><p>{answer}</p></details>)}</div></div>
    </section>
    <section className="service-detail__final"><div className="service-detail__shell"><h2>Seu próximo projeto pode começar com uma conversa.</h2><p>Me conte o que você precisa. A gente define a melhor forma de começar.</p><Link className="service-detail__cta" href="/#contato">Pedir orçamento <ArrowUpRight size={18} /></Link><Link className="service-detail__back" href="/">← Ver mais trabalhos</Link></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service", name: s.keyword, description: s.description,
      serviceType: s.name, areaServed: { "@type": "Country", name: "Brasil" },
      provider: { "@type": "Organization", name: "Code by Carlos", url: "https://codebycarlos.dev" },
    }).replace(/</g, "\\u003c") }} />
  </main>;
}
