import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageCircle, Search, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">VIT Connect</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities, posts, or people..."
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{currentUser?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}