import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Activity } from 'lucide-react';
import { fetchAPI } from '../api';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isNutricionista, setIsNutricionista] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        edad: '',
        pesoActual: '',
        altura: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (isLogin) {
                response = await fetchAPI('/auth/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });
            } else {
                const endpoint = isNutricionista ? '/auth/registerNutricionista' : '/auth/register';
                response = await fetchAPI(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            if (!response.ok) {
                throw new Error('Error en la autenticación. Verifica tus credenciales.');
            }

            if (isLogin) {
                const token = await response.text();
                let role = 'usuario';
                try {
                    const checkNutri = await fetchAPI(`/nutricionistas/email/${formData.email}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (checkNutri.ok) role = 'nutricionista';
                } catch (e) { console.error(e); }

                onLogin(token, formData.email, role);
                onClose();
            } else {
                setIsLogin(true);
                setError('Registro exitoso. Por favor inicia sesión.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-4xl w-full max-w-md p-6 md:p-10 relative shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">
                    <X size={20} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-health-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-health-500/20">
                        <Activity size={32} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                        {isLogin ? 'Acceso Vital' : 'Alta de Sistema'}
                    </h2>
                    <p className="text-slate-400 dark:text-slate-500 font-medium">
                        {isLogin ? 'Gestiona tu evolución biológica.' : 'Inicia tu transformación hoy mismo.'}
                    </p>
                </div>

                {error && (
                    <div className={`px-5 py-4 rounded-2xl mb-8 text-sm font-bold text-center border ${error.includes('exitoso') ? 'bg-health-50 dark:bg-health-900/20 border-health-100 dark:border-health-800/30 text-health-600 dark:text-health-400' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30 text-red-600 dark:text-red-400'}`}>
                        {error}
                    </div>
                )}

                {!isLogin && (
                    <div className="flex bg-slate-50 dark:bg-slate-800 rounded-2xl p-1.5 mb-8 border border-slate-100 dark:border-slate-700">
                        <button type="button" onClick={() => setIsNutricionista(false)} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isNutricionista ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                            Atleta / Usuario
                        </button>
                        <button type="button" onClick={() => setIsNutricionista(true)} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isNutricionista ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                            Nutricionista
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <>
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Identidad</label>
                                <input required name="nombre" placeholder="Nombre y Apellidos" onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                            </div>

                            {!isNutricionista && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Edad</label>
                                        <input required name="edad" type="number" placeholder="25" onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Peso</label>
                                        <input required name="pesoActual" type="number" step="0.1" placeholder="70" onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Altura</label>
                                        <input required name="altura" type="number" step="0.01" placeholder="1.75" onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Email de Usuario</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="fran@fitlife.web"
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        />
                    </div>
                    
                    <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Código de Acceso</label>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-health-500/5 focus:border-health-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-health-500 text-white font-black py-5 rounded-2xl transition-all flex justify-center items-center gap-3 shadow-xl hover:shadow-health-500/20 active:scale-95 text-[10px] uppercase tracking-[0.2em] mt-8"
                    >
                        {loading ? <Activity className="animate-spin" size={18} /> : (isLogin ? 'Iniciar Conexión' : 'Activar Protocolo')}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">
                        Acceso exclusivo para clientes registrados por su nutricionista.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
