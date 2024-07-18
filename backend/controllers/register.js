import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const register = async(req,res) =>{
     //console.log(req);
     try {
        //get all data from request body
        const {userName, email, password} = req.body;

        //check that all the data exists
        if(!(userName && email && password)){
            return res.status(400).json({message: "Please enter the required fields"});
        }

        //check password length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        //check if user already exists
        const existingUser =  await User.findOne({email});//mongoose query
        console.log(existingUser);
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }

        //encrpyt password--bcrypt
        const hashPassword = await bcrypt.hashSync(password, 10);
        //console.log(hashPassword);

        //save the user to the database
        const user = await User.create({
            userName,
            email,
            password: hashPassword
        });
 
        //generate a token for user and send it
        const token = jwt.sign({id: user._id, email}, process.env.SECRET_KEY, {
            expiresIn : "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "Successful registration",
            user,
            token
        });
        //send response

        
    } catch (error) {
        console.error(error.message);
    }
};

export default register;