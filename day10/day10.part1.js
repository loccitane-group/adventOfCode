function mapTiles(tiles) {
    const map = new Map()

    tiles.split('\n')
        .map(l => l.trim())
        .forEach((line, y) => {
            line.split('').forEach((tile, x) => {
                if (tile !== '.') {
                    map.set(`${x},${y}`, tile)
                }
            })
    })

    return map
}

function findTilePosition(lookupTile, grid) {
    for (let [position, tile] of grid.entries()) {
        if (tile === lookupTile) {
            const [x, y] = position.split(',').map(x => parseInt(x))
            return {
                tile: TILE.STARTING,
                position: {
                    x,
                    y
                }
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


// Use clockwise direction to find the next pipe
function findNextPipePosition(grid, currentTile, previousTile) {
    const [x, y] = [currentTile.position.x, currentTile.position.y]

    const north = `${x},${y-1}`
    const south = `${x},${y+1}`
    const east = `${x+1},${y}`
    const west = `${x-1},${y}`

    const northTile = {
        tile: grid.get(north),
        position: {
            x,
            y: y-1
        },
        allowedNextTile: [TILE.PIPE.VERTICAL_NORTH_SOUTH, TILE.PIPE.BEND_NORTH_WEST, TILE.PIPE.BEND_NORTH_EAST]
    }
    
    const southTile  = {
        tile: grid.get(south),
        position: {
            x,
            y: y+1
        },
        allowedNextTile: [TILE.PIPE.VERTICAL_NORTH_SOUTH, TILE.PIPE.BEND_SOUTH_WEST, TILE.PIPE.BEND_SOUTH_EAST]
    }
    
    const eastTile  = {
        tile: grid.get(east),
        position: {
            x: x+1,
            y
        },
        allowedNextTile: [TILE.PIPE.HORIZONTAL_EAST_WEST, TILE.PIPE.BEND_NORTH_EAST, TILE.PIPE.BEND_SOUTH_EAST]
    }

    const westTile  = {
        tile: grid.get(west),
        position: {
            x: x-1,
            y
        },
        allowedNextTile: [TILE.PIPE.HORIZONTAL_EAST_WEST, TILE.PIPE.BEND_NORTH_WEST, TILE.PIPE.BEND_SOUTH_WEST]
    }

    let allowedNextTiles = []

    let allowedNextPipes = getAllowedConnectingPipes(currentTile.tile)

    allowedNextPipes.east.forEach(pipe => {
        if (pipe === eastTile.tile) {
            allowedNextTiles.push(eastTile)
        }
    })
    allowedNextPipes.west.forEach(pipe => {
        if (pipe === westTile.tile) {
            allowedNextTiles.push(westTile)
        }
    })
    allowedNextPipes.north.forEach(pipe => {
        if (pipe === northTile.tile) {
            allowedNextTiles.push(northTile)
        }
    })
    allowedNextPipes.south.forEach(pipe => {
        if (pipe === southTile.tile) {
            allowedNextTiles.push(southTile)
        }
    })

    let foundTiles = allowedNextTiles
                    .filter(tile => tile.tile !== TILE.GROUND)
                    .filter(tile => tile.tile !== previousTile.tile
                        && tile.position !== previousTile.position)

    return {
        tile: foundTiles[0].tile,
        position: foundTiles[0].position
    }
}

function findAllNextTiles(grid, currentTile, previousTile) {
    let allNextTiles = []

    let nextTile = findNextPipePosition(grid, currentTile, previousTile)

    while (nextTile.tile !== TILE.STARTING) {
        allNextTiles.push(nextTile)

        previousTile = currentTile
        currentTile = nextTile
        nextTile = findNextPipePosition(grid, currentTile, previousTile)
    }

    return allNextTiles
}

function getAllowedConnectingPipes(currentPipe) {
    const allowedPipes = {
        north: [],
        south: [],
        east: [],
        west: []
    }

    allowedPipes.north.push(TILE.STARTING)
    allowedPipes.south.push(TILE.STARTING)
    allowedPipes.east.push(TILE.STARTING)
    allowedPipes.west.push(TILE.STARTING)


    switch (currentPipe) {
        case TILE.PIPE.VERTICAL_NORTH_SOUTH:
            allowedPipes.north.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_WEST)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_EAST)

            allowedPipes.south.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_EAST)
            break

        case TILE.PIPE.HORIZONTAL_EAST_WEST:
            allowedPipes.east.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_SOUTH_WEST)

            allowedPipes.west.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.west.push(TILE.PIPE.BEND_NORTH_EAST)
            allowedPipes.west.push(TILE.PIPE.BEND_SOUTH_EAST)
            break

        case TILE.PIPE.BEND_NORTH_EAST:
            allowedPipes.north.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_WEST)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_EAST)

            allowedPipes.east.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_SOUTH_WEST)
            break

        case TILE.PIPE.BEND_NORTH_WEST:
            allowedPipes.north.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_WEST)
            allowedPipes.north.push(TILE.PIPE.BEND_SOUTH_EAST)

            allowedPipes.west.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.west.push(TILE.PIPE.BEND_NORTH_EAST)
            allowedPipes.west.push(TILE.PIPE.BEND_SOUTH_EAST)
            break

        case TILE.PIPE.BEND_SOUTH_WEST:
            allowedPipes.south.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_EAST)

            allowedPipes.west.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.west.push(TILE.PIPE.BEND_NORTH_EAST)
            allowedPipes.west.push(TILE.PIPE.BEND_SOUTH_EAST)
            break

        case TILE.PIPE.BEND_SOUTH_EAST:
            allowedPipes.south.push(TILE.PIPE.VERTICAL_NORTH_SOUTH)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.south.push(TILE.PIPE.BEND_NORTH_EAST)

            allowedPipes.east.push(TILE.PIPE.HORIZONTAL_EAST_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_NORTH_WEST)
            allowedPipes.east.push(TILE.PIPE.BEND_SOUTH_WEST)
            break
        }

    return allowedPipes
}

module.exports = {
    mapTiles,
    findTilePosition,
    findNextPipePosition,
    TILE,
    findAllNextTiles,
    getAllowedConnectingPipes
}