import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

interface LoginUser {
    token: string;
    id: string;
}
const setAuthToken = (user: LoginUser | null): void => {
    if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(user.token));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

const isLoggedIn = (): boolean => {
    const user = getUser();
    return !!user.token;
};

const getUser = (): LoginUser => {
    let loginUser: LoginUser = {
        id: '',
        token: ''
    }
    const user = localStorage.getItem('user');
    if (user) {
        loginUser = JSON.parse(user);
    }
    return loginUser;
};

const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthToken(null);
    window.location.reload();
};

export { apiClient, setAuthToken, isLoggedIn, logout, getUser };
