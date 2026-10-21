'use client';

import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Moon, TreePine, Castle, Heart, Rocket, Bug, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'picture-books',
    name: 'Picture Books',
    description: 'Beautiful illustrations for little dreamers',
    icon: BookOpen,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    count: '120+',
  },
  {
    id: 'bedtime',
    name: 'Bedtime Stories',
    description: 'Gentle tales for sweet dreams',
    icon: Moon,
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50',
    count: '85+',
  },
  {
    id: 'nature',
    name: 'Animals & Nature',
    description: 'Explore the wild world',
    icon: TreePine,
    color: 'from-emerald-400 to-green-600',
    bgColor: 'from-emerald-50 to-green-50',
    count: '95+',
  },
  {
    id: 'fantasy',
    name: 'Fairy Tales & Fantasy',
    description: 'Magic kingdoms and brave heroes',
    icon: Castle,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50',
    count: '70+',
  },
  {
    id: 'early-readers',
    name: 'Early Readers',
    description: 'First steps into reading alone',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'from-rose-50 to-pink-50',
    count: '110+',
  },
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Epic journeys await',
    icon: Rocket,
    color: 'from-sky-400 to-blue-500',
    bgColor: 'from-sky-50 to-blue-50',
    count: '65+',
  },
  {
    id: 'bugs',
    name: 'Bugs & Insects',
    description: 'Tiny creatures, big discoveries',
    icon: Bug,
    color: 'from-lime-400 to-green-500',
    bgColor: 'from-lime-50 to-green-50',
    count: '40+',
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    description: 'Fun facts and new skills',
    icon: GraduationCap,
    color: 'from-violet-400 to-purple-500',
    bgColor: 'from-violet-50 to-purple-50',
    count: '80+',
  },
];

interface CategoriesProps {
  className?: string;
}

export function Categories({ className }: CategoriesProps) {
  return (
    <section className={cn('py-16 sm:py-24 bg-gradient-to-b from-transparent via-muted/20 to-transparent', className)} aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Explore by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect story for every age, interest, and reading level
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className={cn(
                'relative group p-6 rounded-2xl overflow-hidden transition-all duration-300',
                'bg-gradient-to-br',
                category.bgColor,
                'border border-border hover:border-primary/30',
                'hover:shadow-xl hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: category.color }}
              />

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
                  'bg-gradient-to-br',
                  category.color,
                  'group-hover:scale-110'
                )}>
                  <category.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {category.description}
                </p>

                <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span>{category.count} books</span>
                  <Sparkles className="w-3 h-3 animate-wiggle" />
                </div>
              </div>

              {/* Hover shine effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop?view=categories">
            <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View All Categories
              <Sparkles className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}