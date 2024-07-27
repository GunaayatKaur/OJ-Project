import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = async(filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];//get job ID from file name
    const executable_file = `${jobId}.exe`;
    const exePath = path.join(outputPath, executable_file);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${exePath} && cd ${outputPath} && .\\${executable_file} < ${inputPath}`,
        (error, stdout, stderr) => {
            if(error) {
                reject({error, stderr});
            }
            if(stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });//request resolve or reject
};

export default executeCpp;