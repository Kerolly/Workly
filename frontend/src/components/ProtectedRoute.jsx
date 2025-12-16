// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {

    /**
     * This component verify if exist an access token in local storage
     * If exists, it randers the child component (ex: <Profile />)
     * If not exist, it's redirecting the user to the login page
     * @type {string}
     */

    // Check if the token exist
    const token = localStorage.getItem('access_token');

    if (!token) {
        // If not exist, return to the login page
        return <Navigate to="/login" replace />; // 'replace' means that the user can not go back to the profile
    }

    // return the child component, the page is protected
    return children;
};

export default ProtectedRoute;