const {
    readCalibrationDocument,
    cleanCalibrationValues,
    sumCalibrationValues
} = require('./day1-part1')

readCalibrationDocument('test-input-1', rawValues => {
    const cleanedCalibrationValues = cleanCalibrationValues(rawValues)

    const sum = sumCalibrationValues(cleanedCalibrationValues)

    console.log(sum)
})

readCalibrationDocument('input', rawValues => {
    const cleanedCalibrationValues = cleanCalibrationValues(rawValues)

    const sum = sumCalibrationValues(cleanedCalibrationValues)

    console.log(sum)
})