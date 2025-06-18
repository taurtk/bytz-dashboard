import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Store, Mail, Lock, ChevronDown, ArrowRight, Key, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { signup as apiSignup } from '../services/apiAuth';
import { getRestaurants } from '../services/apiRestaurant';

interface SignupPageProps {
  onBack: () => void;
  onSignupSuccess: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onBack, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    retailerId: '',
    secretCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [retailers, setRetailers] = useState<{ retailerId: string; name: string }[]>([]);

  useEffect(() => {
    getRestaurants()
      .then(data => {
        // Assuming each restaurant has retailerId and name
        setRetailers(data.map((r: any) => ({ retailerId: r.id, name: r.name })));
      })
      .catch(() => setRetailers([]));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (signupError) {
      setSignupError('');
    }
  };

  const handleRetailerSelect = (retailerId: string) => {
    setFormData(prev => ({ ...prev, retailerId }));
    setIsDropdownOpen(false);
    // Clear error when user selects
    if (errors.retailerId) {
      setErrors(prev => ({ ...prev, retailerId: '' }));
    }
    if (signupError) {
      setSignupError('');
    }
  };

  const getSelectedRetailerName = () => {
    const selected = retailers.find(option => option.retailerId === formData.retailerId);
    console.log('Selected Retailer:', selected);
    return selected ? selected.name : 'Select your restaurant';

  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Retailer ID validation
    if (!formData.retailerId) {
      newErrors.retailerId = 'Please select your restaurant';
    }

    // Secret code validation
    if (!formData.secretCode) {
      newErrors.secretCode = 'Secret code is required';
    } else if (formData.secretCode.length < 6) {
      newErrors.secretCode = 'Secret code must be at least 6 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setSignupError('');
    try {
      await apiSignup({
        email: formData.email,
        password: formData.password,
        retailerId: formData.retailerId,
        secretCode: formData.secretCode,
      });
      console.log('Signup successful');
      setSignupSuccess(true);
      setTimeout(() => {
        onSignupSuccess();
      }, 3000);
    } catch (error: any) {
      setSignupError(error.message || 'Sign-up failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Your restaurant account has been activated. You can now sign in with just your email and password.
            </p>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-6">
              <p className="text-sm text-green-800">
                <strong>Next time:</strong> Simply use your email and password to sign in. 
                No need for retailer ID or secret code anymore!
              </p>
            </div>
            <button
              onClick={() => {
                setSignupSuccess(false);
                onSignupSuccess();
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Continue to Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Set up your restaurant dashboard</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h3 className="text-sm font-semibold text-amber-800 mb-1">One-time Setup</h3>
            <p className="text-xs text-amber-700">
              You'll need your retailer ID and secret code for initial setup. 
              After activation, you'll only need email and password to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Signup Error */}
            {signupError && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{signupError}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Restaurant Retailer ID Dropdown */}
            <div>
              <label htmlFor="retailerId" className="block text-sm font-semibold text-gray-700 mb-2">
                Restaurant <span className="text-xs text-gray-500">(one-time setup)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.retailerId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${formData.retailerId ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  {getSelectedRetailerName()}
                </button>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </div>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                    {retailers.map((option) => (
                      <button
                        key={option.retailerId}
                        type="button"
                        onClick={() => handleRetailerSelect(option.retailerId)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="font-medium text-gray-900">{option.name}</div>
                        <div className="text-sm text-gray-500">ID: {option.retailerId}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.retailerId && (
                <p className="mt-1 text-sm text-red-600">{errors.retailerId}</p>
              )}
            </div>

            {/* Secret Code Field */}
            <div>
              <label htmlFor="secretCode" className="block text-sm font-semibold text-gray-700 mb-2">
                Secret Code <span className="text-xs text-gray-500">(one-time setup)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="secretCode"
                  name="secretCode"
                  value={formData.secretCode}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.secretCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your secret code"
                />
              </div>
              {errors.secretCode && (
                <p className="mt-1 text-sm text-red-600">{errors.secretCode}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button 
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            After account activation, you'll only need email and password to sign in
          </p>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};