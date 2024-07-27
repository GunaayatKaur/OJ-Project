import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../data');

const resolvePaths = (testCases) => {
  return testCases.map(testCase => ({
    ...testCase.toObject(),
    input: path.resolve(dataDir, testCase.input),
    output: path.resolve(dataDir, testCase.output)
  }));
};

export default resolvePaths;