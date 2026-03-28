import axios from 'axios';

// Ek base instance banaya jisme humesha server ka address rahega
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Aapka backend URL
    withCredentials: true, // IMPORTANT: Taki cookies (JWT token) automatically server tak jayein
});

export default api;