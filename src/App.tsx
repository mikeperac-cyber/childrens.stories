import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import BookDetailPage from '@/pages/BookDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background font-body antialiased">
          <ScrollRestoration />
          <Header />
          <main id="main-content" className="pt-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'bg-card text-card-foreground border border-border',
              description: 'text-muted-foreground',
              actionButton: 'bg-primary text-primary-foreground',
              cancelButton: 'bg-muted text-muted-foreground',
            },
          }}
        />
      </BrowserRouter>
    </CartProvider>
  );
}

// Simple placeholder pages
function ContactPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">We'd love to hear from you! This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function FAQPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">FAQs</h1>
        <p className="text-muted-foreground mb-8">Frequently asked questions. This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function ShippingPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Shipping Information</h1>
        <p className="text-muted-foreground mb-8">Shipping details and policies. This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function ReturnsPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Returns & Exchanges</h1>
        <p className="text-muted-foreground mb-8">Return policy details. This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Privacy policy details. This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Terms of service details. This page is coming soon.</p>
        <a href="/" className="text-primary hover:underline">← Back Home</a>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen pt-16 py-16 px-4 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">Sorry, we couldn't find that page. The story must have wandered off...</p>
        <a href="/" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;