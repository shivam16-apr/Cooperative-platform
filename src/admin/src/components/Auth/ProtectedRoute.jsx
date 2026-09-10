import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../api/client';

/**
 * ProtectedRoute Component
 * Guards routes from unauthenticated access.
 * Redirects to /login if token is missing.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const authed = isAuthenticated();

  if (!authed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
