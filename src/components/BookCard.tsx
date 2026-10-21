'use client';

import { Link } from 'react-router-dom';
import { BookOpen, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
  style?: React.CSSProperties;
}

export function BookCard({ book, variant = 'default', className, style }: BookCardProps) {
  const isOutOfStock = !book.inStock;

  const baseStyles = {
    default: 'group flex flex-col h-full',
    featured: 'group flex flex-col h-full w-72 sm:w-80 flex-shrink-0',
    compact: 'group flex flex-col h-full',
  };

  const imageStyles = {
    default: 'aspect-[3/4]',
    featured: 'aspect-[3/4]',
    compact: 'aspect-[3/4] w-24 flex-shrink-0',
  };

  return (
    <article
      className={cn(
        'relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border',
        'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        baseStyles[variant],
        className
      )}
      style={style}
    >
      <Link
        to={`/book/${book.id}`}
        className="block relative overflow-hidden"
        aria-label={`View ${book.title} by ${book.author}`}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5',
            imageStyles[variant]
          )}
          aria-hidden="true"
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <BookOpen className="w-12 h-12 text-primary/30" aria-hidden="true" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {book.featured && (
              <Badge className="bg-primary/90 text-primary-foreground animate-bounce-in" variant="default">
                Featured
              </Badge>
            )}
            {isOutOfStock && (
              <Badge className="bg-destructive/90 text-destructive-foreground" variant="default">
                Out of Stock
              </Badge>
            )}
            {book.originalPrice && book.originalPrice > book.price && (
              <Badge className="bg-accent text-accent-foreground" variant="default">
                Sale
              </Badge>
            )}
          </div>

          {/* Quick add to cart on hover for featured */}
          {variant === 'featured' && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <Button
                className="w-full bg-primary/95 backdrop-blur-sm hover:bg-primary shadow-lg"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                disabled={isOutOfStock}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col p-4', variant === 'compact' && 'p-3')}>
        {/* Category */}
        <Badge variant="secondary" className="mb-2 w-fit text-xs">
          {book.category}
        </Badge>

        <Link to={`/book/${book.id}`} className="group">
          <h3
            className={cn(
              'font-display font-semibold text-foreground line-clamp-2 transition-colors group-hover:text-primary',
              variant === 'featured' && 'text-lg',
              variant === 'compact' && 'text-sm',
              variant === 'default' && 'text-base'
            )}
          >
            {book.title}
          </h3>
        </Link>

        <p className={cn('text-muted-foreground mt-1', variant === 'compact' && 'text-xs', variant !== 'compact' && 'text-sm')}>
          by {book.author}
          {book.illustrator && <span> • illustrated by {book.illustrator}</span>}
        </p>

        <div className="flex items-center gap-2 mt-2 mb-auto">
          <div className="flex items-center gap-0.5" aria-label={`Rating: ${book.rating} out of 5 stars`}>
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs">({book.reviewCount})</span>
          </div>

          <Tag className="w-3.5 h-3.5 text-muted-foreground/50 ml-auto shrink-0" aria-hidden="true" />
          <span className="text-muted-foreground text-xs shrink-0">{book.ageRange}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-primary">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {variant !== 'compact' && (
            <Button
              size="sm"
              className="gap-1"
              disabled={isOutOfStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}