import { pool } from "../database/connect.database.js";
import bcrypt from "bcrypt"
import { createToken } from "../utils/util.js";

export const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username,email,password){
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }
        const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if(user.rows.length!==0){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3) returning *",[username,email,hashedPassword])

       
        
        const token =await createToken(newUser.rows[0].email);

        return res.status(201).json({
            success:true,
            message:'User created successfully',
            token:token
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Failed to register user"
        })
    }
    
}

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if(user.rows.length===0){
            return res.status(401).json({
                success:false,
                message:"Invalid email"
            })
        }

        const isPassword = await bcrypt.compare(password,user.rows[0].password);
        if(!isPassword){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const token = await createToken(email);

        return res.status(200)
        .cookie('token',token,{
            httpOnly:true,
            secure:true
        })
        .json({
            success:true,
            message:"Logged in successfully",
            token:token
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:false,
            message:"Failed to login user"
        })
    }
}

export const logoutUser = async(req,res)=>{
    try {
      
      
        return res.status(200)
        .clearCookie('token',"")
        .json({
            success:true,
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"failed to logout"
        })
    }
}