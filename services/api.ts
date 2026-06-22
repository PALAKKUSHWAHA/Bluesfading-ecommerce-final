import { Product, User, Order, Review, Coupon } from '@/types';

// Placeholder base API URL - Can be swapped with local FastAPI or Node.js server URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Generic request handler
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`API Request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // --- Auth / User Endpoint Preparation ---
  async loginUser(credentials: { email: string; password?: string }): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signupUser(userData: { username: string; email: string; password?: string }): Promise<User> {
    return this.request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // --- Products Endpoints ---
  async getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
    let query = '';
    if (params) {
      const queryParts = [];
      if (params.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
      if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (queryParts.length > 0) query = `?${queryParts.join('&')}`;
    }
    return this.request<Product[]>(`/products${query}`);
  }

  async getProductById(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // --- Orders Endpoints ---
  async createOrder(orderData: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrderById(id: string): Promise<Order> {
    return this.request<Order>(`/orders/${id}`);
  }

  async getUserOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders/my-orders');
  }

  // --- Reviews Endpoints ---
  async getReviewsForProduct(productId: string): Promise<Review[]> {
    return this.request<Review[]>(`/products/${productId}/reviews`);
  }

  async submitReview(productId: string, review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    return this.request<Review>(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  }

  // --- Coupons Endpoints ---
  async validateCoupon(code: string): Promise<Coupon> {
    return this.request<Coupon>(`/coupons/validate?code=${encodeURIComponent(code)}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
