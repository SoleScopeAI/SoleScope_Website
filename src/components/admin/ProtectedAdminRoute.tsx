import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { adminUser, loading } = useAdminAuth();

  console.log('ProtectedAdminRoute: loading=', loading, 'adminUser=', adminUser ? adminUser.email : 'null');

  if (loading) {
    console.log('ProtectedAdminRoute: Still loading, showing loader');
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    console.log('ProtectedAdminRoute: No admin user, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('ProtectedAdminRoute: Admin user authenticated, rendering protected content');
  return <>{children}</>;
};

export default ProtectedAdminRoute;
