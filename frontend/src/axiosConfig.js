import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request and response interceptors if needed
api.interceptors.request.use(
    config => {
        // Add auth tokens or any other headers if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally here if you want
        return Promise.reject(error);
    }
);

export default api;
