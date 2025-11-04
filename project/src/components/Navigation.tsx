import React from 'react';
import { Home, Users, User, Trophy, Heart, Activity, MessageSquare } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'feed', label: 'Feed', icon: MessageSquare },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'players', label: 'Players', icon: User },
    { id: 'table', label: 'Table', icon: Trophy },
    { id: 'engagement', label: 'Fans', icon: Heart },
    { id: 'csr', label: 'Wellness', icon: Activity }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center p-1.5 rounded-lg transition-all duration-200 ${
              currentPage === id
                ? 'text-blue-600 bg-blue-50 scale-105'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};