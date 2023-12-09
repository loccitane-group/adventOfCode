function parseMap(maps) {
    const [directions, ...network] = maps.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    const networkMap = network.reduce((map, line) => {
        const [position, leftRightPositions] = line.split('=').map(item => item.trim())
        const [left, right] = leftRightPositions.replace(/\(|\)/g, '').split(',').map(item => item.trim())
        map[position] = {
            left,
            right
        }
        return map
    }, {})
    return {
        directions,
        network: networkMap
    }
}

function findNextLeftPosition(maps, position) {
    const map = parseMap(maps)
    const nextPosition = map.network[position].left
    return nextPosition
}

function findNextRightPosition(maps, position) {
    const map = parseMap(maps)
    const nextPosition = map.network[position].right
    return nextPosition
}

function navigate(directions, network, startingPosition, endingPosition) {
    let currentPosition = startingPosition
    let numberOfSteps = 0

    for (let i=0; i<directions.length; i++) {
        numberOfSteps++
        const direction = directions[i]
        if (direction === 'L') {
            currentPosition = network[currentPosition].left
        } else {
            currentPosition = network[currentPosition].right
        }

        // if we are at the last iteration and we are still not at the ending position
        // start over the same loop until we reach the ending position
        if (i === directions.length - 1 && currentPosition !== endingPosition) {
            i = -1
        }

        if (currentPosition === endingPosition) {
            return numberOfSteps
        }
    }
    return currentPosition
}

STARTING_POSITION = 'AAA'
ENDING_POSITION = 'ZZZ'

function findStartingNodes(network) {
    return Object.entries(network)
        .filter(([position, leftRight]) => position.endsWith('A'))
        .map(([key, value]) => key)
}

module.exports = {
    parseMap,
    findNextLeftPosition,
    findNextRightPosition,
    STARTING_POSITION,
    ENDING_POSITION,
    navigate,
    findStartingNodes
}