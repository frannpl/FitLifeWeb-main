import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, ChevronRight } from 'lucide-react';

const RutinasPage = () => {
    const [rutinas, setRutinas] = useState([]);
    const [ejercicios, setEjercicios] = useState([]); // Assuming backend returns ejercicios if requested
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/rutinas')
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

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Biblioteca de <span className="text-blue-400">Rutinas</span></h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Encuentra la rutina perfecta según tu nivel y objetivos, diseñada por profesionales.</p>
            </div>

            {loading && (
                <div className="text-center text-blue-400 animate-pulse">
                    <Activity size={48} className="mx-auto mb-4" />
                    <p>Cargando rutinas...</p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-900 mx-auto max-w-lg mb-10">
                    <p className="font-bold mb-2">Error de conexión</p>
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rutinas.map(rutina => (
                    <div key={rutina.id} className="glass-card p-6 flex flex-col rounded-2xl border-t-4 border-t-transparent hover:border-t-blue-500 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                                <Dumbbell size={24} />
                            </div>
                            <span className={`text-xs px-2 py-1 font-bold uppercase rounded border ${rutina.nivel === 'Principiante' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                                rutina.nivel === 'Intermedio' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'
                                }`}>
                                {rutina.nivel}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{rutina.nombreRutina}</h3>
                        <p className="text-slate-400 text-sm mb-6 flex-1">{rutina.descripcion}</p>

                        <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-auto">
                            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                                <Activity size={16} className="text-blue-400" />
                                <span>{rutina.duracion} min</span>
                            </div>
                            <button className="text-blue-400 hover:text-blue-300 font-bold text-sm flex items-center">
                                Ver Ejercicios <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {rutinas.length === 0 && !loading && !error && (
                <div className="text-center text-slate-500 pt-10">
                    <p>No hay rutinas disponibles en este momento.</p>
                </div>
            )}
        </div>
    );
};

export default RutinasPage;
