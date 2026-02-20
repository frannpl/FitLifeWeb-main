import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardUsuario from './pages/DashboardUsuario';
import DashboardNutricionista from './pages/DashboardNutricionista';
import PlanesPage from './pages/PlanesPage';
import RutinasPage from './pages/RutinasPage';

// Estilos globales e inyectados
const GlobalStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');

        :root {
            --font-outfit: 'Outfit', sans-serif;
        }

        body {
            font-family: var(--font-outfit);
            background-color: #0f172a; /* Slate 900 */
            color: #f8fafc;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #10b981;
        }

        .text-gradient {
            background: linear-gradient(to right, #34d399, #22d3ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.6;
            animation: float 10s infinite ease-in-out;
            pointer-events: none;
        }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }

        .perspective-1000 {
            perspective: 1000px;
        }

        .rotate-y-12 {
            transform: rotateY(12deg) rotateX(6deg);
        }

        .animation-delay-2000 {
            animation-delay: 2s;
        }
    `}</style>
);

// Protected Route Wrapper
const ProtectedRoute = ({ user, children }) => {
  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Main App Component
export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') || 'usuario';

    if (storedUser && token) {
      setUser(storedUser);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setUserRole(null);
    window.location.href = '/'; // Redirect manually since we're outside Router scope for state reset
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
        <GlobalStyles />
        <Header user={user} role={userRole} onLogout={handleLogout} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/dashboard" element={
              <ProtectedRoute user={user}>
                <DashboardUsuario />
              </ProtectedRoute>
            } />

            <Route path="/dashboard-nutricionista" element={
              <ProtectedRoute user={user}>
                <DashboardNutricionista />
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

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
