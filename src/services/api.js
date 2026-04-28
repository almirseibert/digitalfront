import axios from 'axios';

const api = axios.create({
  // Puxa a URL do arquivo .env configurado no EasyPanel/aaPanel
  // IMPORTANTE: no React com Vite, as variáveis precisam começar com VITE_
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
