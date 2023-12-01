
const { readFileLines } = require('./fileReader')

const readCalibrationDocument = (filename, callback) => {
    readFileLines(filename, (calibrationValues) => {
       callback(calibrationValues)
    })
}

const cleanCalibrationValues = (rawValues) => {
    const calibrationValues = []

    for (var line of rawValues) {

        let calibrationValue = findCalibrationValue(line)

        calibrationValues.push(calibrationValue)
    }

    return calibrationValues
}

const findCalibrationValue = (text) => {
    let firstDigit, lastDigit;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        if (!isNaN(char)) {
            if (!firstDigit && !lastDigit) {
                firstDigit = char;
            }

            lastDigit = char;
        }
    }

    return combineDigits(firstDigit, lastDigit)
}


const combineDigits = (firstDigit, lastDigit) => {
    return `${firstDigit}${lastDigit}`
}

const sumCalibrationValues = (calibrationValues) => {
    return calibrationValues
            .map(char => parseInt(char))
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
}

module.exports = {
    readCalibrationDocument,
    findCalibrationValue,
    cleanCalibrationValues,
    sumCalibrationValues
}


