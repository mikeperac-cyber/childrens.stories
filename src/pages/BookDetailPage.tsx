'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Heart, Share2, Truck, Shield, RotateCcw, BookOpen, Award, Eye, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';
import { toast } from 'sonner';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const book = books.find(b => b.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // If book not found, redirect to shop
  useEffect(() => {
    if (!book) {
      window.location.href = '/shop';
    }
  }, [book]);

  if (!book) return null;

  const allImages = [book.coverImage, ...book.galleryImages].filter(Boolean);

  const handleAddToCart = () => {
    if (!book.inStock) return;
    addToCart(book);
    setAddedToCart(true);
    toast.success(`${book.title} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const relatedBooks = books
    .filter(b => b.id !== book.id && (b.category === book.category || b.tags.some(t => book.tags.includes(t))))
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <nav className="bg-muted/30 border-b border-border py-4" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ChevronRight className="w-4 h-4" />
              <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <ChevronRight className="w-4 h-4" />
              <Link to={`/shop?category=${book.category}`} className="hover:text-foreground transition-colors">{book.category}</Link>
            </li>
            <li className="flex items-center gap-2 text-foreground font-medium truncate max-w-[200px]">
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              {book.title}
            </li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
              {allImages[selectedImage] ? (
                <img
                  src={allImages[selectedImage]}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-primary/30" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                {book.featured && (
                  <Badge className="bg-primary/90 text-primary-foreground">Featured</Badge>
                )}
                {!book.inStock && (
                  <Badge className="bg-destructive/90 text-destructive-foreground">Out of Stock</Badge>
                )}
                {book.originalPrice && book.originalPrice > book.price && (
                  <Badge className="bg-accent text-accent-foreground">Sale</Badge>
                )}
              </div>

              {/* Navigation arrows for gallery */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2" role="list" aria-label="Book images">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden border-2 transition-all',
                      index === selectedImage
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent hover:border-primary/30'
                    )}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === selectedImage ? 'true' : 'false'}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary">{book.category}</Badge>
                <Badge variant="outline">{book.ageRange}</Badge>
                {book.featured && <Badge>Featured</Badge>}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">{book.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  by <span className="font-medium text-foreground">{book.author}</span>
                </span>
                {book.illustrator && (
                  <span className="flex items-center gap-1">
                    illustrated by <span className="font-medium text-foreground">{book.illustrator}</span>
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{book.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({book.reviewCount} reviews)</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-4 pb-6 border-b border-border">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-3xl text-primary">{formatPrice(book.price)}</span>
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                )}
              </div>
              {book.inStock && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 ml-auto">
                  In Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">{book.description}</p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Pages</span>
                <span className="font-medium">{book.pageCount}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Dimensions</span>
                <span className="font-medium">{book.dimensions}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">ISBN</span>
                <span className="font-medium text-sm">{book.isbn}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Published</span>
                <span className="font-medium">{new Date(book.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={99}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-border bg-transparent focus:outline-none"
                    aria-label="Quantity"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 text-lg py-4 bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90 shadow-lg"
                onClick={handleAddToCart}
                disabled={!book.inStock}
              >
                {addedToCart ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 text-lg py-3"
              >
                <Heart className="w-5 h-5" />
                <span>Add to Wishlist</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
                { icon: Truck, label: 'Free Shipping', desc: 'Over $75' },
                { icon: Shield, label: 'Secure Checkout', desc: '100% Safe' },
                { icon: RotateCcw, label: 'Easy Returns', desc: '30 Days' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({book.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6 prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>

              <h3 className="font-display font-semibold text-lg mt-8 mb-4">What Makes This Book Special</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3"><BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> Beautifully illustrated pages that captivate young readers</li>
                <li className="flex items-start gap-3"><Award className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> Award-winning storytelling that builds confidence</li>
                <li className="flex items-start gap-3"><Heart className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> Perfect for bedtime reading and family bonding</li>
                <li className="flex items-start gap-3"><Eye className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> Age-appropriate vocabulary that grows with your child</li>
              </ul>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Author</dt>
                  <dd className="font-medium">{book.author}</dd>
                </div>
                {book.illustrator && (
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <dt className="text-muted-foreground mb-1">Illustrator</dt>
                    <dd className="font-medium">{book.illustrator}</dd>
                  </div>
                )}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Category</dt>
                  <dd className="font-medium">{book.category}</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Recommended Age</dt>
                  <dd className="font-medium">{book.ageRange}</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Page Count</dt>
                  <dd className="font-medium">{book.pageCount} pages</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Dimensions</dt>
                  <dd className="font-medium">{book.dimensions}</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">ISBN</dt>
                  <dd className="font-medium">{book.isbn}</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Publication Date</dt>
                  <dd className="font-medium">{new Date(book.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</dd>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <dt className="text-muted-foreground mb-1">Tags</dt>
                  <dd className="font-medium">{book.tags.join(', ')}</dd>
                </div>
              </dl>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400 fill-yellow-400" />
                <h3 className="font-display text-xl font-semibold mb-2">Reviews Coming Soon</h3>
                <p className="text-muted-foreground">Customer reviews will appear here once you add books to your collection.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} variant="default" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}