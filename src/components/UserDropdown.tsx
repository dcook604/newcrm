import  { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Settings, Shield, ChevronDown } from 'lucide-react';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-white hover:text-secondary focus:outline-none"
      >
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-1">
          <User className="h-5 w-5 text-white" />
        </div>
        <span className="hidden md:block">{currentUser.name}</span>
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 border-b">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
            </div>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" /> Profile Settings
            </Link>
            {currentUser.role === 'admin' && (
              <Link
                to="/user-management"
                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="mr-2 h-4 w-4" /> User Management
              </Link>
            )}
          </div>
          <div className="py-1 border-t">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex px-4 py-2 text-sm text-accent hover:bg-gray-100 w-full text-left"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 