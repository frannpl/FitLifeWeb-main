import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const RutinasPage = () => {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/rutinas')
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(data => {
                setRutinas(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-base dark:bg-slate-950 flex items-center justify-center pt-32">
                <div className="w-16 h-16 border-4 border-wellness-500/10 border-t-wellness-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-48 pb-32 bg-surface-base dark:bg-slate-950 px-8 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-wellness-500 dark:text-wellness-400 font-black text-xs uppercase tracking-[0.6em] mb-6 block">Academia de Rendimiento</motion.span>
                    <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 leading-tight">Sistemas de <span className="text-wellness-500">Alto Rendimiento</span></h1>
                    <p className="text-slate-400 dark:text-slate-500 font-medium text-xl leading-relaxed">Programas de entrenamiento basados en biomecánica. Periodización inteligente diseñada para romper tus límites genéticos.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {rutinas.map(rutina => (
                        <div key={rutina.id} className="card-premium p-12 bg-white dark:bg-slate-900 flex flex-col group hover:-translate-y-3 transition-all duration-700 relative overflow-hidden border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
                            <div className="absolute -right-12 -top-12 text-wellness-500/5 dark:text-wellness-500/10 group-hover:text-wellness-500/10 dark:group-hover:text-wellness-500/20 transition-all duration-700">
                                <Dumbbell size={240} />
                            </div>

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="w-16 h-16 bg-wellness-50 dark:bg-wellness-900/20 text-wellness-600 dark:text-wellness-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    <Dumbbell size={32} />
                                </div>
                                <span className={`text-[10px] px-5 py-2 font-black uppercase tracking-widest rounded-xl border ${
                                    rutina.nivel === 'Principiante' ? 'border-health-100 dark:border-health-900/30 text-health-600 dark:text-health-400 bg-health-50 dark:bg-health-900/20' :
                                    rutina.nivel === 'Intermedio' ? 'border-wellness-100 dark:border-wellness-900/30 text-wellness-600 dark:text-wellness-400 bg-wellness-50 dark:bg-wellness-900/20' : 
                                    'border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                                }`}>
                                    {rutina.nivel}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-wellness-600 dark:group-hover:text-wellness-400 transition-colors mb-6 tracking-tighter leading-tight relative z-10">{rutina.nombre}</h3>
                            <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-12 flex-1 relative z-10 text-lg">{rutina.descripcion}</p>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-10 mt-auto relative z-10">
                                <div className="flex items-center gap-4 text-slate-900 dark:text-white text-sm font-black tracking-tighter">
                                    <Activity size={20} className="text-wellness-500 dark:text-wellness-400" />
                                    <span>{rutina.duracion || 60} <span className="text-slate-500 dark:text-slate-600">MINUTOS</span></span>
                                </div>
                                <button className="px-8 py-4 bg-slate-900 dark:bg-wellness-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 dark:shadow-wellness-900/10 hover:bg-wellness-600 dark:hover:bg-wellness-500 transition-all active:scale-95">
                                    Ver Programa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {rutinas.length === 0 && !loading && !error && (
                    <div className="text-center py-40">
                        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm border border-slate-100 dark:border-slate-800">
                            <Dumbbell className="text-slate-200 dark:text-slate-700" size={40} />
                        </div>
                        <p className="text-slate-300 dark:text-slate-700 font-black uppercase tracking-[0.4em] text-xs">No se han encontrado programas activos</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RutinasPage;
