import React from 'react';
import { Leaf, Star, Users } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                        <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                            <Leaf size={14} className="text-white" />
                        </div>
                        <span>FitLife<span className="text-emerald-400">Web</span></span>
                    </div>
                    <p className="text-sm mb-4">Gestión nutricional inteligente para el mundo moderno.</p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"><Star size={14} /></div>
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"><Users size={14} /></div>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Producto</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button className="hover:text-emerald-400">Características</button></li>
                        <li><button className="hover:text-emerald-400">Precios</button></li>
                        <li><button className="hover:text-emerald-400">Para Entrenadores</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Compañía</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button className="hover:text-emerald-400">Sobre nosotros</button></li>
                        <li><button className="hover:text-emerald-400">Blog</button></li>
                        <li><button className="hover:text-emerald-400">Carreras</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button className="hover:text-emerald-400">Privacidad</button></li>
                        <li><button className="hover:text-emerald-400">Términos</button></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-xs">
                &copy; 2024 FitLifeWeb Inc. Hecho con 💚 y código.
            </div>
        </footer>
    );
};

export default Footer;
