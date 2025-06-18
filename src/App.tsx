import React, { useState, useMemo, useEffect } from 'react';
import { ListRestart as Restaurant, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Order } from './types/Order';
import { OrderCard } from './components/OrderCard';
import { StatusFilter } from './components/StatusFilter';
import { StatsCard } from './components/StatsCard';
import { SigninPage } from './components/SigninPage';
import { authService } from './services/authService';
import { getOrdersByRestaurant } from './services/apiOrders';
import { markOrderCompleted } from './services/apiOrdersComplete';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeStatus, setActiveStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [currentRestaurant, setCurrentRestaurant] = useState<any>(null);

  // Check for existing session on app load
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentRestaurant(user);
      setIsSignedIn(true);
      loadOrdersFromApi(user.retailerId);
    }
  }, []);

  const loadOrdersFromApi = async (restaurantId: string) => {
    try {
      const apiOrders = await getOrdersByRestaurant(restaurantId);
      setOrders(apiOrders);
    } catch (err) {
      setOrders([]);
    }
  };

  const handleSigninSuccess = () => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentRestaurant(user);
      setIsSignedIn(true);
      loadOrdersFromApi(user.retailerId); // Always use retailerId for API
    }
  };

  const handleSignOut = () => {
    authService.signOut();
    setIsSignedIn(false);
    setCurrentRestaurant(null);
    setOrders([]);
  };

  const handleMarkCompleted = async (orderId: string) => {
    if (!currentRestaurant) return;
    try {
      await markOrderCompleted(orderId);
      // Refresh orders from API after marking as completed
      loadOrdersFromApi(currentRestaurant.retailerId);
    } catch (err) {
      // Optionally show error to user
    }
  };

  const filteredOrders = useMemo(() => {
    if (activeStatus === 'all') return orders;
    return orders.filter(order => order.status === activeStatus);
  }, [orders, activeStatus]);

  const stats = useMemo(() => {
    // Use IST for 'today' calculation
    const todayIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const isTodayIST = (dateStr?: string) => {
      if (!dateStr) return false;
      const d = new Date(new Date(dateStr).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      return d.getFullYear() === todayIST.getFullYear() &&
        d.getMonth() === todayIST.getMonth() &&
        d.getDate() === todayIST.getDate();
    };
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const completedOrders = orders.filter(order => order.status === 'completed');
    // Only count today's completed orders for revenue and avg order value (in IST)
    const todaysCompleted = completedOrders.filter(order => isTodayIST(order.createdAt || order.timestamp));
    const totalRevenue = todaysCompleted.reduce((sum, order) => sum + order.total, 0);
    return {
      counts: {
        all: orders.length,
        pending: pendingOrders.length,
        completed: completedOrders.length
      },
      revenue: totalRevenue,
      avgOrderValue: todaysCompleted.length > 0 ? totalRevenue / todaysCompleted.length : 0
    };
  }, [orders]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Poll for latest orders every 10 seconds while signed in
  useEffect(() => {
    if (!isSignedIn || !currentRestaurant) return;
    const interval = setInterval(() => {
      loadOrdersFromApi(currentRestaurant.retailerId);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [isSignedIn, currentRestaurant]);

  // Show sign-in page if not signed in
  if (!isSignedIn) {
    return <SigninPage onSigninSuccess={handleSigninSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Restaurant className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {currentRestaurant?.name || 'Restaurant Orders'}
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your table orders efficiently
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Orders"
            value={stats.counts.all}
            icon={TrendingUp}
            color="bg-blue-500"
            description="All time orders"
          />
          <StatsCard
            title="Pending Orders"
            value={stats.counts.pending}
            icon={Clock}
            color="bg-orange-500"
            description="Awaiting completion"
          />
          <StatsCard
            title="Today's Revenue"
            value={formatCurrency(stats.revenue)}
            icon={DollarSign}
            color="bg-green-500"
            description="From completed orders"
          />
          <StatsCard
            title="Avg Order Value"
            value={formatCurrency(stats.avgOrderValue)}
            icon={DollarSign}
            color="bg-purple-500"
            description="Per completed order"
          />
        </div>

        {/* Status Filter */}
        <StatusFilter
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          counts={stats.counts}
        />

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-md mx-auto">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 text-sm">
                {activeStatus === 'pending' 
                  ? 'All orders have been completed!' 
                  : activeStatus === 'completed'
                  ? 'No completed orders yet.'
                  : 'No orders to display.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onMarkCompleted={handleMarkCompleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;