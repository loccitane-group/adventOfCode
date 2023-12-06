const {
    getRaceDetails,
    getOptionsToWin,
    getMarginErrors
} = require('./day6.part1')

test('extract race details from race documents', () => {
    
    const raceDocument = `Time:      7  15   30
    Distance:  9  40  200`

    const raceDetails = getRaceDetails(raceDocument)

    expect(raceDetails).toEqual([
        { time: 7, distance: 9 },
        { time: 15, distance: 40 },
        { time: 30, distance: 200 }
    ])
})

test('find minimum milliseconds to win a race of 9 millimeter', () => {

    const raceDetail = { time: 7, distance: 9 }

    const optionsToWin = getOptionsToWin(raceDetail)

    expect(optionsToWin).toEqual([
        2,
        3,
        4,
        5
    ])
})

test('find margin errors for multiple races', () => {

    const raceDocument = `Time:      7  15   30
    Distance:  9  40  200`

    const marginErrors = getMarginErrors(raceDocument)

    expect(marginErrors).toEqual(288)
})

test('part 1', () => {

    const raceDocument = `Time:        48     93     85     95
    Distance:   296   1928   1236   1391`

    const marginErrors = getMarginErrors(raceDocument)

    expect(marginErrors).toEqual(2756160)
})