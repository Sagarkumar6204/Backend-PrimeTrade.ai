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
    origin: 'http://localhost:5173', // Aapka Frontend URL
    credentials: true // Cookies allow karne ke liye (Zaroori hai)
}));


app.use("/api/auth",authRouter );
app.use("/api/user",userRouter);
app.use("/api/tasks",taskRouter);
app.use("/api/admin", adminRouter);

export default app;