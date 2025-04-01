import express, { urlencoded } from 'express'
import userRoutes from "../routes/user.routes.js"
import productRoutes from "../routes/products.routes.js"
import cartRoutes from "../routes/cart.routes.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

function createServer (){
    const app = express();

    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded({extended:false}))
    app.use(cookieParser())
    
    app.get("/",(req,res)=>{
        res.send('Welcome')
    })
    //  user routes 
    app.use('/auth',userRoutes)
    
    // product routes
    app.use('/products/',productRoutes)
    
    // cart routes
    app.use('/cart',cartRoutes)


    return app;
}

export default createServer