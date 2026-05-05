import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, Activity, LogOut, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Header = ({ user, role, onLogout, theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isLandingHero = location.pathname === '/' && !isScrolled;
    const headerTextColor = isLandingHero ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white';
    const navItemColor = isLandingHero ? 'text-slate-600 dark:text-slate-200 hover:text-health-500 dark:hover:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-health-500 dark:hover:text-health-400';
    const navBg = isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-3' : 'bg-transparent py-5';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const params = new URLSearchParams(location.search);
        if (params.get('login') === 'true') {
            setAuthModalOpen(true);
            // Clean up URL
            navigate(location.pathname, { replace: true });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.search, navigate, location.pathname]);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div onClick={() => navigate('/')} className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group">
                        <div className="w-9 h-9 bg-health-500 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-lg shadow-health-500/20">
                            <Leaf size={20} className="text-white" />
                        </div>
                        <span className={headerTextColor}>FitLife<span className="text-health-500">Pro</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-bold">
                        <div className="flex items-center gap-8 mr-4 border-r border-slate-200 dark:border-slate-800 pr-8">
                             <button 
                                onClick={toggleTheme}
                                className={`p-2 rounded-xl transition-all duration-300 ${isLandingHero ? 'bg-slate-900/5 dark:bg-white/10 text-slate-500 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-health-50 dark:hover:bg-health-900/20'}`}
                             >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                             </button>
                        </div>
                        
                        {user ? (
                            <>
                                <button onClick={() => navigate(role === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard')} className={`${navItemColor} transition-colors`}>Panel Control</button>
                                {role === 'nutricionista' && (
                                    <>
                                        <button onClick={() => navigate('/planes')} className={`${navItemColor} transition-colors`}>Planes</button>
                                        <button onClick={() => navigate('/rutinas')} className={`${navItemColor} transition-colors`}>Rutinas</button>
                                    </>
                                )}

                                <div className="flex items-center gap-5 ml-6 pl-6 border-l border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bienvenido</span>
                                        <span className={headerTextColor}>{user}</span>
                                    </div>
                                    <button onClick={onLogout} className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all border border-slate-100 dark:border-slate-800">
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/')} className={`${navItemColor} transition-colors`}>Inicio</button>
                                <button onClick={() => setAuthModalOpen(true)} className={`${headerTextColor} hover:text-health-500 dark:hover:text-health-400 transition-colors`}>Iniciar Sesión</button>
                                <a 
                                    href="https://wa.me/34618555371?text=Hola,%20me%20gustaría%20unirme%20como%20cliente." 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-health-500 hover:bg-health-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-health-500/20 hover:shadow-health-500/40 active:scale-95"
                                >
                                    ÚNETE COMO CLIENTE
                                </a>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-xl transition-all duration-300 ${isLandingHero ? 'bg-white/10 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className={headerTextColor} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl"
                        >
                            {user ? (
                                <>
                                    <button onClick={() => { navigate(role === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard'); setMobileMenuOpen(false); }} className="text-slate-600 dark:text-slate-400 font-bold py-2 text-left">Panel Control</button>
                                    {role === 'nutricionista' && (
                                        <>
                                            <button onClick={() => { navigate('/planes'); setMobileMenuOpen(false); }} className="text-slate-600 dark:text-slate-400 font-bold py-2 text-left">Planes</button>
                                            <button onClick={() => { navigate('/rutinas'); setMobileMenuOpen(false); }} className="text-slate-600 dark:text-slate-400 font-bold py-2 text-left">Rutinas</button>
                                        </>
                                    )}
                                    <hr className="border-slate-50 dark:border-slate-800" />
                                    <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-4 bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 font-black rounded-2xl">
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-slate-600 dark:text-slate-400 font-bold py-2 text-left">Inicio</button>
                                    <hr className="border-slate-50 dark:border-slate-800" />
                                    <a 
                                        href="https://wa.me/34618555371?text=Hola,%20me%20gustaría%20unirme%20como%20cliente." 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-health-500 text-white font-black rounded-2xl flex items-center justify-center"
                                    >
                                        ÚNETE COMO CLIENTE
                                    </a>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                onLogin={(token, email, receivedRole) => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', email);
                    localStorage.setItem('role', receivedRole || 'usuario');
                    window.location.href = receivedRole === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard';
                }}
            />
        </>
    );
};

export default Header;
