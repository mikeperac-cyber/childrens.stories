'use client';

import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, BookOpen, ArrowLeft, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const { items } = state;

  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? (subtotal >= 75 ? 0 : 7.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any magical stories yet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.book.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}

            {/* Promo Code */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <Button variant="outline">Apply</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Have a gift card? <a href="#" className="text-primary hover:underline">Apply it here</a></p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
              <h2 className="font-display text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={cn('font-medium', shipping === 0 && 'text-green-600')}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && subtotal < 75 && (
                  <p className="text-xs text-primary text-center bg-primary/5 rounded-lg p-2">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                className="w-full text-lg py-4"
                onClick={() => window.location.href = '/checkout'}
                disabled={items.length === 0}
              >
                Proceed to Checkout
                <Sparkles className="w-4 h-4" />
              </Button>

              <Button variant="outline" className="w-full py-3" onClick={clearCart}>
                Clear Cart
              </Button>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free shipping over $75</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Easy returns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 text-center">
              <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { book: { id: string; title: string; author: string; coverImage?: string; price: number }; quantity: number };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const { book, quantity } = item;
  const lineTotal = book.price * quantity;

  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors">
      <Link
        to={`/book/${book.id}`}
        className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5"
      >
        {book.coverImage ? (
          <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="w-8 h-8 text-primary/30 mx-auto my-auto" />
        )}
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link to={`/book/${book.id}`} className="font-medium line-clamp-1 hover:text-primary transition-colors">
            {book.title}
          </Link>
          <p className="text-sm text-muted-foreground mt-0.5">by {book.author}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(book.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(book.id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg">{`$${lineTotal.toFixed(2)}`}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(book.id)}
              aria-label={`Remove ${book.title}`}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}