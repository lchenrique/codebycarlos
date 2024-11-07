import React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ContactEmailProps {
  name?: string;
  email?: string;
  message?: string;
  date?: Date;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const ContactEmail = ({
  name = "Visitante",
  email = "visitante@exemplo.com",
  message = "Nenhuma mensagem fornecida.",
  date = new Date(),
}: ContactEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  return (
    <Html>
      <Head />
      <Preview>Nova mensagem de contato do portfólio</Preview>
      <Tailwind>
        <Body className="bg-slate-50 font-sans">
          <Container className="mx-auto">
            <Section className="mt-[32px] rounded-lg overflow-hidden p-3">
              <Container className="bg-white mt-5">
                <Row className="px-[24px] py-[32px]">
                  <Column className="px-12">
                    <Heading className="text-2xl font-bold text-center text-gray-800 mb-[24px]">Olá,</Heading>
                    <Heading className="text-xl font-semibold text-center text-gray-700 mb-[32px]">
                      Você recebeu uma nova mensagem de contato do seu portfólio.
                    </Heading>

                    <Text className="text-base text-gray-700 mb-[16px]">
                      <span className="font-semibold">Nome: </span>
                      {name}
                    </Text>
                    <Text className="text-base text-gray-700 mb-[16px]">
                      <span className="font-semibold">E-mail: </span>
                      {email}
                    </Text>
                    <Text className="text-base text-gray-700 mb-[16px]">
                      <span className="font-semibold">Data: </span>
                      {formattedDate}
                    </Text>
                    <Text className="text-base text-gray-700 mb-[24px]">
                      <span className="font-semibold">Mensagem: </span>
                      {message}
                    </Text>

                    <Text className="text-base text-gray-700 mb-[32px] text-center mt-12">
                      Por favor, responda assim que possível.
                    </Text>
                  </Column>
                </Row>
              </Container>

              <Row>
                <Column align="center" className="pt-4">
                  <Button
                    className="box-border w-full rounded-[8px] bg-gray-900 px-[12px] py-[12px] text-center font-semibold text-white"
                    href="https://resend.com/emails"
                  >
                    Ver todos as Mensagens
                  </Button>
                </Column>
              </Row>
            </Section>

            <Text className="text-center text-gray-500 text-xs mt-[32px]">
              © 2023 | Seu Nome, Sua Cidade, Seu País | www.seuportfolio.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactEmail.PreviewProps = {
  userFirstName: "João",
  userEmail: "joao@exemplo.com",
  message: "Olá, gostaria de discutir um projeto. Podemos marcar uma call?",
  date: new Date("June 23, 2023, 15:30"),
} as ContactEmailProps;

export default ContactEmail;
