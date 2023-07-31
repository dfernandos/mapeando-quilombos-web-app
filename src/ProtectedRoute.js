// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element, ...rest }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
