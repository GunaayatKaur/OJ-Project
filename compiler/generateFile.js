const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codes');//path for codes folder created

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true});
}//if folder doesnt exist create folder

const generateFile = async(language, code) =>{
    const jobId = uuid();//unique file name
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, filename);
    
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};