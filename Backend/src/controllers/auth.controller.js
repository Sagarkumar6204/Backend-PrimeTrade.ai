import userModel from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();

export  async function registerUserController(req, res){
    try {
        const { username, email, password, role } = req.body;

        // 1. Basic Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide username, email, and password." });
        }

        // 2. Check if user already exists
        const existingUser = await userModel.findOne({$or:[{username},{email} ]});
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and save the new user
        const newUser = await userModel.create({
            username:username,
            email:email,
            password: hashedPassword,
            role: role || "user" // Agar frontend se role nahi aaya, toh default 'user' banega
        });

        generateToken(res, newUser._id, newUser.role,newUser.username);
         
        // 5. Send success response (Bina password return kiye)
        res.status(201).json({ 
            message: "User registered successfully!", 
            user: { 
                id: newUser._id, 
                username: newUser.username, 
                email: newUser.email, 
                role: newUser.role 
            } 
        });

    } catch (error) {
        console.error("Error in register :", error);
        res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
};

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Basic Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password." });
        }

        // 2. Check if user exists 
        // Note: Agar aapne schema mein password par `select: false` lagaya hai, 
        // toh yahan `.select("+password")` lagana zaroori hai.
        const user = await userModel.findOne({ email }).select("+password");
        
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        // 3. Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

      
        generateToken(res, user._id, user.role,user.username);

        // 6. Send success response (Bina password return kiye)
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in login :", error);
        res.status(500).json({ message: "Server error during login.", error: error.message });
    }
}
export async function logoutUserController(req, res) {
    try {
        // Express ka built-in method cookie clear karne ke liye
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({
            message: "Logged out successfully! See you soon."
        });

    } catch (error) {
        console.error("Error in logout :", error);
        res.status(500).json({ message: "Server error during logout.", error: error.message });
    }
}