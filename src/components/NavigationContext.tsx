import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationContextType {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  navigationHistory: string[];
  addToHistory: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('');
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Update current section based on pathname
    const path = location.pathname;
    if (path === '/') {
      setCurrentSection('home');
    } else if (path.startsWith('/services')) {
      setCurrentSection('services');
    } else if (path.startsWith('/about')) {
      setCurrentSection('about');
    } else if (path.startsWith('/contact')) {
      setCurrentSection('contact');
    } else if (path.startsWith('/blog')) {
      setCurrentSection('blog');
    } else if (path.startsWith('/faq')) {
      setCurrentSection('faq');
    } else {
      setCurrentSection('other');
    }

    // Add to navigation history
    addToHistory(path);
  }, [location.pathname]);

  const addToHistory = (path: string) => {
    setNavigationHistory(prev => {
      const newHistory = [path, ...prev.filter(p => p !== path)];
      return newHistory.slice(0, 10); // Keep last 10 pages
    });
  };

  const value = {
    currentSection,
    setCurrentSection,
    navigationHistory,
    addToHistory
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};