import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth, AdminUser } from '../lib/adminAuth';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isOwner: () => boolean;
  canManageAdmins: () => boolean;
  hasPermission: (permission: 'manage_admins' | 'manage_clients' | 'manage_projects' | 'view_analytics') => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const userType = localStorage.getItem('userType');

      if (userType === 'admin' && adminAuth.isSessionValid()) {
        const user = await adminAuth.getCurrentUser();
        setAdminUser(user);
      } else if (userType === 'admin') {
        await adminAuth.logout();
        setAdminUser(null);
      } else {
        setAdminUser(null);
      }
    } catch (error) {
      console.error('Admin session check error:', error);
      await adminAuth.logout();
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await adminAuth.login(email, password);
      if (response.success && response.user) {
        console.log('AdminAuthContext: Login successful, updating state with user:', response.user.email);
        setAdminUser(response.user);
        adminAuth.saveUserToStorage(response.user);
        console.log('AdminAuthContext: User saved to storage and state updated');
        return { success: true };
      }
      console.log('AdminAuthContext: Login failed:', response.error);
      return { success: false, error: response.error };
    } catch (error) {
      console.error('AdminAuthContext: Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await adminAuth.logout();
      setAdminUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const user = await adminAuth.getCurrentUser();
      setAdminUser(user);
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const isOwner = () => {
    return adminUser?.role === 'owner';
  };

  const canManageAdmins = () => {
    return adminUser?.role === 'owner';
  };

  const hasPermission = (permission: 'manage_admins' | 'manage_clients' | 'manage_projects' | 'view_analytics') => {
    if (!adminUser || !adminUser.is_active) return false;

    switch (permission) {
      case 'manage_admins':
        return adminUser.role === 'owner';
      case 'manage_clients':
        return ['owner', 'admin', 'manager'].includes(adminUser.role);
      case 'manage_projects':
        return ['owner', 'admin', 'manager'].includes(adminUser.role);
      case 'view_analytics':
        return ['owner', 'admin'].includes(adminUser.role);
      default:
        return false;
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading, login, logout, refreshUser, isOwner, canManageAdmins, hasPermission }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
