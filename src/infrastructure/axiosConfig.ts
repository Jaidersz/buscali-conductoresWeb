import axios from 'axios';

// Configura Axios para enviar cookies automáticamente en todas las peticiones
axios.defaults.withCredentials = true;

// Configura la URL base
axios.defaults.baseURL = import.meta.env.VITE_API_URL;