export type CuisineType = 'Italian' | 'Asian';

export type DietaryType = 'veg' | 'non-veg';

export type FilterCategory = 'All' | 'Italian' | 'Asian' | 'Vegetarian' | 'Non-Vegetarian' | 'Popular' | 'Favorites';

export interface FoodCustomization {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: CuisineType;
  dietary: DietaryType;
  price: number;
  rating: number;
  ratingCount: number;
  deliveryTime: string; // e.g. "20-25 mins"
  description: string;
  image: string;
  isPopular?: boolean;
  calories?: string;
  spicyLevel?: number; // 0 to 3
  ingredients?: string[];
  chefNote?: string;
  customizations?: FoodCustomization[];
}

export interface CartItem extends FoodItem {
  quantity: number;
  selectedAddons?: FoodCustomization[];
}

export interface PromoCode {
  code: string;
  description: string;
  discountPercentage: number;
  maxDiscount: number;
  minOrderAmount: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: 'Cash on Delivery' | 'Online Payment (Demo)';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  gst: number;
  discount: number;
  totalAmount: number;
  orderTime: string;
  estimatedDelivery: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  image?: string;
}

