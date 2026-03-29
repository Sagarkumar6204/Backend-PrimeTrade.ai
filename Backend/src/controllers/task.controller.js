
import taskModel from "../models/task.model.js";
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = await taskModel.create({
        title,
        description,
        user: req.user.id 
    });
    res.status(201).json(newTask);
};


export const getMyTasks = async (req, res) => {
    try {
      
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


export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; 

       
        
        const task = await taskModel.findOneAndDelete({ 
            _id: taskId, 
            user: req.user.id 
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
        const { status } = req.body; 

    
        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, user: req.user.id },
            { status: status },
            { new: true } 
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


export const editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description } = req.body;

        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, user: req.user.id }, 
            { title, description },
            { new: true } 
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