'use client';

import { Shield, Truck, RotateCcw, Heart, Sparkles, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Heart,
    title: 'Curated with Love',
    description: 'Every book in our collection is hand-selected by parents and educators who understand what makes a story truly magical for children.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'We partner only with trusted publishers and award-winning authors to ensure every book meets our high standards for storytelling and durability.',
  },
  {
    icon: Sparkles,
    title: 'Diverse Stories',
    description: 'Our shelves celebrate all children with inclusive characters, cultures, and experiences that help every child see themselves in stories.',
  },
  {
    icon: Truck,
    title: 'Fast & Free Shipping',
    description: 'Orders over $75 ship free. Most orders arrive in 2-5 business days with eco-friendly packaging that\'s as thoughtful as our books.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Not quite right? Return within 30 days for a full refund or exchange. We want you and your little reader to be completely delighted.',
  },
  {
    icon: Gift,
    title: 'Gift-Ready Options',
    description: 'Beautiful gift wrapping, personalized bookplates, and gift cards make sharing the magic of reading effortless for any occasion.',
  },
];

const stats = [
  { value: '50,000+', label: 'Families Served' },
  { value: '500+', label: 'Curated Titles' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '98%', label: 'Would Recommend' },
];

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  return (
    <section className={cn('py-16 sm:py-24', className)} aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Families Choose StorySprout
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're more than a bookstore—we're your partner in raising readers
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={cn(
                'group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300',
                'hover:-translate-y-1'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}