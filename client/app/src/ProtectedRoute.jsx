import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from './components/CreateUserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  const location = useLocation();

  console.log("User in ProtectedRoute:", user);
  console.log("Location in ProtectedRoute:", location.pathname);

  // Check user and redirect if not logged in
  if (!user) {
    console.log("Redirecting to login, no user found");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;