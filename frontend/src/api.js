import axios from 'axios';

const api = axios.create({
  baseURL: '/backend', // All requests go through this
});

export default api;
