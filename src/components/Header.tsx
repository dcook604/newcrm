import  { Building, User, Users, Menu, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdown';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Building className="w-5 h-5" /> },
    { path: '/units', label: 'Units', icon: <Building className="w-5 h-5" /> },
    { path: '/owners', label: 'Owners', icon: <User className="w-5 h-5" /> },
    { path: '/tenants', label: 'Tenants', icon: <Users className="w-5 h-5" /> },
    { path: '/import', label: 'Import', icon: <Upload className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Building className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold">Strata Manager</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 py-2 ${
                      isActive(item.path) ? 'text-secondary' : 'hover:text-secondary/80'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="flex items-center">
                <UserDropdown />
                
                {/* Mobile Menu Button */}
                <button className="md:hidden ml-4" onClick={toggleMenu}>
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
              
              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 z-50 bg-primary md:hidden pb-4 px-4 shadow-lg">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 py-3 ${
                        isActive(item.path) ? 'text-secondary' : 'hover:text-secondary/80'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white hover:text-secondary">
                Login
              </Link>
              <Link to="/register" className="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary-hover">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
 