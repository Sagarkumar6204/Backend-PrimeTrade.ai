
import jwt from "jsonwebtoken";
export async function commonAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token found" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token se user data req mein daal diya
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}