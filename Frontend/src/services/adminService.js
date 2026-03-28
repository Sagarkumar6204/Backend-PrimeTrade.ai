import api from './api';

// 🌟 Backend ke routes se EXACT match hona chahiye
export const getAllUsers = async () => {
    const response = await api.get('/admin/all-users'); // /api/admin/all-users banega ye
    return response.data;
};

export const getAllTasksAdmin = async () => {
    const response = await api.get('/admin/all-tasks');
    return response.data;
};

export const deleteUserByAdmin = async (userId) => {
    const response = await api.delete(`/admin/user/${userId}`);
    return response.data;
};

export const deleteTaskByAdmin = async (taskId) => {
    const response = await api.delete(`/admin/task/${taskId}`);
    return response.data;
};