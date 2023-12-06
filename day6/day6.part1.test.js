const { getRaceDetails } = require('./day6.part1')

test('race', () => {
    
    const raceDocument = `Time:      7  15   30
    Distance:  9  40  200`

    const raceDetails = getRaceDetails(raceDocument)

    expect(raceDetails).toEqual([
        { time: 7, distance: 9 },
        { time: 15, distance: 40 },
        { time: 30, distance: 200 }
    ])
})