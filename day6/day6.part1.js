function getRaceDetails(raceDocument) {
    const raceDetails = []

    const documentLines = raceDocument.split('\n')
    
    const timeLine = documentLines[0]
    const times = timeLine.split(':')[1].split(' ').filter(x => x !== '')

    const distanceLine = documentLines[1]
    const distances = distanceLine.split(':')[1].split(' ').filter(x => x !== '')

    for (let i = 0; i < times.length; i++) {
        const time = parseInt(times[i])
        const distance = parseInt(distances[i])

        raceDetails.push({ time, distance })
    }
    

    return raceDetails
}

function getOptionsToWin({ time, distance }) {
    const optionsToWin = []

    for (let consumedTime = 1; consumedTime < time; consumedTime++) {
        let remainingTime = time-consumedTime

        let traveledDistance = consumedTime * remainingTime

        if (traveledDistance > distance) {
            optionsToWin.push(consumedTime)
        }
    }

    return optionsToWin
}

function getMarginErrors(raceDocument) {
    const raceDetails = getRaceDetails(raceDocument)

    let marginErrors = 1

    for (const raceDetail of raceDetails) {
        const optionsToWin = getOptionsToWin(raceDetail)

        marginErrors *= optionsToWin.length
    }

    return marginErrors
}

module.exports = {
    getRaceDetails,
    getOptionsToWin,
    getMarginErrors
}