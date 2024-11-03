import { useContext } from 'react';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import CurrentUserContext from './Context';

function ProtectedRoute() {
    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    useEffect(() => {
        if (!currentUser) {
            setCurrentUser('pedro');  // implement correct authentication                      
        }                
    });

    return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;