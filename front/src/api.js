/**
 * Configuración dinámica de la URL de la API.
 * En desarrollo, usa el proxy de Vite (/api).
 * En producción, usa la variable de entorno VITE_API_URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Helper para realizar peticiones fetch a la API con la URL correcta.
 */
export const fetchAPI = (endpoint, options = {}) => {
    // Si el endpoint ya empieza con http, no añadir BASE_URL
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    return fetch(url, options);
};
