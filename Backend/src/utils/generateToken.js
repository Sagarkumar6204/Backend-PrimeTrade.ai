import jwt from "jsonwebtoken";

export const generateToken = (res, userId, role,name) => {
   
    const token = jwt.sign(
        { id: userId, role: role,username:name}, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } 
    );

    
    const cookieOptions = {
        httpOnly: true, 
        secure: false,//development only 
        sameSite: "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    };

    
    res.cookie("token", token, cookieOptions);

    return token;
};

