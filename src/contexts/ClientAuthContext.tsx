import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clientAuth, ClientUser } from '../lib/clientAuth';

interface ClientAuthContextType {
  clientUser: ClientUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; userType?: 'client' | 'admin' }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error('useClientAuth must be used within ClientAuthProvider');
  }
  return context;
};

interface ClientAuthProviderProps {
  children: ReactNode;
}

export const ClientAuthProvider: React.FC<ClientAuthProviderProps> = ({ children }) => {
  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const userType = clientAuth.getUserType();

      if (userType === 'client' && clientAuth.isSessionValid()) {
        const user = await clientAuth.getCurrentUser();
        setClientUser(user);
      } else {
        await clientAuth.logout();
        setClientUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setClientUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await clientAuth.login(email, password);
      if (response.success && response.user) {
        setClientUser(response.user);
        clientAuth.saveUserToStorage(response.user);
        return { success: true, userType: response.userType };
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
      await clientAuth.logout();
      setClientUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const user = await clientAuth.getCurrentUser();
      setClientUser(user);
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  return (
    <ClientAuthContext.Provider value={{ clientUser, loading, login, logout, refreshUser }}>
      {children}
    </ClientAuthContext.Provider>
  );
};
