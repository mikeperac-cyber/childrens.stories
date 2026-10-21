import { Hero } from '@/components/Hero';
import { FeaturedBooks } from '@/components/FeaturedBooks';
import { Categories } from '@/components/Categories';
import { Features } from '@/components/Features';
import { Newsletter } from '@/components/Newsletter';
import { books } from '@/data/books';

export default function HomePage() {
  const featuredBooks = books.filter(book => book.featured).slice(0, 8);

  return (
    <div className="min-h-screen">
      <Hero />
      {featuredBooks.length > 0 && (
        <FeaturedBooks books={featuredBooks} />
      )}
      <Categories />
      <Features />
      <Newsletter />
    </div>
  );
}