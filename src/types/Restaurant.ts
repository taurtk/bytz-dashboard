export interface Restaurant {
  id: string;
  retailerId: string;
  name: string;
  email: string;
  secretCode: string;
  createdAt: string;
  isActive: boolean; // New field to track account status
}

export interface RestaurantCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  retailerId: string;
  secretCode: string;
  password: string;
  confirmPassword: string;
}