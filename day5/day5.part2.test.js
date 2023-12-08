const {
    findLowestLocation
} = require('./day5.part1')

const {
    parseAlmanac,
    extractSeedsRanges,
    extractSeedsFromRanges
} = require('./day5.part2')

test('extract seeds numbers from seed ranges', () => {
    const almanac = `seeds: 79 14 55 13`

    const seedRanges = extractSeedsRanges(almanac)

    expect(seedRanges).toEqual([
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

test('find lowest location with ranges of seeds', () => {
    const almanac = `seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4`

    const { seedRanges, maps } = parseAlmanac(almanac)

    const seeds = extractSeedsFromRanges(seedRanges)

    const lowestLocation = findLowestLocation(seeds, maps)

    expect(lowestLocation).toBe(46)
})