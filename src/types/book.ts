export interface Book {
  id: string;
  title: string;
  author: string;
  illustrator?: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  galleryImages: string[];
  price: number;
  originalPrice?: number;
  ageRange: string;
  pageCount: number;
  dimensions: string;
  isbn: string;
  publishDate: string;
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}