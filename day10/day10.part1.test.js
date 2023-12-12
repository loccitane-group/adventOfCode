const {
    mapTiles,
    findStartingPosition,
    findNextPipePosition
} = require('./day10.part1')

test('map tiles into a 2D grid with their axis X and Y and the type of object inside', () => {
    const tiles = 
    `.....
    .F-7.
    .|.|.
    .L-J.
    .....`

    const map = mapTiles(tiles)

    const expectedMap = new Map()

    expectedMap.set('1,1', 'F')
    expectedMap.set('2,1', '-')
    expectedMap.set('3,1', '7')
    expectedMap.set('1,2', '|')
    expectedMap.set('3,2', '|')
    expectedMap.set('1,3', 'L')
    expectedMap.set('2,3', '-')
    expectedMap.set('3,3', 'J')

    expect(map).toEqual(expectedMap)
})

test('find starting position in a grid', () => {
    const grid = new Map()

    grid.set('1,1', 'S')
    grid.set('2,1', '-')
    grid.set('3,1', '7')
    grid.set('1,2', '|')
    grid.set('3,2', '|')
    grid.set('1,3', 'L')
    grid.set('2,3', '-')
    grid.set('3,3', 'J')

    const startingPosition = findStartingPosition(grid)

    expect(startingPosition).toEqual({
        x: 1,
        y: 1
    })
})

test('find next position in a grid', () => {
    const grid = new Map()

    grid.set('1,1', 'S')
    grid.set('2,1', '-')
    grid.set('3,1', '7')
    grid.set('1,2', '|')
    grid.set('3,2', '|')
    grid.set('1,3', 'L')
    grid.set('2,3', '-')
    grid.set('3,3', 'J')

    const startingPosition = findStartingPosition(grid)

    const nextPosition = findNextPipePosition(grid, startingPosition)

    expect(nextPosition).toEqual({
        x: 2,
        y: 1
    })
})