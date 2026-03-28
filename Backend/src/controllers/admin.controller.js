import userModel from "../models/user.model.js";
import taskModel from "../models/task.model.js";

// 1. Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// 2. Get All Tasks (With Populate)
export const getAllTasksAdmin = async (req, res) => {
    try {
        const tasks = await taskModel.find().populate("user", "username email");
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching all tasks" });
    }
};

// 3. Delete User & Their Tasks
export const deleteUserByAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role === "admin") return res.status(400).json({ message: "Cannot delete Admin" });

        await taskModel.deleteMany({ user: userId });
        await userModel.findByIdAndDelete(userId);

        res.status(200).json({ message: "User & Tasks deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Delete Single Task
export const deleteTaskAdmin = async (req, res) => {
    try {
        await taskModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task removed" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};