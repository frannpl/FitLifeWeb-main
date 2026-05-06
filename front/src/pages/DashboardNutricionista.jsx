import React, { useState, useEffect, useMemo } from 'react';
import { 
    Users, FileText, Dumbbell, Utensils, Activity, Edit2, Trash2, 
    Plus, X, LayoutDashboard, Bell, Settings, LogOut, 
    ChevronRight, ArrowUpRight, TrendingUp, Calendar, Info, CheckCircle, Clock, Search,
    Scale, Zap, Target, Mail, User, ArrowLeft, Save, Menu
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAPI } from '../api';

// --- STYLING CONSTANTS ---
const COLORS = {
    primary: '#0ea5e9', // Vibrant Cyan
    secondary: '#0f172a', // Deep Slate
    accent: '#6366f1', // indigo-500
    warning: '#f59e0b', // amber-500
    danger: '#ef4444', // red-500
};

// --- GENERIC MODAL COMPONENT (FOR CREATION) ---
const AdminModal = ({ isOpen, onClose, title, fields, initialData, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            const emptyData = {};
            fields.forEach(f => emptyData[f.name] = '');
            setFormData(emptyData);
        }
    }, [initialData, fields, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-slate-900 rounded-4xl w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-slate-100 dark:border-slate-800"
                >
                    <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">
                        <X size={20} />
                    </button>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 pr-12 tracking-tighter">{title}</h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-5">
                        {fields.map(field => (
                            <div key={field.name} className={`${field.type === 'textarea' || field.fullWidth ? 'col-span-2' : 'col-span-1'}`}>
                                <label className="block text-slate-400 text-[10px] font-black mb-2 uppercase tracking-widest">
                                    {field.label}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea 
                                        required 
                                        name={field.name} 
                                        value={formData[field.name] || ''} 
                                        onChange={handleChange} 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-health-500/10 focus:border-health-500 transition-all min-h-[120px] font-medium text-sm" 
                                    />
                                ) : field.type === 'select' ? (
                                    <div className="relative">
                                        <select 
                                            name={field.name} 
                                            value={formData[field.name] || ''} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-health-500/10 focus:border-health-500 transition-all appearance-none font-bold text-sm"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {field.options?.map(opt => (
                                                <option key={opt.id} value={opt.id} className="dark:bg-slate-800">{opt.nombre || opt.email}</option>
                                            ))}
                                        </select>
                                        <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 rotate-90" />
                                    </div>
                                ) : (
                                    <input 
                                        required 
                                        type={field.type || 'text'} 
                                        step={field.step} 
                                        name={field.name} 
                                        value={formData[field.name] || ''} 
                                        onChange={handleChange} 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-health-500/10 focus:border-health-500 transition-all font-bold text-sm" 
                                    />
                                )}
                            </div>
                        ))}
                        <div className="col-span-2 flex gap-4 pt-6">
                            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">Cancelar</button>
                            <button type="submit" className="flex-1 px-8 py-4 bg-health-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-health-500/20 hover:bg-health-600 transition-all">
                                {formData.id ? 'Guardar Cambios' : 'Crear Registro'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- CLIENT DETAIL FLYOUT (THE "FICHA TÉCNICA") ---
const ClientDetailFlyout = ({ isOpen, onClose, client, onSave, planes, rutinas }) => {
    const [activeTab, setActiveTab] = useState('perfil');
    const [editedClient, setEditedClient] = useState({});
    const [assignedPlan, setAssignedPlan] = useState(null);
    const [assignedRoutine, setAssignedRoutine] = useState(null);

    useEffect(() => {
        if (client) {
            let initialClient = { ...client };
            // Auto-calculate next appointment if missing on load
            if (initialClient.fechaUltimaCita && !initialClient.fechaProximaCita) {
                const days = (initialClient.tarifa === 'Premium') ? 7 : 15;
                const next = new Date(new Date(initialClient.fechaUltimaCita).getTime() + (days * 24 * 60 * 60 * 1000));
                initialClient.fechaProximaCita = next.toISOString().split('T')[0];
            }
            setEditedClient(initialClient);
            setAssignedPlan(planes.find(p => p.usuarioId == client.id) || { nombrePlan: '', tipoDieta: '', descripcion: '', usuarioId: client.id });
            setAssignedRoutine(rutinas.find(r => r.usuarioId == client.id) || { nombreRutina: '', nivel: 'Intermedio', descripcion: '', usuarioId: client.id });
        }
    }, [client, planes, rutinas]);

    if (!client) return null;

    const handleClientChange = (e) => {
        const { name, value, type } = e.target;
        let newClient = { ...editedClient, [name]: type === 'number' ? parseFloat(value) : value };

        // Auto-calculate next appointment
        if (name === 'fechaUltimaCita' || name === 'tarifa') {
            const lastDate = name === 'fechaUltimaCita' ? value : newClient.fechaUltimaCita;
            const currentTarifa = name === 'tarifa' ? value : newClient.tarifa;
            
            if (lastDate) {
                const days = currentTarifa === 'Premium' ? 7 : 15;
                const next = new Date(new Date(lastDate).getTime() + (days * 24 * 60 * 60 * 1000));
                newClient.fechaProximaCita = next.toISOString().split('T')[0];
            }
        }

        setEditedClient(newClient);
    };

    const handlePlanChange = (e) => {
        const { name, value } = e.target;
        setAssignedPlan({ ...assignedPlan, [name]: value });
    };

    const handleRoutineChange = (e) => {
        const { name, value } = e.target;
        setAssignedRoutine({ ...assignedRoutine, [name]: value });
    };

    const togglePro = () => {
        setEditedClient({ ...editedClient, isPro: !editedClient.isPro });
    };

    const handleSaveAll = () => {
        onSave(editedClient, assignedPlan, assignedRoutine);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-10 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col border border-slate-100 dark:border-slate-800 overflow-hidden pointer-events-auto">
                        {/* Header */}
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
                            <div className="flex items-center gap-6">
                                <button onClick={onClose} className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-red-500 transition-all shadow-sm group">
                                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Perfil del Cliente</h2>
                                    <p className="text-[10px] font-black text-health-500 dark:text-health-400 uppercase tracking-widest mt-1">Protocolo #{client.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>
                            <button onClick={handleSaveAll} className="flex items-center gap-3 px-6 py-3 bg-health-500 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-health-500/20 hover:bg-health-600 transition-all">
                                <Save size={16} /> Guardar Cambios
                            </button>
                        </div>

                        {/* Profile Summary */}
                        <div className="p-8 flex items-center gap-8 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800">
                            <div className="w-24 h-24 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center text-3xl font-black shadow-xl">
                                {editedClient.nombre?.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{editedClient.nombre}</h3>
                                        <select 
                                            name="tarifa"
                                            value={editedClient.tarifa || 'Basic'}
                                            onChange={handleClientChange}
                                            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none appearance-none cursor-pointer ${editedClient.tarifa === 'Premium' ? 'bg-amber-500 text-white' : editedClient.tarifa === 'Plus' ? 'bg-indigo-500 text-white' : 'bg-health-500 text-white'}`}
                                        >
                                            <option value="Basic" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🌱 Basic</option>
                                            <option value="Plus" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🚀 Plus</option>
                                            <option value="Premium" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">💎 Premium</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-6 items-center mt-4">
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold"><Mail size={14} /> {editedClient.email}</div>
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold">
                                            <Calendar size={14} className="text-health-500" /> 
                                            <span className="uppercase text-[9px] tracking-tighter">Última Cita:</span>
                                            <input 
                                                type="date" 
                                                name="fechaUltimaCita" 
                                                value={editedClient.fechaUltimaCita || ''} 
                                                onChange={handleClientChange}
                                                className="bg-transparent border-none p-0 text-slate-900 dark:text-white font-black text-xs focus:ring-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold">
                                            <Calendar size={14} className="text-wellness-500" /> 
                                            <span className="uppercase text-[9px] tracking-tighter">Próxima Cita:</span>
                                            <input 
                                                type="date" 
                                                name="fechaProximaCita" 
                                                value={editedClient.fechaProximaCita || ''} 
                                                onChange={handleClientChange}
                                                className="bg-transparent border-none p-0 text-slate-900 dark:text-white font-black text-xs focus:ring-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {/* Tabs */}
                        <div className="flex px-8 border-b border-slate-50 dark:border-slate-800 gap-8">
                            {[
                                { id: 'perfil', label: 'Biometría', icon: <Activity size={16} /> },
                                { id: 'dieta', label: 'Nutrición', icon: <Utensils size={16} /> },
                                { id: 'entreno', label: 'Entrenamiento', icon: <Dumbbell size={16} />, disabled: editedClient.tarifa === 'Basic' }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                                    className={`py-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${tab.disabled ? 'opacity-30 cursor-not-allowed' : activeTab === tab.id ? 'border-health-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {activeTab === 'perfil' && (
                                <div className="space-y-10">
                                    <section>
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <Scale size={16} className="text-health-500" /> Composición Corporal
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <MetricInput label="Peso Actual (kg)" name="pesoActual" value={editedClient.pesoActual} onChange={handleClientChange} />
                                            <MetricInput label="Grasa (%)" name="porcentajeGrasa" value={editedClient.porcentajeGrasa} onChange={handleClientChange} />
                                            <MetricInput label="Altura (m)" name="altura" value={editedClient.altura} onChange={handleClientChange} step="0.01" />
                                            <MetricInput label="Edad" name="edad" value={editedClient.edad} onChange={handleClientChange} type="number" />
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <TrendingUp size={16} className="text-indigo-500" /> Perímetro Antropométrico
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <MetricInput label="Pecho (cm)" name="medidaPecho" value={editedClient.medidaPecho} onChange={handleClientChange} />
                                            <MetricInput label="Cintura (cm)" name="medidaCintura" value={editedClient.medidaCintura} onChange={handleClientChange} />
                                            <MetricInput label="Brazos (cm)" name="medidaBrazos" value={editedClient.medidaBrazos} onChange={handleClientChange} />
                                            <MetricInput label="Piernas (cm)" name="medidaPiernas" value={editedClient.medidaPiernas} onChange={handleClientChange} />
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'dieta' && (
                                <div className="space-y-8">
                                    <div className="bg-health-50 dark:bg-health-900/10 rounded-3xl p-8 border border-health-100/50 dark:border-health-800/30">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-health-600 dark:text-health-400 shadow-sm"><Utensils size={24} /></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-[10px] font-black text-health-600 dark:text-health-400 uppercase tracking-widest">Protocolo Nutricional</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Importar:</span>
                                                        <select 
                                                            onChange={(e) => {
                                                                const template = planes.find(p => p.id == e.target.value);
                                                                if (template) {
                                                                    setAssignedPlan({ ...assignedPlan, nombrePlan: template.nombrePlan, tipoDieta: template.tipoDieta, descripcion: template.descripcion });
                                                                }
                                                            }}
                                                            className="bg-white dark:bg-slate-800 border border-health-100 dark:border-health-800 rounded-lg px-2 py-1 text-[9px] font-black text-health-600 focus:outline-none"
                                                        >
                                                            <option value="">Seleccionar...</option>
                                                            {planes.filter(p => !p.usuarioId).map(p => (
                                                                <option key={p.id} value={p.id}>{p.nombrePlan}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <input 
                                                    name="nombrePlan" 
                                                    value={assignedPlan.nombrePlan || ''} 
                                                    onChange={handlePlanChange} 
                                                    placeholder="Nombre de la dieta..."
                                                    className="bg-transparent border-none focus:ring-0 p-0 text-xl font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Objetivo del Plan</label>
                                            <input 
                                                name="tipoDieta" 
                                                value={assignedPlan.tipoDieta || ''} 
                                                onChange={handlePlanChange}
                                                className="w-full bg-white dark:bg-slate-800 rounded-2xl px-5 py-4 text-sm font-bold border border-health-100/50 dark:border-health-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-health-500/5 transition-all"
                                                placeholder="Ej: Recomposición corporal"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Desglose Semanal / Diario</label>
                                        <textarea 
                                            name="descripcion" 
                                            value={assignedPlan.descripcion || ''} 
                                            onChange={handlePlanChange}
                                            rows={12}
                                            className="w-full bg-slate-50 dark:bg-slate-800 rounded-3xl px-8 py-8 text-sm font-medium border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-health-500/5 transition-all leading-relaxed"
                                            placeholder="Introduce aquí las comidas y porciones..."
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'entreno' && (
                                <div className="space-y-8">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100/50 dark:border-indigo-800/30">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm"><Dumbbell size={24} /></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Sistema de Entrenamiento</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Importar:</span>
                                                        <select 
                                                            onChange={(e) => {
                                                                const template = rutinas.find(r => r.id == e.target.value);
                                                                if (template) {
                                                                    setAssignedRoutine({ ...assignedRoutine, nombreRutina: template.nombreRutina, nivel: template.nivel, descripcion: template.descripcion });
                                                                }
                                                            }}
                                                            className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800 rounded-lg px-2 py-1 text-[9px] font-black text-indigo-600 focus:outline-none"
                                                        >
                                                            <option value="">Seleccionar...</option>
                                                            {rutinas.filter(r => !r.usuarioId).map(r => (
                                                                <option key={r.id} value={r.id}>{r.nombreRutina}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <input 
                                                    name="nombreRutina" 
                                                    value={assignedRoutine.nombreRutina || ''} 
                                                    onChange={handleRoutineChange} 
                                                    placeholder="Nombre de la rutina..."
                                                    className="bg-transparent border-none focus:ring-0 p-0 text-xl font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Nivel de Intensidad</label>
                                            <select 
                                                name="nivel" 
                                                value={assignedRoutine.nivel || 'Intermedio'} 
                                                onChange={handleRoutineChange}
                                                className="w-full bg-white dark:bg-slate-800 rounded-2xl px-5 py-4 text-sm font-bold border border-indigo-100/50 dark:border-indigo-800/30 text-slate-900 dark:text-white focus:outline-none appearance-none"
                                            >
                                                <option className="dark:bg-slate-800">Principiante</option>
                                                <option className="dark:bg-slate-800">Intermedio</option>
                                                <option className="dark:bg-slate-800">Avanzado</option>
                                                <option className="dark:bg-slate-800">Atleta de Élite</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Programación de Sesiones</label>
                                        <textarea 
                                            name="descripcion" 
                                            value={assignedRoutine.descripcion || ''} 
                                            onChange={handleRoutineChange}
                                            rows={12}
                                            className="w-full bg-slate-50 dark:bg-slate-800 rounded-3xl px-8 py-8 text-sm font-medium border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all leading-relaxed"
                                            placeholder="Describe los bloques de entrenamiento..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const MetricInput = ({ label, value, onChange, name, type = "number", step = "0.1" }) => (
    <div className="group">
        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-1">{label}</label>
        <input 
            type={type} step={step} name={name} value={value || ''} onChange={onChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-black focus:outline-none focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-white/5 focus:border-slate-900/20 dark:focus:border-white/20 transition-all"
        />
    </div>
);

const DashboardNutricionista = ({ onLogout }) => {
    const userEmail = localStorage.getItem('user');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);

    const [usuarios, setUsuarios] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [activities, setActivities] = useState([
        { id: 1, user: 'Juan Pérez', action: 'actualizó peso -1.2kg', time: '12m', type: 'weight' },
        { id: 2, user: 'María García', action: 'completó bloque PUSH', time: '45m', type: 'routine' },
        { id: 3, user: 'Carlos Ruiz', action: 'solicitó revisión de dieta', time: '2h', type: 'alert' }
    ]);

    const [searchUsuarios, setSearchUsuarios] = useState('');
    const [searchPlanes, setSearchPlanes] = useState('');
    const [searchRutinas, setSearchRutinas] = useState('');
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });
    const [deleteConfirm, setDeleteConfirm] = useState(null); 
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const filteredUsuarios = useMemo(() => {
        return usuarios.filter(u => 
            u.nombre?.toLowerCase().includes(searchUsuarios.toLowerCase()) || 
            u.email?.toLowerCase().includes(searchUsuarios.toLowerCase())
        );
    }, [usuarios, searchUsuarios]);

    const filteredPlanes = useMemo(() => {
        return planes.filter(p => !p.usuarioId && (
            p.nombrePlan?.toLowerCase().includes(searchPlanes.toLowerCase()) || 
            p.tipoDieta?.toLowerCase().includes(searchPlanes.toLowerCase())
        ));
    }, [planes, searchPlanes]);

    const filteredRutinas = useMemo(() => {
        return rutinas.filter(r => !r.usuarioId && (
            r.nombreRutina?.toLowerCase().includes(searchRutinas.toLowerCase()) || 
            r.nivel?.toLowerCase().includes(searchRutinas.toLowerCase())
        ));
    }, [rutinas, searchRutinas]);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

        try {
            if (userEmail) {
                const profileRes = await fetchAPI(`/nutricionistas/email/${userEmail}`, { headers }).then(res => res.ok ? res.json() : null);
                if (profileRes) setProfile(profileRes);
            }
            const [userRes, planRes, rutRes] = await Promise.all([
                fetchAPI('/usuarios', { headers }).then(r => r.ok ? r.json() : []),
                fetchAPI('/planes', { headers }).then(r => r.ok ? r.json() : []),
                fetchAPI('/rutinas', { headers }).then(r => r.ok ? r.json() : [])
            ]);

            setUsuarios(userRes); 
            setPlanes(planRes); 
            setRutinas(rutRes); 
        } catch (error) { console.error(error); }
        finally { setTimeout(() => setLoading(false), 500); }
    };

    useEffect(() => { fetchData(); }, [userEmail]);

    const handleSaveClientData = async (editedClient, assignedPlan, assignedRoutine) => {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

        try {
            // 1. Save User Metrics
            await fetchAPI(`/usuarios/${editedClient.id}`, {
                method: 'PUT', headers, body: JSON.stringify(editedClient)
            });

            // 2. Save/Update Nutrition Plan
            const planEndpoint = assignedPlan.id ? `/planes/${assignedPlan.id}` : '/planes';
            const planMethod = assignedPlan.id ? 'PUT' : 'POST';
            await fetchAPI(planEndpoint, { method: planMethod, headers, body: JSON.stringify(assignedPlan) });

            // 3. Save/Update Training Routine (if pro)
            if (editedClient.isPro) {
                const rutEndpoint = assignedRoutine.id ? `/rutinas/${assignedRoutine.id}` : '/rutinas';
                const rutMethod = assignedRoutine.id ? 'PUT' : 'POST';
                await fetchAPI(rutEndpoint, { method: rutMethod, headers, body: JSON.stringify(assignedRoutine) });
            }

            setSelectedClient(null);
            fetchData();
        } catch (e) { console.error(e); }
    };

    const handleGenericSave = async (formData) => {
        const type = modalConfig.type;

        if (type === 'preferences') {
            if (formData.theme) {
                localStorage.setItem('theme', formData.theme);
                if (formData.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            setModalConfig({ isOpen: false, type: null, data: null });
            return;
        }

        const isEdit = !!formData.id;
        const endpoint = `/${type}${isEdit ? `/${formData.id}` : ''}`;
        const method = isEdit ? 'PUT' : 'POST';
        const token = localStorage.getItem('token');

        try {
            const res = await fetchAPI(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            if (res.ok) { 
                setModalConfig({ isOpen: false, type: null, data: null }); 
                fetchData(); 
            }
        } catch (e) { console.error(e); }
    };

    const handleActualDelete = async () => {
        if (!deleteConfirm) return;
        const { type, id } = deleteConfirm;
        const token = localStorage.getItem('token');
        try {
            await fetchAPI(`/${type}/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            setDeleteConfirm(null);
            fetchData();
        } catch (e) { console.error(e); }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-surface-base dark:bg-slate-950 flex items-center justify-center z-[200]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-health-500/10 border-t-health-500 rounded-full animate-spin mx-auto mb-8"></div>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Accediendo al Panel de Nutricionista</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-base dark:bg-slate-950 flex text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden relative">
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>
            {/* Sidebar refined - Premium Slate aesthetic */}
            <aside className={`
                w-80 fixed inset-y-0 left-0 bg-slate-900 dark:bg-slate-950 border-r border-white/5 z-[70] flex flex-col p-10 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.2)]
                transition-transform duration-500 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="mb-20 flex items-center gap-4">
                    <div className="w-12 h-12 bg-health-500 rounded-2xl flex items-center justify-center shadow-lg shadow-health-500/20">
                        <Activity className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-white">FitLife<span className="text-health-500">Pro</span></h1>
                </div>

                <nav className="flex-1 space-y-3">
                    {[
                        { id: 'dashboard', label: 'Visión General', icon: <LayoutDashboard size={20} /> },
                        { id: 'usuarios', label: 'Clientes', icon: <Users size={20} /> },
                        { id: 'planes', label: 'Nutrición', icon: <FileText size={20} /> },
                        { id: 'rutinas', label: 'Entrenamientos', icon: <Dumbbell size={20} /> },
                        { id: 'cuentas', label: 'Gestión de Cuentas', icon: <Settings size={20} /> }
                    ].map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => { setActiveTab(item.id); setIsProfileOpen(false); setIsSidebarOpen(false); }} 
                            className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-health-500 text-white shadow-2xl shadow-health-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>

                <button onClick={onLogout} className="mt-auto flex items-center gap-5 px-8 py-5 text-slate-300 font-black text-[11px] uppercase tracking-widest hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all">
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Area */}
            <main className="flex-1 lg:ml-80 p-6 md:p-12 bg-surface-base dark:bg-slate-950 overflow-y-auto min-h-screen">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 bg-surface-base/80 dark:bg-slate-900/50 backdrop-blur-md p-6 -m-6 mb-10 rounded-3xl border border-transparent dark:border-slate-800/50">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm text-slate-400"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <span className="text-health-500 dark:text-health-400 font-black text-[10px] uppercase tracking-[0.5em] mb-3 block">Gabinete de Nutrición Deportiva</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter capitalize">{activeTab === 'dashboard' ? 'Métricas Globales' : activeTab === 'usuarios' ? 'Gestión de Clientes' : activeTab}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs font-black text-slate-900 dark:text-white">{(profile?.nombre || 'Nutr. FitLife').replace(/supabase/gi, '').trim() || 'Nutricionista Principal'}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Nutricionista Principal</p>
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-health-500 dark:text-health-400 shadow-sm hover:border-health-500 transition-all"
                            >
                                <User size={28} />
                            </button>
                            
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 z-[100]"
                                    >
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Mi Cuenta</p>
                                            <button 
                                                onClick={() => {
                                                    setModalConfig({
                                                        isOpen: true,
                                                        type: 'nutricionistas',
                                                        title: 'Editar Mi Perfil',
                                                        fields: [
                                                            { name: 'nombre', label: 'Nombre Completo', type: 'text' },
                                                            { name: 'email', label: 'Email Institucional', type: 'email' },
                                                            { name: 'password', label: 'Nueva Contraseña', type: 'password' }
                                                        ],
                                                        data: profile
                                                    });
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all text-left"
                                            >
                                                <User size={16} /> Editar Perfil
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setModalConfig({
                                                        isOpen: true,
                                                        type: 'preferences',
                                                        title: 'Preferencias del Sistema',
                                                        fields: [
                                                            { name: 'theme', label: 'Modo Visual', type: 'select', options: [{id:'dark', nombre:'Modo Oscuro'}, {id:'light', nombre:'Modo Claro'}] },
                                                            { name: 'notifications', label: 'Notificaciones Push', type: 'select', options: [{id:'on', nombre:'Activadas'}, {id:'off', nombre:'Desactivadas'}] }
                                                        ],
                                                        data: { theme: localStorage.getItem('theme'), notifications: 'on' }
                                                    });
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all text-left"
                                            >
                                                <Settings size={16} /> Preferencias
                                            </button>
                                            <div className="h-px bg-slate-50 dark:bg-slate-800 mx-2" />
                                            <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-xs font-bold text-red-500 transition-all text-left">
                                                <LogOut size={16} /> Cerrar Sesión
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {activeTab === 'dashboard' ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { l: 'Clientes', v: usuarios.length, i: <Users />, c: 'text-wellness-600' },
                                { l: 'Planes Activos', v: planes.length, i: <FileText />, c: 'text-health-600' },
                                { l: 'Tasa Pro', v: `${((usuarios.filter(u => u.isPro).length / (usuarios.length || 1)) * 100).toFixed(0)}%`, i: <Zap />, c: 'text-amber-600' },
                                { l: 'Feedback Semanal', v: '92%', i: <TrendingUp />, c: 'text-indigo-600' }
                            ].map((s, i) => (
                                <div key={i} className="card-premium p-10 bg-white dark:bg-slate-900 group cursor-default border-slate-100 dark:border-slate-800">
                                    <div className={`w-14 h-14 bg-slate-50 dark:bg-slate-800 ${s.c} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>{s.i}</div>
                                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">{s.l}</p>
                                    <p className="text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter">{s.v}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-12 gap-10">
                            <div className="lg:col-span-8 card-premium p-12 bg-white dark:bg-slate-900 h-[500px] border-slate-100 dark:border-slate-800">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 tracking-tighter">Actividad de Clientes</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={[
                                            { n: 'Lun', v: 40 }, { n: 'Mar', v: 65 }, { n: 'Mie', v: 55 }, { n: 'Jue', v: 85 }, { n: 'Vie', v: 75 }, { n: 'Sab', v: 95 }, { n: 'Dom', v: 110 }
                                        ]}>
                                            <defs>
                                                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
                                            </defs>
                                            <XAxis dataKey="n" axisLine={false} tickLine={false} tickMargin={15} stroke="#64748b" fontSize={10} fontWeight={900} />
                                            <Area type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={5} fill="url(#g)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="lg:col-span-4 card-premium p-10 bg-white dark:bg-slate-900 flex flex-col h-[500px] border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter">Últimas Acciones</h3>
                                <div className="space-y-8 flex-1 overflow-y-auto custom-scrollbar pr-4">
                                    {activities.map(a => (
                                        <div key={a.id} className="flex gap-5 group">
                                            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-health-50 dark:group-hover:bg-health-900/20 group-hover:text-health-600 transition-all shadow-sm shrink-0 border border-slate-50 dark:border-slate-800"><Activity size={20} /></div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900 dark:text-white">{a.user}</p>
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">{a.action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'cuentas' ? (
                    <div className="space-y-12">
                        <div className="card-premium p-12 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Administración de Cuentas</h3>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-widest">Control de acceso y perfiles de sistema</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setModalConfig({
                                            isOpen: true,
                                            type: 'nutricionistas',
                                            title: 'Nueva Cuenta',
                                            fields: [
                                                { name: 'nombre', label: 'Nombre Completo', type: 'text' },
                                                { name: 'email', label: 'Email', type: 'email' },
                                                { name: 'password', label: 'Contraseña Provisional', type: 'password' }
                                            ],
                                            data: null
                                        });
                                    }}
                                    className="px-8 py-4 bg-slate-900 dark:bg-health-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-health-500 transition-all flex items-center gap-3"
                                >
                                    <Plus size={18} /> Nueva Cuenta
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {usuarios.slice(0, 8).map(u => (
                                    <div key={u.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400"><User size={24} /></div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white">{u.nombre}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">{u.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={() => {
                                                    setModalConfig({
                                                        isOpen: true,
                                                        type: 'usuarios',
                                                        title: `Cambiar Password: ${u.nombre}`,
                                                        fields: [
                                                            { name: 'password', label: 'Nueva Contraseña', type: 'password' }
                                                        ],
                                                        data: u
                                                    });
                                                }}
                                                className="px-4 py-2 bg-white dark:bg-slate-900 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-health-500 border border-slate-100 dark:border-slate-800 rounded-xl transition-all"
                                            >
                                                Cambiar Pass
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setModalConfig({
                                                        isOpen: true,
                                                        type: 'usuarios',
                                                        title: `Editar Rol: ${u.nombre}`,
                                                        fields: [
                                                            { name: 'tarifa', label: 'Plan / Rol', type: 'select', options: [{id:'Basic', nombre:'Basic'}, {id:'Plus', nombre:'Plus'}, {id:'Premium', nombre:'Premium'}] }
                                                        ],
                                                        data: u
                                                    });
                                                }}
                                                className="px-4 py-2 bg-white dark:bg-slate-900 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-health-500 border border-slate-100 dark:border-slate-800 rounded-xl transition-all"
                                            >
                                                Editar Permisos
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card-premium bg-white dark:bg-slate-900 overflow-hidden border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.02)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-slate-100 dark:border-slate-800">
                        <div className="p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-6">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {activeTab === 'usuarios' ? 'Gestión de Clientes' : activeTab === 'planes' ? 'Biblioteca de Dietas' : 'Sistemas de Entrenamiento'}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative flex-1">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                                    <input 
                                        placeholder={`Buscar ${activeTab === 'usuarios' ? 'clientes...' : activeTab === 'planes' ? 'dietas...' : 'entrenamientos...'}`} 
                                        value={activeTab === 'usuarios' ? searchUsuarios : activeTab === 'planes' ? searchPlanes : searchRutinas}
                                        onChange={(e) => {
                                            if (activeTab === 'usuarios') setSearchUsuarios(e.target.value);
                                            else if (activeTab === 'planes') setSearchPlanes(e.target.value);
                                            else setSearchRutinas(e.target.value);
                                        }}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 dark:focus:ring-health-500/10 min-w-[300px] transition-all text-slate-900 dark:text-white" 
                                    />
                                </div>
                                <button 
                                    onClick={() => {
                                        const config = {
                                            usuarios: { type: 'usuarios', title: 'Nuevo Cliente', fields: [
                                                { name: 'nombre', label: 'Nombre Completo', type: 'text' },
                                                { name: 'email', label: 'Email', type: 'email' },
                                                { name: 'edad', label: 'Edad', type: 'number' },
                                                { name: 'pesoActual', label: 'Peso (kg)', type: 'number' },
                                                { name: 'altura', label: 'Altura (m)', type: 'number', step: '0.01' }
                                            ]},
                                            planes: { type: 'planes', title: 'Nueva Plantilla Nutricional', fields: [
                                                { name: 'nombrePlan', label: 'Nombre del Plan', type: 'text' },
                                                { name: 'tipoDieta', label: 'Tipo de Dieta', type: 'text' },
                                                { name: 'descripcion', label: 'Descripción del Plan', type: 'textarea' }
                                            ]},
                                            rutinas: { type: 'rutinas', title: 'Nueva Plantilla de Entrenamiento', fields: [
                                                { name: 'nombreRutina', label: 'Nombre de la Rutina', type: 'text' },
                                                { name: 'nivel', label: 'Nivel', type: 'select', options: [{id:'Principiante', nombre:'Principiante'}, {id:'Intermedio', nombre:'Intermedio'}, {id:'Avanzado', nombre:'Avanzado'}] },
                                                { name: 'duracion', label: 'Duración (semanas)', type: 'number' },
                                                { name: 'descripcion', label: 'Descripción de la Rutina', type: 'textarea' }
                                            ]}
                                        };
                                        setModalConfig({ isOpen: true, ...config[activeTab], data: null });
                                    }}
                                    className="px-8 py-4 bg-slate-900 dark:bg-health-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 dark:shadow-health-900/10 hover:bg-health-500 transition-all flex items-center justify-center gap-3"
                                >
                                    <Plus size={18} /> {activeTab === 'usuarios' ? 'Nuevo Cliente' : activeTab === 'planes' ? 'Nuevo Plan' : 'Nueva Rutina'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                {activeTab === 'usuarios' ? (
                                    <>
                                        <thead>
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800">
                                                <th className="p-8">Cliente</th>
                                                <th className="p-8">Estado Vital</th>
                                                <th className="p-8">Tarifa Actual</th>
                                                <th className="p-8">Próxima Cita</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                            { filteredUsuarios.map(u => (
                                                <tr key={u.id} onClick={() => setSelectedClient(u)} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group">
                                                    <td className="p-8">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-sm border border-slate-100 dark:border-slate-700">{u.nombre?.charAt(0)}</div>
                                                            <div>
                                                                <p className="font-black text-slate-900 dark:text-white leading-none mb-1.5">{u.nombre}</p>
                                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        <div className="flex items-center gap-6">
                                                            <div><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Peso</p><p className="font-black text-slate-900 dark:text-white">{u.pesoActual} kg</p></div>
                                                            <div><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Grasa</p><p className="font-black text-health-600 dark:text-health-400">{u.porcentajeGrasa || 0}%</p></div>
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${u.tarifa === 'Premium' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30' : u.tarifa === 'Plus' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30' : 'bg-health-50 dark:bg-health-900/20 text-health-600 dark:text-health-400 border border-health-100 dark:border-health-800/30'}`}>
                                                            {u.tarifa === 'Premium' ? <Zap size={10} /> : u.tarifa === 'Plus' ? <Zap size={10} /> : <Target size={10} />}
                                                            {u.tarifa || 'Basic'}
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        {(u.fechaProximaCita || u.fechaUltimaCita) ? (() => {
                                                            const nextDateStr = u.fechaProximaCita || (() => {
                                                                const days = u.tarifa === 'Premium' ? 7 : 15;
                                                                const last = new Date(u.fechaUltimaCita);
                                                                return new Date(last.getTime() + (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
                                                            })();
                                                            const next = new Date(nextDateStr);
                                                            const today = new Date();
                                                            const remaining = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
                                                            return (
                                                                <div className="flex flex-col">
                                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${remaining < 0 ? 'text-red-500' : remaining < 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                                                                        {remaining < 0 ? 'Vencido' : remaining === 0 ? 'Hoy' : `En ${remaining} días`}
                                                                    </span>
                                                                    <span className="text-[9px] text-slate-400 font-medium">Cita: {next.toLocaleDateString()}</span>
                                                                </div>
                                                            );
                                                        })() : <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Sin Cita</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                ) : activeTab === 'planes' ? (
                                    <>
                                        <thead>
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800">
                                                <th className="p-8">Nombre del Plan</th>
                                                <th className="p-8">Tipo de Dieta</th>
                                                <th className="p-8">Descripción Corta</th>
                                                <th className="p-8 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                            { filteredPlanes.map(p => (
                                                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                                                    <td className="p-8 font-black text-slate-900 dark:text-white">{p.nombrePlan}</td>
                                                    <td className="p-8">
                                                        <span className="px-3 py-1.5 rounded-lg bg-health-50 dark:bg-health-900/20 text-health-600 dark:text-health-400 text-[9px] font-black uppercase tracking-widest border border-health-100 dark:border-health-800/30">{p.tipoDieta}</span>
                                                    </td>
                                                    <td className="p-8 text-slate-400 dark:text-slate-500 text-xs font-medium max-w-xs truncate">{p.descripcion}</td>
                                                    <td className="p-8 text-right">
                                                        <button onClick={() => setDeleteConfirm({ type: 'planes', id: p.id })} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                ) : (
                                    <>
                                        <thead>
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800">
                                                <th className="p-8">Nombre de la Rutina</th>
                                                <th className="p-8">Nivel</th>
                                                <th className="p-8">Semanas</th>
                                                <th className="p-8 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                            { filteredRutinas.map(r => (
                                                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                                                    <td className="p-8 font-black text-slate-900 dark:text-white">{r.nombreRutina}</td>
                                                    <td className="p-8">
                                                        <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800/30">{r.nivel}</span>
                                                    </td>
                                                    <td className="p-8 font-black text-slate-400 dark:text-slate-500 text-xs">{r.duracion} sem</td>
                                                    <td className="p-8 text-right">
                                                        <button onClick={() => setDeleteConfirm({ type: 'rutinas', id: r.id })} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                    </div>
                )}
            </main>

            <ClientDetailFlyout 
                isOpen={!!selectedClient}
                onClose={() => setSelectedClient(null)}
                client={selectedClient}
                planes={planes}
                rutinas={rutinas}
                onSave={handleSaveClientData}
            />

            <AdminModal 
                isOpen={modalConfig.isOpen} 
                onClose={() => setModalConfig({ isOpen: false, type: null, data: null })} 
                title={modalConfig.title} 
                fields={modalConfig.fields || []} 
                initialData={modalConfig.data} 
                onSave={handleGenericSave} 
            />

            {deleteConfirm && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-6"
                >
                    <motion.div 
                        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-4xl w-full max-w-md p-10 shadow-2xl text-center border border-slate-100 dark:border-slate-800"
                    >
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Trash2 size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">¿Confirmar Eliminación?</h3>
                        <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-10 text-sm px-4">Esta acción eliminará de forma permanente todos los registros vinculados a este cliente.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">Cancelar</button>
                            <button onClick={handleActualDelete} className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all">Eliminar Registro</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardNutricionista;
