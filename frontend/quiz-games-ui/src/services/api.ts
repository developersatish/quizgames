import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7021/api',
});

export default api;
