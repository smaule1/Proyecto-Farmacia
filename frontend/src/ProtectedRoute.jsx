import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import CurrentUserContext from './Context';

function ProtectedRoute() {
    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    const [authState, setAuthState] = useState('loading'); // 0: loading, -1:not logged, 1: logged

    useEffect(() => {
        if (currentUser) { 
            setAuthState('logged');            
        } else { 
            // No hay usuario logeado. Intenta atuentincar con cookies
            async function logIn() {
                const url = `/api/users/login`;
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: myHeaders,
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const resBody = await response.json();
                        setCurrentUser(resBody.data.user);
                        setAuthState('logged');
                    } else {
                        setAuthState('not-logged');
                    }
                } catch {
                    setAuthState('not-logged');
                }
            }
            logIn();
        }
    }, [currentUser, setCurrentUser, setAuthState]);


    switch (authState) {
        case 'logged':
            return <Outlet />;
        case 'not-logged':
            return <Navigate to="/login" />;
        case 'loading':
        default:
            return; //Logging in
    }


}

export default ProtectedRoute;