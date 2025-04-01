import dotenv from 'dotenv';
dotenv.config();
import createServer from './utils/server.js';
const port = process.env.PORT || 3000;

const app = createServer();

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
    
})

export default app