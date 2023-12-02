
let {
    readCalibrationDocument,
    findCalibrationValue,
    cleanCalibrationValues,
    sumCalibrationValues
} = require('./day1-part1')


cleanCalibrationValues = (rawValues) => {
    const calibrationValues = []

    for (var line of rawValues) {
        line = replaceSpelledOutNumbers(line)

        let calibrationValue = findCalibrationValue(line)

        calibrationValues.push(calibrationValue)
    }

    return calibrationValues
}
const replaceSpelledOutNumbers = (text) => {
    let formattedText = text;

    formattedText = formattedText.replaceAll('twone', '21')
    formattedText = formattedText.replaceAll('threeight', '38')
    formattedText = formattedText.replaceAll('oneight', '18')
    formattedText = formattedText.replaceAll('fiveight', '58')
    formattedText = formattedText.replaceAll('nineight', '98')
    formattedText = formattedText.replaceAll('sevenine', '79')
    formattedText = formattedText.replaceAll('eighthree', '83')
    formattedText = formattedText.replaceAll('eightwo', '82')

    formattedText = formattedText.replaceAll('one', '1')
    formattedText = formattedText.replaceAll('two', '2')
    formattedText = formattedText.replaceAll('three', '3')
    formattedText = formattedText.replaceAll('four', '4')
    formattedText = formattedText.replaceAll('five', '5')
    formattedText = formattedText.replaceAll('six', '6')
    formattedText = formattedText.replaceAll('seven', '7')
    formattedText = formattedText.replaceAll('eight', '8')
    formattedText = formattedText.replaceAll('nine', '9')

    return formattedText;
}

module.exports = {
    readCalibrationDocument,
    cleanCalibrationValues,
    sumCalibrationValues
}

