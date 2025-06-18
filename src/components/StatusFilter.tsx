import React from 'react';
import { Clock, CheckCircle, List } from 'lucide-react';

interface StatusFilterProps {
  activeStatus: 'all' | 'pending' | 'completed';
  onStatusChange: (status: 'all' | 'pending' | 'completed') => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ 
  activeStatus, 
  onStatusChange, 
  counts 
}) => {
  const filterOptions = [
    { key: 'all', label: 'All Orders', icon: List, count: counts.all },
    { key: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
    { key: 'completed', label: 'Completed', icon: CheckCircle, count: counts.completed }
  ] as const;

  return (
    <div className="flex space-x-2 mb-6">
      {filterOptions.map((option) => {
        const Icon = option.icon;
        const isActive = activeStatus === option.key;
        
        return (
          <button
            key={option.key}
            onClick={() => onStatusChange(option.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Icon size={18} />
            <span>{option.label}</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              isActive 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};