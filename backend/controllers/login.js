import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();

const login = async(req,res) => {
    try {
        //get all the data from request body
        const {email, password} = req.body;
        //check that all the data should exists
        if(!(email && password)){
            return res.status(400).json({message: "Please enter the required fields"});
        }
        //find user in database
        const user =  await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }

        //match password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).json({message: "Password is incorrect"});
        }

        const tokenExist = req.cookies.token;
        if(tokenExist){
            return res.status(400).json({message: "User is already logged in"});
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY,  {
            expiresIn : "1h"
        });
        user.token = token;
        user.password = undefined;
        
        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            httpOnly: true,
        };
        
        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token: token
        });
    } catch (error) {
        console.log(error);
    }
};

export default login;