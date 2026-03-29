import api from './api';

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};


export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Logout failed";
    }
};


export const registerUser = async (userData) => {
    try {
       
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        
        throw error.response?.data?.message || "Registration failed. Please try again.";
    }
};