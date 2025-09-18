import React, { useState, useEffect } from 'react';
import POSInterface from './components/layout/pos-Interface'
import LoginInterface from './components/layout/login-Interface'
import { useAuthStore } from './store/useAuthStore';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState<'login' | 'pos'>('login');
  const { isAuthenticated, user } = useAuthStore();

  // Initialize app and check authentication status
  useEffect(() => {
    const initializeApp = async () => {
      // Check if user is already authenticated
      if (isAuthenticated) {
        setCurrentPage('pos');
      } else {
        setCurrentPage('login');
      }
      setIsInitialized(true);
    };

    initializeApp();
  }, [isAuthenticated]);

  // Handle successful login
  const handleLoginSuccess = () => {
    console.log('Login successful, user:', user);
    setCurrentPage('pos');
  };

  // Handle logout
  // const handleLogout = () => {
  //   setCurrentPage('login');
  // };

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading CentroERP POS...</p>
        </div>
      </div>
    );
  }
    return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginInterface onLoginSuccess={handleLoginSuccess} />
      ) : (
        <POSInterface />
      )}
    </div>
  );
}

export default App
