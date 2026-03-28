import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
 export async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to DB :)");
    } catch (error) {
        console.log("error to connect DB",error);
    }
 }