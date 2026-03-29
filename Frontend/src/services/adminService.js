import api from './api';


export const getAllUsers = async () => {
    const response = await api.get('/admin/all-users'); 
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
export const updateTaskByAdminService = async (taskId, data) => {
    const response = await api.put(`/admin/task/${taskId}`, data);
    return response.data;
};