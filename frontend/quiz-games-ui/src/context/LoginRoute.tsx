import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? (
        <>{element}</>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
