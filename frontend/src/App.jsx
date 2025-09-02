import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './pages/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import { useAuthContext } from './features/auth/context/AuthContext';
import Listings from './features/listings/Listings';
import AddListingForm from './features/listings/AddListingForm';
import MyListings from './features/listings/MyListings';
import EditListingForm from './features/listings/EditListingForm';

function AppContent() {
  const { loading } = useAuthContext();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listings"
        element={
          <ProtectedRoute>
            <Listings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-listings"
        element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listings/new"
        element={
          <ProtectedRoute>
            <AddListingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listings/:id/edit"
        element={
          <ProtectedRoute>
            <EditListingForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
