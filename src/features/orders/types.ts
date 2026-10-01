export type OrderStatus =
  "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type PaymentStatus = "paid" | "unpaid" | "refunded";

export interface OrderItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
  estimatedDelivery?: string;
}

export interface TimelineStep {
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
}
