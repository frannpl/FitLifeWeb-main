import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Smartphone, Zap, TrendingUp, Users, Activity, CheckCircle2, Dumbbell, Utensils, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feature = ({ icon: Icon, title, desc, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="card-premium p-12 group hover:-translate-y-2 transition-all duration-500 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] bg-white/80 backdrop-blur-md"
    >
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-health-500 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-health-500 group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter group-hover:text-health-500 transition-colors">{title}</h3>
        <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed text-lg">{desc}</p>
    </motion.div>
);

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface-base min-h-screen">
            {/* Hero Section - Dynamic Aesthetic */}
            <section className="relative pt-64 pb-48 overflow-hidden min-h-screen flex items-center bg-white dark:bg-slate-950 transition-colors duration-700">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/assets/fitness_bg.png" 
                        alt="Fitness background" 
                        className="w-full h-full object-cover opacity-50 dark:opacity-40 contrast-125 brightness-75 dark:brightness-50"
                    />
                    {/* Multi-layered overlays for depth and visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-surface-base dark:from-slate-950/80 dark:via-slate-950/40 dark:to-slate-950 transition-colors duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/40 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/40 transition-colors duration-700"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] transition-colors duration-700"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-health-500/10 dark:bg-health-500/20 backdrop-blur-xl border border-health-500/20 text-health-600 dark:text-health-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl transition-all"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-health-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-health-500"></span>
                            </span>
                            NUTRICIÓN BASADA EN CIENCIA PARA TU MEJOR VERSIÓN
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-[9.5rem] font-black text-slate-900 dark:text-white tracking-tighter mb-12 leading-[0.85] transition-colors duration-700 font-['Montserrat']"
                        >
                            Esculpe tu Cuerpo <br/>
                            <span className="text-gradient-health italic font-['Playfair_Display']">con Precisión.</span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl font-medium leading-relaxed mb-16 max-w-2xl transition-colors duration-700"
                        >
                            Nuestra plataforma une la precisión científica con la nutrición de élite. Planes de alimentación y entrenamiento diseñados a medida por nutricionistas profesionales para resultados rápidos y sostenibles. Sin planes genéricos, solo la ciencia aplicada a tu cuerpo.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <a 
                                href="https://wa.me/34618555371?text=Hola,%20me%20gustaría%20solicitar%20mi%20plan%20personalizado." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-14 py-7 bg-health-500 text-white font-black rounded-[2rem] hover:bg-health-400 hover:shadow-2xl hover:shadow-health-500/40 transition-all duration-500 active:scale-95 tracking-widest text-xs uppercase shadow-xl shadow-health-500/20"
                            >
                                SOLICITAR MI PLAN PERSONALIZADO
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nutrition Core Section */}
            <section className="py-48 relative overflow-hidden bg-surface-base dark:bg-slate-950 transition-colors duration-500">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden lg:block">
                    <img 
                        src="/assets/nutrition_bg.png" 
                        alt="Nutrition" 
                        className="w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-overlay dark:mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-base dark:to-slate-950"></div>
                </div>

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-2xl">
                            <span className="text-wellness-500 dark:text-wellness-400 font-black text-xs uppercase tracking-[0.5em] mb-6 block">EL MÉTODO DE ÉLITE</span>
                            <h2 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">Los 3 Pilares de <br/> tu Transformación</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mb-2 text-xl leading-relaxed">Fusionamos análisis de datos avanzados con nutrición de alto rendimiento para garantizar una composición corporal óptima y salud duradera.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <Feature 
                            icon={ShieldCheck} 
                            title="Bio-Nutrición" 
                            desc="Planes adaptativos y dinámicos diseñados con precisión por tu nutricionista. Ajustes en tiempo real basados en tu progreso metabólico y feedback."
                            delay={0.1}
                        />
                        <Feature 
                            icon={Dumbbell} 
                            title="Entreno Élite" 
                            desc="Programas de entrenamiento biomecánicamente optimizados para maximizar cada sesión. Expertos diseñan tu plan integrado perfectamente con tu nutrición."
                            delay={0.2}
                        />
                        <Feature 
                            icon={Activity} 
                            title="Métricas PRO" 
                            desc="Visualiza tu evolución con precisión de laboratorio. Datos claros e informes inteligentes para que tú y tu nutricionista tomen las mejores decisiones."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Performance Stats Section */}
            <section className="py-40 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 opacity-5 dark:opacity-20">
                    <img src="/assets/metrics_bg.png" alt="Metrics" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-20 relative z-10">
                    {[
                        { val: '15K+', label: 'PLANES DE NUTRICIÓN ACTIVOS' },
                        { val: '99%', label: 'PRECISIÓN METABÓLICA CERTIFICADA' },
                        { val: '24/7', label: 'MONITOREO CONTINUO DEL PROGRESO' },
                        { val: 'PRO', label: 'NUTRICIONISTAS EN LA PLATAFORMA' }
                    ].map((s, i) => (
                        <div key={i} className="text-center group cursor-default">
                            <p className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-health-500 transition-all duration-700 group-hover:scale-110">{s.val}</p>
                            <p className="text-slate-500 dark:text-slate-400 font-black text-[11px] uppercase tracking-[0.5em] mt-6">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-40 px-8 bg-surface-base dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto card-premium bg-white dark:bg-slate-900 p-24 text-center overflow-hidden relative border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-health-500/5 to-wellness-500/5 dark:from-health-500/10 dark:to-wellness-500/10"></div>
                    <img 
                        src="/assets/fitness_bg.png" 
                        alt="CTA background" 
                        className="absolute inset-0 w-full h-full object-cover opacity-5 dark:opacity-20 mix-blend-overlay"
                    />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-12 leading-[0.9] font-['Montserrat']">¿Listo para transformar <br/> tu físico?</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium mb-16 leading-relaxed">Únete a la plataforma de nutrición más avanzada del sector, la herramienta elegida por nutricionistas de élite para optimizar los resultados de sus clientes. Tu transformación comienza hoy, garantizada por la ciencia y guiada por profesionales.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button 
                                onClick={() => {
                                    if (localStorage.getItem('token')) navigate('/dashboard');
                                    else navigate('/?login=true');
                                }} 
                                className="px-16 py-8 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-health-500 hover:shadow-2xl hover:shadow-health-500/40 transition-all duration-500 active:scale-95 tracking-widest text-xs uppercase shadow-xl"
                            >
                                ACCEDER A MI PANEL
                            </button>
                            <a 
                                href="https://wa.me/34618555371?text=Hola,%20me%20gustaría%20solicitar%20una%20cita." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-16 py-8 bg-health-500 text-white font-black rounded-[2rem] hover:bg-health-400 hover:shadow-2xl hover:shadow-health-500/40 transition-all duration-500 active:scale-95 tracking-widest text-xs uppercase shadow-xl shadow-health-500/20 flex items-center justify-center gap-3"
                            >
                                SOLICITAR CITA
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
