import jwt from "jsonwebtoken";

export const generateToken = (res, userId, role,name) => {
    // 1. Token banayein (Payload mein ID aur Role daalein)
    const token = jwt.sign(
        { id: userId, role: role,username:name}, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } // 7 din ki validity
    );

    // 2. Cookie options set karein (Security ke liye)
    const cookieOptions = {
        httpOnly: true, // Frontend JS ise read nahi kar payegi (Safe from XSS)
        secure: process.env.NODE_ENV === "production", // Sirf HTTPS par chalega prod mein
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din milliseconds mein
    };

    // 3. Response mein cookie set karein
    res.cookie("token", token, cookieOptions);

    return token;
};

