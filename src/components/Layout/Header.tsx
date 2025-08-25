import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Logo } from '../Logo';

export const Header: React.FC = () => {
  return (
    <header className="bg-compete-dark border-b border-compete-indigo/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-compete-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search competitors, trends, or insights..."
              className="w-full bg-compete-indigo/30 border border-compete-indigo/40 rounded-lg pl-10 pr-4 py-2 text-compete-white placeholder-compete-gray focus:outline-none focus:ring-2 focus:ring-compete-purple focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-compete-gray hover:text-compete-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-compete-red rounded-full animate-pulse"></span>
          </button>
          
          <button className="p-2 text-compete-gray hover:text-compete-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="flex items-center space-x-2 bg-compete-indigo/30 border border-compete-indigo/40 rounded-lg px-3 py-2 text-compete-white hover:bg-compete-indigo/40 transition-colors">
            <User className="w-4 h-4" />
            <span className="text-sm">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};