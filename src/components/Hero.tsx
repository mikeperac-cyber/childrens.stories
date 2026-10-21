'use client';

import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const stats = [
    { icon: BookOpen, value: '500+', label: 'Magical Titles' },
    { icon: Heart, value: '50k+', label: 'Happy Readers' },
    { icon: Award, value: '98%', label: 'Joy Rating' },
    { icon: Sparkles, value: '200+', label: 'Award Winners' },
  ];

  return (
    <section
      className={cn(
        'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
        'bg-gradient-to-b from-background via-background to-muted/30',
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-30 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-accent/15 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        {/* Sparkle particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-bounce-in">
              <Sparkles className="w-4 h-4 animate-wiggle" />
              <span>New Spring Collection Now Available</span>
            </div>

            <h1
              id="hero-heading"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              Magical Stories That{' '}
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                Grow With Your Child
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Discover hand-curated children's books that spark imagination, build confidence,
              and create cherished bedtime memories. Every story chosen with love.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button
                size="lg"
                className="gap-2 text-lg px-8 py-4 bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/shop">Explore Books</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-4 border-2 border-border hover:border-primary/50 hover:bg-primary/5"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-lg text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main book showcase */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Large floating book */}
                <div className="relative w-72 h-96 sm:w-80 sm:h-[32rem] transform rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-400/20 blur-xl" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary to-orange-400 shadow-2xl overflow-hidden">
                    {/* Book cover design */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-primary-foreground">
                      <div className="text-center">
                        <BookOpen className="w-24 h-24 mx-auto mb-6 opacity-90" />
                        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-2">Your Next</h2>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl">Adventure Awaits</h2>
                        <p className="mt-4 text-lg opacity-90 max-w-xs mx-auto">
                          Open a world of wonder with every page turn
                        </p>
                      </div>
                    </div>

                    {/* Book spine decoration */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-b from-primary/90 to-orange-500/90" />

                    {/* Page edges */}
                    <div className="absolute right-0 top-4 bottom-4 w-1 bg-white/20" />
                    <div className="absolute right-1 top-5 bottom-5 w-1 bg-white/15" />
                    <div className="absolute right-2 top-6 bottom-6 w-1 bg-white/10" />
                  </div>
                </div>

                {/* Floating mini books around */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="absolute w-20 h-28 rounded-lg shadow-lg transition-all duration-500 hover:scale-110 hover:z-10"
                    style={{
                      transform: `rotate(${i * 15 - 30}deg) translate(${i % 2 === 0 ? '-' : ''}80px, ${i < 3 ? '-' : ''}60px)`,
                      background: `linear-gradient(135deg, hsl(${30 + i * 40} 70% 60%), hsl(${50 + i * 40} 70% 55%))`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
                      <BookOpen className="w-6 h-6 opacity-80" />
                    </div>
                  </div>
                ))}

                {/* Sparkle accents */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-yellow-300/80 animate-float"
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${15 + i * 8}%`,
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: `${2.5 + i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}