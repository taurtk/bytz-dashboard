import React from 'react';
import { Clock, CheckCircle, User, DollarSign } from 'lucide-react';
import { Order } from '../types/Order';

interface OrderCardProps {
  order: Order;
  onMarkCompleted: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onMarkCompleted }) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Helper function to get item name (supports both backend formats)
  const getItemName = (item: any) => {
    return item.name || item.itemName || 'Unknown Item';
  };

  // Helper to format date (for createdAt or timestamp)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // If date is invalid, return empty string
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper to format date and time together in IST
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    }) + ' ' + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 transition-all duration-300 hover:shadow-lg ${
      order.status === 'completed' 
        ? 'border-l-green-500 bg-green-50' 
        : 'border-l-orange-500 hover:scale-[1.01]'
    }`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              order.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
            }`}></div>
            <h3 className="text-lg font-bold text-gray-800">Table {order.table}</h3>
            {order.customerName && (
              <span className="text-sm text-gray-600">• {order.customerName}</span>
            )}
            {/* Show createdAt date if present */}
            {order.createdAt && formatDateTime(order.createdAt) && (
              <span className="text-xs text-gray-500 ml-2">{formatDateTime(order.createdAt)}</span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Clock size={14} />
            {/* Only show time if valid */}
            {order.timestamp && (() => { const t = formatTime(order.timestamp); return t !== 'Invalid Date' ? <span>{t}</span> : null; })()}
          </div>
        </div>

        {/* Order Items - Condensed */}
        <div className="space-y-1 mb-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700 truncate flex-1">
                {item.quantity}x {getItemName(item)}
              </span>
              <span className="font-medium text-gray-800 ml-2">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Total and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <DollarSign size={16} className="text-green-600" />
            <span className="text-lg font-bold text-gray-800">
              {formatCurrency(order.total)}
            </span>
          </div>
          
          {order.status === 'pending' ? (
            <button
              onClick={() => onMarkCompleted(order.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center space-x-1 text-sm font-medium"
            >
              <CheckCircle size={14} />
              <span>Complete</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <CheckCircle size={14} />
              <span>Done</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};