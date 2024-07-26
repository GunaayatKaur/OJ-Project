import fs from 'fs';
import path from 'path';
import TestCase from '../models/Testcase.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = process.env.DATA_DIR || path.join(__dirname, '../data');

export const addTestCase = async (req, res) => {
  try {
    const { id } = req.params; 
    //console.log('Received problem ID:', id);
    const { input, output } = req.body;

    const inputDir = path.join(dataDir, 'inputs');
    const outputDir = path.join(dataDir, 'outputs');

    // Ensure directories exist
    if (!fs.existsSync(inputDir)) {
      fs.mkdirSync(inputDir, { recursive: true });
    }
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const inputFilePath = path.join('inputs', `input_${uuid()}.txt`);
    const outputFilePath = path.join('outputs', `output_${uuid()}.txt`);

    // Write input and output to files
    fs.writeFileSync(path.join(dataDir, inputFilePath), input);
    fs.writeFileSync(path.join(dataDir, outputFilePath), output);

    // Create new test case with file paths
    const newTestCase = new TestCase({
      input: inputFilePath,
      output: outputFilePath,
      problemId: id
    });

    await newTestCase.save();

    res.status(201).json(newTestCase);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add test case', error: error.message });
  }
};

export const getTestCasesByProblemId = async (req, res) => {
  const { id } = req.params;
  try {
    const testCases = await TestCase.find({ problemId: id }).exec();

    const testCasesWithPaths = testCases.map(testCase => ({
      ...testCase.toObject(),
      input: path.resolve(dataDir, testCase.input),
      output: path.resolve(dataDir, testCase.output)
    }));

    res.json(testCasesWithPaths);
  } catch (error) {
    res.status(500).json({ "success": false, message: error.message });
  }
};
