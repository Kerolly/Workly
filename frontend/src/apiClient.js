// apiClient.js


// Base address of the server
const API_URL = "http://127.0.0.1:8000"

export async function authFetch(method, endpoint, body=null) {
    /**
     * Universal fetch function, for auto authenticate
     * @param {string} endpoint - Endpoint (ex: '/users/me')
     * @param {string} method - Method HTTP (GET, POST, PUT, DELETE)
     * @param {object} [body] - JavaScript object to send (only for POST/PUT)
     * @returns {Promise<any>} Data from server
     */

    // getting the token from local storage
    const token = localStorage.getItem("access_token");

    // creating the header object
    const headers = new Headers();

    // add the content type for JSON
    headers.append("Content-Type", "application/json");

    // add the token to the header
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    // creating the config
    const config = {
        method: method,
        headers: headers,
    };

    // convert body to json
    if (body) {
        config.body = JSON.stringify(body);
    }

    // getting the response from server
    const response = await fetch(API_URL + endpoint, config);

    // checking the response
    if (response.status === 401){
        localStorage.removeItem("access_token"); // delete the token form local storage
        window.location.href = "/login";
        throw new Error("Invalid or expired session")

    }

    if (!response.ok){
        const errorData = await response.json(); // getting the error from server
        throw new Error(errorData.detail || "Error occured");
    }

    if(response.status === 204){ // 204 no content, if there is a deleted request
        return null;
    }

    // return the response json
    return response.json();

}