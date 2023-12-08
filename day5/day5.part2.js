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
            seeds.push(j)
        }
    }

    return seeds.sort()
}

module.exports = {
    extractSeedsRanges,
    extractSeedsFromRanges
}
