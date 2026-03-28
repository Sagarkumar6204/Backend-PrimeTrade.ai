// Example: Create Task
import taskModel from "../models/task.model.js";
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = await taskModel.create({
        title,
        description,
        user: req.user.id // Token se aayi hui ID
    });
    res.status(201).json(newTask);
};

// 1. Get My Tasks (Read)
export const getMyTasks = async (req, res) => {
    try {
        // req.user.id humein isAuthUser middleware se mil raha hai
        // .sort({ createdAt: -1 }) se latest tasks upar dikhenge
        const tasks = await taskModel.find({ user: req.user.id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks: tasks
        });

    } catch (error) {
        console.error("Error in getMyTasks:", error);
        return res.status(500).json({ message: "Server Error: Could not fetch tasks" });
    }
};

// 2. Delete Task (Delete)
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // URL se Task ki ID nikaali

        // PRO TIP: findOneAndDelete use karein jisme ID aur User dono check hon.
        // Isse agar user kisi dusre ke task ki ID daalega, toh wo delete nahi hoga.
        const task = await taskModel.findOneAndDelete({ 
            _id: taskId, 
            user: req.user.id // Ye check karta hai ki task isi user ka hai
        });

        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found or you don't have permission to delete it" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Task deleted successfully!" 
        });

    } catch (error) {
        console.error("Error in deleteTask:", error);
        return res.status(500).json({ message: "Server Error: Could not delete task" });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body; // Frontend se aayega ('completed' ya 'pending')

        // findOneAndUpdate use kar rahe hain taaki dusre user ka task update na ho
        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, user: req.user.id },
            { status: status },
            { new: true } // Ye naya updated task return karega
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Could not update task status" });
    }
};

// Task ka Title aur Description update karne ke liye
export const editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description } = req.body;

        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, user: req.user.id }, // Sirf apna hi task edit kar sake
            { title, description },
            { new: true } // Updated data wapas bheje
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ success: true, task });
    } catch (error) {
        console.error("Edit error:", error);
        return res.status(500).json({ message: "Could not edit task" });
    }
};