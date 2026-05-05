import { motion } from 'framer-motion';
import { fetchAPI } from '../api';

const PlanesPage = () => {
    const [planes, setPlanes] = useState([]);
    const [comidas, setComidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetchAPI('/planes').then(res => res.json()),
            fetchAPI('/comidas').then(res => res.json())
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

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-muted flex items-center justify-center pt-32">
                <div className="w-16 h-16 border-4 border-health-500/10 border-t-health-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-48 pb-32 bg-surface-muted dark:bg-slate-950 px-8 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-health-500 dark:text-health-400 font-black text-xs uppercase tracking-[0.6em] mb-6 block">Protocolos de Nutrición</motion.span>
                    <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 leading-tight">Planes de <span className="text-gradient-health">Nutrición Pro</span></h1>
                    <p className="text-slate-400 dark:text-slate-500 font-medium text-xl leading-relaxed">Planes nutricionales diseñados para maximizar tu rendimiento físico y optimizar tu composición corporal.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
                    {planes.map((plan) => (
                        <div key={plan.id} className="card-premium p-12 bg-white dark:bg-slate-900 flex flex-col group hover:-translate-y-3 transition-all duration-700 relative overflow-hidden border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)]">
                            <div className="absolute -right-12 -top-12 text-health-500/5 dark:text-health-500/10 group-hover:text-health-500/10 transition-all duration-700">
                                <Leaf size={220} />
                            </div>

                            <div className="inline-block px-5 py-2 rounded-xl bg-health-50 dark:bg-health-900/20 text-health-600 dark:text-health-400 self-start text-[10px] font-black uppercase tracking-widest mb-10 border border-health-100/50 dark:border-health-800/30">
                                {plan.tipoDieta}
                            </div>

                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter group-hover:text-health-600 dark:group-hover:text-health-400 transition-colors leading-tight">{plan.nombre}</h3>
                            <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-12 flex-1 text-lg">{plan.descripcion}</p>

                            <button className="w-full py-6 bg-slate-900 dark:bg-health-600 hover:bg-health-500 dark:hover:bg-health-500 text-white font-black rounded-2xl transition-all shadow-xl hover:shadow-health-500/20 flex items-center justify-center gap-4 active:scale-95 text-xs uppercase tracking-[0.2em]">
                                Ver Metodología <ChevronRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-32 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12 text-center md:text-left">
                        <div className="max-w-2xl">
                            <span className="text-wellness-500 dark:text-wellness-400 font-black text-xs uppercase tracking-[0.5em] mb-6 block">Resource Database</span>
                            <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Bio-Diccionario</h2>
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 font-medium max-w-sm text-lg leading-relaxed">Valores nutricionales analizados nutricionalmente para garantizar la máxima precisión en cada gramo ingerido.</p>
                    </div>

                    <div className="card-premium bg-white dark:bg-slate-900 overflow-hidden border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.04)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-[11px] uppercase font-black tracking-[0.3em] border-b border-slate-100 dark:border-slate-800">
                                        <th className="p-10">Alimento</th>
                                        <th className="p-10">Categoría</th>
                                        <th className="p-10">Energía</th>
                                        <th className="p-10 text-right">Macros (100g)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700 dark:text-slate-300">
                                    {comidas.map(comida => (
                                        <tr key={comida.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="p-10 font-black text-slate-900 dark:text-white text-xl group-hover:text-health-600 dark:group-hover:text-health-400 transition-colors">{comida.nombre}</td>
                                            <td className="p-10"><span className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-700/50">{comida.tipo || 'General'}</span></td>
                                            <td className="p-10 font-black text-slate-900 dark:text-white text-lg">{comida.calorias} <span className="text-slate-400 dark:text-slate-500 text-xs ml-1 font-bold">kcal</span></td>
                                            <td className="p-10 text-right">
                                                <div className="flex justify-end gap-6 text-[10px] font-black uppercase tracking-widest">
                                                    <div className="text-rose-600 dark:text-rose-400">P: {comida.proteinas || 0}g</div>
                                                    <div className="text-blue-600 dark:text-blue-400">C: {comida.carbohidratos || 0}g</div>
                                                    <div className="text-amber-600 dark:text-amber-400">G: {comida.grasas || 0}g</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanesPage;
