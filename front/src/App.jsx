import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardUsuario from './pages/DashboardUsuario';
import DashboardNutricionista from './pages/DashboardNutricionista';
import PlanesPage from './pages/PlanesPage';
import RutinasPage from './pages/RutinasPage';

// Protected Route Wrapper
const ProtectedRoute = ({ user, children }) => {
  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Wrapper component to handle conditional layout
const AppContent = ({ user, role, onLogout, theme, toggleTheme }) => {
  const location = useLocation();
  const isDashboardNutri = location.pathname === '/dashboard-nutricionista';

  return (
    <div className="min-h-screen bg-surface-base dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-health-100 dark:selection:bg-health-900/30 selection:text-health-900 dark:selection:text-health-100 flex flex-col transition-colors duration-500 overflow-x-hidden">
      {!isDashboardNutri && (
        <Header 
          user={user} 
          role={role} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            user ? <Navigate to={role === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard'} replace /> : <LandingPage />
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <DashboardUsuario />
            </ProtectedRoute>
          } />

          <Route path="/dashboard-nutricionista" element={
            <ProtectedRoute user={user}>
              <DashboardNutricionista onLogout={onLogout} />
            </ProtectedRoute>
          } />

          <Route path="/planes" element={
            <ProtectedRoute user={user}>
              <PlanesPage />
            </ProtectedRoute>
          } />

          <Route path="/rutinas" element={
            <ProtectedRoute user={user}>
              <RutinasPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDashboardNutri && <Footer />}
    </div>
  );
};

// Main App Component
export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') || 'usuario';

    if (storedUser && token) {
      setUser(storedUser);
      setUserRole(storedRole);
    }
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-surface-base dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-health-500/20 border-t-health-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setUserRole(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <AppContent 
        user={user} 
        role={userRole} 
        onLogout={handleLogout} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
    </Router>
  );
}
