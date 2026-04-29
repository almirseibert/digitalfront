import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercetor: Antes de qualquer requisição sair do Frontend, injetamos o Token nela
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('digitalplus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercetor: Se o Backend disser que o Token expirou (401), reencaminha para login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // MODIFICADO AQUI: Não recarregar a página se o erro 401 vier da própria tentativa de login!
    if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
      localStorage.removeItem('digitalplus_token');
      localStorage.removeItem('digitalplus_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;