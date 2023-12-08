const {
    extractSeedsRanges,
    extractSeedsFromRanges
} = require('./day5.part2')

test('extract seeds numbers from seed ranges', () => {
    const almanac = `seeds: 79 14 55 13`

    const seeds = extractSeedsRanges(almanac)

    expect(seeds).toEqual([
            {
                rangeStart: 79,
                rangeLength: 14,
                rangeEnd: 92
            },
            {
                rangeStart: 55,
                rangeLength: 13,
                rangeEnd: 67
            }
        ])
})

test('extract all seeds numbers from seed ranges', () => {
    const seedRanges = [
        {
            rangeStart: 79,
            rangeLength: 14,
            rangeEnd: 92
        },
        {
            rangeStart: 55,
            rangeLength: 13,
            rangeEnd: 67
        }
    ]

    const seeds = extractSeedsFromRanges(seedRanges)

    expect(seeds.length).toBe(27)
})