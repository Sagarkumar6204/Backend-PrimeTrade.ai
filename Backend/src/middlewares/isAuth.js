import jwt from "jsonwebtoken";
import dotenv  from "dotenv";
dotenv.config();

export async function isAuthAdmin(req,res,next) {
    console.log("Admin Middleware Hit!")
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(403).json({message:"Unauthorized"})
    }
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=="admin")
        {
            return res.status(403).json({message:"you dont have access to this :("})
        }
       req.user = decoded;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Unauthorized Admin"});

    }
    
}

export async function isAuthUser(req,res,next) {

    const token=req.cookies.token;
    if(!token)
    {
      return  res.status(401).json({message:"Unauthorized"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
      if(decoded.role!=="user" )
      {
        return res.status(403).json({message:"you don't have access"});
      }
      req.user = decoded;
        next()               
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Unauthorized"});
    }
}