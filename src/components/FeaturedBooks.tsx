'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from './BookCard';
import { cn } from '@/lib/utils';
import type { Book } from '@/types/book';

interface FeaturedBooksProps {
  books: Book[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function FeaturedBooks({
  books,
  title = 'Featured Stories',
  subtitle = 'Hand-picked favorites that children and parents love',
  showViewAll = true,
  viewAllHref = '/shop',
}: FeaturedBooksProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 10;
  const canScrollRight = scrollRef.current
    ? scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : false;

  if (books.length === 0) {
    return (
      <section className="py-16 sm:py-24" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="featured-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">No books yet</h3>
            <p className="text-muted-foreground mb-6">Add your books to the data/books.ts file to see them here</p>
            <Button variant="outline" asChild>
              <a href="/admin">Manage Books</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="featured-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>
          {showViewAll && (
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1" asChild>
              <a href={viewAllHref}>View All <ChevronRight className="w-4 h-4" /></a>
            </Button>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            role="region"
            aria-label="Featured books carousel"
          >
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                variant="featured"
                className="snap-start snap-always"
              />
            ))}

            {/* View all card at end */}
            {showViewAll && books.length > 0 && (
              <a
                href={viewAllHref}
                className="snap-start snap-always w-72 sm:w-80 flex-shrink-0 group"
              >
                <article className="relative h-full bg-muted/30 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">View All Books</h3>
                  <p className="text-sm text-muted-foreground mb-4">Discover our complete collection</p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Explore
                  </Button>
                </article>
              </a>
            )}
          </div>

          {/* Scroll buttons */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 rounded-full shadow-lg',
              'bg-background border-border hover:bg-primary/10 hover:border-primary/50',
              !canScrollLeft && 'opacity-0 pointer-events-none'
            )}
            onClick={scrollLeft}
            aria-label="Scroll left"
            aria-disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 rounded-full shadow-lg',
              'bg-background border-border hover:bg-primary/10 hover:border-primary/50',
              !canScrollRight && 'opacity-0 pointer-events-none'
            )}
            onClick={scrollRight}
            aria-label="Scroll right"
            aria-disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile view all button */}
        {showViewAll && (
          <div className="text-center mt-6 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <a href={viewAllHref}>View All Books <ChevronRight className="w-4 h-4 ml-1" /></a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}