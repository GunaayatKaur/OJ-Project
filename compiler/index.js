const express = require('express');
const cors = require('cors');
const { executeJava } = require('./executeJava.js');
const { executePy } = require('./executePy.js');
const { executeCpp } = require('./executecpp.js');
const { generateFile } = require('./generateFile.js');
const { generateInputFile } = require('./generateInputFile.js');

const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Compiler Page")
});

app.post('/run', async(req, res)=>{
    const {language = 'cpp', code, input} = req.body;

    if(code === undefined) {
        return res.status(500).json({"success" : false, message: "Empty code body!"})
    }
    try {
        const filePath = await generateFile(language, code);
        const input_filePath = await generateInputFile(input);
        let output;
        if(language === 'java'){
            output = await executeJava(filePath, input_filePath);
        }
        else if(language === 'py'){
            output = await executePy(filePath, input_filePath);
        } 
        else{
            output = await executeCpp(filePath, input_filePath);
        }
        
        res.json({filePath, input_filePath, output});
    } catch (error) {
        return res.status(500).json({"success" : false, message: error.message})
    }
});

app.listen(8080, () => {
    console.log('Example app listens at http://localhost:8080')
});
