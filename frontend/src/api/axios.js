import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3200/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
