import express from "express";
import { getAllUsers, getAllTasksAdmin, deleteUserByAdmin, deleteTaskAdmin, updateTaskByAdmin } from "../controllers/admin.controller.js";
import { isAuthAdmin } from "../middlewares/isAuth.js";

const adminRouter = express.Router();


adminRouter.get("/all-users", isAuthAdmin, getAllUsers);
adminRouter.get("/all-tasks", isAuthAdmin, getAllTasksAdmin);
adminRouter.delete("/user/:id", isAuthAdmin, deleteUserByAdmin);
 adminRouter.put("/task/:id", isAuthAdmin, updateTaskByAdmin);
adminRouter.delete("/task/:id", isAuthAdmin, deleteTaskAdmin);

export default adminRouter;