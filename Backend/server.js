import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import imageRouter from "./routes/image.route.js";
import VideoGenRouter from './routes/vidGen.route.js'
import path from "path";
const __dirname = path.resolve() 

dotenv.config();
const app=express();
const port=process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

await connectDB();

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.use('/api/aivideo',VideoGenRouter);
app.use(express.static(path.join(__dirname,"./Frontend/dist")))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'))
  })
  


app.listen(port,()=>{
    console.log(`server listening on port ${port} `)
})