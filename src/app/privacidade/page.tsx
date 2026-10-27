import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyChoice } from "@/components/privacy-choice";
export const metadata: Metadata = { title: "Privacidade", alternates: { canonical: "/privacidade" }, description: "Como o Code by Carlos trata estatísticas de navegação e cliques nos canais de contato." };
export default function PrivacyPage() {
  return <main className="privacy-page" style={{ minHeight: "100vh", maxWidth: 900, margin: "0 auto", padding: "140px 24px 80px", lineHeight: 1.8 }}>
    <Link href="/" style={{ textDecoration: "underline" }}>← Voltar ao site</Link>
    <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 700, marginTop: 30 }}>Privacidade e estatísticas</h1>
    <p>O Code by Carlos usa estatísticas próprias para entender quais páginas recebem visitas e quais botões despertam interesse. O objetivo é melhorar a experiência e responder melhor a possíveis clientes.</p>
    <h2 style={{ fontSize: 24, marginTop: 26 }}>Quais informações são coletadas?</h2>
    <p>Registramos visualizações de página, origem da visita (quando disponível), informações de campanha UTM, tipo de dispositivo, país e cidade aproximados e cliques em botões de contato. A identificação de visitantes é estimada por um identificador aleatório salvo neste navegador e registrado no servidor somente na forma de hash. Não armazenamos endereços IP, nem acompanhamos o que você digita.</p>
    <p>Os registros são excluídos automaticamente após até 180 dias, salvo configuração de retenção menor. A localização é uma estimativa obtida do IP durante a requisição, sem guardar esse IP. Navegadores com sinal de não rastrear (DNT) são respeitados.</p>
    <h2 style={{ fontSize: 24, marginTop: 26 }}>Escolha sobre estatísticas</h2>
    <PrivacyChoice />
    <h2 style={{ fontSize: 24, marginTop: 26 }}>Contato pelo WhatsApp</h2>
    <p>Ao selecionar o botão de WhatsApp, você é direcionado ao aplicativo do WhatsApp, sujeito às práticas de privacidade desse serviço. O site registra apenas o clique no botão, não o conteúdo da conversa. Você também pode solicitar informações ou exercer seus direitos de privacidade pelo e-mail <a href="mailto:carlos@codebycarlos.dev" style={{ textDecoration: "underline" }}>carlos@codebycarlos.dev</a>.</p>
    <small>Atualizado em outubro de 2026.</small>
  </main>;
}
