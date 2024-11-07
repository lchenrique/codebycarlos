'use client';

import { useState } from 'react';
import { SectionHeading } from '../section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MailIcon, MessageSquareIcon, UserIcon, SendIcon } from 'lucide-react';
import ContactEmail from '../templates/email';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const date = new Date();
    // send via api
    const  data = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, date }),
    })

  if (!data.ok) {
      toast({
        title: 'Error sending message',
        description: 'There was an error sending your message. Please try again later.',
      });
      setIsSubmitting(false);
      return;
    }
    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });

    setIsSubmitting(false);
    // (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-40 gradient-bg">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind? Let's talk about it."
        />
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6 bg-card p-8 rounded-xl shadow-2xl animate-slide-up"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <div className="relative group">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                name="name"
                placeholder="Your name"
                required
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative group">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <div className="relative group">
              <MessageSquareIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Textarea
                name="message"
                placeholder="Your message"
                required
                className="min-h-[120px] pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full group transition-all duration-300 hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <SendIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}