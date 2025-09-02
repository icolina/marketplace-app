import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
