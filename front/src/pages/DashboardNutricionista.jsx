import React, { useState, useEffect } from 'react';
import { Users, FileText, Dumbbell, Utensils, Activity, Edit2, Trash2, Plus, X, LayoutDashboard } from 'lucide-react';

// --- GENERIC MODAL COMPONENT ---
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
                <h2 className="text-2xl font-bold text-white mb-6 pr-8">{title}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field.name}>
                            <label className="block text-slate-400 text-sm font-bold mb-1">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea required name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 min-h-[100px]" />
                            ) : (
                                <input required type={field.type || 'text'} step={field.step} name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                            )}
                        </div>
                    ))}
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">Cancelar</button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl transition-colors">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const DashboardNutricionista = () => {
    const userEmail = localStorage.getItem('user');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Data states
    const [usuarios, setUsuarios] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [comidas, setComidas] = useState([]);

    // Modal state
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });

    const API_BASE = 'http://localhost:8080/api';

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            if (userEmail) {
                const profileRes = await fetch(`${API_BASE}/nutricionistas/email/${userEmail}`, { headers }).then(res => res.ok ? res.json() : null);
                if (profileRes) setProfile(profileRes);
            }

            const [userRes, planRes, rutRes, comRes] = await Promise.all([
                fetch(`${API_BASE}/usuarios`, { headers }).then(r => r.ok ? r.json() : []),
                fetch(`${API_BASE}/planes`, { headers }).then(r => r.ok ? r.json() : []),
                fetch(`${API_BASE}/rutinas`, { headers }).then(r => r.ok ? r.json() : []),
                fetch(`${API_BASE}/comidas`, { headers }).then(r => r.ok ? r.json() : [])
            ]);

            setUsuarios(userRes);
            setPlanes(planRes);
            setRutinas(rutRes);
            setComidas(comRes);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userEmail]);

    // --- CRUD OPERATIONS ---
    const handleSave = async (formData) => {
        const isEdit = !!formData.id;
        const endpoint = `${API_BASE}/${modalConfig.type}${isEdit ? `/${formData.id}` : ''}`;
        const method = isEdit ? 'PUT' : 'POST';
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setModalConfig({ isOpen: false, type: null, data: null });
                fetchData(); // Reload all data to keep it simple, or update specific state
            } else {
                alert('Error al guardar. Revisa la consola.');
            }
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este registro?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (e) { console.error(e); }
    };

    // --- RENDER HELPERS ---
    const openModal = (type, data = null) => {
        setModalConfig({ isOpen: true, type, data });
    };

    // --- CONFIGURATIONS ---
    const configs = {
        usuarios: {
            title: 'Usuario',
            icon: <Users />,
            color: 'text-blue-400',
            bg: 'bg-blue-500/20',
            fields: [
                { name: 'nombre', label: 'Nombre Completo', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'password', label: 'Contraseña', type: 'password' },
                { name: 'edad', label: 'Edad', type: 'number' },
                { name: 'pesoActual', label: 'Peso Actual (kg)', type: 'number', step: '0.1' },
                { name: 'altura', label: 'Altura (m)', type: 'number', step: '0.01' },
            ],
            columns: ['Nombre', 'Email', 'Edad', 'Peso'],
            renderRow: (u) => (
                <>
                    <td className="p-4 font-bold text-white">{u.nombre}</td>
                    <td className="p-4 text-slate-400">{u.email}</td>
                    <td className="p-4 text-white">{u.edad}</td>
                    <td className="p-4 text-white">{u.pesoActual} kg</td>
                </>
            )
        },
        planes: {
            title: 'Plan Nutricional',
            icon: <FileText />,
            color: 'text-orange-400',
            bg: 'bg-orange-500/20',
            fields: [
                { name: 'nombre', label: 'Nombre del Plan', type: 'text' },
                { name: 'descripcion', label: 'Descripción', type: 'textarea' },
                { name: 'tipoDieta', label: 'Tipo de Dieta', type: 'text' }
            ],
            columns: ['Nombre', 'Tipo de Dieta', 'Descripción'],
            renderRow: (p) => (
                <>
                    <td className="p-4 font-bold text-white">{p.nombre}</td>
                    <td className="p-4 text-emerald-400 font-bold">{p.tipoDieta}</td>
                    <td className="p-4 text-slate-400 text-sm max-w-xs truncate">{p.descripcion}</td>
                </>
            )
        },
        rutinas: {
            title: 'Rutina',
            icon: <Dumbbell />,
            color: 'text-purple-400',
            bg: 'bg-purple-500/20',
            fields: [
                { name: 'nombre', label: 'Nombre de la Rutina', type: 'text' },
                { name: 'descripcion', label: 'Descripción', type: 'textarea' },
                { name: 'nivel', label: 'Nivel (Principiante, Intermedio...)', type: 'text' },
                { name: 'duracionSemanas', label: 'Duración (Semanas)', type: 'number' }
            ],
            columns: ['Nombre', 'Nivel', 'Duración'],
            renderRow: (r) => (
                <>
                    <td className="p-4 font-bold text-white">{r.nombre}</td>
                    <td className="p-4 text-purple-400 font-bold">{r.nivel}</td>
                    <td className="p-4 text-white">{r.duracionSemanas} semanas</td>
                </>
            )
        },
        comidas: {
            title: 'Comida',
            icon: <Utensils />,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/20',
            fields: [
                { name: 'nombre', label: 'Nombre del Alimento', type: 'text' },
                { name: 'calorias', label: 'Calorías (kcal)', type: 'number' },
                { name: 'proteinas', label: 'Proteínas (g)', type: 'number', step: '0.1' },
                { name: 'carbohidratos', label: 'Carbohidratos (g)', type: 'number', step: '0.1' },
                { name: 'grasas', label: 'Grasas (g)', type: 'number', step: '0.1' }
            ],
            columns: ['Nombre', 'Calorías', 'Macros (P/C/G)'],
            renderRow: (c) => (
                <>
                    <td className="p-4 font-bold text-white">{c.nombre}</td>
                    <td className="p-4 text-emerald-400 font-bold">{c.calorias} kcal</td>
                    <td className="p-4 text-slate-400">{c.proteinas}g / {c.carbohidratos}g / {c.grasas}g</td>
                </>
            )
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen flex items-center justify-center">
                <div className="text-center text-emerald-400 animate-pulse">
                    <Activity size={48} className="mx-auto mb-4" />
                    <p>Iniciando Panel de Control...</p>
                </div>
            </div>
        );
    }

    const renderTable = (type, data) => {
        const config = configs[type];
        return (
            <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={config.color}>{config.icon}</span> Gestión de {config.title}s
                    </h2>
                    <button onClick={() => openModal(type)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2 text-sm">
                        <Plus size={16} /> Nuevo
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                                {config.columns.map(c => <th key={c} className="p-4 font-semibold">{c}</th>)}
                                <th className="p-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                    {config.renderRow(item)}
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openModal(type, item)} className="p-2 bg-slate-700 hover:bg-blue-500 text-white rounded transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(type, item.id)} className="p-2 bg-slate-700 hover:bg-red-500 text-white rounded transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr><td colSpan="100%" className="p-8 text-center text-slate-500">No hay registros encontrados.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderDashboard = () => (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Usuarios', count: usuarios.length, icon: <Users />, color: 'blue' },
                    { title: 'Planes Activos', count: planes.length, icon: <FileText />, color: 'orange' },
                    { title: 'Rutinas Creadas', count: rutinas.length, icon: <Dumbbell />, color: 'purple' },
                    { title: 'Alimentos Base', count: comidas.length, icon: <Utensils />, color: 'yellow' }
                ].map(stat => (
                    <div key={stat.title} className="glass-card p-6 rounded-2xl flex items-center gap-4">
                        <div className={`p-4 bg-${stat.color}-500/20 text-${stat.color}-400 rounded-xl`}>{stat.icon}</div>
                        <div>
                            <p className="text-slate-400 text-sm font-bold">{stat.title}</p>
                            <p className="text-3xl font-black text-white">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center opacity-70">
                <Activity size={64} className="text-emerald-400/50 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Sistema Operativo</h3>
                <p className="text-slate-400 max-w-md">Todos los servicios backend (Spring Boot) están funcionales. Selecciona una categoría en el menú lateral para administrar los datos directamente en la base de datos H2.</p>
            </div>
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-slate-900 flex">

            {/* Sidebar */}
            <aside className="w-64 fixed h-full border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl z-10 hidden md:flex md:flex-col pt-8">
                <div className="px-6 mb-8">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Administración</p>
                    <p className="text-white font-bold truncate">{profile?.nombre || 'Nutricionista CMS'}</p>
                    <p className="text-emerald-400 text-sm truncate">{userEmail}</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                        { id: 'usuarios', label: 'Usuarios', icon: <Users size={20} /> },
                        { id: 'planes', label: 'Planes', icon: <FileText size={20} /> },
                        { id: 'rutinas', label: 'Rutinas', icon: <Dumbbell size={20} /> },
                        { id: 'comidas', label: 'Comidas', icon: <Utensils size={20} /> }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 lg:p-10">
                {/* Mobile Tab Selector (Fallback for small screens) */}
                <div className="md:hidden flex overflow-x-auto gap-2 mb-6 pb-2">
                    {['dashboard', 'usuarios', 'planes', 'rutinas', 'comidas'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 whitespace-nowrap rounded-lg font-bold text-sm capitalize ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="max-w-6xl mx-auto h-full">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'usuarios' && renderTable('usuarios', usuarios)}
                    {activeTab === 'planes' && renderTable('planes', planes)}
                    {activeTab === 'rutinas' && renderTable('rutinas', rutinas)}
                    {activeTab === 'comidas' && renderTable('comidas', comidas)}
                </div>
            </main>

            {modalConfig.isOpen && (
                <AdminModal
                    isOpen={modalConfig.isOpen}
                    onClose={() => setModalConfig({ isOpen: false, type: null, data: null })}
                    title={modalConfig.data ? `Editar ${configs[modalConfig.type].title}` : `Nuevo ${configs[modalConfig.type].title}`}
                    fields={configs[modalConfig.type].fields}
                    initialData={modalConfig.data}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default DashboardNutricionista;
