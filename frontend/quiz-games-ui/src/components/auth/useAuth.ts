import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../../services/httpService';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;
