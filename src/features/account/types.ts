export interface Address {
  id: string;
  title: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: "visa" | "mastercard" | "shaparak";
  last4: string;
  expiry: string;
  holder: string;
  isDefault: boolean;
}

export type NotificationCategory = "order" | "promo" | "system" | "wishlist";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  category: NotificationCategory;
  createdAt: string;
  read: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  initials: string;
  memberSince: string;
  loyaltyTier: string;
}
