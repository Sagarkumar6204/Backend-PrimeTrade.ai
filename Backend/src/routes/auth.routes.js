import express from "express";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/auth.controller.js";
const authRouter=express.Router();


authRouter.post("/register",registerUserController);
authRouter.post("/login",loginUserController);
authRouter.post("/logout",logoutUserController)


export default authRouter;