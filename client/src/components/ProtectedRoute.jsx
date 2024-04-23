import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";


const ProtectedRoute = ({ userType, children }) => {
    const [cookie] = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const myDecodedToken = decodeToken(cookie.authToken);


    useEffect(() => {
        const checkAuthentication = async () => {
            try {

                console.log(myDecodedToken)

                if (myDecodedToken && myDecodedToken.Type === userType) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error while checking authentication:", error);
            } finally {
                setIsLoading(false); 
            }
        };

        checkAuthentication();
    }, [myDecodedToken, userType]);


    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
