import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Zap,
  TrendingUp,
  Smartphone,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Star,
  Users,
  Activity
} from 'lucide-react';

// Estilos globales e inyectados
const GlobalStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');

        :root {
            --font-outfit: 'Outfit', sans-serif;
        }

        body {
            font-family: var(--font-outfit);
            background-color: #0f172a; /* Slate 900 */
            color: #f8fafc;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #10b981;
        }

        .text-gradient {
            background: linear-gradient(to right, #34d399, #22d3ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.6;
            animation: float 10s infinite ease-in-out;
            pointer-events: none;
        }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }

        .perspective-1000 {
            perspective: 1000px;
        }

        .rotate-y-12 {
            transform: rotateY(12deg) rotateX(6deg);
        }

        .animation-delay-2000 {
            animation-delay: 2s;
        }
    `}</style>
);

// Contexto para la Autenticación
const AuthContext = React.createContext();

// Componente: Auth Modal
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
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
        response = await fetch('http://localhost:8080/api/auth/register', {
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
        onLogin(token, formData.email);
        onClose();
      } else {
        // Después de registrar, iniciar sesión automáticamente o pedir login
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
          {isLogin ? 'Ingresa a tu panel de control personal' : 'Únete a NutriSync hoy mismo'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input required name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                <input required name="edad" type="number" placeholder="Edad" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required name="pesoActual" type="number" step="0.1" placeholder="Peso (kg)" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                <input required name="altura" type="number" step="0.01" placeholder="Altura (m)" onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
              </div>
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

// Componente: Header
const Header = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-3">
              <Leaf size={20} className="text-white" />
            </div>
            <span>Nutri<span className="text-emerald-400">Sync</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button className="hover:text-emerald-400 transition-colors">Funcionalidades</button>
            <button className="hover:text-emerald-400 transition-colors">Cómo funciona</button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-emerald-400">Hola, {user}</span>
                <button onClick={onLogout} className="px-5 py-2.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-white rounded-full transition-all border border-slate-700">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setAuthModalOpen(true)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all border border-slate-700">
                  Iniciar Sesión
                </button>
                <button onClick={() => setAuthModalOpen(true)} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-full transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  Empezar Gratis
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
            <button className="text-slate-300 hover:text-emerald-400 py-2 text-left">Funcionalidades</button>
            <button className="text-slate-300 hover:text-emerald-400 py-2 text-left">Cómo funciona</button>
            <hr className="border-slate-800" />
            {user ? (
              <button onClick={onLogout} className="w-full py-3 bg-red-500/20 text-red-400 font-bold rounded-xl">
                Cerrar Sesión
              </button>
            ) : (
              <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full py-3 bg-emerald-500 text-slate-900 font-bold rounded-xl">
                Empezar Gratis
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Auth Modal Injection */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(token, email) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', email);
          window.location.reload(); // Simple reload to update state
        }}
      />
    </>
  );
};

// Componente: Hero
const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Blobs */}
      <div className="blob bg-emerald-600 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/4"></div>
      <div className="blob bg-blue-600 w-80 h-80 rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
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
              Olvídate de contar calorías manualmente. NutriSync usa IA para crear planes de comida personalizados que se adaptan a tu metabolismo y estilo de vida real.
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
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>+10k usuarios felices</p>
            </div>
          </div>

          {/* Hero Visual / Mockup */}
          <div className="lg:w-1/2 w-full perspective-1000">
            <div className="relative transform md:rotate-y-12 md:rotate-x-6 hover:rotate-0 transition-all duration-700 ease-out">
              {/* Mockup Container */}
              <div className="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Mockup Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Resumen Diario</h3>
                    <p className="text-slate-400 text-sm">Hoy, 14 Feb</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                </div>

                {/* Stats Row */}
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

                {/* Activity Graph Simulation */}
                <div className="bg-slate-800/30 rounded-xl p-4 mb-6 h-32 flex items-end gap-2 justify-between">
                  {[40, 70, 50, 90, 60, 80, 50].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                        {h * 20}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Meal */}
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

              {/* Floating Badge */}
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
  );
};

// Componente: Feature Card
const Feature = ({ icon: Icon, title, desc, color }) => (
  <div className="glass-card p-8 rounded-2xl hover:bg-slate-800/80 transition-all duration-300 group cursor-default hover:-translate-y-2">
    <div className={`w-14 h-14 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon size={32} className={color.replace('bg-', 'text-').replace('/10', '')} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

