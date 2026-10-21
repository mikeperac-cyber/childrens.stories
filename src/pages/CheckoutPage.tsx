'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Shield, RotateCcw, CreditCard, Check, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 7.99, time: '5-7 business days', freeThreshold: 75 },
  { id: 'express', name: 'Express Shipping', price: 14.99, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, time: 'Next business day' },
];

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
  saveInfo: boolean;
  marketing: boolean;
};

export default function CheckoutPage() {
  const { state, getSubtotal, clearCart } = useCart();
  const { items } = state;

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber] = useState(`SS-${Date.now().toString().slice(-8)}`);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    saveInfo: false,
    marketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const selectedShipping = shippingOptions.find(s => s.id === formData.shippingMethod);
  const shipping = selectedShipping ? (subtotal >= (selectedShipping.freeThreshold || 0) ? 0 : selectedShipping.price) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  // Prevent checkout with empty cart
  useEffect(() => {
    if (items.length === 0 && !orderConfirmed) {
      window.location.href = '/cart';
    }
  }, [items.length, orderConfirmed]);

  if (orderConfirmed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">Thank you for your order. A confirmation email has been sent.</p>
          <div className="p-4 bg-muted/30 rounded-xl mb-6">
            <p className="font-medium">Order Number: <span className="font-mono text-primary">{orderNumber}</span></p>
            <p className="text-sm text-muted-foreground mt-1">Total: {formatPrice(total)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/account/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (currentStep === 3) {
      if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
      else if (formData.cardNumber.replace(/\s/g, '').length < 15) newErrors.cardNumber = 'Invalid card number';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and show confirmation
    clearCart();
    setOrderConfirmed(true);
    setIsProcessing(false);
    toast.success('Order placed successfully!', { description: `Your order ${orderNumber} has been confirmed.` });
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const steps = [
    { number: 1, label: 'Contact', icon: null },
    { number: 2, label: 'Shipping', icon: Truck },
    { number: 3, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8 hidden md:flex">
          <div className="flex items-center">
            {steps.map((stepInfo, index) => (
              <React.Fragment key={stepInfo.number}>
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                      stepInfo.number < step
                        ? 'bg-primary text-primary-foreground'
                        : stepInfo.number === step
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {stepInfo.number < step ? <Check className="w-5 h-5" /> : stepInfo.number}
                  </div>
                  <span className={cn('ml-2 hidden sm:block font-medium', stepInfo.number <= step ? 'text-foreground' : 'text-muted-foreground')}>
                    {stepInfo.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-16 h-0.5 mx-2',
                      stepInfo.number < step ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile step indicator */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between">
            {steps.map((stepInfo) => (
              <div key={stepInfo.number} className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all mb-1',
                    stepInfo.number < step
                      ? 'bg-primary text-primary-foreground'
                      : stepInfo.number === step
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {stepInfo.number < step ? <Check className="w-5 h-5" /> : stepInfo.number}
                </div>
                <span className={cn('text-xs font-medium', stepInfo.number <= step ? 'text-foreground' : 'text-muted-foreground')}>
                  {stepInfo.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Steps */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Contact */}
              {step === 1 && (
                <fieldset className="space-y-6">
                  <legend className="font-display text-xl font-semibold">Contact Information</legend>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={cn(errors.email && 'border-destructive')}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={cn(errors.phone && 'border-destructive')}
                        placeholder="(555) 000-0000"
                        required
                        autoComplete="tel"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={cn(errors.firstName && 'border-destructive')}
                        required
                        autoComplete="given-name"
                      />
                      {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={cn(errors.lastName && 'border-destructive')}
                        required
                        autoComplete="family-name"
                      />
                      {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketing}
                      onCheckedChange={(checked) => handleInputChange('marketing', checked)}
                    />
                    <Label htmlFor="marketing" className="text-sm text-muted-foreground">
                      Keep me updated with new books and special offers
                    </Label>
                  </div>
                </fieldset>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <fieldset className="space-y-6">
                  <legend className="font-display text-xl font-semibold">Shipping Address</legend>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={cn(errors.address && 'border-destructive')}
                        placeholder="123 Main Street"
                        required
                        autoComplete="street-address"
                      />
                      {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment, Suite, etc.</Label>
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        placeholder="Apt 4B"
                        autoComplete="address-line2"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={cn(errors.city && 'border-destructive')}
                        required
                        autoComplete="address-level2"
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={cn(errors.state && 'border-destructive')}
                        placeholder="CA"
                        required
                        autoComplete="address-level1"
                      />
                      {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={cn(errors.zipCode && 'border-destructive')}
                        placeholder="90210"
                        required
                        autoComplete="postal-code"
                      />
                      {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                      autoComplete="country"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <legend className="font-display text-lg font-semibold mb-4">Shipping Method</legend>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                            formData.shippingMethod === option.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          )}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={option.id}
                            checked={formData.shippingMethod === option.id}
                            onChange={() => handleInputChange('shippingMethod', option.id)}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-muted-foreground">{option.time}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {subtotal >= (option.freeThreshold || 0) ? 'Free' : formatPrice(option.price)}
                            </div>
                            {subtotal >= (option.freeThreshold || 0) && (
                              <div className="text-xs text-green-600">Free shipping applied!</div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => handleInputChange('saveInfo', checked)}
                    />
                    <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
                      Save this information for next time
                    </Label>
                  </div>
                </fieldset>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <fieldset className="space-y-6">
                  <legend className="font-display text-xl font-semibold">Payment</legend>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className={cn(errors.cardName && 'border-destructive')}
                        placeholder="John Doe"
                        required
                        autoComplete="cc-name"
                      />
                      {errors.cardName && <p className="text-sm text-destructive mt-1">{errors.cardName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                        className={cn(errors.cardNumber && 'border-destructive')}
                        placeholder="1234 5678 9012 3456"
                        required
                        autoComplete="cc-number"
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input
                          id="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            handleInputChange('cardExpiry', val);
                          }}
                          className={cn(errors.cardExpiry && 'border-destructive')}
                          placeholder="MM/YY"
                          required
                          autoComplete="cc-exp"
                          maxLength={5}
                        />
                        {errors.cardExpiry && <p className="text-sm text-destructive mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cardCvc">CVC *</Label>
                        <Input
                          id="cardCvc"
                          type="password"
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value.replace(/\D/g, ''))}
                          className={cn(errors.cardCvc && 'border-destructive')}
                          placeholder="123"
                          required
                          autoComplete="cc-csc"
                          maxLength={4}
                        />
                        {errors.cardCvc && <p className="text-sm text-destructive mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                </fieldset>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="gap-2"
                >
                  {step === 3 ? (
                    isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <Sparkles className="w-4 h-4" />
                      </>
                    )
                  ) : (
                    <>
                      Continue
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
                <h2 className="font-display text-lg font-semibold">Order Summary</h2>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.book.id} className="flex gap-3">
                      <Link
                        to={`/book/${item.book.id}`}
                        className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5"
                      >
                        {item.book.coverImage ? (
                          <img src={item.book.coverImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-primary/30 mx-auto my-auto" />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/book/${item.book.id}`} className="text-sm font-medium line-clamp-1 hover:text-primary">
                          {item.book.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium">{formatPrice(item.book.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}