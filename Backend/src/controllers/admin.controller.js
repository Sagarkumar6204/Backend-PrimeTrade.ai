import userModel from "../models/user.model.js";
import taskModel from "../models/task.model.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({ 
            success: true, 
            message: "User directory retrieved successfully.", 
            count: users.length,
            users 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "System error: Unable to fetch user directory." });
    }
};


export const getAllTasksAdmin = async (req, res) => {
    try {
        const tasks = await taskModel.find().populate("user", "username email");
        res.status(200).json({ 
            success: true, 
            message: "Global task monitoring data synchronized.", 
            count: tasks.length,
            tasks 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "System error: Failed to retrieve global tasks." });
    }
};


export const deleteUserByAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        
        if (!user) return res.status(404).json({ success: false, message: "Entity not found: The requested user does not exist." });
        if (user.role === "admin")return res.status(400).json({ success: false, message: "Access Restricted: Administrative accounts cannot be terminated." })

        await taskModel.deleteMany({ user: userId });
        await userModel.findByIdAndDelete(userId);

       res.status(200).json({ 
            success: true, 
            message: "User profile and all associated task records have been permanently purged." 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Operational error during user termination." });
    }
};


export const deleteTaskAdmin = async (req, res) => {
    try {
        await taskModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task removed" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};

export const updateTaskByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        
        const updatedTask = await taskModel.findByIdAndUpdate(
            id, 
            { title, description, status }, 
           { new: true, runValidators: true }
        );
        if (!updatedTask) return res.status(404).json({ success: false, message: "Task modification failed: Target task not found." });
       res.status(200).json({ 
            success: true, 
            message: "Task metadata and status successfully synchronized.", 
            task: updatedTask 
        });
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};

