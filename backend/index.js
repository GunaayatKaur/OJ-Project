const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Welcome to todays class')
})

app.post('/register', (req, res) => {
    console.log(req);
    try {
        //get all data from request body
        const {firstName, lastName, email, password} = req.body;

        //check that all the data exists
        if(!(firstName && lastName && email && password)){
            return res.status(400).send("Please enter all required fields!");
        }

        //check if user already exists
        

        //encrpyt password


        //save the user to the database


        //generate a token for user and send it

        //send response

        
    } catch (error) {
        console.error(error);
    }
})

app.listen(3000 , () => {
    console.log('Example app listens at http://localhost:3000')
})