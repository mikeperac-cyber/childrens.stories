'use client';

import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, BookOpen, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import type { Book } from '@/types/book';

export function CartDrawer() {
  const { state, removeFromCart, updateQuantity, getSubtotal, closeCart } = useCart();
  const { items, isOpen } = state;

  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? (subtotal >= 75 ? 0 : 7.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  if (items.length === 0 && !isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md max-w-sm p-0" side="right">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="font-display text-xl">Your Cart</SheetTitle>
              <SheetDescription className="mt-1">
                {items.length} item{items.length !== 1 ? 's' : ''} • {formatPrice(subtotal)}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm mt-1">Add some magical stories to get started</p>
              <Button className="mt-6" onClick={closeCart} size="lg">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItem key={item.book.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="space-y-2 text-sm">
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
                <p className="text-xs text-muted-foreground text-center">
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

            <div className="flex flex-col gap-3 pt-2">
              <Button
                className="text-lg py-4"
                onClick={() => { closeCart(); window.location.href = '/checkout'; }}
              >
                Checkout
              </Button>
              <Button variant="outline" className="py-3" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
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
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { book: Book; quantity: number };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const { book, quantity } = item;
  const lineTotal = book.price * quantity;

  return (
    <div className="flex gap-3 p-3 bg-muted/30 rounded-xl">
      <Link
        to={`/book/${book.id}`}
        className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5"
        aria-label={`View ${book.title}`}
      >
        {book.coverImage ? (
          <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="w-6 h-6 text-primary/30 mx-auto my-auto" />
        )}
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link to={`/book/${book.id}`} className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors">
            {book.title}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">by {book.author}</p>
          <p className="font-semibold text-primary mt-1">{`$${lineTotal.toFixed(2)}`}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-background rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0"
              onClick={() => onUpdateQuantity(book.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0"
              onClick={() => onUpdateQuantity(book.id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
            onClick={() => onRemove(book.id)}
            aria-label={`Remove ${book.title} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}