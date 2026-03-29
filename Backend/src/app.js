import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import taskRouter from "./routes/task.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://primetrade-ai-gl07.onrender.com', 
    credentials: true 
}));


app.use("/api/v1/auth",authRouter );
app.use("/api/v1/user",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
