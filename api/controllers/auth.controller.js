import { isValidObjectId } from "mongoose";
import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();


export const signup = async (req, res, next) => {
    const {username,email,password} = req.body;
    const hashpassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashpassword})
    try {
        await newUser.save()
        res.status(210).json({message:"User created successfully"});
    } catch (error) {
        next(error);
    }
   
};


export const signin = async (req , res , next) =>{
    const {email, password} =  req.body;
     try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'Invalid credentials'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credential'));
        const token = jwt.sign({id: validUser._id},'rabarabi22');
        const {password : hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 36000000)
        res
        .cookie('access_token',token,{httpOnly:true,expiryDate})
        .status(200)
        .json(rest)
     } catch (error) {
        next(error)
     }
}



