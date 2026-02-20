import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = ({ user, role, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div onClick={() => navigate('/')} className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-3">
                            <Leaf size={20} className="text-white" />
                        </div>
                        <span>FitLife<span className="text-emerald-400">Web</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
                        {user ? (
                            <>
                                <button onClick={() => navigate(role === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard')} className="hover:text-emerald-400 transition-colors">Mi Dashboard</button>
                                <button onClick={() => navigate('/planes')} className="hover:text-emerald-400 transition-colors">Planes</button>
                                <button onClick={() => navigate('/rutinas')} className="hover:text-emerald-400 transition-colors">Rutinas</button>

                                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                                    <span className="text-emerald-400">Hola, {user}</span>
                                    <button onClick={onLogout} className="px-5 py-2.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-white rounded-full transition-all border border-slate-700">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition-colors">Inicio</button>
                                <button onClick={() => setAuthModalOpen(true)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all border border-slate-700">
                                    Iniciar Sesión
                                </button>
                                <button onClick={() => setAuthModalOpen(true)} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-full transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                                    Empezar Gratis
                                </button>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
                        {user ? (
                            <>
                                <button onClick={() => { navigate(role === 'nutricionista' ? '/dashboard-nutricionista' : '/dashboard'); setMobileMenuOpen(false); }} className="text-slate-300 hover:text-emerald-400 py-2 text-left">Mi Dashboard</button>
                                <button onClick={() => { navigate('/planes'); setMobileMenuOpen(false); }} className="text-slate-300 hover:text-emerald-400 py-2 text-left">Planes</button>
                                <button onClick={() => { navigate('/rutinas'); setMobileMenuOpen(false); }} className="text-slate-300 hover:text-emerald-400 py-2 text-left">Rutinas</button>
                                <hr className="border-slate-800" />
                                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-3 bg-red-500/20 text-red-400 font-bold rounded-xl">
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-slate-300 hover:text-emerald-400 py-2 text-left">Inicio</button>
                                <hr className="border-slate-800" />
                                <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full py-3 bg-emerald-500 text-slate-900 font-bold rounded-xl">
                                    Empezar Gratis
                                </button>
                            </>
                        )}
                    </div>
                )}
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
