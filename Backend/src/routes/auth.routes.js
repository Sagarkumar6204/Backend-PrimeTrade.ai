import express from "express";
import { validateRegistration,validateLogin } from "../middlewares/validator.js";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/auth.controller.js";
const authRouter=express.Router();

authRouter.post("/register",validateRegistration,registerUserController);
authRouter.post("/login",validateLogin,loginUserController);
authRouter.post("/logout",logoutUserController);

export default authRouter;