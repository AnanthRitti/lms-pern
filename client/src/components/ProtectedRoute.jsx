import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie'
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userType , children }) => {
    const [cookie,setCookie] = useCookies()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const user_type = cookie.user_type
    // console.log(user_type)
    console.log(userType)


    useEffect(() => {
        axios.get('http://localhost:3000/', { withCredentials: true })
            .then(response => {
                if (response.data === "success" && user_type == userType) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            })
            .finally(() => {
                setIsLoading(false); // Update loading state
            });
    }, []);

    // While loading, you can return a loading indicator or null
    if (isLoading) {
        return null; // or return loading indicator
    }

    // After loading, render based on authentication status
    if (isAuthenticated) {
        return <Outlet/>
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
