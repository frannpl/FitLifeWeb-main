import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, Utensils, TrendingUp } from 'lucide-react';

const DashboardUsuario = () => {
    const userStr = localStorage.getItem('user');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (userStr && token) {
            fetch(`http://localhost:8080/api/usuarios/email/${userStr}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) setProfile(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching user profile:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userStr]);

    const displayProfile = profile || {
        pesoActual: 0,
        altura: 0,
        edad: 0,
        nombre: userStr || 'Usuario'
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen flex items-center justify-center">
                <div className="text-center text-emerald-400 animate-pulse">
                    <Activity size={48} className="mx-auto mb-4" />
                    <p>Cargando tu perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white mb-2">Mi Dashboard</h1>
                <p className="text-slate-400">Resumen de tu progreso y asignaciones actuales.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Profile Card */}
                <div className="glass-card p-6 rounded-2xl lg:col-span-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-emerald-500">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{displayProfile.nombre}</h2>
                            <p className="text-emerald-400 text-sm">Plan Premium Activo</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">Peso</p>
                            <p className="text-xl font-black text-white">{displayProfile.pesoActual} kg</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">Altura</p>
                            <p className="text-xl font-black text-white">{displayProfile.altura} m</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">Edad</p>
                            <p className="text-xl font-black text-white">{displayProfile.edad}</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">IMC</p>
                            <p className="text-xl font-black text-emerald-400">
                                {displayProfile.altura > 0 ? (displayProfile.pesoActual / (displayProfile.altura * displayProfile.altura)).toFixed(1) : 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Assignments */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Active Plan */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-l-4 border-l-orange-500 hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                            <Utensils size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block px-2 py-1 bg-slate-800 text-orange-400 text-xs font-bold uppercase rounded mb-2 border border-orange-500/20">Plan Asignado</div>
                            <h3 className="text-2xl font-bold text-white mb-1">Pérdida de Grasa Avanzada</h3>
                            <p className="text-slate-400 text-sm line-clamp-2">Plan enfocado en déficit calórico con alta proteína para mantener la masa muscular.</p>
                        </div>
                        <button className="px-6 py-3 bg-slate-800 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors border border-slate-700 mt-4 md:mt-0 w-full md:w-auto">
                            Ver Comidas
                        </button>
                    </div>

                    {/* Active Routine */}
                    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-l-4 border-l-blue-500 hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Dumbbell size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block px-2 py-1 bg-slate-800 text-blue-400 text-xs font-bold uppercase rounded mb-2 border border-blue-500/20">Rutina Asignada</div>
                            <h3 className="text-2xl font-bold text-white mb-1">Hipertrofia 4 Días (Torso/Pierna)</h3>
                            <p className="text-slate-400 text-sm line-clamp-2">Nivel Intermedio. Duración estimada de 60 mins. Enfoque en volumen muscular.</p>
                        </div>
                        <button className="px-6 py-3 bg-slate-800 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors border border-slate-700 mt-4 md:mt-0 w-full md:w-auto">
                            Ir a Entrenar
                        </button>
                    </div>

                    {/* Progress chart placeholder */}
                    <div className="glass-card p-6 rounded-2xl mt-2 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white">Progreso Mensual</h3>
                            <TrendingUp className="text-emerald-400" size={20} />
                        </div>
                        <div className="flex-1 flex items-end gap-2 justify-between pt-8 opacity-60">
                            {[60, 65, 55, 75, 50, 85, 45, 90, 60, 70].map((h, i) => (
                                <div key={i} className="w-full bg-emerald-500/40 rounded-t-sm hover:bg-emerald-500 transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardUsuario;