// Componente: Seccion Features
const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-900 relative">
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
  );
};

// Componente: Sección de Planes (Integración Backend)
const PlansSection = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/planes')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con el servidor');
        return res.json();
      })
      .then(data => {
        setPlanes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching plans:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="planes" className="py-20 bg-slate-900 relative border-t border-slate-800">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Nuestros <span className="text-emerald-400">Planes</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Elige el plan que mejor se adapte a tus objetivos. Datos cargados directamente desde nuestro servidor.</p>
        </div>

        {loading && (
          <div className="text-center text-emerald-400 animate-pulse">
            <Activity size={48} className="mx-auto mb-4" />
            <p>Cargando planes desde el backend...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-900 mx-auto max-w-lg">
            <p className="font-bold mb-2">No se pudo conectar con el Backend</p>
            <p className="text-sm opacity-80">{error}</p>
            <p className="text-xs mt-4 text-slate-500">Asegúrate de que el backend esté corriendo en el puerto 8080</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {planes.map((plan) => (
            <div key={plan.id} className="glass-card p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Leaf size={100} />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase mb-4 border border-emerald-500/20">
                {plan.tipoDieta}
              </div>

              <h3 className="text-2xl font-bold mb-3 text-white">{plan.nombrePlan}</h3>
              <p className="text-slate-400 leading-relaxed mb-6 h-20">{plan.descripcion}</p>

              <button className="w-full py-3 bg-slate-800 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all border border-slate-700 hover:border-emerald-500 flex items-center justify-center gap-2 group-hover:shadow-lg">
                Seleccionar Plan <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Componente: Sección de Comidas
const ComidasSection = () => {
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/comidas')
      .then(res => res.json())
      .then(data => setComidas(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Base de Datos de <span className="text-orange-400">Alimentos</span></h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-card">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Calorías</th>
                <th className="p-4">Proteínas</th>
                <th className="p-4">Carbos</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Componente: Sección de Rutinas
const RutinasSection = () => {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/rutinas')
      .then(res => res.json())
      .then(data => setRutinas(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-slate-800/50 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Biblioteca de <span className="text-blue-400">Rutinas</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rutinas.map(rutina => (
            <div key={rutina.id} className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{rutina.nombreRutina}</h3>
                <span className={`text-xs px-2 py-1 rounded border ${rutina.nivel === 'Principiante' ? 'border-green-500 text-green-500' :
                  rutina.nivel === 'Intermedio' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'
                  }`}>
                  {rutina.nivel}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-4">{rutina.descripcion}</p>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Activity size={16} />
                <span>{rutina.duracion} minutos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente: Call to Action Final
const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative circles - simulated with CSS since no image assets */}
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
  );
};

// Componente: Footer
const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </div>
            <span>NutriSync</span>
          </div>
          <p className="text-sm mb-4">Gestión nutricional inteligente para el mundo moderno.</p>
          <div className="flex gap-4">
            {/* Fake social icons */}
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"><Star size={14} /></div>
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"><Users size={14} /></div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Producto</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-emerald-400">Características</button></li>
            <li><button className="hover:text-emerald-400">Precios</button></li>
            <li><button className="hover:text-emerald-400">Para Entrenadores</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Compañía</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-emerald-400">Sobre nosotros</button></li>
            <li><button className="hover:text-emerald-400">Blog</button></li>
            <li><button className="hover:text-emerald-400">Carreras</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-emerald-400">Privacidad</button></li>
            <li><button className="hover:text-emerald-400">Términos</button></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-xs">
        &copy; 2024 NutriSync Inc. Hecho con 💚 y código.
      </div>
    </footer>
  );
};

// Componente Principal
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      <GlobalStyles />
      <Header user={user} onLogout={handleLogout} />
      <Hero />
      <Features />
      <PlansSection />
      <ComidasSection />
      <RutinasSection />

      {/* Social Proof Section (Simple) */}
      <section className="py-10 border-y border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
          {/* Logos ficticios simulados con texto */}
          <span className="text-xl font-black text-white hover:text-emerald-400 transition-colors">FORBES</span>
          <span className="text-xl font-black text-white hover:text-emerald-400 transition-colors">TECHCRUNCH</span>
          <span className="text-xl font-black text-white hover:text-emerald-400 transition-colors">MEN'S HEALTH</span>
          <span className="text-xl font-black text-white hover:text-emerald-400 transition-colors">WIRED</span>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
