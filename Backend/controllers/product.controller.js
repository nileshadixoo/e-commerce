
import { mkdirSync } from "fs";
import { pool } from "../database/connect.database.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadProduct = async(req,res)=>{
    try {
        const {name,description,price,quantity,category,color} = req.body;

        if(!name || !description || !price || !quantity || !category || !color){
            return res.status(400).json({
                success:false,
                message:"Please provide the required field"
            })
        }
        const localFilePath = req.file.path

        const uploadFileUrl = await uploadOnCloudinary(localFilePath);
        
       
        
        const response = await pool.query("INSERT INTO products(name,description,img,quantity,category,color,price)VALUES($1,$2,$3,$4,$5,$6,$7) returning *",[name,description,uploadFileUrl,quantity,category,color,price])
        return res.status(201).json({
            success:true,
            message:"Product uploaded successfully",
            product:response.rows[0]
        })
      
        


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Failed to list product"
        })
    }
}

export const updateProducts = async(req,res)=>{
    try {
        const {id} = req.params;
        
        
        const {name,description,category,quantity,price,color} = req.body;
        if(!name || !description || !price || !quantity || !category || !color){
            return res.status(400).json({
                success:false,
                message:"Please provide the required field"
            })
        }
       

        const product = await pool.query("SELECT * FROM products WHERE p_id = $1",[id])
        
        
        if(product.rows[0].length ===0){
            return res.status(400).json({
                success:false,
                message:"Invalid product id"
            })
        }
        
        if(req?.file?.path){
           try {
            const newImg = await uploadOnCloudinary(req.file.path);
            await pool.query("UPDATE products SET img = $1 where p_id=$2",[newImg,id])
           } catch (error) {
            console.log(error);
            return res.status(400).json({
                success:false,
                message:'Failed to uplaod image'
            })
           }
        }
        
        const updateProduct = await pool.query("UPDATE products SET (name,description,category,quantity,price) = ($1,$2,$3,$4,$5) WHERE p_id = $6 returning *",[name,description,category,quantity,price,id])
        console.log(updateProduct)
        return res.status(200).json({
            success:true,
            message:"Updated successfully",
            product:updateProduct
        })
        


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Failed to update product"
        })
    }
}