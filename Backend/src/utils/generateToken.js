import jwt from "jsonwebtoken";

export const generateToken = (res, userId, role,name) => {
   
    const token = jwt.sign(
        { id: userId, role: role,username:name}, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } 
    );

    
    const cookieOptions =  {
  httpOnly: true,   
  
  secure: true,     
  
  sameSite: "None",  
  
  maxAge: 1 * 24 * 60 * 60 * 1000, 
};
 
    res.cookie("token", token, cookieOptions);

    return token;
};

