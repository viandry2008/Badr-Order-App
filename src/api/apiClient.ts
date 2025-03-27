import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mock.apidog.com/m1/523540-0-default/api/', // Ganti dengan URL API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

