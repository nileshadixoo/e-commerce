import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



export const uploadOnCloudinary = async(localFilePath)=>{
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
            api_key: process.env.CLOUDINARY_API_KEY , 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };
        const response = await cloudinary.uploader.upload(localFilePath,options )
        if(response.url){
            fs.unlinkSync(localFilePath);
        }
        return response.url
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        
    }
}
