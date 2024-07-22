import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant';

// Create an Axios instance
const apiRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add the Bearer token to the headers
apiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiRequest;
