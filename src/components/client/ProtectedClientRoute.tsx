import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';

interface ProtectedClientRouteProps {
  children: React.ReactNode;
}

const ProtectedClientRoute: React.FC<ProtectedClientRouteProps> = ({ children }) => {
  const { clientUser, loading } = useClientAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !clientUser) {
      console.log('Client not authenticated, redirecting to client portal login');
    }
  }, [loading, clientUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!clientUser) {
    return <Navigate to="/client-portal" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedClientRoute;
