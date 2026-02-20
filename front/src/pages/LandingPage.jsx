import React from 'react';
import { ChevronRight, Smartphone, Zap, TrendingUp, Users, Activity } from 'lucide-react';

const Feature = ({ icon: Icon, title, desc, color }) => (
    <div className="glass-card p-8 rounded-2xl hover:bg-slate-800/80 transition-all duration-300 group cursor-default hover:-translate-y-2">
        <div className={`w-14 h-14 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={32} className={color.replace('bg-', 'text-').replace('/10', '')} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

const LandingPage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="blob bg-emerald-600 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/4"></div>
                <div className="blob bg-blue-600 w-80 h-80 rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 animation-delay-2000"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Nueva versión 2.0 disponible
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
                                Tu nutrición, en <br />
                                <span className="text-gradient">piloto automático.</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Olvídate de contar calorías manualmente. FitLifeWeb usa IA para crear planes de comida personalizados que se adaptan a tu metabolismo y estilo de vida real.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 group">
                                    Crear mi plan gratis
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full border border-slate-700 transition-all flex items-center justify-center gap-2">
                                    <Smartphone size={18} /> Descargar App
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full perspective-1000">
                            <div className="relative transform md:rotate-y-12 md:rotate-x-6 hover:rotate-0 transition-all duration-700 ease-out">
                                <div className="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Resumen Diario</h3>
                                            <p className="text-slate-400 text-sm">Hoy, 14 Feb</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                            <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="Profile" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                            <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Proteínas</p>
                                            <p className="text-2xl font-black text-white">124g</p>
                                        </div>
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                            <p className="text-blue-400 text-xs font-bold uppercase mb-1">Carbos</p>
                                            <p className="text-2xl font-black text-white">210g</p>
                                        </div>
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                            <p className="text-orange-400 text-xs font-bold uppercase mb-1">Grasas</p>
                                            <p className="text-2xl font-black text-white">55g</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/30 rounded-xl p-4 mb-6 h-32 flex items-end gap-2 justify-between">
                                        {[40, 70, 50, 90, 60, 80, 50].map((h, i) => (
                                            <div key={i} className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                                                    {h * 20}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-700/30 p-4 rounded-xl border border-slate-700/50">
                                        <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center">
                                            <Activity size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">Almuerzo Post-Entreno</p>
                                            <p className="text-xs text-slate-400">Pollo a la plancha con quinoa</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-emerald-400 font-bold">540 kcal</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-4 top-20 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce hidden md:flex" style={{ animationDuration: '3s' }}>
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Racha</p>
                                        <p className="text-white font-bold">14 Días 🔥</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-900 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Todo lo que necesitas para <br /><span className="text-emerald-400">romper tus límites</span></h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">No es solo una app de dieta. Es un ecosistema completo diseñado para optimizar tu cuerpo y mente.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Feature
                            icon={Zap}
                            color="bg-yellow-500"
                            title="IA Generativa de Menús"
                            desc="¿No sabes qué comer? Nuestra IA escanea tu nevera (por foto) y te genera recetas basadas en tus macros exactos."
                        />
                        <Feature
                            icon={TrendingUp}
                            color="bg-emerald-500"
                            title="Seguimiento Metabólico"
                            desc="Algoritmos que aprenden cómo reacciona tu cuerpo a diferentes alimentos y ajustan el plan automáticamente."
                        />
                        <Feature
                            icon={Users}
                            color="bg-purple-500"
                            title="Comunidad & Retos"
                            desc="Compite con amigos, únete a retos mensuales y desbloquea insignias. La motivación nunca falta."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">¿Listo para tu mejor versión?</h2>
                            <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
                                Únete a más de 10,000 personas que han transformado su relación con la comida. Sin dietas aburridas.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-full text-lg hover:shadow-xl hover:scale-105 transition-all">
                                    Empezar prueba gratuita
                                </button>
                                <button className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-full text-lg border border-emerald-500 hover:bg-emerald-800 transition-all">
                                    Ver demo en vivo
                                </button>
                            </div>
                            <p className="mt-6 text-emerald-200 text-sm opacity-80">Sin tarjeta de crédito requerida • Cancelación en cualquier momento</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
