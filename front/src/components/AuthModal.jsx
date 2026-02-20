import React, { useState } from 'react';
import { X, Activity } from 'lucide-react';

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
                const params = new URLSearchParams({
                    email: formData.email,
                    password: formData.password
                });
                response = await fetch(`http://localhost:8080/api/auth/token?${params.toString()}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                const endpoint = isNutricionista ? 'http://localhost:8080/api/auth/registerNutricionista' : 'http://localhost:8080/api/auth/register';
                response = await fetch(endpoint, {
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
                // Determine user role implicitly by checking endpoints
                let role = 'usuario';
                try {
                    const checkNutri = await fetch(`http://localhost:8080/api/nutricionistas/email/${formData.email}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (checkNutri.ok) {
                        role = 'nutricionista';
                    }
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                </h2>
                <p className="text-slate-400 text-center mb-8">
                    {isLogin ? 'Ingresa a tu panel de control personal' : 'Únete a FitLifeWeb hoy mismo'}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {!isLogin && (
                    <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
                        <button type="button" onClick={() => setIsNutricionista(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!isNutricionista ? 'bg-emerald-500 text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                            Soy Usuario
                        </button>
                        <button type="button" onClick={() => setIsNutricionista(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${isNutricionista ? 'bg-blue-500 text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                            Soy Nutricionista
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div className="grid grid-cols-1 gap-4">
                                <input required name="nombre" placeholder="Nombre completo" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                            </div>

                            {!isNutricionista && (
                                <>
                                    <div className="grid grid-cols-1 gap-4">
                                        <input required name="edad" type="number" placeholder="Edad" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required name="pesoActual" type="number" step="0.1" placeholder="Peso (kg)" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                                        <input required name="altura" type="number" step="0.01" placeholder="Altura (m)" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2"
                    >
                        {loading ? <Activity className="animate-spin" /> : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-emerald-400 font-bold hover:underline">
                        {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
