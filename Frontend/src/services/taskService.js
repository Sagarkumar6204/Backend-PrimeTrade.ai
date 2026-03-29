import api from './api';


export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks/create', taskData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Task create failed";
    }
};


export const getMyTasks = async () => {
    try {
        const response = await api.get('/tasks/my-tasks');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch tasks";
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/tasks/delete/${taskId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete task";
    }
};


export const updateTaskStatus = async (taskId, newStatus) => {
    try {
        const response = await api.put(`/tasks/update/${taskId}`, { status: newStatus });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Status update failed";
    }
};


export const editTaskService = async (taskId, updatedData) => {
    try {
        const response = await api.put(`/tasks/edit/${taskId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Task edit failed";
    }
};