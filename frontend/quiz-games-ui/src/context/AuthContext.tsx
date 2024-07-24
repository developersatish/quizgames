import React, { createContext, useContext, useState, ReactNode } from 'react';
import { isLoggedIn, logoutUser } from '../services/httpService';

// Create a context with a default value
interface AuthContextType {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
}

// Define the props type for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());
    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        setLoggedIn(false);
        logoutUser();
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
