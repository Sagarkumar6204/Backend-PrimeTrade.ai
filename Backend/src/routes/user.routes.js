import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { commonAuth } from "../middlewares/commonAuth.js";

let userRouter=express.Router();
userRouter.get("/currentuser",commonAuth,getCurrentUser)


export default userRouter