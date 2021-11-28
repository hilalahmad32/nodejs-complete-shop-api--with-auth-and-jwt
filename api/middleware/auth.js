import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
export default (req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const decode=jwt.verify(token,process.env.TOKEN);
        req.userData=decode;
        next();
    } catch (error) {
        res.send("UnAuth")
    }
}