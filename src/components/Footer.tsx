'use client';

import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Truck, Shield, RotateCcw, Share2, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Books', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?sort=new' },
      { name: 'Best Sellers', href: '/shop?sort=popular' },
      { name: 'Categories', href: '/shop?view=categories' },
      { name: 'Gift Cards', href: '/gift-cards' },
    ],
    help: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Track Order', href: '/track-order' },
    ],
    company: [
      { name: 'Our Story', href: '/about' },
      { name: 'Authors & Illustrators', href: '/creators' },
      { name: 'Wholesale', href: '/wholesale' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { name: 'Share', icon: Share2, href: '#' },
    { name: 'Global', icon: Globe, href: '#' },
    { name: 'Community', icon: Heart, href: '#' },
    { name: 'Magic', icon: Sparkles, href: '#' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="StorySprout Home">
              <div className="relative p-2 bg-gradient-to-br from-primary to-orange-400 rounded-xl">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-display font-bold text-2xl">StorySprout</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Growing little imaginations one story at a time. Hand-curated children's books that spark wonder, courage, and joy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop links">
            <h3 className="font-display font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help */}
          <nav aria-label="Help links">
            <h3 className="font-display font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company links">
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter & Benefits */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Newsletter */}
            <div className="md:col-span-1">
              <h3 className="font-display font-semibold text-lg mb-2">Stay Magical</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get new book alerts, reading tips, and exclusive offers delivered to your inbox.
              </p>
              <form className="flex flex-col gap-2 max-w-xs" onSubmit={(e) => e.preventDefault()}>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                    aria-label="Email address"
                    required
                  />
                  <Button type="submit" size="sm" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">No spam, unsubscribe anytime.</p>
              </form>
            </div>

            {/* Benefits */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
                { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
                { icon: RotateCcw, title: 'Easy Returns', desc: '30-day guarantee' },
                { icon: Sparkles, title: 'Curated Quality', desc: 'Hand-picked stories' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{title}</h4>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} StorySprout. All rights reserved. Made with wonder for little readers everywhere.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <span className="text-xs">🇺🇸</span>
              <span>USD</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>EN</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}