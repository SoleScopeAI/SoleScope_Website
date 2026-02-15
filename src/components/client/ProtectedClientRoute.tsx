import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedClientRouteProps {
  children: React.ReactNode;
}

const ProtectedClientRoute: React.FC<ProtectedClientRouteProps> = ({ children }) => {
  const { clientUser, loading } = useClientAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
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
