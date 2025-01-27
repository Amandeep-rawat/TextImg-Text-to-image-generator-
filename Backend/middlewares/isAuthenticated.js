import jwt from "jsonwebtoken"
const isAuthenticated=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        
        
        if(!token){
            return res.status(400).json({message:"Please login first"});
           
            
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decodedToken.id;
        req.id=decodedToken.id;
    
        // console.log("succesfull authentication ",req.body.userId);
        
        next();
    } catch (error) {
        return res.status(400).json({message:"something went wrong"});
    }
}

export default isAuthenticated;