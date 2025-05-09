import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useAuthStore from '../Store/AuthStore';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'View Admin Dashboard', path: '/admin' },
    { name: 'Bouldering', path: '/bouldering' },
  ];

  return (
    <nav className="bg-white/20 backdrop-blur-lg sticky top-0 z-50 shadow-lg border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
            aria-label="Go to home"
          >
            Nexus
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-base font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                      isActive ? 'text-blue-700 border-b-2 border-blue-600 pb-1' : 'text-gray-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="text-base font-medium text-gray-800 hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-800 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-semibold transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                      isActive ? 'text-blue-700 border-b-2 border-blue-600 pb-1' : 'text-gray-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="block text-base font-semibold text-gray-800 hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;