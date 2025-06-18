import { Order } from '../types/Order';

export const mockOrders: Order[] = [
  {
    id: 'order-001',
    restaurantId: 'resto3',
    table: '4',
    items: [
      { itemId: '001', name: 'Truffle Pasta', quantity: 1, price: 28.99 },
      { itemId: '002', name: 'Margherita Pizza', quantity: 1, price: 22.50 },
      { itemId: '003', name: 'Grilled Salmon', quantity: 1, price: 32.00 }
    ],
    total: 83.49,
    status: 'pending',
    timestamp: '2025-01-08T12:30:00Z',
    customerName: 'Johnson Family'
  },
  {
    id: 'order-002',
    restaurantId: 'resto3',
    table: '7',
    items: [
      { itemId: '004', name: 'Grilled Salmon', quantity: 1, price: 24.99 },
      { itemId: '005', name: 'Garlic Bread', quantity: 1, price: 8.50 },
      { itemId: '006', name: 'House Wine', quantity: 1, price: 15.00 }
    ],
    total: 48.49,
    status: 'pending',
    timestamp: '2025-01-08T12:45:00Z',
    customerName: 'Sarah Mitchell'
  },
  {
    id: 'order-003',
    restaurantId: 'resto3',
    table: '12',
    items: [
      { itemId: '007', name: 'Beef Steak', quantity: 2, price: 32.99 },
      { itemId: '008', name: 'Mashed Potatoes', quantity: 2, price: 6.50 },
      { itemId: '009', name: 'Red Wine', quantity: 1, price: 22.00 }
    ],
    total: 100.98,
    status: 'pending',
    timestamp: '2025-01-08T13:00:00Z',
    customerName: 'David & Emma'
  },
  {
    id: 'order-004',
    restaurantId: 'resto3',
    table: '5',
    items: [
      { itemId: '010', name: 'Chicken Alfredo', quantity: 1, price: 19.99 },
      { itemId: '011', name: 'Garden Salad', quantity: 1, price: 9.50 }
    ],
    total: 29.49,
    status: 'completed',
    timestamp: '2025-01-08T11:30:00Z',
    customerName: 'Lisa Chen'
  },
  {
    id: 'order-005',
    restaurantId: 'resto3',
    table: '15',
    items: [
      { itemId: '012', name: 'Fish & Chips', quantity: 2, price: 16.99 },
      { itemId: '013', name: 'Onion Rings', quantity: 1, price: 7.50 },
      { itemId: '014', name: 'Beer', quantity: 2, price: 5.00 }
    ],
    total: 51.48,
    status: 'pending',
    timestamp: '2025-01-08T13:15:00Z',
    customerName: 'Mike & Tom'
  },
  {
    id: 'order-006',
    restaurantId: 'resto3',
    table: '2',
    items: [
      { itemId: '015', name: 'Vegetarian Pasta', quantity: 1, price: 17.50 },
      { itemId: '016', name: 'Bruschetta', quantity: 1, price: 8.99 },
      { itemId: '017', name: 'Sparkling Water', quantity: 2, price: 3.00 }
    ],
    total: 32.49,
    status: 'pending',
    timestamp: '2025-01-08T13:30:00Z',
    customerName: 'Anna Rodriguez'
  }
];