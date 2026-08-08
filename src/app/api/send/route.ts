
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(4000),
});

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
})[character] ?? character);

export async function POST(request: Request) {
  try {
    const payload = contactSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: 'Invalid contact details.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'Contact service unavailable.' }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = payload.data;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
    const { data, error } = await resend.emails.send({
      from: 'CodeByCarlos <noreply@codebycarlos.dev>',
      to: ['lc.henriquee@gmail.com'],
      replyTo: email,
      subject: `Nova mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `<h1>Nova mensagem do portfólio</h1><p><strong>Nome:</strong> ${safeName}</p><p><strong>E-mail:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
    });

    if (error) {
      return Response.json({ error: 'Unable to send message.' }, { status: 502 });
    }

    return Response.json({ id: data?.id }, { status: 201 });
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
