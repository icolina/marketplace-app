import axios from 'axios';

export function authApi() {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:3200/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
