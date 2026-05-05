import React from 'react';
import { Leaf, Star, Users, Activity } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-24 text-slate-400 dark:text-slate-500 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-16">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 font-black text-2xl text-slate-900 dark:text-white mb-8 tracking-tighter">
                        <div className="w-10 h-10 bg-health-500 rounded-2xl flex items-center justify-center shadow-lg shadow-health-500/20">
                            <Activity size={20} className="text-white" />
                        </div>
                        <span>FitLife<span className="text-health-500">Pro</span></span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed mb-10 max-w-xs">
                        Plataforma de ingeniería nutricional de alto rendimiento para el máximo bio-rendimiento físico.
                    </p>
                    <div className="flex gap-4">
                        {[Star, Users, Activity].map((Icon, i) => (
                            <button key={i} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-health-500 hover:text-white hover:shadow-xl hover:shadow-health-500/20 transition-all duration-300 border border-slate-100 dark:border-slate-800">
                                <Icon size={20} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Plataforma</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><button className="hover:text-health-500 transition-colors">Bio-Métricas</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Protocolos Elite</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Sistemas Pro</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Certificaciones</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Ecosistema</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><button className="hover:text-health-500 transition-colors">Metodología</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Red de Nutrición</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Research Lab</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Partners</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Unidad Legal</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><button className="hover:text-health-500 transition-colors">Privacidad de Datos</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Términos de Uso</button></li>
                        <li><button className="hover:text-health-500 transition-colors">Compliance</button></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-slate-50 dark:border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-loose">
                    &copy; 2024 FitLife Pro Nutrition Systems. Todos los derechos reservados.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex gap-8">
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">System Status: <span className="text-health-500 dark:text-health-400">Optimal</span></p>
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Version: 2.0.4-LITE</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
