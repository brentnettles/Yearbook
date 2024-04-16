import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../CreateUserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  console.log("ProtectedRoute check - User:", user);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    console.error("Redirecting to login, no user found");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Access granted to:", location.pathname);
  return children;
};

export default ProtectedRoute;
