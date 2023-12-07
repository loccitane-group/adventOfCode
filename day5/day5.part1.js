function extractSeeds(almanac) {
    const seeds = almanac.split('seeds: ')[1].split(' ')
    return seeds.map(seed => ({
        seed: parseInt(seed)
    }))
}

function extractSingleMap(almanac) {
    const map = almanac.split(':')[1].split('\n').filter(x => x)
    const sourceCategory = almanac.split('\n')[0].split(':')[0].split(' ')[0].split('-to-')[0]
    const destinationCategory = almanac.split('\n')[0].split(':')[0].split(' ')[0].split('-to-')[1]

    const rangesOfNumbers = map.map(x => x.trim()).map(line => {
        const destinationRangeStart = parseInt(line.split(' ')[0])
        const destinationRange = []
        const sourceRangeStart = parseInt(line.split(' ')[1])
        const sourceRange = []
        const rangeLength = parseInt(line.split(' ')[2])

        for (let i = 0; i < rangeLength; i++) {
            destinationRange.push(destinationRangeStart+i)
            sourceRange.push(sourceRangeStart+i)
        }

        return {
            destinationRangeStart,
            destinationRange,
            sourceRangeStart,
            sourceRange,
            rangeLength
        }
    })

    return {
        sourceCategory,
        destinationCategory,
        rangesOfNumbers
    }
}

function containsDigits(string) {
    return /\d/.test(string);
}

function parseMultipleMap(lines) {
    const maps = []

    let currentMap = {}

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        if (line.includes('map:')) {
            let [sourceCategory, destinationCategory] = line.replace(' map:', '').split('-to-')
            currentMap.sourceCategory = sourceCategory.trim()
            currentMap.destinationCategory = destinationCategory.trim()
        }

        else if (containsDigits(line)) {
            let digits = line.split(' ').map(x => x.trim()).filter(x => x)
            let [destinationRangeStart, sourceRangeStart, rangeLength] = digits.map(x => parseInt(x))
            let destinationRange = []
            let sourceRange = []
            let sourceToDestinationMap = new Map()

            // Unmapped sources numbers we put the same destination value
            for (let i = 0; i < sourceRangeStart; i++) {
                destinationRange.push(i)
                sourceRange.push(i)

                sourceToDestinationMap.set(i, i)
            }

            for (let i = 0; i < rangeLength; i++) {
                destinationRange.push(destinationRangeStart+i)
                sourceRange.push(sourceRangeStart+i)

                sourceToDestinationMap.set(sourceRangeStart+i, destinationRangeStart+i)
            }

            currentMap.rangesOfNumbers = currentMap.rangesOfNumbers || []
            currentMap.rangesOfNumbers.push({
                destinationRangeStart,
                destinationRange,
                sourceRangeStart,
                sourceRange,
                rangeLength,
                sourceToDestinationMap
            })
        }

        else {
            maps.push(currentMap)
            currentMap = {}
        }

        // If it's the last line, push the object into the map
        if (i === lines.length -1) {
            maps.push(currentMap)
        }
    }

    return maps
}

function parseAlmanac(almanac) {
    const lines = almanac.split('\n').filter(x => x)
    const seeds = extractSeeds(lines[0])
    const maps = parseMultipleMap(lines.slice(1))

    return {
        seeds,
        maps
    }
}

module.exports = {
    extractSeeds,
    extractSingleMap, 
    parseAlmanac,
}