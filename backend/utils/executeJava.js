import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const codesPath = path.join(__dirname, 'codes');

const executeJava = async (filepath, inputPath) => {
    return new Promise((resolve, reject) => {
        exec(`java ${filepath} < ${inputPath}`,
            { cwd: codesPath }, // Set working directory to outputPath
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    }); // Request resolve or reject
};

export default executeJava;