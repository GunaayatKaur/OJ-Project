const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const codesPath = path.join(__dirname, 'codes');

const executePy = async(filepath, inputPath) => {
    return new Promise((resolve, reject) => {
        exec(`python ${filepath} < ${inputPath}`, { cwd: codesPath }, // Set working directory to codesPath
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
    }); 
};
module.exports = {
    executePy,
};