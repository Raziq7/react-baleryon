// api.js (or axios.js)
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://18.212.40.220',
  // baseURL: 'http://localhost:8080',
});

export default api;
