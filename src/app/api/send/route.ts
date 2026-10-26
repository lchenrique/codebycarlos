
import { Resend } from 'resend';
import { z } from 'zod';
import { sameOrigin } from '@/lib/admin-auth';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(),
});

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
})[character] ?? character);

const submissionRate = new Map<string, { at: number; count: number }>();

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) return Response.json({ error: 'Origem inválida.' }, { status: 403 });
    const payload = contactSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: 'Invalid contact details.' }, { status: 400 });
    }

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    const previous = submissionRate.get(ip);
    if (previous && now - previous.at < 900000 && previous.count >= 3) {
      return Response.json({ error: "Muitas tentativas. Tente mais tarde." }, { status: 429 });
    }
    if (previous && now - previous.at < 900000) previous.count++;
    else submissionRate.set(ip, { at: now, count: 1 });
    if (submissionRate.size > 2000) for (const [key, value] of submissionRate) if (now - value.at > 900000) submissionRate.delete(key);
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
      to: ['carlos@codebycarlos.dev'],
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
