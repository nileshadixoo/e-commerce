import dotenv from 'dotenv'
dotenv.config();
import express, { urlencoded } from 'express'
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/products.routes.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
    
})