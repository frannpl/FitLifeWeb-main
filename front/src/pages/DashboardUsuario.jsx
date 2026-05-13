import React, { useState, useEffect } from 'react';
import { 
    Activity, Calendar, Clock, ChevronRight, User, Users, Settings, LogOut, 
    TrendingUp, Scale, Zap, Target, Apple, Dumbbell, Layout, Info, Utensils, MessageCircle,
    Bell, Shield, Moon, Sun, Globe, Mail, Phone, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../api';

const DashboardUsuario = () => {
    const location = useLocation();
    const userStr = localStorage.getItem('user');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'diet', 'training', 'settings'
    const [saveStatus, setSaveStatus] = useState(null);

    const [assignedPlan, setAssignedPlan] = useState(null);
    const [assignedRoutine, setAssignedRoutine] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && ['overview', 'diet', 'training', 'settings'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [location.search]);

    // Ensure we scroll to top when changing tabs
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (userStr && token) {
            fetchAPI(`/usuarios/email/${userStr}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        const proData = JSON.parse(localStorage.getItem(`pro_usuarios_${data.id}`) || '{}');
                        const mergedProfile = { ...data, ...proData };
                        setProfile(mergedProfile);

                        fetchAPI('/planes', { headers: { 'Authorization': `Bearer ${token}` }})
                            .then(r => r.json())
                            .then(planes => {
                                const myPlan = planes.find(p => p.usuarioId == data.id);
                                if (myPlan) setAssignedPlan(myPlan);
                            });

                        fetchAPI('/rutinas', { headers: { 'Authorization': `Bearer ${token}` }})
                            .then(r => r.json())
                            .then(rutinas => {
                                const myRoutine = rutinas.find(r => r.usuarioId == data.id);
                                if (myRoutine) setAssignedRoutine(myRoutine);
                            });
                    }
                    setLoading(false);
                })
                .catch(err => { console.error(err); setLoading(false); });
        } else { setLoading(false); }
    }, [userStr]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaveStatus('loading');
        const token = localStorage.getItem('token');
        try {
            const res = await fetchAPI(`/usuarios/${profile.id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
            if (res.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus(null), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch (err) {
            console.error(err);
            setSaveStatus('error');
        }
    };

    const displayProfile = profile || { pesoActual: 72, altura: 1.75, edad: 28, nombre: userStr || 'Usuario' };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-surface-base dark:bg-slate-950 flex items-center justify-center z-[200]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-health-500/10 border-t-health-500 rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Cargando Perfil Nutricional</p>
                </div>
            </div>
        );
    }

    const renderOverview = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8 h-full">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-premium p-8 relative overflow-hidden bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-health-50 dark:bg-health-900/20 flex items-center justify-center text-health-500 dark:text-health-400">
                            <Users size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{displayProfile.nombre}</h2>
                            <p className="text-[10px] font-black text-health-500 dark:text-health-400 uppercase tracking-widest mt-1">
                                {displayProfile.tarifa === 'Premium' ? '💎 Miembro Premium' : displayProfile.tarifa === 'Plus' ? '🚀 Miembro Plus' : '🌱 Plan Basic'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { l: 'Peso Actual', v: `${displayProfile.pesoActual}kg`, c: 'text-slate-900 dark:text-white' },
                            { l: 'Masa Grasa', v: `${displayProfile.porcentajeGrasa || 15}%`, c: 'text-health-600 dark:text-health-400' },
                            { l: 'Altura', v: `${displayProfile.altura}m`, c: 'text-slate-900 dark:text-white' },
                            { l: 'IMC', v: (displayProfile.pesoActual / (displayProfile.altura * displayProfile.altura || 1)).toFixed(1), c: 'text-wellness-600 dark:text-wellness-400' }
                        ].map(s => (
                            <div key={s.l} className="bg-surface-muted dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mb-1">{s.l}</p>
                                <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card-premium p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 bg-health-50 dark:bg-health-900/20 rounded-xl flex items-center justify-center text-health-500 border border-health-100/50">
                            <Calendar size={24} />
                        </div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Seguimiento</span>
                    </div>
                    {displayProfile.fechaUltimaCita ? (() => {
                        const nextDateStr = displayProfile.fechaProximaCita || (() => {
                            const days = displayProfile.tarifa === 'Premium' ? 7 : 15;
                            return new Date(new Date(displayProfile.fechaUltimaCita).getTime() + (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
                        })();
                        const next = new Date(nextDateStr);
                        const remaining = Math.ceil((next - new Date()) / (1000 * 60 * 60 * 24));
                        return (
                            <div className="mb-8">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Días restantes del plan:</p>
                                <p className={`text-4xl font-black tracking-tighter ${remaining < 2 ? 'text-red-500 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                                    {remaining < 0 ? 'Expirado' : remaining === 0 ? 'Hoy' : remaining} {remaining > 0 && <span className="text-base">días</span>}
                                </p>
                                {remaining < 2 && (
                                    <p className="text-[9px] font-black text-red-400 uppercase mt-2">¡Prepara tu próxima cita!</p>
                                )}
                            </div>
                        );
                    })() : (
                        <div className="mb-8">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Pendiente de asignar cita</p>
                        </div>
                    )}
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tu Nutricionista:</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Julián Cubero</p>
                    <a 
                        href="https://wa.me/34618555371?text=Hola,%20soy%20un%20cliente%20de%20FitLife%20Pro%20y%20necesito%20una%20consulta." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-health-500 hover:bg-health-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-health-500/20 block text-center"
                    >
                        Contactar WhatsApp
                    </a>
                </motion.div>
            </div>

            {/* Main Content: Evolution & Shortcuts */}
            <div className="lg:col-span-8 flex flex-col gap-8 h-full overflow-y-auto overflow-x-hidden custom-scrollbar pr-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-premium p-6 md:p-10 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 border-b border-slate-50 dark:border-slate-800 pb-6 gap-4">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Métricas Antropométricas</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-health-500"></div> <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">Actual</span></div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800"></div> <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">Base</span></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Brazos', val: displayProfile.medidaBrazos, init: displayProfile.medidaBrazosInicial },
                            { label: 'Pecho', val: displayProfile.medidaPecho, init: displayProfile.medidaPechoInicial },
                            { label: 'Cintura', val: displayProfile.medidaCintura, init: displayProfile.medidaCinturaInicial },
                            { label: 'Piernas', val: displayProfile.medidaPiernas, init: displayProfile.medidaPiernasInicial },
                        ].map(m => (
                            <div key={m.label} className="group cursor-default">
                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">{m.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white group-hover:text-health-600 dark:group-hover:text-health-400 transition-colors">{m.val || 0}</span>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">cm</span>
                                </div>
                                <div className="mt-4 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-health-500" style={{ width: '100%' }}></div>
                                </div>
                                <p className="text-[9px] font-bold text-slate-500 dark:text-slate-600 mt-2 italic">Valor Base: {m.init || 0}cm</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {assignedPlan ? (
                        <motion.button onClick={() => setActiveTab('diet')} whileHover={{ y: -5 }} className="card-premium p-8 bg-white dark:bg-slate-900 text-left group border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 bg-health-50 dark:bg-health-900/20 text-health-600 dark:text-health-400 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-health-500 group-hover:text-white shadow-sm">
                                    <Utensils size={28} />
                                </div>
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-health-50 dark:group-hover:bg-health-900/20 transition-colors"><ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-health-500" /></div>
                            </div>
                            <span className="text-health-600 dark:text-health-400 font-black text-[9px] uppercase tracking-widest mb-2 block">Nutrición Activa</span>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{assignedPlan.nombrePlan}</h4>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium line-clamp-1">{assignedPlan.tipoDieta}</p>
                        </motion.button>
                    ) : (
                        <div className="card-premium p-8 bg-surface-muted dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center opacity-60">
                            <Utensils size={32} className="text-slate-200 dark:text-slate-700 mb-4" />
                            <p className="text-xs font-black text-slate-300 dark:text-slate-600 uppercase">Sin Plan Asignado</p>
                        </div>
                    )}

                    {assignedRoutine ? (
                        <motion.button onClick={() => setActiveTab('training')} whileHover={{ y: -5 }} className="card-premium p-8 bg-white dark:bg-slate-900 text-left group border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 bg-wellness-50 dark:bg-wellness-900/20 text-wellness-600 dark:text-wellness-400 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-wellness-500 group-hover:text-white shadow-sm">
                                    <Dumbbell size={28} />
                                </div>
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-wellness-50 dark:group-hover:bg-wellness-900/20 transition-colors"><ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-wellness-500" /></div>
                            </div>
                            <span className="text-wellness-600 dark:text-wellness-400 font-black text-[9px] uppercase tracking-widest mb-2 block">Sistema de Entrenamiento</span>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{assignedRoutine.nombreRutina}</h4>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium line-clamp-1">{assignedRoutine.nivel}</p>
                        </motion.button>
                    ) : (
                        <div className="card-premium p-8 bg-surface-muted dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center opacity-60">
                            <Dumbbell size={32} className="text-slate-200 dark:text-slate-700 mb-4" />
                            <p className="text-xs font-black text-slate-300 dark:text-slate-600 uppercase">Sin Rutina Asignada</p>
                        </div>
                    )}
                </div>
        </div>
    );

    const [settingsTab, setSettingsTab] = useState('profile');

    const renderSettings = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-4 space-y-6">
                <div className="card-premium p-8 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 rounded-3xl bg-health-50 dark:bg-health-900/20 flex items-center justify-center text-health-500 mb-4 border border-health-100 dark:border-health-800/30">
                            <User size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{profile?.nombre}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{profile?.email}</p>
                    </div>
                    <div className="space-y-2">
                        {[
                            { id: 'profile', icon: <User size={16} />, label: 'Mi Perfil Profesional' },
                            { id: 'privacy', icon: <Shield size={16} />, label: 'Privacidad y Seguridad' },
                            { id: 'notifications', icon: <Bell size={16} />, label: 'Notificaciones' },
                            { id: 'language', icon: <Globe size={16} />, label: 'Idioma y Región' }
                        ].map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => setSettingsTab(item.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left font-bold text-xs ${settingsTab === item.id ? 'bg-health-500 text-white shadow-lg shadow-health-500/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}
                            >
                                {item.icon} {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8">
                <div className="card-premium p-10 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50 dark:border-slate-800">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {settingsTab === 'profile' ? 'Mi Perfil' : settingsTab === 'privacy' ? 'Seguridad' : settingsTab === 'notifications' ? 'Notificaciones' : 'Preferencias'}
                        </h3>
                        {saveStatus === 'success' && <span className="text-health-500 text-[10px] font-black uppercase animate-pulse">¡Cambios Guardados!</span>}
                    </div>

                    {settingsTab === 'profile' ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                                    <input 
                                        value={profile?.nombre || ''} 
                                        onChange={e => setProfile({...profile, nombre: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                    <input 
                                        disabled
                                        value={profile?.email || ''} 
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-400 dark:text-slate-500 font-bold opacity-70 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Peso (kg)</label>
                                    <input 
                                        type="number" step="0.1"
                                        value={profile?.pesoActual || ''} 
                                        onChange={e => setProfile({...profile, pesoActual: parseFloat(e.target.value)})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Altura (m)</label>
                                    <input 
                                        type="number" step="0.01"
                                        value={profile?.altura || ''} 
                                        onChange={e => setProfile({...profile, altura: parseFloat(e.target.value)})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Edad</label>
                                    <input 
                                        type="number"
                                        value={profile?.edad || ''} 
                                        onChange={e => setProfile({...profile, edad: parseInt(e.target.value)})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={saveStatus === 'loading'}
                                    className="px-10 py-5 bg-health-500 hover:bg-health-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-health-500/20 flex items-center gap-3 text-[10px] uppercase tracking-widest disabled:opacity-50"
                                >
                                    <Save size={18} /> {saveStatus === 'loading' ? 'Guardando...' : 'Guardar Perfil'}
                                </button>
                            </div>
                        </form>
                    ) : settingsTab === 'privacy' ? (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Gestiona tu seguridad y contraseña de acceso.</p>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Confirmar Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/10 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => {setSaveStatus('success'); setTimeout(()=>setSaveStatus(null), 3000)}} className="px-10 py-5 bg-slate-900 dark:bg-slate-800 text-white font-black rounded-2xl hover:bg-health-500 transition-all text-[10px] uppercase tracking-widest">Actualizar Seguridad</button>
                        </div>
                    ) : settingsTab === 'notifications' ? (
                        <div className="space-y-8">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Configura cómo quieres recibir tus alertas de salud.</p>
                            <div className="space-y-4">
                                {[
                                    { t: 'Recordatorios de Dieta', d: 'Recibe alertas 15 min antes de cada comida.' },
                                    { t: 'Sesiones de Entrenamiento', d: 'Notificaciones sobre tus rutinas diarias.' },
                                    { t: 'Mensajes Directos', d: 'Avisos cuando tu nutricionista te escriba.' }
                                ].map((n, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white text-sm">{n.t}</p>
                                            <p className="text-[10px] text-slate-500 font-medium mt-1">{n.d}</p>
                                        </div>
                                        <div className="w-12 h-6 bg-health-500 rounded-full relative cursor-pointer shadow-inner">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => {setSaveStatus('success'); setTimeout(()=>setSaveStatus(null), 3000)}} className="px-10 py-5 bg-health-500 text-white font-black rounded-2xl hover:bg-health-600 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-health-500/20">Guardar Notificaciones</button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Idioma de la Interfaz</label>
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:outline-none appearance-none">
                                        <option>Español (España)</option>
                                        <option>English (UK)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Formato de Unidad</label>
                                    <div className="flex gap-4">
                                        <button className="flex-1 py-4 bg-health-500 text-white font-black rounded-xl text-[10px] uppercase">Métrico (kg/cm)</button>
                                        <button className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 text-slate-400 font-black rounded-xl text-[10px] uppercase">Imperial (lb/ft)</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => {setSaveStatus('success'); setTimeout(()=>setSaveStatus(null), 3000)}} className="px-10 py-5 bg-health-500 text-white font-black rounded-2xl hover:bg-health-600 transition-all text-[10px] uppercase tracking-widest">Cambiar Preferencias</button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-surface-base dark:bg-slate-950 pt-24 md:pt-40 pb-20 px-4 md:px-8 flex flex-col transition-colors duration-500">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 gap-8">
                    <div>
                        <span className="text-health-500 dark:text-health-400 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Panel Nutricional</span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Mi Proceso.</h1>
                    </div>
                    <div className="flex bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-sm border border-slate-100 dark:border-slate-800 w-full md:w-auto overflow-x-auto no-scrollbar">
                        {['overview', 'diet', 'training', 'settings'].map(tab => {
                            if (tab === 'training' && profile?.tarifa === 'Basic') return null;
                            return (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === tab ? 'bg-slate-900 dark:bg-health-600 text-white shadow-lg shadow-slate-900/20 dark:shadow-health-900/20' : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    {tab === 'overview' ? 'General' : tab === 'diet' ? 'Dieta' : tab === 'training' ? 'Entreno' : 'Ajustes'}
                                </button>
                            );
                        })}
                    </div>
                </header>

                <div className="flex-1 min-h-0">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                {(!assignedPlan && !assignedRoutine) && (
                                    <div className="mb-12 p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-4xl flex items-center gap-8">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm"><Info size={32} /></div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">¡Bienvenido a FitLife Web!</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tu nutricionista está preparando tu primer plan personalizado. En cuanto esté listo, aparecerá aquí automáticamente.</p>
                                        </div>
                                    </div>
                                )}
                                {renderOverview()}
                            </motion.div>
                        )}
                        {activeTab === 'settings' && <div key="settings">{renderSettings()}</div>}
                        {(activeTab === 'diet' || activeTab === 'training') && (
                            <motion.div key="content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="card-premium p-8 md:p-12 bg-white dark:bg-slate-900 h-full overflow-y-auto custom-scrollbar border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                                    {activeTab === 'diet' ? (assignedPlan?.nombrePlan || 'Plan Nutricional') : (assignedRoutine?.nombreRutina || 'Rutina de Entrenamiento')}
                                </h2>
                                <div className="prose dark:prose-invert prose-slate max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-line">
                                    {activeTab === 'diet' ? (assignedPlan?.descripcion || 'Tu nutricionista aún no ha redactado el detalle de este plan.') : (assignedRoutine?.descripcion || 'Tu nutricionista aún no ha redactado el detalle de esta rutina.')}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default DashboardUsuario;
