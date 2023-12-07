const {
    extractSeeds,
    extractSingleMap,
    parseAlmanac,
    calculateLocation
} = require('./day5.part1')

test('extract seed numbers from almanac', () => {
    const almanac = `seeds: 79 14 55 13`

    const seeds = extractSeeds(almanac)

    expect(seeds).toEqual([{
        seed: 79
    }, {
        seed: 14
    }, {
        seed: 55
    }, {
        seed: 13
    }])
})

test('extract map from almanac', () => {
    const almanac = `seed-to-soil map:
    50 98 2`

    const map = extractSingleMap(almanac)

    expect(map).toEqual({
        sourceCategory: 'seed',
        destinationCategory: 'soil',
        rangesOfNumbers: [{
            destinationRangeStart: 50,
            destinationRange: [50, 51],
            sourceRangeStart: 98,
            sourceRange: [98, 99],
            rangeLength: 2
        }]
    })
})

test('extract all maps from almanac', () => {
    const almanac = `seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15`

    const parsedAlmanac = parseAlmanac(almanac)

    expect(parsedAlmanac.seeds).toEqual(
        [{
            seed: 79
        }, {
            seed: 14
        }, {
            seed: 55
        }, {
            seed: 13
        }])

    expect(parsedAlmanac.maps.length).toBe(2)
})

test('calculate location of seed', () => {
    const seedNumber = 79
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

    const seedLocation = calculateLocation(seedNumber, almanac)

    expect(seedLocation).toBe(82)
})