import {pool} from "../database/connect.database.js"

export const addProductToCart =async(req,res)=>{
    try {
        const {userId,productId} = req.body;
        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Please provide the required field"
            })
        }
        const user = await pool.query('select * from users where user_id = $1',[userId])
        if(user.rows.length ===0){
            return res.status(401).json({
                success:false,
                message:"This user does'nt exist"
            })
        }
        const product = await pool.query('select * from products where p_id = $1',[productId])
        if(product.rows.length ===0){
            return res.status(401).json({
                success:false,
                message:"This product  does'nt exist"
            })
        } 
        await pool.query("insert into cart(product_id,user_id)values($1,$2) ",[productId,userId])
        
        res.status(201).json({
            success:true,
            message:"Product added successfully"
        }) 
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
export const deleteProductFromCart =async(req,res)=>{
    try {
        const {userId,productId} = req.body;
        
        if(!userId || !productId){
            return res.status(404).json({
                success:false,
                message:"Please provide the required field"
            })
        }
        const user = await pool.query('select * from users where user_id = $1',[userId])
        if(user.rows.length ===0){
            return res.status(401).json({
                success:false,
                message:"This user does'nt exist"
            })
        }
        const product = await pool.query('select * from products where p_id = $1',[productId])
        if(product.rows.length ===0){
            return res.status(401).json({
                success:false,
                message:"This product does'nt exist"
            })
        } 
        const productInCart = await pool.query("select * from cart where product_id = $1 and user_id=$2",[productId,userId])
        if(productInCart.rows.length ===0){
            return res.status(400).json({
                success:true,
                message:"No such product in cart"
            })
        }
        await pool.query("DELETE FROM cart WHERE cart_id = $1; ",[productInCart.rows[0].cart_id])
        
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        }) 
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
export const incrementCount = async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await pool.query("select * from cart where product_id = $1",[productId])
        if(product.rows.length ===0){
            return res.status(400).json({
                success:false,
                message:"Invalid product id"
            })
        }
        await pool.query("update cart set quantity = quantity + 1 where cart_id = $1 returning*",[product.rows[0].cart_id])
        return res.status(200).json({
            success:true,
            message:"quantity incremented"
        })

    } catch (error) {
        console.log(error)
    }
}
export const decrementCount = async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await pool.query("select * from cart where product_id = $1",[productId])
        if(product.rows.length ===0){
            return res.status(400).json({
                success:false,
                message:"Invalid product id"
            })
        }
        await pool.query("update cart set quantity = quantity - 1 where cart_id = $1 returning*",[product.rows[0].cart_id])
        return res.status(200).json({
            success:true,
            message:"quantity decrement"
        })

    } catch (error) {
        console.log(error)
    }
}

export const getCart = async(req,res)=>{
    try {
        const {userId} = req.query;
        const user = await pool.query("select * from users where user_id = $1",[userId]);
        if(user.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist"
            })
        }
        const cart = await pool.query("SELECT cart_id,p_id,name,description,img,category,color,price,quantity FROM cart c JOIN products p ON c.product_id = p.p_id WHERE c.user_id = $1",[userId]);
        return res.status(200).json({
            success:true,
            message:"Fetched successfully",
            cart:cart.rows

        })
        
    } catch (error) {
        console.log(error)
    }
}   