const {
    parseMultipleMap,
    calculateLocation
} = require('./day5.part1')

function parseAlmanac(almanac) {
    const lines = almanac.split('\n').filter(x => x)
    const seedRanges = extractSeedsRanges(lines[0])
    const maps = parseMultipleMap(lines.slice(1))

    return {
        seedRanges,
        maps
    }
}
function extractSeedsRanges(almanac) {
    const seeds = almanac.split('seeds: ')[1].split(' ')

    let ranges = []

    let rangeStart = null
    let rangeLength = null

    for(let i=0; i<seeds.length; i++) {
        const seed = parseInt(seeds[i])

        if (rangeStart === null) {
            rangeStart = seed
            continue
        }

        rangeLength = seed

        ranges.push({
            rangeStart,
            rangeLength,
            rangeEnd: rangeStart + rangeLength - 1,
        })

        rangeStart = null
        rangeLength = null
    }

    return ranges
}

function extractSeedsFromRanges(seedRanges) {
    let seeds = []

    for(let i=0; i<seedRanges.length; i++) {
        const seedRange = seedRanges[i]

        for(let j=seedRange.rangeStart; j<=seedRange.rangeEnd; j++) {
            seeds.push({
                seed: j
            })
        }
    }

    return seeds
}


function findLowestLocation(seedRanges, maps) {
    let lowestLocation = null

    for (let i = 0; i < seedRanges.length; i++) {
        const seedRange = seedRanges[i]

        for(let j=seedRange.rangeStart; j<=seedRange.rangeEnd; j++) {
            const location = calculateLocation(j, maps)

            if (!lowestLocation) {
                lowestLocation = location
            }
            else if (location < lowestLocation) {
                lowestLocation = location
            }
        }
    }

    return lowestLocation
}

module.exports = {
    extractSeedsRanges,
    extractSeedsFromRanges,
    parseAlmanac,
    findLowestLocation
}
