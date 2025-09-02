import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../features/auth/context/AuthContext';

export default function MainLayout({ children }) {
  const { user, logout } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <Link to="/" className="text-xl font-semibold text-blue-600">
          Marketplace App
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="mr-8 flex items-center space-x-4">
                <NavLink
                  key="/listings"
                  to="/listings"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? "bg-blue-500 text-white hover:bg-blue-600" // Active + hover
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"}`
                  }
                >
                  Listings
                </NavLink>
                <NavLink
                  key="/my-listings"
                  to="/my-listings"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? "bg-blue-500 text-white hover:bg-blue-600" // Active + hover
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"}`
                  }
                >
                  My Listings
                </NavLink>
                <NavLink
                  key="/inbox"
                  to="/inbox"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? "bg-blue-500 text-white hover:bg-blue-600" // Active + hover
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"}`
                  }
                >
                  Inbox
                </NavLink>
              </div>
              <div>
                <span className="text-gray-700 mr-2">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
