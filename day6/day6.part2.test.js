const {
    getMarginErrors,
} = require('./day6.part1')

const {
    fixKerning
} = require('./day6.part2')


test('part 2 example', () => {

    const raceDocument = `Time:      71530
    Distance:  940200`

    const marginErrors = getMarginErrors(raceDocument)

    expect(marginErrors).toEqual(71503)
})


test('fix kerning on race documents', () => {

    const raceDocument = `Time:      7  15   30
    Distance:  9  40  200`

    const fixedRaceDocument = fixKerning(raceDocument)

    expect(fixedRaceDocument).toEqual(`Time:      71530
    Distance:  940200`)
})

test('find margin errors to win with example', () => {

    const raceDocument = `Time:      7  15   30
    Distance:  9  40  200`

    const marginErrors = getMarginErrors(fixKerning(raceDocument))

    expect(marginErrors).toEqual(71503)
})

test('part 2', () => {

    const raceDocument = `Time:        48     93     85     95
    Distance:   296   1928   1236   1391`

    const marginErrors = getMarginErrors(fixKerning(raceDocument))

    expect(marginErrors).toEqual(34788142)
})

