import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';;

export default function ProtectedRoute({
    redirectTo = '/login'
}){
    const location = useLocation();
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return <div> 로딩 중 ... </div>;
    }

    if(!isAuthenticated){
        return(
            <Navigate to={redirectTo} state={{from: location}} replace />

        );
    }
    return <Outlet />;
};