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

module.exports = {
    parseMap,
    findNextLeftPosition
}