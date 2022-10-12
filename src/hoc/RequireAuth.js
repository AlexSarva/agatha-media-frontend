import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from '../hook/useAuth';

const RequireAuth = () => {
    const location = useLocation();
    const {token} = useAuth();

    return token ? <Outlet /> : <Navigate to="/login" state={{from: location}} />;
}

export {RequireAuth};