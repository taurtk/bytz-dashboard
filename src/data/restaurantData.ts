import { Restaurant } from '../types/Restaurant';

// Mock restaurant database - in a real app, this would be stored in a backend
export const mockRestaurants: Restaurant[] = [
  {
    id: 'resto001',
    retailerId: 'resto001',
    name: 'Bella Vista Restaurant',
    email: 'bella@restaurant.com',
    secretCode: 'BELLA2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto002',
    retailerId: 'resto002',
    name: 'Golden Dragon Chinese',
    email: 'dragon@restaurant.com',
    secretCode: 'DRAGON2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto003',
    retailerId: 'resto003',
    name: 'The Rustic Table',
    email: 'rustic@restaurant.com',
    secretCode: 'RUSTIC2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto004',
    retailerId: 'resto004',
    name: 'Ocean Breeze Seafood',
    email: 'ocean@restaurant.com',
    secretCode: 'OCEAN2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto005',
    retailerId: 'resto005',
    name: 'Mountain View Bistro',
    email: 'mountain@restaurant.com',
    secretCode: 'MOUNTAIN2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto006',
    retailerId: 'resto006',
    name: 'Urban Kitchen & Bar',
    email: 'urban@restaurant.com',
    secretCode: 'URBAN2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto007',
    retailerId: 'resto007',
    name: 'Mama Mia Italian',
    email: 'mamamia@restaurant.com',
    secretCode: 'MAMAMIA2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto008',
    retailerId: 'resto008',
    name: 'Spice Garden Indian',
    email: 'spice@restaurant.com',
    secretCode: 'SPICE2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto009',
    retailerId: 'resto009',
    name: 'Le Petit Café',
    email: 'lepetit@restaurant.com',
    secretCode: 'LEPETIT2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'resto010',
    retailerId: 'resto010',
    name: 'Smokehouse BBQ',
    email: 'smokehouse@restaurant.com',
    secretCode: 'SMOKE2024',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  }
];

// Demo credentials for easy testing (simplified for active accounts)
export const demoCredentials = {
  email: 'demo@restaurant.com',
  password: 'password123'
};

// Available retailer options for signup
export const availableRetailers = [
  { id: 'resto001', name: 'Bella Vista Restaurant' },
  { id: 'resto002', name: 'Golden Dragon Chinese' },
  { id: 'resto003', name: 'The Rustic Table' },
  { id: 'resto004', name: 'Ocean Breeze Seafood' },
  { id: 'resto005', name: 'Mountain View Bistro' },
  { id: 'resto006', name: 'Urban Kitchen & Bar' },
  { id: 'resto007', name: 'Mama Mia Italian' },
  { id: 'resto008', name: 'Spice Garden Indian' },
  { id: 'resto009', name: 'Le Petit Café' },
  { id: 'resto010', name: 'Smokehouse BBQ' }
];