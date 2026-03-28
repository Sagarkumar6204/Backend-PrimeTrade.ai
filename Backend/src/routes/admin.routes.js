import express from "express";
import { getAllUsers, getAllTasksAdmin, deleteUserByAdmin, deleteTaskAdmin } from "../controllers/admin.controller.js";
import { isAuthAdmin } from "../middlewares/isAuth.js";// Aapka middleware

const adminRouter = express.Router();

// Saare routes Admin protected hain
adminRouter.get("/all-users", isAuthAdmin, getAllUsers);
adminRouter.get("/all-tasks", isAuthAdmin, getAllTasksAdmin);
adminRouter.delete("/user/:id", isAuthAdmin, deleteUserByAdmin);
adminRouter.delete("/task/:id", isAuthAdmin, deleteTaskAdmin);

export default adminRouter;