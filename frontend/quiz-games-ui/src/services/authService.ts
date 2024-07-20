import { apiClient } from './httpService';

interface UserData {
    username: string;
    phone: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

const signup = async (user: UserData): Promise<any> => {
    const response = await apiClient.post('/auth/signup', user);
    return response.data;
};

const login = async (credentials: LoginData): Promise<any> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export { signup, login };
