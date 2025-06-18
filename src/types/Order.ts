export interface OrderItem {
  itemId: string;
  itemName?: string; // Keep for backward compatibility
  name?: string; // New field from backend
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  table: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed';
  timestamp: string;
  customerName?: string;
  createdAt?: string; // Add this line for backend compatibility
}