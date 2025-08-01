import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get user from our auth context

  // If there's a user, render the child page using the <Outlet /> component.
  // Otherwise, navigate them to the login page.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;