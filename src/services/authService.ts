import { Restaurant, RestaurantCredentials, SignupCredentials } from '../types/Restaurant';
import { mockRestaurants, demoCredentials } from '../data/restaurantData';
import { localStorageService } from './localStorageService';

export interface AuthResult {
  success: boolean;
  restaurant?: Restaurant;
  error?: string;
}

export const authService = {
  async signIn(credentials: RestaurantCredentials): Promise<AuthResult> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check demo credentials first (simplified)
      if (
        credentials.email === demoCredentials.email &&
        credentials.password === demoCredentials.password
      ) {
        const demoRestaurant: Restaurant = {
          id: 'demo-resto',
          retailerId: 'resto003',
          name: 'Demo Restaurant',
          email: demoCredentials.email,
          secretCode: 'DEMO2024',
          createdAt: new Date().toISOString(),
          isActive: true
        };

        localStorageService.setCurrentUser(demoRestaurant);
        localStorageService.initializeSampleData(demoRestaurant.id);

        return {
          success: true,
          restaurant: demoRestaurant
        };
      }

      // Check against active restaurant accounts (only email needed for active accounts)
      const restaurant = mockRestaurants.find(r => 
        r.email === credentials.email && r.isActive
      );

      if (!restaurant) {
        return {
          success: false,
          error: 'Invalid email or account not found. Please check your credentials.'
        };
      }

      // For demo purposes, accept any password that's at least 6 characters
      if (credentials.password.length < 6) {
        return {
          success: false,
          error: 'Invalid password.'
        };
      }

      // Store user session
      localStorageService.setCurrentUser(restaurant);
      localStorageService.initializeSampleData(restaurant.id);

      return {
        success: true,
        restaurant
      };

    } catch (error) {
      console.error('Sign-in error:', error);
      return {
        success: false,
        error: 'An error occurred during sign-in. Please try again.'
      };
    }
  },

  async signUp(credentials: SignupCredentials): Promise<AuthResult> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists
      const existingRestaurant = mockRestaurants.find(r => r.email === credentials.email);
      if (existingRestaurant) {
        return {
          success: false,
          error: 'An account with this email already exists.'
        };
      }

      // Validate retailer ID and secret code combination
      const validRetailer = mockRestaurants.find(r => 
        r.retailerId === credentials.retailerId && 
        r.secretCode === credentials.secretCode &&
        !r.isActive // Only allow signup for inactive accounts
      );

      if (!validRetailer) {
        return {
          success: false,
          error: 'Invalid retailer ID and secret code combination, or account already active.'
        };
      }

      // Create new active restaurant account
      const newRestaurant: Restaurant = {
        ...validRetailer,
        email: credentials.email,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      // In a real app, this would save to backend
      // For demo, we'll just simulate success
      console.log('New restaurant account created:', newRestaurant);

      return {
        success: true,
        restaurant: newRestaurant
      };

    } catch (error) {
      console.error('Sign-up error:', error);
      return {
        success: false,
        error: 'An error occurred during sign-up. Please try again.'
      };
    }
  },

  getCurrentUser(): Restaurant | null {
    return localStorageService.getCurrentUser();
  },

  signOut(): void {
    localStorageService.clearCurrentUser();
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};