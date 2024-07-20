import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/httpService';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;
