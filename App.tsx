
import React, { useState, useCallback } from 'react';
import { AuthPage } from './routes/Auth';
import { DashboardPage } from './routes/Dashboard';

export type Page = 'signin' | 'forgot-password' | 'dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('signin');

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentPage('signin');
  }, []);

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthPage page={currentPage} onNavigate={handleNavigate} onLogin={handleLogin} />;
    }
    return <DashboardPage onLogout={handleLogout} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-brand-black">
      {renderContent()}
    </div>
  );
}

export default App;
