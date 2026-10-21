'use client';

import { useState, useMemo, useEffect } from 'react';
import { Filter, X, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BookCard } from '@/components/BookCard';
import { cn } from '@/lib/utils';
import { books, categories, ageRanges } from '@/data/books';

const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'title', label: 'Title A-Z' },
];

const priceRanges = [
  { value: '0-10', label: 'Under $10' },
  { value: '10-20', label: '$10 - $20' },
  { value: '20-30', label: '$20 - $30' },
  { value: '30-50', label: '$30 - $50' },
  { value: '50+', label: '$50+' },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Get URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) {
      setSelectedCategories([params.get('category')!]);
    }
    if (params.get('sort')) {
      setSortBy(params.get('sort')!);
    }
    if (params.get('view')) {
      setViewMode(params.get('view')! as 'grid' | 'list');
    }
  }, []);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(book => selectedCategories.includes(book.category));
    }

    // Age range filter
    if (selectedAgeRanges.length > 0) {
      result = result.filter(book => selectedAgeRanges.includes(book.ageRange));
    }

    // Price filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(book => {
        if (max) return book.price >= min && book.price <= max;
        return book.price >= min;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
    });

    return result;
  }, [searchQuery, selectedCategories, selectedAgeRanges, priceRange, sortBy]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedAgeRanges.length > 0 || priceRange !== '';

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAgeRanges([]);
    setPriceRange('');
    setSearchQuery('');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
    );
  };

  const toggleAgeRange = (range: string) => {
    setSelectedAgeRanges(prev => prev.includes(range)
      ? prev.filter(r => r !== range)
      : [...prev, range]
    );
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <header className="bg-gradient-to-b from-muted/50 to-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
              Discover Magical Stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our curated collection of children's books. Filter by age, category, or price to find the perfect story.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={cn(
            'lg:w-64 flex-shrink-0',
            filtersOpen ? 'block' : 'hidden lg:block'
          )}>
            <div className="sticky top-24 space-y-6">
              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                className="lg:hidden w-full gap-2"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {selectedCategories.length + selectedAgeRanges.length + (priceRange ? 1 : 0)}
                  </span>
                )}
              </Button>

              {/* Search */}
              <div>
                <Label className="block text-sm font-medium mb-2">Search</Label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Categories</Label>
                  {selectedCategories.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="text-xs p-0 h-auto">
                      Clear
                    </Button>
                  )}
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm text-foreground">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Age Ranges */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Age Range</Label>
                  {selectedAgeRanges.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAgeRanges([])} className="text-xs p-0 h-auto">
                      Clear
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {ageRanges.map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedAgeRanges.includes(range)}
                        onCheckedChange={() => toggleAgeRange(range)}
                      />
                      <span className="text-sm text-foreground">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Price Range */}
              <div>
                <Label className="block text-sm font-medium mb-3">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Price</SelectItem>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearAllFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-sm text-muted-foreground">
                {filteredBooks.length === 0 ? 'No books found' : filteredBooks.length === 1 ? '1 book found' : `${filteredBooks.length} books found`}
                {searchQuery && <span className="ml-2">for &ldquo;{searchQuery}&rdquo;</span>}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="hidden sm:block">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile Sort */}
                <select
                  className="sm:hidden border border-border rounded-lg px-3 py-2 text-sm bg-background"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(selectedCategories.length > 0 || selectedAgeRanges.length > 0 || priceRange) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {cat}
                    <button onClick={() => toggleCategory(cat)} className="ml-1 hover:text-primary/70" aria-label={`Remove ${cat} filter`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedAgeRanges.map(range => (
                  <span key={range} className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                    {range}
                    <button onClick={() => toggleAgeRange(range)} className="ml-1 hover:text-accent-foreground/70" aria-label={`Remove ${range} filter`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {priceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    {priceRanges.find(r => r.value === priceRange)?.label}
                    <button onClick={() => setPriceRange('')} className="ml-1 hover:text-foreground" aria-label="Remove price filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  'gap-6',
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'flex flex-col'
                )}
                role="list"
                aria-label="Book results"
              >
                {filteredBooks.map((book, index) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                    className="animate-slide-up"
                    style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
                  />
                ))}
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredBooks.length > 12 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Overlay */}
      {filtersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
    </div>
  );
}