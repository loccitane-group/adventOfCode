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

module.exports = {
    getRaceDetails
}