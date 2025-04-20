// @ts-nocheck
import  { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'manager' | 'viewer';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is approved
  if (currentUser && !currentUser.approved) {
    return <Navigate to="/pending-approval" replace />;
  }

  // Check role requirements if specified
  if (requiredRole && currentUser && currentUser.role !== requiredRole &&
      // Allow higher roles to access lower permissions
      !(requiredRole === 'viewer' ||
        (requiredRole === 'manager' && currentUser.role === 'admin'))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
 