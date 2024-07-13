const express = require('express')
const app = express()
const {DBConnection} = require('./database/db.js') ;
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

DBConnection();

app.get('/', function (req, res) {
    res.send('Welcome to todays class')
})

app.post('/register', async(req, res) => {
    //console.log(req);
    try {
        //get all data from request body
        const {userName, email, password} = req.body;

        //check that all the data exists
        if(!(userName && email && password)){
            return res.status(400).send("Please enter all the required fields");
        }

        //check if user already exists
        const existingUser =  await User.findOne({email});//mongoose query
        if(existingUser) {
            return res.send(400).send("User already exists!");
        }

        //encrpyt password--bcrypt
        const hashPassword = bcrypt.hashSync(password, 10);
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
            user
        });
        //send response

        
    } catch (error) {
        console.error(error);
    }
})

app.post('/login', async(req, res) => {
    try {
        //get all the data from request body
        const {email, password} = req.body;
        //check that all the data should exists
        if(!(email && password)){
            return res.status(400).send("Please enter all the required fields");
        }
        //find user in database
        const user =  await User.findOne({email});
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY,  {
            expiresIn : "1h"
        });
        user.token = token;
        user.password = undefined;

        //store cookies- cookie parser
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        
        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
    }
})


app.listen(8000 , () => {
    console.log('Example app listens at http://localhost:8000')
})