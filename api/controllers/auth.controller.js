import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const {username,email,password} = req.body;
    const hashpassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashpassword})
    try {
        await newUser.save()
        res.status(210).json({message:"User created successfully"});
    } catch (error) {
        res.status(500).json(error.message)
    }
   
};


