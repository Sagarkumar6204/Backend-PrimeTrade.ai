import express from "express";
import { isAuthUser } from "../middlewares/isAuth.js";
import { createTask, deleteTask, editTask, getMyTasks, updateTaskStatus } from "../controllers/task.controller.js";

const taskRouter=express.Router();

taskRouter.post("/create",isAuthUser,createTask);
taskRouter.get("/my-tasks",isAuthUser,getMyTasks);
taskRouter.delete('/delete/:id',isAuthUser,deleteTask);
taskRouter.put('/update/:id', isAuthUser, updateTaskStatus);
taskRouter.put('/edit/:id', isAuthUser, editTask);
export default taskRouter