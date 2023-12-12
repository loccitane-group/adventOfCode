function mapTiles(tiles) {
    const map = new Map()

    tiles.split('\n').map(l => l.trim()).forEach((line, y) => {
        line.split('').forEach((tile, x) => {
            if (tile !== '.') {
                map.set(`${x},${y}`, tile)
            }
        })
    })

    return map
}

function findStartingPosition(map) {
    for (let [position, tile] of map.entries()) {
        if (tile === PIPE.STARTING) {
            const [x, y] = position.split(',').map(x => parseInt(x))
            return {
                x,
                y
            }
        }
    }
}

const PIPE = {
    STARTING: 'S',
    VERTICAL_NORTH_SOUTH: '|',
    HORIZONTAL_EAST_WEST: '-',
    BEND_NORTH_EAST: 'L',
    BEND_NORTH_WEST: 'J',
    BEND_SOUTH_WEST: '7',
    BEND_SOUTH_EAST: 'F',
    GROUND: '.'
}


module.exports = {
    mapTiles,
    findStartingPosition
}