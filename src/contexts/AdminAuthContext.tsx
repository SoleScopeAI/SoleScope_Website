import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth, AdminUser } from '../lib/adminAuth';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
      if (adminAuth.isSessionValid()) {
        const user = await adminAuth.getCurrentUser();
        setAdminUser(user);
      } else {
        await adminAuth.logout();
        setAdminUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await adminAuth.login(email, password);
      if (response.success && response.user) {
        setAdminUser(response.user);
        adminAuth.saveUserToStorage(response.user);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
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

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading, login, logout, refreshUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
