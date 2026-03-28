import api from './api';

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Bonus: Logout API Call
export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Logout failed";
    }
};

// 1. Register Service (Naya add kiya)
export const registerUser = async (userData) => {
    try {
        // userData mein { username, email, password, role } aayega
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        // Agar backend se koi error aata hai (jaise "Email already exists"), toh wo yahan catch hoga
        throw error.response?.data?.message || "Registration failed. Please try again.";
    }
};