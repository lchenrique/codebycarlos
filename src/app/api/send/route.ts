
import ContactEmail from '@/components/templates/email';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();
    const { name , email, message, date} = body;
    try {
        const { data, error } = await resend.emails.send({
          from: 'CodeByCarlos <noreply@codebycarlos.dev>',
          to: ['lc.henriquee@gmail.com'],
          subject: 'Nova mensagem de contato do portfólio',
          react: ContactEmail({  name , email, message }),
        });
    
        if (error) {
          return Response.json({ error }, { status: 500 });
        }
    
        return Response.json(data);
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
}