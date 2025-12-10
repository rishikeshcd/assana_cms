import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import assanaLogo from '../../assets/images/assanaLogo.png';
import { FaLongArrowAltLeft } from "react-icons/fa";

/**
 * CMSSidebar - Sidebar navigation for CMS
 */
const CMSSidebar = ({ onCollapseChange }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  const navItems = [
    { 
      category: 'Main Pages',
      items: [
        { path: '/home', label: 'Home', icon: '🏠' },
        { path: '/about', label: 'About', icon: '📄' },
        { path: '/product', label: 'Product', icon: '🛍️' },
      ]
    },
    { 
      category: 'Colorectal Clinic',
      items: [
        { path: '/colorectal-symptoms', label: 'Colorectal Symptoms', icon: '🔬' },
        { path: '/piles', label: 'Piles', icon: '📋' },
        { path: '/banding-piles', label: 'Banding Piles', icon: '📋' },
        { path: '/anal-fissure', label: 'Anal Fissure', icon: '🔍' },
        { path: '/anal-fistula', label: 'Anal Fistula', icon: '🏥' },
        { path: '/pelvic-floor', label: 'Pelvic Floor', icon: '🩺' },
        { path: '/colon-rectal-cancer', label: 'Colon Rectal Cancer', icon: '🩺' },
        { path: '/laser-surgery', label: 'Laser Surgery', icon: '⚡' },
        { path: '/anal-wound-care', label: 'Anal Wound Care', icon: '🩹' },
      ]
    },
    { 
      category: 'Gut Wellness',
      items: [
        { path: '/gut-brain-axis', label: 'Gut Brain Axis', icon: '🧠' },
        { path: '/colon-hydrotherapy', label: 'Colon Hydrotherapy', icon: '💧' },
        { path: '/assana-butt-check', label: 'Assana Butt Check', icon: '🔍' },
        { path: '/new-mom-program', label: 'New Mom Program', icon: '👶' },
        { path: '/menopause-program', label: 'Menopause Program', icon: '🌺' },
        { path: '/senior-citizens-programme', label: 'Senior Citizens Programme', icon: '👴' },
        // Add more gut wellness pages here
      ]
    },
    { 
      category: 'Settings',
      items: [
        { path: '/common', label: 'Common', icon: '🔗' },
      ]
    },
  ];

  const isActive = (path) => {
    if (path === '/home' && location.pathname === '/') {
      return true; // Home is also at root path
    }
    return location.pathname === path;
  };

  return (
    <aside className={`bg-white border-r border-gray-200 fixed left-0 top-0 h-screen z-50 transition-all duration-300 shadow-2xl ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="h-19 border-b border-gray-200 flex items-center justify-between px-4 py-5">
        {!isCollapsed && (
          <Link to="/home" className="flex flex-col flex-1 items-center justify-center  ">
            <img 
              src={assanaLogo} 
              alt="Assana Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-bold text-[#E64C4C]">CMS</span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/home" className="flex items-center justify-center">
            <img 
              src={assanaLogo} 
              alt="Assana Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>
        )}
        <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
            <div
                className={`transition-transform ease-in-out duration-900  ${
                isCollapsed ? "rotate-180" : "rotate-0"
                }`}
            >
                <FaLongArrowAltLeft />
            </div>
            </button>
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto h-[calc(100vh-8rem)] py-4 custom-scrollbar">
        {navItems.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            {!isCollapsed && (
              <div className="px-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>
            )}
            <div className="space-y-1">
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive(item.path)
                        ? 'bg-[#E64C4C] text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#E16C6C1A] hover:text-[#E64C4C]'
                    }
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
        <a
          href="http://localhost:5174"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center space-x-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200
            text-gray-700 hover:bg-gray-100 hover:text-blue-600
          `}
          title={isCollapsed ? 'View Site' : ''}
        >
          <span className="text-lg shrink-0">👁️</span>
          {!isCollapsed && <span>View Site</span>}
        </a>
      </div>
    </aside>
  );
};

export default CMSSidebar;

