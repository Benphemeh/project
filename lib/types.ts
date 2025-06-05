export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'pigs' | 'pork' | 'foodstuff' | 'drinks';
  inStock: boolean;
  [key: string]: any; // For additional category-specific properties
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  title: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type PaymentMethod =
  | 'card'
  | 'bank_transfer'
  | 'cash_on_delivery'
  | 'paystack'
  | 'flutterwave';