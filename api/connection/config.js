import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.DB).then(()=>{
    console.log("connection successfully");
}).catch((e)=>{
    console.log(e);
})