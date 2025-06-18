import { Order } from '../types/Order';
import { Restaurant } from '../types/Restaurant';

const STORAGE_KEYS = {
  ORDERS: 'restaurant_orders',
  CURRENT_USER: 'current_restaurant_user',
  RESTAURANTS: 'restaurants_data'
};

export const localStorageService = {
  // Order management
  getOrders(restaurantId: string): Order[] {
    try {
      const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '{}');
      return allOrders[restaurantId] || [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },

  saveOrders(restaurantId: string, orders: Order[]): void {
    try {
      const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '{}');
      allOrders[restaurantId] = orders;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(allOrders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  },

  addOrder(restaurantId: string, order: Order): void {
    const orders = this.getOrders(restaurantId);
    orders.push(order);
    this.saveOrders(restaurantId, orders);
  },

  updateOrder(restaurantId: string, orderId: string, updates: Partial<Order>): void {
    const orders = this.getOrders(restaurantId);
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates };
      this.saveOrders(restaurantId, orders);
    }
  },

  deleteOrder(restaurantId: string, orderId: string): void {
    const orders = this.getOrders(restaurantId);
    const filteredOrders = orders.filter(order => order.id !== orderId);
    this.saveOrders(restaurantId, filteredOrders);
  },

  // User session management
  getCurrentUser(): Restaurant | null {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  setCurrentUser(restaurant: Restaurant): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(restaurant));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  },

  clearCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Initialize sample data for demo
  initializeSampleData(restaurantId: string): void {
    const existingOrders = this.getOrders(restaurantId);
    
    // Only initialize if no orders exist
    if (existingOrders.length === 0) {
      const sampleOrders: Order[] = [
        {
          id: 'order-001',
          restaurantId: restaurantId,
          table: '4',
          items: [
            { itemId: '001', name: 'Truffle Pasta', quantity: 1, price: 28.99 },
            { itemId: '002', name: 'Margherita Pizza', quantity: 1, price: 22.50 }
          ],
          total: 51.49,
          status: 'pending',
          timestamp: new Date().toISOString(),
          customerName: 'Johnson Family'
        },
        {
          id: 'order-002',
          restaurantId: restaurantId,
          table: '7',
          items: [
            { itemId: '004', name: 'Grilled Salmon', quantity: 1, price: 24.99 },
            { itemId: '005', name: 'Garlic Bread', quantity: 1, price: 8.50 }
          ],
          total: 33.49,
          status: 'pending',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          customerName: 'Sarah Mitchell'
        },
        {
          id: 'order-003',
          restaurantId: restaurantId,
          table: '12',
          items: [
            { itemId: '007', name: 'Beef Steak', quantity: 2, price: 32.99 }
          ],
          total: 65.98,
          status: 'completed',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          customerName: 'David & Emma'
        }
      ];
      
      this.saveOrders(restaurantId, sampleOrders);
    }
  },

  // Clear all data (for testing)
  clearAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.RESTAURANTS);
  }
};