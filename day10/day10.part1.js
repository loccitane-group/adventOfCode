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
        if (tile === TILE.STARTING) {
            const [x, y] = position.split(',').map(x => parseInt(x))
            return {
                x,
                y
            }
        }
    }
}

const TILE = {
    GROUND: '.',
    STARTING: 'S',
    PIPE: {
        VERTICAL_NORTH_SOUTH: '|',
        HORIZONTAL_EAST_WEST: '-',
        BEND_NORTH_EAST: 'L',
        BEND_NORTH_WEST: 'J',
        BEND_SOUTH_WEST: '7',
        BEND_SOUTH_EAST: 'F'
    }
}

function findNextPipePosition(map, currentPosition) {
    const [x, y] = [currentPosition.x, currentPosition.y]

    const north = `${x},${y-1}`
    const south = `${x},${y+1}`
    const east = `${x+1},${y}`
    const west = `${x-1},${y}`

    const northTile = map.get(north)
    const southTile = map.get(south)
    const eastTile = map.get(east)
    const westTile = map.get(west)

    if (eastTile === TILE.PIPE.HORIZONTAL_EAST_WEST) {
        return {
            x: x+1,
            y
        }
    }

    if (westTile === TILE.PIPE.HORIZONTAL_EAST_WEST) {
        return {
            x: x-1,
            y
        }
    }

    if (northTile === TILE.PIPE.VERTICAL_NORTH_SOUTH) {
        return {
            x,
            y: y-1
        }
    }

    if (northTile === TILE.PIPE.BEND_NORTH_EAST) {
        return {
            x: x+1,
            y: y-1
        }
    }

    if (northTile === TILE.PIPE.BEND_NORTH_WEST) {
        return {
            x: x-1,
            y: y-1
        }
    }

    if (southTile === TILE.PIPE.VERTICAL_NORTH_SOUTH) {
        return {
            x,
            y: y+1
        }
    }

    if (southTile === TILE.PIPE.BEND_SOUTH_WEST) {
        return {
            x: x-1,
            y: y+1
        }
    }

    if (southTile === TILE.PIPE.BEND_SOUTH_EAST) {
        return {
            x: x+1,
            y: y+1
        }
    }
}

module.exports = {
    mapTiles,
    findStartingPosition,
    findNextPipePosition
}