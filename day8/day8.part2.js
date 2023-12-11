function stepsPerPath(directions, network, startingPositions, endingPositions) {
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

// Use the mathematic formula to compute the least common multiplier between all
// steps required for each path
function commonShortestPath(stepsPerPath) {
    let steps = Array.from(stepsPerPath.values())
    let lcm = steps[0]

    for (let i=1; i<steps.length; i++) {
        lcm = lcm * steps[i] / gcd(lcm, steps[i])
    }

    return lcm
}

// Thank you copilot
function gcd(a, b) {
    if (b === 0) {
        return a
    }

    return gcd(b, a % b)
}

module.exports = {
    stepsPerPath,
    findStartingNodes,
    findEndingNodes,
    commonShortestPath
}