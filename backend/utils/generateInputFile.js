import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirInputs = path.join(__dirname, 'inputs');

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, {recursive: true});
}//if folder doesnt exist create folder

const generateInputFile = async(input) =>{
    const jobId = uuid();//unique file name
    const input_filename = `${jobId}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    
    fs.writeFileSync(input_filePath, input);
    return input_filePath;
};

export default generateInputFile;