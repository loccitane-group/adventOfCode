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


    let tilesToLookup = [northTile, southTile, eastTile, westTile]

    tilesToLookup = tilesToLookup
                    .filter(tile => tile.tile !== TILE.GROUND)
                    .filter(tile => tile.tile !== previousTile.tile
                        && tile.position.x !== previousTile.position.x
                        && tile.position.y !== previousTile.position.y)
                    .filter(tile => tile.allowedNextTile.includes(tile.tile))

    return {
        tile: tilesToLookup[0].tile,
        position: tilesToLookup[0].position
    }
}

module.exports = {
    mapTiles,
    findTilePosition,
    findNextPipePosition,
    TILE
}