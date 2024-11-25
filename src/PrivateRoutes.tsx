import React from 'react'

import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
    children: React.ReactNode;
}
const PrivateRoutes: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default PrivateRoutes