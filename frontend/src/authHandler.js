// src/authHandler.js


// Delete the access token from local storage
export const logout = () => {
    localStorage.removeItem('access_token');
}

// Check if there is a token
export const isAuthenticated = () => {
    return localStorage.getItem('access_token') !== null;
}