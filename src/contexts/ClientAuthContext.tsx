import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, ClientUser } from '../lib/supabase';
import { clientAuth } from '../lib/clientAuth';

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setClientUser(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        (async () => {
          const user = await clientAuth.getCurrentUser();
          setClientUser(user);
        })();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const user = await clientAuth.getCurrentUser();
      setClientUser(user);
    } catch {
      setClientUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await clientAuth.login(email, password);
      if (response.success && response.user) {
        setClientUser(response.user);
        return { success: true, userType: response.userType };
      }
      return { success: false, error: response.error };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await clientAuth.logout();
      setClientUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const user = await clientAuth.getCurrentUser();
    setClientUser(user);
  };

  return (
    <ClientAuthContext.Provider value={{ clientUser, loading, login, logout, refreshUser }}>
      {children}
    </ClientAuthContext.Provider>
  );
};
