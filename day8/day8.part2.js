const {
    findNextLeftPosition,
    findNextRightPosition,
    STARTING_POSITION,
    ENDING_POSITION,
} = require('./day8.part1')

function navigate(directions, network, startingPositions, endingPositions) {
    let stepsPerPath = new Map()

    for (let i=0; i<startingPositions.length; i++) {
        let currentPosition = startingPositions[i]

        let numberOfSteps = 0

        for (let j=0; j<directions.length; j++) {

            numberOfSteps++
            const direction = directions[j]
            if (direction === 'L') {
                currentPosition = network[currentPosition].left
            } else {
                currentPosition = network[currentPosition].right
            }


            // if we are at the last iteration and we are still not at the ending position
            // start over the same loop until we reach the ending position
            if (j === directions.length - 1 && !endingPositions.includes(currentPosition)) {
                j = -1
            }

            if (endingPositions.includes(currentPosition)) {
                stepsPerPath.set(startingPositions[i], numberOfSteps)
                
                break
            }
        }
    }

    return stepsPerPath
}

function findStartingNodes(network) {
    return Object.entries(network)
        .filter(([position, leftRight]) => position.endsWith('A'))
        .map(([key, value]) => key)
}

function findEndingNodes(network) {
    return Object.entries(network)
        .filter(([position, leftRight]) => position.endsWith('Z'))
        .map(([key, value]) => key)

}

module.exports = {
    navigate,
    findStartingNodes,
    findEndingNodes
}