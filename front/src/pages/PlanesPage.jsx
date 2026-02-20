import React, { useState, useEffect } from 'react';
import { Leaf, Activity, ChevronRight } from 'lucide-react';

const PlanesPage = () => {
    const [planes, setPlanes] = useState([]);
    const [comidas, setComidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user token/auth logic here if needed

        Promise.all([
            fetch('http://localhost:8080/api/planes').then(res => res.json()),
            fetch('http://localhost:8080/api/comidas').then(res => res.json())
        ])
            .then(([planesData, comidasData]) => {
                setPlanes(planesData);
                setComidas(comidasData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Directorio de <span className="text-emerald-400">Planes Nutricionales</span></h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Explora los planes de dieta disponibles en nuestra base de datos, o pide a tu nutricionista que te asigne uno.</p>
            </div>

            {loading && (
                <div className="text-center text-emerald-400 animate-pulse">
                    <Activity size={48} className="mx-auto mb-4" />
                    <p>Cargando planes desde el backend...</p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-900 mx-auto max-w-lg mb-10">
                    <p className="font-bold mb-2">No se pudo conectar con el Backend</p>
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {planes.map((plan) => (
                    <div key={plan.id} className="glass-card p-8 rounded-2xl flex flex-col hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Leaf size={100} />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 self-start text-xs font-bold uppercase mb-4 border border-emerald-500/20">
                            {plan.tipoDieta}
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-white">{plan.nombrePlan}</h3>
                        <p className="text-slate-400 flex-1 leading-relaxed mb-6">{plan.descripcion}</p>

                        <button className="w-full py-3 bg-slate-800 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all border border-slate-700 hover:border-emerald-500 flex items-center justify-center gap-2 group-hover:shadow-lg mt-auto">
                            Ver Detalles <ChevronRight size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-800 pt-20">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Lista de <span className="text-orange-400">Alimentos Registrados</span></h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-card">
                        <thead className="bg-slate-800 text-slate-300">
                            <tr>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Tipo</th>
                                <th className="p-4">Calorías</th>
                                <th className="p-4">Proteínas</th>
                                <th className="p-4">Carbos</th>
                                <th className="p-4">Grasas</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-400">
                            {comidas.map(comida => (
                                <tr key={comida.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 font-bold text-white">{comida.nombre}</td>
                                    <td className="p-4"><span className="px-2 py-1 rounded bg-slate-700 text-xs">{comida.tipo}</span></td>
                                    <td className="p-4">{comida.calorias} kcal</td>
                                    <td className="p-4">{comida.proteinas}g</td>
                                    <td className="p-4">{comida.carbohidratos}g</td>
                                    <td className="p-4">{comida.grasas}g</td>
                                </tr>
                            ))}
                            {comidas.length === 0 && !loading && !error && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">No hay alimentos registrados todavía.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlanesPage;
