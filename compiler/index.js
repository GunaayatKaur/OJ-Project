const express = require('express');
const cors = require('cors');
const { executeJava } = require('./executeJava.js');
const { executePy } = require('./executePy.js');
const { executeCpp } = require('./executecpp.js');
const { generateFile } = require('./generateFile.js');
const { generateInputFile } = require('./generateInputFile.js');
const fs = require('fs').promises;
const axios = require('axios');
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

app.post('/submit', async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;

    if (code === undefined || problemId === undefined) {
        return res.status(500).json({ "success": false, message: "Code or problem ID is missing!" });
    }

    try {
        // Fetch test cases from the main backend
        const testCasesResponse = await axios.get(`http://localhost:8000/getTestcases/${problemId}`);
        const testCases = testCasesResponse.data;

        if (testCases.length === 0) {
            return res.status(404).json({ "success": false, message: "No test cases found for this problem!" });
        }

        const filePath = await generateFile(language, code);
        let allTestsPassed = true;

        for (const testCase of testCases) {
            const inputFilePath = testCase.input; 
            const expectedOutputFilePath = testCase.output; 

            const expectedOutputContent = await fs.readFile(expectedOutputFilePath, 'utf8');
            let output;
            if (language === 'java') {
                output = await executeJava(filePath, inputFilePath);
            } else if (language === 'py') {
                output = await executePy(filePath, inputFilePath);
            } else {
                output = await executeCpp(filePath, inputFilePath);
            }

            // Compare output with expected output
            if (output.trim() !== expectedOutputContent.trim()) {
                allTestsPassed = false;
                break;
            }
        }

        if (allTestsPassed) {
            res.json({ "success": true, message: "Code Submitted successfully!" });
        } else {
            res.json({ "success": false, message: "Code did not pass all test cases." });
        }

    } catch (error) {
        return res.status(500).json({ "success": false, message: error.message });
    }
});

app.listen(8080, () => {
    console.log('Example app listens at http://localhost:8080')
});
