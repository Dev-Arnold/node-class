import { config } from "dotenv";
config()
import express from "express"
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser";
const app = express();
let port = process.env.PORT || 4800

app.use(express.static("docs"))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("Mongodb Connected successfully🚀"))
    .catch((err)=> console.log(`error while connecting: ${err}`))

app.use('/api/user', userRoutes)

app.use('/api/post', postRoutes)

app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`)
})