const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

module.exports = {
    executeJava,
};
