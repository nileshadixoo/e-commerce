import { pool } from "../database/connect.database.js";
import { verifyToken } from "../utils/util.js";


export const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies?.token || req.header?.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthenticated"
            })
        }
        const decoded =  verifyToken(token);
        req.user = decoded.user;
        next()
    } catch (error) {
        console.log(error);
        
    }
}

export const verifyRole = async(req,res,next)=>{
       try {
            const email = req.user;
            const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
            if(user.rows[0].role !== 'admin'){
                return res.status(401).json({
                    success:false,
                    message:"You are not authorized "
                })
            }
            next();
       } catch (error) {
            console.log(error);

       } 
}