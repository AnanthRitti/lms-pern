import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userType, children }) => {
    const [cookie] = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const user_type = cookie.user_type;

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Simulate an authentication check
                // Here, you can replace it with actual authentication logic
                if (user_type === userType) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false); // Mark loading as complete
            }
        };

        checkAuthentication();
    }, [user_type, userType]); // Include dependencies

    // While loading, you can return a loading indicator or null
    if (isLoading) {
        return <div>Loading...</div>; // or return loading indicator
    }

    // After loading, render based on authentication status
    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
