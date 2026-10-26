import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyChoice } from "@/components/privacy-choice";
export const metadata: Metadata = { title: "Privacidade", alternates: { canonical: "/privacidade" }, description: "Como o Code by Carlos trata dados enviados no contato e informações anônimas de navegação." };
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
    <h2 style={{ fontSize: 24, marginTop: 26 }}>Formulário de contato</h2>
    <p>Quando você envia uma mensagem, usamos seu nome, e-mail e conteúdo exclusivamente para responder ao pedido e avaliar uma eventual proposta. O envio é processado pelo serviço de e-mail Resend; não usamos esses dados nas estatísticas de navegação.</p>
    <p>Para pedir informações, corrigir ou excluir uma mensagem enviada, escreva para <a href="mailto:carlos@codebycarlos.dev" style={{ textDecoration: "underline" }}>carlos@codebycarlos.dev</a>.</p>
    <small>Atualizado em outubro de 2026.</small>
  </main>;
}
