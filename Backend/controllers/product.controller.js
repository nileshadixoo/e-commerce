import { pool } from "../database/connect.database.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, color } = req.body;
    console.log(req.file)

    if (!name || !description || !price || !stock || !category || !color) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required field",
      });
    }
    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({
        success: false,
        message: "Error in uplaoding file please try again",
      });
    }
    const uploadFileUrl = await uploadOnCloudinary(localFilePath);

    const response = await pool.query(
      "INSERT INTO products(name,description,img,stock,category,color,price)VALUES($1,$2,$3,$4,$5,$6,$7) returning *",
      [name, description, uploadFileUrl, stock, category, color, price]
    );
    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: response.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to list product",
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, category, stock, price, color } = req.body;
    if (!name || !description || !price || !stock || !category || !color) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required field",
      });
    }

    const product = await pool.query("SELECT * FROM products WHERE p_id = $1", [
      id,
    ]);

    if (product.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    if (req?.file?.path) {
      try {
        const newImg = await uploadOnCloudinary(req.file.path);
        await pool.query("UPDATE products SET img = $1 where p_id=$2", [
          newImg,
          id,
        ]);
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "Failed to uplaod image",
        });
      }
    }

    const updateProduct = await pool.query(
      "UPDATE products SET (name,description,category,stock,price) = ($1,$2,$3,$4,$5) WHERE p_id = $6 returning *",
      [name, description, category, stock, price, id]
    );
    
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.status(200).json({
      success: true,
      products: allProducts.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE p_id = $1", [
      id,
    ]);
    if(product.rows.length===0){
        return res.status(400).json({
            success:false,
            message:"Invalid product id"
        })
    }
    return res.status(200).json({
      success: true,
      product: product.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE p_id = $1", [
      id,
    ]);
   
    if(product.rows.length===0){
        return res.status(400).json({
            success:false,
            message:"Invalid product id"
        })
    }
    await pool.query('DELETE FROM products WHERE p_id = $1',[id])
    
    return res.status(200).json({
      success: true,
      message: "product delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

export const searchProduct = async(req,res)=>{
  try {
    const {name} = req.params
    const products = await pool.query("SELECT * FROM products WHERE name ILIKE $1 ",[`%${name}%`])
    
    if(products.rows.length==0){
        return res.status(404).json({
            success:false,
            message:"No product found"
        })
    }
    return res.status(200).json({
        success:false,
        products:products.rows
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
        success:false,
        message:"Internal server error"
    })
  }  
}