import TestCase from '../models/Testcase.js';
import fs from 'fs/promises';
import resolvePaths from '../utils/resolvePath.js';

import executeCpp from '../utils/executecpp.js';
import generateFile from '../utils/generateFile.js';
import executeJava from '../utils/executeJava.js';
import executePy from '../utils/executePy.js';
import generateInputFile from '../utils/generateInputFile.js';

export const submitCode = async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;

    try {
        // Fetch test cases for the given problemId directly from the database
        const testCases = await TestCase.find({ problemId }).exec();

        if (testCases.length === 0) {
            return res.status(404).json({ success: false, message: 'No test cases found for this problem.' });
        }

        // Resolve the paths for input and output files
        const testCasesWithPaths = resolvePaths(testCases);

        const filePath = await generateFile(language, code);
        let allTestsPassed = true;

        for (const testCase of testCasesWithPaths) {
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
        console.error('Error during code submission:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const runCode = async (req, res) => {
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
}

