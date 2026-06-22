import { ImageSourcePropType } from 'react-native';

export type CategoryId =
  | 'wall-posters'
  | 'canvas-paintings'
  | 'dreamcatchers'
  | 'wall-hangings'
  | 'souvenirs'
  | 'decorative-accessories';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  /** Current selling price (after any discount) */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage, e.g. 50 for 50% off */
  discountPercent?: number;
  /** Featured in Highlights of the Day section */
  isHighlight?: boolean;
  rating: number;
  imageUrl: string;
  /** Local bundled image (takes priority over imageUrl) */
  imageLocal?: ImageSourcePropType;
  images?: string[];
  featured: boolean;
  trending: boolean;
  isNew?: boolean;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

/** Resolve the image source for a product */
export function getProductImageSource(product: Product) {
  if (product.imageLocal) return product.imageLocal;
  return { uri: product.imageUrl };
}

export function getDisplayPrice(product: Product) {
  return product.price;
}

export function hasDiscount(product: Product) {
  return (
    product.discountPercent != null &&
    product.discountPercent > 0 &&
    product.originalPrice != null
  );
}

export interface User {
  username: string;
  email: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minAmount?: number;
}

export interface OrderAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: string;
  address: OrderAddress;
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  date: string;
}

