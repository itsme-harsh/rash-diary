import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isVerified, status } = useSelector((state) => state.auth);

    if (status === 'idle') {
        return 'loading...'; // Optionally, you can show a loading spinner or message
    }
    
console.log(isLoggedIn,isVerified)
    if (!(isLoggedIn || isVerified)) {
        console.log("ok")
        return <Navigate to="/" />;
    }

    return children;
};

const LoginRestrict = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export { ProtectedRoute, LoginRestrict };
