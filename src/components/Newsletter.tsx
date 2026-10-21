'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you'd call your API here
    // const response = await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });

    setStatus('success');
    setMessage('Thanks for joining! Check your inbox for a welcome surprise 📚');
    setEmail('');
    toast.success('Welcome to StorySprout!', { description: 'Check your inbox for a special welcome offer.' });

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" aria-labelledby="newsletter-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Floating decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent/15 blur-2xl animate-float" style={{ animationDelay: '1s' }} aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Join the StorySprout Family</span>
        </div>

        <h2 id="newsletter-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Get Magical Stories Delivered
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Subscribe for new book alerts, exclusive offers, reading tips, and a{' '}
          <span className="font-medium text-primary">15% off your first order</span>
          .
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 py-4 text-lg pr-4"
                disabled={status === 'loading' || status === 'success'}
                required
                aria-label="Email address"
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="whitespace-nowrap px-8 py-4 text-lg gap-2 bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90 shadow-lg"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {message && (
            <p className={cn('mt-4 text-sm', status === 'success' ? 'text-green-600' : 'text-destructive')} role="status">
              {message}
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>
            {'.'} No spam, unsubscribe anytime.
          </p>
        </form>

        {/* Benefits */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Weekly book recommendations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Exclusive subscriber discounts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Reading guides & activities</span>
          </div>
        </div>
      </div>
    </section>
  );
}