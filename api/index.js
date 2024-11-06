import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect('mongodb+srv://rabarabi:rabarabi22@auth-app.rtcg7.mongodb.net/auth-app?retryWrites=true&w=majority&appName=auth-app').then(()=>{
    console.log('Conected to MONGODB')
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use(express.json())

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
});

app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});