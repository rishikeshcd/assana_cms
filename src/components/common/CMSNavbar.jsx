import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * CMSNavbar - Navigation bar for CMS to switch between different pages
 */
const CMSNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '📄' },
    { path: '/anal-fistula', label: 'Anal Fistula', icon: '🏥' },
    { path: '/pelvic-floor', label: 'Pelvic Floor', icon: '🩺' },
    { path: '/piles', label: 'Piles', icon: '📋' },
    { path: '/product', label: 'Product', icon: '🛍️' },
    { path: '/common', label: 'Common', icon: '🔗' },
    // Add more pages here as they are created
  ];

  const isActive = (path) => {
    if (path === '/home' && location.pathname === '/') {
      return true; // Home is also at root path
    }
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">CMS</span>
              <span className="text-sm text-gray-500">Content Management</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  flex items-center space-x-2
                  ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }
                `}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* View Public Site Link */}
          <div className="flex items-center">
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg hover:border-blue-600"
            >
              👁️ View Site
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CMSNavbar;

