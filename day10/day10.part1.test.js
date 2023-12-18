const {
    mapTiles,
    findTilePosition,
    findNextPipePosition,
    TILE,
    findAllNextTiles,
    getAllowedConnectingPipes
} = require('./day10.part1')

/*
.....
.F-7.
.|.|.
.L-J.
.....
*/
test('map tiles into a 2D grid with their axis X and Y and the type of object inside', () => {
    const tiles = 
    `.....
    .F-7.
    .|.|.
    .L-J.
    .....`

    const map = mapTiles(tiles)

    const expectedMap = new Map()

    expectedMap.set('1,1', TILE.PIPE.BEND_SOUTH_EAST)
    expectedMap.set('2,1', TILE.PIPE.HORIZONTAL_EAST_WEST)
    expectedMap.set('3,1', TILE.PIPE.BEND_SOUTH_WEST)
    expectedMap.set('1,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    expectedMap.set('3,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    expectedMap.set('1,3', TILE.PIPE.BEND_NORTH_EAST)
    expectedMap.set('2,3', TILE.PIPE.HORIZONTAL_EAST_WEST)
    expectedMap.set('3,3', TILE.PIPE.BEND_NORTH_WEST)

    expect(map).toEqual(expectedMap)
})

/*
.....
.S-7.
.|.|.
.L-J.
.....
*/
test('find starting position in a grid', () => {
    const grid = new Map()

    grid.set('1,1', TILE.STARTING)
    grid.set('2,1', TILE.PIPE.HORIZONTAL_EAST_WEST)
    grid.set('3,1', TILE.PIPE.BEND_SOUTH_WEST)
    grid.set('1,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    grid.set('3,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    grid.set('1,3', TILE.PIPE.BEND_NORTH_EAST)
    grid.set('2,3', TILE.PIPE.HORIZONTAL_EAST_WEST)
    grid.set('3,3', TILE.PIPE.BEND_NORTH_WEST)

    const startingPosition = findTilePosition(TILE.STARTING, grid)

    expect(startingPosition).toEqual({
        tile: TILE.STARTING,
        position: {
            x: 1,
            y: 1
        }
    })
})

describe('allowed connecting pipes', () => {

    it.each([
        [TILE.PIPE.VERTICAL_NORTH_SOUTH, {
            north: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
    
            south: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
    
            east: [],
            west: []
        }],

        [TILE.PIPE.HORIZONTAL_EAST_WEST, {
            north: [],
            south: [],
    
            east: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
            west: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ]
        }],

        [TILE.PIPE.BEND_NORTH_EAST, {
            north: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
    
            south: [],
    
            east: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
            west: []
        }],

        [TILE.PIPE.BEND_NORTH_WEST, {
            north: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
    
            south: [],
            east: [],

            west: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ]
        }],

        [TILE.PIPE.BEND_SOUTH_WEST, {
            north: [],
            south: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
            east: [],

            west: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ]
        }],

        [TILE.PIPE.BEND_SOUTH_EAST, {
            north: [],
            south: [
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
            east: [
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
            west: []
        }],

    ])('from %s', (currentPipe, expectedAllowedPipes) => {
        const allowedPipes = getAllowedConnectingPipes(currentPipe)
    
        expect(allowedPipes).toEqual(expectedAllowedPipes)
    })
})
/*
.....
.S-7.
.|.|.
.L-J.
.....
*/
test('find next position in a grid', () => {
    const grid = new Map()

    grid.set('1,1', TILE.STARTING)
    grid.set('2,1', TILE.PIPE.HORIZONTAL_EAST_WEST)
    grid.set('3,1', TILE.PIPE.BEND_SOUTH_WEST)
    grid.set('1,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    grid.set('3,2', TILE.PIPE.VERTICAL_NORTH_SOUTH)
    grid.set('1,3', TILE.PIPE.BEND_NORTH_EAST)
    grid.set('2,3', TILE.PIPE.HORIZONTAL_EAST_WEST)
    grid.set('3,3', TILE.PIPE.BEND_NORTH_WEST)

    const startingTile = findTilePosition(TILE.STARTING, grid)
    const previousTile = {
        tile: TILE.PIPE.VERTICAL_NORTH_SOUTH,
        position: {
            x: 1,
            y: 2
        }
    }

    const nextPosition = findNextPipePosition(grid, startingTile, previousTile)

    expect(nextPosition).toEqual({
        tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
        position: {
            x: 2,
            y: 1
        }
    })
})

test('find next position in a grid with many unconnected pipes', () => {
    const tiles = 
`-L|F7
 7S-7|
 L|7||
 -L-J|
 L|-JF`

    const grid = mapTiles(tiles)

    const startingTile = findTilePosition(TILE.STARTING, grid)
    const previousTile = {
        tile: TILE.PIPE.VERTICAL_NORTH_SOUTH,
        position: {
            x: 1,
            y: 2
        }
    }
    const nextPosition = findNextPipePosition(grid, startingTile, previousTile)

    expect(nextPosition).toEqual({
        tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
        position: {
            x: 2,
            y: 1
        }
    })
})


// test('find all the next connected pipes until reach starting tile', () => {
//     const tiles = 
// `-L|F7
//  7S-7|
//  L|7||
//  -L-J|
//  L|-JF`

//     const grid = mapTiles(tiles)

//     const startingTile = findTilePosition(TILE.STARTING, grid)
//     const previousTile = {
//         tile: TILE.PIPE.VERTICAL_NORTH_SOUTH,
//         position: {
//             x: 1,
//             y: 2
//         }
//     }

//     const allNextTiles = findAllNextTiles(grid, startingTile, previousTile)

//     expect(allNextTiles.length).toBe(6)


// })