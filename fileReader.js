const fs = require('node:fs');

const readFile = async (filename, callback) => {
    fs.readFile(filename, 'utf8', (error, fileContent) => {
        if (error) {
            throw error;
        } else {
            callback(fileContent)
        }
    });
    
}

const readFileLines = async (filename, callback) => {
    readFile(filename, (fileContent) => {
        callback(fileContent.split('\n'))
    })
}

module.exports = {
    readFile,
    readFileLines
}