const {
    mapTiles,
    findTilePosition,
    findNextPipePosition,
    TILE,
    findAllNextTiles,
    getAllowedConnectingPipes,
    computeFarthestSteps
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
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
    
            south: [
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
    
            east: [TILE.STARTING,],
            west: [TILE.STARTING,]
        }],

        [TILE.PIPE.HORIZONTAL_EAST_WEST, {
            north: [TILE.STARTING,],
            south: [TILE.STARTING,],
    
            east: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ],
            west: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ]
        }],

        [TILE.PIPE.BEND_NORTH_EAST, {
            north: [
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
    
            south: [TILE.STARTING,],
    
            east: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ],
            west: [TILE.STARTING,]
        }],

        [TILE.PIPE.BEND_NORTH_WEST, {
            north: [
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_SOUTH_WEST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ],
    
            south: [TILE.STARTING,],
            east: [TILE.STARTING,],

            west: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ]
        }],

        [TILE.PIPE.BEND_SOUTH_WEST, {
            north: [TILE.STARTING,],
            south: [
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
            east: [TILE.STARTING,],

            west: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
                TILE.PIPE.BEND_SOUTH_EAST,
            ]
        }],

        [TILE.PIPE.BEND_SOUTH_EAST, {
            north: [TILE.STARTING,],
            south: [
                TILE.STARTING,
                TILE.PIPE.VERTICAL_NORTH_SOUTH,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_NORTH_EAST,
            ],
            east: [
                TILE.STARTING,
                TILE.PIPE.HORIZONTAL_EAST_WEST,
                TILE.PIPE.BEND_NORTH_WEST,
                TILE.PIPE.BEND_SOUTH_WEST,
            ],
            west: [TILE.STARTING,]
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

    // Go to the next position to start the search
    // Because the starting position "S" doesn't have any allowed connected pipes
    // And the scheme doesn't show which pipe is behind "S"
    const startingTile = {
        tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
        position: {
            x: 2,
            y: 1
        }
    }

    const previousTile = {
        tile: TILE.STARTING,
        position: {
            x: 1,
            y: 1
        }
    }

    const nextPosition = findNextPipePosition(grid, startingTile, previousTile)

    expect(nextPosition).toEqual({
        tile: TILE.PIPE.BEND_SOUTH_WEST,
        position: {
            x: 3,
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

    // Go to the next position to start the search
    // Because the starting position "S" doesn't have any allowed connected pipes
    // And the scheme doesn't show which pipe is behind "S"
    const startingTile = {
        tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
        position: {
            x: 2,
            y: 1
        }
    }
    
    const previousTile = {
        tile: TILE.STARTING,
        position: {
            x: 1,
            y: 1
        }
    }

    const nextPosition = findNextPipePosition(grid, startingTile, previousTile)

    expect(nextPosition).toEqual({
        tile: TILE.PIPE.BEND_SOUTH_WEST,
        position: {
            x: 3,
            y: 1
        }
    })
})


test('find all the next connected pipes until reach starting tile', () => {
    const tiles = 
`-L|F7
 7S-7|
 L|7||
 -L-J|
 L|-JF`

    const grid = mapTiles(tiles)

    const startingTile = {
        tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
        position: {
            x: 2,
            y: 1
        }
    }
    
    const previousTile = {
        tile: TILE.STARTING,
        position: {
            x: 1,
            y: 1
        }
    }

    const allNextTiles = findAllNextTiles(grid, startingTile, previousTile)

    expect(allNextTiles.length).toBe(6)
})

describe('find farest number of steps to reach starting point', () => {

    it.each([
        [`-L|F7
        7S-7|
        L|7||
        -L-J|
        L|-JF`,
        {
            tile: TILE.PIPE.HORIZONTAL_EAST_WEST,
            position: {
                x: 2,
                y: 1
            }
        },
        4],
        
        [`..F7.
        .FJ|.
        SJ.L7
        |F--J
        LJ...`,
        {
            tile: TILE.PIPE.BEND_NORTH_WEST,
            position: {
                x: 1,
                y: 2
            }
        },
        8],

        [`---7|.|-7F7.-FF-77FF7J-L-77.JF-.FLJ-7.F77F7-J-L7LF7J.L7.-L-.F7-7F7-|-F---..FFF7-L|.|..-.|J.F-77--77|--J.LFLF7F-|7-|.LFF-FJ7FL--7F-FJ-J-L.FFJ
        L7--F.F-F7-7J..|L---JL.J7.777LLF|L|FJ-LJ-JLFJ|FL-|.L7|F-JFJFJ||-L7||-F7J|FJLJ||-7|FFL7..|.--|L-J|L-JJJJFLL7L7--JJ7LF.7J-J---LJ7F|JLL.|7|7F|7
        FJ--J.|.|L7J|--7FLJJF.FFF---||L-JF-F7.L|L|F|7-7-FL7-LFJ-|J-|7L.F-L7J7|F77FL7|-JF7|F7FF7FF77.L-..J||LL7F77|7J..7JLFF-7L7|FJ.F|7|-L77|FL-JF-JF
        F|LLJ.F-F-JLJJLL-JLF-77L.L|FLJJ|-|F-J7FJJFJ|L7L-JF|.F7.L7.FLJ.7JF-L|-F.|77JFFJLLL-JF-|||LJJ.L.77-L7-LJ7---|7FF7|.L-J7FF--.F7|LF7LLJ777.|F---
        J..|F-7|J.|FLF.L|.L-.F--F-F-.FFJ-7J-LF-J-|.|-7.|FF-L||7|F77-|FL.L.7|.L7L-|LF--7|LJ7|F--JFJ.F.|.7.F|-|.J-|J|.|-|-L.|F7JJ7..||LL.|.|F7.-77L--L
        |L77|F|-7FFJ.7----7JL--F77LJ-LJLFLJJLJLL-L---JF-|7LL|L77J.F7-|.L-7-J7L7--J-F7|LJ7LLL7JJ7F-|-F--7-F7-7.|L-77-L---.7--|JL7-J|L..FJ.FLJ-F|.F|-J
        7LLF-FF77-J.-JF|J-|J.|7|F-J-JJL7JF77.|7|F-L|FF7-FJ7-L7L7F7|||.|7L|J..||||.F|--7L-L7LL7.L||L.L-7L7||F77F-|.J-F-...-77.JFJ7||F-FF7.|JJL-F.FLJ|
        L-FL7-JL|.7-7FLFF-F--77-LJ|FLF-7F7J|FLF-7...LJJLF-F-7L7||||L7FL77J.FJJFFF-JJL|FJ--LJ.|7JF|7F|FL7||LJL7JJ|J|-L-J-LLJ--7|FJJL7.|J|.L|7FLL-|J7F
        |--JJF-7L-7|L-JLL7LLJ||.LJFFFL7LJ|FLF7LLL7FFJJFL|FL7|J|LJLJFJ7LJJ7F||LFJF-7J.777F-L-.77F|JLF-7FJ||F--J.F7-|7L7J|FL|7F---.FLJ7J7L-JLLLJJ7|F-7
        7-|LLJ.L-||F||J|F--|L-JJ|-FLF-JF-J7J|L7JLF77FLF-7F-JL7L-7F-JJF7JFFFLL--.LL7FFF777||LFJLF77FL7LJFJ||F7F77L-7-F|LF7JL-7.|.F-.L|J|-|FL-J.FJ||-L
        JLF-7-7J.LL|-J|L|F-7.|.FL.L-L-7|LF-7|FJJL|L7J.L7|L--7L7FJL---7F-77|.LL-L7-LF-JL7F7F77JF--7F7L-7L7|||LJ|7LFF777FJL7-J|F|FF.-.LFJ.77FF--|7|JLL
        |F|.7FL-J.F-77L7L7F|777L.LLF--J|FJFJ||.FFJFJFF-JL7F7|FJL-7F--J|FJ-F7.L7.|.FL--7LJ||L-7|F-J||F7|FJ|||F-J7-FJL-7|F-J7JF7LJLJ|F-LJ.LFLF7JLJ7.FL
        FJ|7L7-JJFLLF-F7|F-LF-7L|JLL--7||FJ-||F7L7|F7L--7||LJL7F-JL-7FJL7FJL--77FFF7F7L7FJ|F-J||F-J||||L-J|||F7F7L-7FJ||-F7F-7-|JF|7F7.F-JJ|F7LL|LJJ
        L7J77.F7.L7|.F-J-LJLJLL-|-F7FFJLJ|F7||||FJ|||F7FJ|L--7|L7F--JL7FJ|F-7FJF7FJLJL7|L-JL7|||L-7|||L-7FJ||||||-FJL-J|FJ|L7|7|-FJ-7J-|.J7FJ|7F||J.
        LF7F7-|-.|-FF||.-JF|F|.F|7|L7L--7||||LJ|L7LJ|||L7L7F7|L7|L-7F7||FJL7||FJ|L-7F-J|F--7L-JL-7||||F-J|FJLJLJL7L---7LJFJFJL-7-7-L-7||F.|J||FFJ7.J
        77FL--JLFF.|-F7-FF|-777F77|FJF--JLJLJF7|JL-7|||FJFJ||L7|L-7LJLJLJF-JLJL7||FJL7FLJF-JF7F-7||LJ|L-7|L7F----JF7F-JF-JFJF7FJL|.-L77LL-J-LJ.J-LJ.
        --L.F|J.77-7L|.FL7J|||L||FJ||L-7F7F--JLJF7FJ|||L7|||||||F7L-7F--7L-7|F7|L-JF-JF7FL--J||.|||F-JF7||F||F7F7FJ|L-7|F-JFJLJ|.LF7FJ-7|J|.LFJJJ7|7
        |J.F7J7LJLF7.|7--|JJLF-|||FJF7|LJ||F--7FJ|L7LJL-JL7|L7|LJ|F7||F7L--JFJ||F-7|F7||F-7F7LJFJLJ|F7|||L-JLJLJ|L7L7J||L7FJJ.FJ-JJ||LFFJL77-77|.FL.
        --F7L-J-L.LJJ.|J-|77-F7||||FJ|F--J|L7FJL7L7|F-----J|FJL7FJ||||||F7F7L7|LJJ|||||||FJ|L7FJF-7||||||F--7F-7|FJFJFJL7||F7FL7F-7F-7F7LF--JL--FFJF
        |.||7|.7L7||LF|7.LL7.|LJ|||L7|L--7|J|L-7L7||||F-7F-J|F7|L7|||LJLJLJL7|L7F-J||LJ||L7L7|L7|FJ||||||L-7LJ7LJL7|FJF-J|LJL7L|JJFL7|7|-7.|-LFJ.LJL
        7-FL7FFJ7.F7JFF-7JLLFJF7LJL7||7F-JL-JF-JFJ||L7|FJL-7|||L7LJLJF------J|FJL-7||F-JL7|.|L7LJL7||||||F-J|F77F7|||FJF-JF--J-JF7-L||F7-|J..|.LJF7|
        |7LFLJL-J.||F7|.|7FJL-JL7F7LJL7L----7|-FJFJL7LJL7F7|LJL7L-7F-JF---7F7|L7F7||||F7.|L7L7L---JLJ|||||F-7|L7||||||7|F-JF7.|7|JFFJLJ|J|L777FFLL-7
        7777F|F.L7--J|F|FF-7LF--J|L-7FJF----JL7L7L7FJF--J||L7F-J7FJL-7L7F7||LJFJ|||LJLJL7L7L7L------7LJ||||FJ|FJ|||||L-J|F7||F7F-7FJF--J7LFJ.F777-|J
        |L.-L|J---7|.F7.FL-F-L--7|F-JL7L----7FJ.|FJL7L7F7||-||F7FJF--JFJ|LJL-7L7||L--7F-JFJFJF-----7L-7LJ||L-JL7|||||F7FJ|||||||FJL7L7.FJ-|.-JL..F|J
        |.L-FL|J7.LJF||-LJF|7|F7LJL--7||F7F7||F-J|F7L7|||||FJ||||FJFF7L7|F7F-JFJ|L7F7|L-7L7L7L--7F7L--JF7LJF--7|||||||LJFJLJLJLJL7FJFJ7FJJ|7FFJ-|7|.
        ||FF7.L--7-F-J|.FFF7F-JL-7F--JL7|LJ||LJF-J||.|LJLJ|L7|||||F7|L7|LJ|L-7L7L7||LJF-JJ|FJF-7LJL----J|F-JF7LJ|||||L-7|F7F-----J|FJ|7JL-L77L-JLLL7
        J||7JFFL-L-L-7|F7F||L--7FJL---7|L-7|L-7|F-JL7L---7L7|LJLJLJ|L7||F-JF7L7L-J|L-7L7F7|L7|FJFF7LF7F7|L--JL7FJ||LJF-JLJ||F7F7|FJL-7.L|LFLJ.F7.F|.
        .FFJ7-JJ.FF7F||||FJL7F7|L7F---J|F-JL7FJLJF--JF7F7L7|L7F7F--JFJLJL7FJL-JF--JF7|FJ|LJFJ|L7FJL-J|||L7F---JL7||F-JF77FJLJLJL-JF--JF77FJJ|F|-F-L.
        J.J.F-..FFJL-JLJ||F-J||L7LJF--7|L--7||F-7L--7|LJ|FJL-J||L7F7L7F--JL---7|F7FJ||L7|F7L7L7||F7F7LJ|FJL-7F7FJ||L-7||FJF-7F---7L---J|JFJ77|JL|JL-
        J-|F-7F--|F7F7F7|||F7|||L7FJF-JL7F7||||JL---JL7FJL7F--JL-J||J|L7F7F--7|LJ|L7||FJLJL7|FJ|LJLJL-7||F7FJ||L7||F-J||L7L7|L--7|F----JFJ.L-F7.|F7J
        .LL|L|||J||LJLJ|LJ||LJ|F7LJ-L--7||||LJL--7F77FJL7FJ|F77JF7||FJFJ|LJF-JL-7|FJ||L7F77||L7|JF7F7FJ|LJ|L-JL7|LJL-7|L-JFJL---J|L---7LFJ-7J|F7JL--
        L7FJ|L7J-LJF7JFL-7|L7FJ||F7LF7FJLJ|L-7F--J||FJF-JL7||L7FJ||||FJLL-7|-F--J||FJ|FJ|L7|L7|L7|LJ|L7L7FJF---J|F---JL7F7L----7FL----JL|--L.FLJF7-L
        .|L-7-J7L||||.F--JL7|L7|||L-J|L--7L7FJL-7FJ|L7|F7FJ||FJ|FJ|||L-7JFJL7L--7LJL7||FL7||FJ|FJL-7|FJFJL7|.F7|||F7F7FJ||F7F7FJF7F7F77FF7J7-LJF7L|7
        LF7L7.F---FJL7L---7|L7|||L--7|F--JFJL-7FJL7L-J|||L7LJL7||FJ||F-JFJF-JF-7L--7||L7FJ||L7|L7F-JLJFJFFJ|FJL7|||||LJFJLJLJLJFJLJLJL-7||J|7.FFJ.77
        F||FL7|FJFL-7|F---JL-J|||F7FJ|L--7|F7L||F7L-7FJ||-L-7FJ||L7|||F7|FJF7L7|7F7|||FJL7||FJL7|L7F--JF7L7|L7FJ|LJ||F-J7F7|F7-L7F----7LJL7J7--J-7-J
        F7LJJ-JJFFF-J|L------7LJ|||L7L-77|LJ|FJ|||F7||FJ|F7FJL7|L7|||LJ||L7||FJL7||||||F7|||L7FJL7|L7F7||FJL7||FJF-J||FF-JL-JL7FJL---7L---J7F7J..|||
        F7FL7|J-||L-7L-------JF7LJL-JF7|FJF7||FJ|||||LJFJ|||F7||FJ|||F7|L7LJ|L7FJ|||||||||||FJL7F||FJ|||LJF7LJLJFL--JL-JF--7F-J|F----JJF-7.-F..FL|F|
        L-7JL7..F-7.L7F-7F7F--JL--7F7|||L-J||||FJLJLJF-JFJ|LJ|||L7||LJ||FJF-JFJL-J||LJ||LJLJ|F-JFJ|L7|LJ|FJL-------7F7F-JF7LJF-J|F7F7F7|FJJ.|.||FL--
        ||J7F777L7|.LLJ7LJLJJF-7F-J|LJ|L---JLJ|L-7F--JF7|FJF-JLJ|||L7FJ|L7L-7|F---J|F-JL---7|L7.L7L7|L7F7L-7F-7F--7||||F-JL-7|F-J||||||||7|7-F-F7|LJ
        ||JF||L7.|L7F-7F7F7FFJFJL--J.FJF7F---7L-7||F7FJ||L7L----7||.|L7L7|F-J|L7F-7|L7F7F7FJ|FJF7|FJ|FJ|L--JL7LJLFJLJLJL7F--J||F7|||||LJL-77.|F7-J77
        FJ-|.|.F7|FJL7LJLJL7L7L-----7L-JLJ|F7L7J||LJ|L7|L7L7F--7|LJFJFJFJ|L7FJFJ|F||-LJ|||L7|L-J||L7LJ-L--7F-JF--J-F7JF7||F7-|LJLJLJLJF---JJ|J--7|-|
        ||F|7F7F-J|F7|F---7L-JF----7L7.F-7FJL-JFJL-7L7|L-JFJL-7||F7L7||L7|FJ|FJFJFJL--7||L7|L7F7|L7L-77F7FJ|F7L----JL7|||||L-JF7F---7FJF-77..FFFJ---
        -|J|F|LJS7|||LJF7-L---JF7F7L7L7|FJL--7JL7F-JFJL7F-JF7FJ|LJ|FJL7FJ|L7|L7|FJF-7FJ|L7LJF||LJ||F7L7||L7||L------7LJLJLJF7FJ|L-7J|L-JFJ--7J-L|J-|
        |.L-FL--J|LJ|F7||F---7FJLJ|FL7LJ|F7F-JF7LJF-JF7||F7||L7|F-J|F7|L7|F||FJ|L7L7|L7L7|F--J|7F7LJL-J||FJ||F-7F7F7L-7F-7FJLJFJF7|FJF7FJJ.LL|.|L77J
        .7.FLF-7FJF7LJLJ|L-7FJL--7L-7L-7LJLJF-JL7-L-7|LJ||||L7||L-7LJ|L7|L7LJL7|FJFJL7L7LJL7F7L-JL----7||L-JLJ7LJLJL-7|L7|L--7L-JLJ|FJ|L7J7|.F..F--7
        |FFF7L7|L-JL---7|F7|||F--JF7L-7L----JF-7L7F7LJLFJ||L7||L7FJF-JFJL7|F--J||FJF7|FJ.F7||L7F---7F7||L--7F7F------JL7||F--JF7F7J||-L-JJLJ.JJ-7|F7
        F--J|FJ|F------JLJLJL-JF7FJ|F7L------JLL7LJL--7L7||FJ|L7||7L-7L-7LJL--7||L-J|||F-JLJL7||F--J|LJL--7|||L------77LJLJF--JLJL7|L-7F7.FJ7.LL|J7.
        L--7|L7LJF------7F7F-7FJ||-LJL---------7|F---7|FJ|LJ||FJLJF--JF7L-7F--J|L7F-JLJ|F7F7FJLJL7F7L-7F--JLJL------7L--7F-JF7F---JL-7LJL-7.|7-FJFJ7
        F--JL-JF-JF7F--7LJLJ-LJLLJF----7F------JLJF7FJ|L7L-7FJL--7L7F7||F7|L-7FJFJL-7F7|||||L---7LJ|F-JL-----7F----7L---J|F-JLJF----7|F7F-JF-L7L-|||
        L7F7F--JF-J||F7L7LF77F7FF7L---7LJF----7JF7||L-J.L7FJL7F7FJL||||||LJF-JL7L7F7LJ|||LJ|F7F7|F-J|F-------J|F---JF--77||JF7|L7F7FJ||LJJJ-7LF.LFJJ
        LLJ|L7F-JF7LJ|L7L-JL-JL-JL-7LFJF-JF--7L-JLJ|JF77||L-7||LJF7|||||L-7L-7FJL|||F-JLJ-FJ|||LJL7FJL7F7F7F-7|L-7F7L7FJFJL-JL--J|LJ-LJ||7|F|-|7FLJJ
        L|LL-JL7FJL-7|FJF7F-7F-7F-7L-JFJF7L7-L7F7F7L-JL7FJF7||L7FJLJ|LJL--J|FJ|F-J||L-7JF7L7||L-7FJL7FJ||||||LJF7LJL-JL-JF7F7F--7L7F7F----7-FJL7J.LF
        .F-LL-L||F--J|L-J|L7||FJ|LL-7FJFJL-JF7LJLJL-7F-JL-J|||FJL7F7L---7F--JFJL-7||F7|FJL-J|L7FJL7FJL-JLJLJF--JL------7FJLJ|L7-L7LJ||F---J|L--L7-7J
        FJ777-L||L--7||F7L7|LJL7|F--J|7L----JL-7F7F7LJF-7F7||LJF-J||F7F7|L7F-JF--J|LJ||L7F-7|F||F-JL7JF7F7F7L---------7LJ7F7L7L-7|F7LJL-7-|--|L||L||
        LL7FJJFLJJ.LLJFJ|7LJF--J|L-7FJF---7F7F7LJLJL-7L7LJ||L-7L7FJ||LJLJ|LJF7L7F7L-7||FJ|FJL7|||F7FJFJ||LJ|F7F---7F--JFF-J|-L7FJ|||F7F-J.-JF|.F7FFJ
        F7L7.FF|JJFJF7L7|F7FL--7|F-J|FL7F7LJLJL7F---7L-JF-JL-7|FJL7|L7JJ-F--JL-J||F-JLJL-JL--JLJLJLJJL7|L-7|||L--7|L----JF7|F7LJ|LJLJLJJL|F|LL7L.-|J
        7FFLJJL||.FFJL-JLJ|F7F7LJL--JF7LJ|F---7||F77L7F7L7F77LJ|F-JL7L7F7L-7F7F-J|L---7F------7F7F-7F-JL--JLJL---J|F-----J|LJ|F--7F7F-7.LF-|-|-|FLJ.
        --7|.J7|FF-JF7F--7LJLJL------JL-7LJF-7|LJ|L-7|||FJ||F7.|L7LFJFJ|L--J||L7FL7F-7||F7F7F7LJLJFJL7F7F-7F---7F7LJF7LF-7|F7LJF7LJLJFJ-.LF|FJ|FJ7-7
        LLLF|7F|7L--JLJF7L------------7FJ7FJJLJLFJF7||||L-J||L7|FJFJFJLL7F7FJ|FJF-JL7||||LJLJL---7L-7LJLJJLJF7|LJ|F-JL7|FJLJ|F-JL-7F7L7--7||7|F|L-7J
        .7--L|FL-F-----JL7F77F-7JF7F7FJL-7L--7F7L7|LJLJL7F-J|FJLJ7L7L--7LJ|L7||FJF7FJLJLJ|F7F7JF-JF7L7F-7F7FJL--7LJF-7LJL-7-LJF7F7LJL7||.FJL7--JLJ-J
        F||L7L-JLL7F----7LJL7L7|FJLJ|L7F7|F--J|L-JL----7LJ7FJ|F7F7FL7F7|L|L-J||L7||L-7F---JLJL-JF7|L7|L7|||L---7L--JFJF7F-JF7FJLJL7F7LJFF--F||.F77|.
        7|FLLFL7|JLJFF7JL--7|FJLJF-7|-||LJL---JF-------JFF7|FJ|LJL7|LJLJ7-LJ|LJJLJL7FJ|F--------JLJFJL-JLJL--7.L---7L-J|L--JLJF--7LJL---7.F|F7.LLJ||
        F-77LJ-|7.F7FJL----JLJF-7|FJ|FJL------7L--7F7F7JFJLJL-JF7FJ7JJ.|J-|.L.J7LLL|L7||F---------7L--------7|F----JF-7|F7F---JF7L------J.LJ7LFFJLFJ
        .-L--J-F-FJLJF-------7L7LJL7LJF7F----7|F7FJ|||L-JF-7F--JLJL-7-|.|LJ.LJFJ|.LL-JLJL7F-7F-7F7L---------JLJF---7|FJLJLJF---JL7LF--7J||J7|F|-7F-7
        F|LLLJF|FL---JF------JFJFF7L7FJLJF7F-JLJ|L7|||F--JFJL---77|.|LL-77JF-LL--7..L||F7LJFJL7||L7F-7F7F7F7F7FJF--J|L-7|F7|F-7F7L-JF7L-7JLJJ|JFJ--7
        F|.|L-LF7LF--7L---7F7FJ7FJL7LJF--JLJF7F7L-J|LJL--7L7F7F7|F-7||F7J|FF..J-J.J-7|FJ|F7L--J||-LJ7LJLJLJLJLJ7L--7|F7L7|LJL7LJL---JL-7|-7.F|F-|FLJ
        ||FL-7FLF-L-7L-7F-J|||F-JF7L--JF7F--JLJL7F7|F-7F7L7LJLJ|LJFJ7F7--77..-J-F..||-L7||||F7LLJF-7F-7F7F-7F7F-7F7LJ|L-J|F--JF----7.F7LJJ|FLF7-7--J
        L77..77-|-F7L-7|L--JLJL--JL--7FJ||F-----J||||-|||FJFF7||F-JJFJJFL|J7F-L7.L-FFJFJLJL-JL7F7L7|L7LJ|L7|||L7LJL7FJF77|L---JF--7L-JL7J|F|LF|JJ..|
        JJL-.JJF7FJL--J|F7F7F7F7F----J|FJ|L------JLJL7LJ|L--JL7LJF7F7JJFFJ-|--FLF--FF-JF7F7F-7LJL-JL7L-7|FJLJL7L--7||FJL7|F----JF7L---7||F-J|||L7.F|
        .FJL77L|LJF---7LJLJLJLJLJF----JL-J|F7F7F7F7F7L-7L7F7F7|J.||||FF77J-LL.F7.7|.L--JLJ||FJF7F-7FJF7|LJF--7L7F-JLJ|F-J||F----JL7F-7LJJLJFL-F7|.F7
        LJ.7L|-L-7|F7|L-7F-------JF7F7|F7F-JLJLJLJ|||F7L7LJLJLJLFJ||L-JL77.LJ7LJ7LF.FF-7J|LJL7|LJFJ|FJLJF-JF-JFJL----JL--JLJF-----J|FJ7.|7.F|7LLJF|.
        F-FJFL7|FLJ|L---J|FF---7F-JLJL-JLJF-----7.LJLJL-JF7F-7F7L7||F-7FJ.|JL|J..|F-7L7|FF7F7LJF7L7LJF-7|F-JF7L7FF7F-7F7F-7FJF7F--7|L777-L7||LFJLLJ7
        J.J|FL||FJ|L7F---JFJF-7|L--7F--7F-JF7F--JF7F----7|||FJ||FJLJ|.LJJ7|--77-FLL7|FJL-JLJ|F7||FJF7L7LJL7FJL7L-JLJLLJLJ||L-J||F-J|FJL-J.L-7-|.L-LF
        L.LF--L7|.LFLJJF--JFJFJL7F7LJF7||F-JLJF7FJLJF7F7LJ||L-JLJF7FJF7J-F|JLJ--|.F||L-----7|||||L7||FJ|F7LJF7L--------7F7|F7FJ|L--JL-7|FFJ.JF|FJJ.|
        .-FJ|F|7L77F---JF--J-|F7LJ|F7||LJL----JLJF--JLJ|F7LJF-7F7|||J|L-7--77LL7F|F|L------JLJLJL7LJ||F-JL--JL---------J||LJ|L-JF7F7F7|F7F7-LL7J..F7
        7.-7L|J|FF-JF---JF---J||F7LJLJL7F7F------JF7F-7LJL--JFLJLJLJFJF-J|JFJ-.F|LFJF7F---------7L--J|L----7F7F7F-------JL-7L7F7|LJLJLJ||||77.L|7FJ7
        J-L77||FFL7FJJF-7L----JLJ|F7F-7LJ|L-7F7F--JLJFJFF-----7F7F--JFJJFJLLJ|-LF.L-J||F-------7|F7F7|F----J|LJLJF7F------7L7LJLJF7F7F7|LJL---777|-|
        .|.LF77-|J||F-JFJF-------J|LJL|F7L--J|LJF----J-FJF----J|LJF7FJJ--JL|.F.FJ7.L7LJL------7LJ|||||L--7F7L7F--JLJF7F--7L7L--7FJLJLJ|L-7F---J77F7-
        L|7FLJJ|J.LJL-7L7L----7F-7|F--J|L----JF7L-----7L7|F-7F7|F-JLJ.|JLF7J7L--.|J7L|.F------JF7|LJLJF-7LJ|FJL---7J|LJF-J-L7F-J|F7F7FJF-JL-7.||F-J|
        .|F7FJJF7.JLF7L7L----7|L7LJL7F7L7F----JL----7FJ||LJFJ|||L7F7F77F.FJ.F7LLJLLF7|-L---7F7FJ|L7F7|L7|F7LJF7F--JFJF7|F7F7|L7FJ|LJLJFJF---J-7-J.-|
        F-J|LJ-|L-|L||FL-7F-7LJFJ|F7||L-JL--------7.LJJFJF7|FJLJFJ|LJL77-J-L.7J|||.LL-7LF--J|LJLL-J||F7||||F7||L---JFJLJ|LJ||FJL7L7F-7L7L-----7J.F|J
        7JFLJ7.F7F|J|L---J|7L-7|F7|LJL7F----------JF7F7L7|LJ|F-7L-JF7FJF7L-J7.L|-|7J|JFFJF7FJF7F--7|||||LJLJLJL7F---JF7F|F-JLJF-JFJL7L-JF-----J.F-F-
        L-|.||--F7F7L-----JF7|LJ|LJF7FJL-7F-------7|LJ|FJL--JL7L7F7|LJFJL7J.7.F|FJF---7L-J||FJLJF7LJLJ||F-7F--7|L----JL7|L--7|L-7L--JF--JF77.LJ7L-J.
        .L|-||J-|-|L-------JL---JF7|||F7FJ|F------JL-7LJF7F-7FJFJ|||F7L7FJF7F7F7F7L--7|||LLJL-7FJL---7LJL7LJF7|L--7F7F7||F--JF7FJF---JF-7|L7--JF|-J.
        FF.|LL--LJL----------7F-7|||LJ||L-J|F----7JF7|F-J|L7|L7L7|LJ|L7||FJ|||||||LF-JL7-F---7|L77F7FJF--JF-JLJF-7LJLJLJ||F7F||L7||F7JL7||FJL7J|77.|
        FJL-J..L|F--7F------7LJ7||||F-JL---J|F---JFJLJL-7L-JL7L7LJF-JFJ|||FJ||||||-L--7L7L--7|L-JFJLJFJ7F-JF7F7|FJF7JF7FJLJL-JL-JL7||F-JLJL-7F-7-7L7
        |7LL7J-FLL-7|L-----7L---J|||L-------JL----JF---7L--7-|FJF7L-7L-J||L-J||LJ|F---JFJF-7|L7FFJF7FJF7L7FJ||LJL-J|FJLJF7F7F----7LJ||F-----J|FJJ7.7
        -J|FJ.FL.F-JL7JF7F-JF7F7FJ||F---7F---7F-7F7L-7FJF--JFJ|.||F7L-7FJL7F-J|F-JL-7F7|FJFJ|FJFJFJ||FJ|JLJ.LJF---7LJF-7|LJLJF-7FJF7LJL----7FJL7LJJ|
        F|77J-7|7L7F7|FJLJF7|LJ||7||L--7|L--7|L7|||F-JL-JF77L-JFJ||L--J|F7||F7|L7F7FLJ|||FJFJL7L7L7LJL7L--77F7L--7L-7L7|L7F7.|FJL7||F-7F--7LJF-J7FJ7
        -|J|J.L--FJ||LJF--JLJF-JL7LJF--JL---JL7|LJLJ7F7FFJL-7F7L7|L-7F7LJ||LJLJFJ|L7|FJLJL7L-7L7L-JF-7L7F7L-JL---JF7|FJL7LJL-JL-7||||FJL-7L--JJ|LJF7
        LF-L7J.FFL-JL-7L7F---JF-7L7FJF7F-----7LJF7F7FJL-JF--J||FJL7JLJ|F-JL-7F-J-L7L7L7F--JF7L7L7FFJFJFJ|L7F7F7F-7||LJLFL----7F7|LJLJL-7FJF-7JF-L-J.
        LL-J|J|FF7-LLFJFJL---7||L-JL-J||F----JF7|LJLJF--7L--7|||F-JF7FJL7F7FJ|F7F7L7L7|L--7|L-JFJFJFJLL-JJLJLJLJ|LJL-7-F7F7F7LJLJ|F7F-7|L-JFJ-|7L7.|
        F7|7L7-7JF7F7L7L-7F-7LJF7F7F--J|L-----JLJF7F7|F7L---J||||F7||L7FJ||L7|||||FJFJ|F--JL7F-J-L7|F7F7F7F7F-------7L7|||LJL-7F--JLJFJ|F-7L77.7JF-J
        |L7J7.FF7||||.L--JL7|F7||||L---JFF-------JLJLJ|L7F7F7||||||||FJ|FJL-JLJ||||FJFJL7F7FJL7F-7|||||||||||F7F---7L7LJLJF7F-JL7F---JFJ|FJFJ7JJ7.F7
        JFLF77J|LJLJL-7F-7FJLJ|||||F7F7F7L----7-F7F-7FJFJ|||||||||LJLJFJL-----7||LJL7L7FJ||L7FJL7|||||||||||LJLJF--JFJF7F7||L-7FJL---7L7|L-JLLJF7.LF
        FJ..|LFL-----7||FJL7F7LJLJLJLJ|||F7F-7L-JLJFJL7|FJ||||LJ|L-7F-JF-7F--7||L-7FJJ|L7|L7||-FJLJ||||LJ||L7-F7L--7L-JLJLJL-7LJF----J.|L7F7|.||J-|J
        |J7F---7|7F7FJLJ|F7LJ|F------7LJLJ|L7|F7F7FJF-JLJFJ|||F-JF7|||FJFJL-7||L-7||F7L7||FJ|L7L-7FJ|||F7LJFJFJL---JLF------7|F7L----7-L7|||7F7L-7L7
        .|LJ|.LF7FJ|L-7FJ||F7LJF7F7F-JF7F7L-J||LJLJFJF---JFJ|||F7|LJL7L7|F--JLJF-J|LJ|-|LJL7L7L--J||||LJL7FJ|L-------JF7F--7|||L-----JF7LJ|L-JL7.7..
        F7JF7FFJ|L7|F-J|L||||.FJLJ|L--JLJL--7LJF7F7L7|F-7.|FJ||||L--7L-J|L----7L-7L7FJFJF--JJL--7FJFJL--7|L-7F-----7F7|||F7LJLJFF----7|L--JF---J.F--
        7J-LJ.L7L-J|L-7L-JLJL7L--7L7F7F7FF--JJFJ||L7|||FJFJ|FJ||||F-JF--J7F--7L-7L7|L7L7|F7F7F7-|L7L7F--JL7FJL----7||LJLJ||FF7F7|F---J|F---JJ.L||77.
        L7.LL7|L--7|F7L-7F7F7L-7FL7LJLJL7L-7F-JFJ|FJ||||J|FJL7LJL7L-7L---7L-7|F7L7||FJFJLJ|||||FJFJFJL7|F7||F7.F7FJLJFF-7|L7|||LJL7F--JL----77F|J|F-
        7.J7FF7F--J|||F-J|LJL-7|F-JF-7F7L--JL-7|FJL7||||FJL7FJF--JF7|F---JF-JLJL7||||JL7F7LJLJ|L7L7L-7L7||||||FJLJF7F7|FJ|FJ|||F--J|F--7F---J----FJJ
        |7.F-JLJF-7|||L-7|F7F-J|L-7L7LJL7F-7-FJ||F-J|LJ|L-7|L7|F7L||||7F7|L----7||LJL7FJ|L7F--J.L7|F7|FJ|||LJ|L---JLJLJL7||FJLJL---JL-7|L---7J.|||F|
        LF-L-7F7|FJLJL7|LJ|LJF7L--JFJF--J|FL7L7LJL7FJF-J-FJL7|||L7|||L7|L-7F--7|||F--JL-JFJL7F7F7||||||FJ|L-7L7F7F--7F-7LJLJF7F-7F----J|F---J7FF-F77
        .JJ|-LJLJL-7F-JF--JF7|L----J||F7FJF-J.L-7FJL7|-F7L7FJ||L7||||FJL7FJL7FJ||||F7F7F7L7FJ||||||||||L7|F7|FJ||L-7|L7|F7F-JLJFJL----7|L--7-FFJ-JL|
        |7F7F7F7LF-JL--JF7FJ||F-----7LJLJFJF7F7FJL7FJL7||FJ|FJL7|||||L7FJL7FJ|FJ||||||||L7|L7|||LJ|||||FJ|||||FJ|F7|L7|LJ|L---7L7F7F--JL---JFFJ7|.L|
        LL|LJLJL-JF7F-7FJ||J||L----7|FF--JFJ||LJF-JL-7||LJ|LJFFJ|||||FJ|F7||FJL7LJ||LJ||FJL7||||FFJ|LJ||FJ|||LJFLJ|L7LJF7L7F--JFJ||L------7J7|-F7-FF
        FLL--7F7F7|LJFJL7||FJ|F--7FJL-JF7FJL|L-7L7F7FJ|L--7|F7L7|LJ||L7LJ|LJL-7L7FJL-7||L7FJ||||FJFJF-J|L7||L---77L-JF-J|FJL--7L7||F7F7F7FJ--J.L--J|
        FFF7FJ|LJ|L7JL--JLJL7||F7LJF-7FJ|L-7|F7|FJ||L7|F--JFJL-JL-7LJ-|F7L-7F7|FJL7F7||L7||FJ||||FJFJF7|FJ|L-7F-JF---JF-JL7F-7L7||LJLJLJLJ|L||7|J.-|
        F-JLJFJJFJFJF----77FJ|LJL--J-||-L-7|||||L7||FJ|L-7FL7F7F7FJ.F-J||F7||LJL-7||LJL7|||L7||||L7|FJ|||FJF-JL--JF---JF7FJL7|FJ|L----7.|||FFLF-77LJ
        L7F--J-F|FJFJF7F7L-JFJ|F-----JL--7LJ||LJF||||-|F-JF-J||||L7FJF7|LJLJL7F--J|L--7|||L7LJLJ|FJ||FJ||L7L7F-7F7L----J|L7FJLJFJF7F--J7JFLJ-JJ----J
        F|||JF7FJL7L7||||F7FJF7L-7F7F7F7FJ-FJ|7F-J||L7LJF-JF7||||FJ|FJ|L--7F-JL-7FJF7FJ||L7|F---JL7||L7||FJF||JLJL7F7F7FJ.|L-7-L-JLJJ|L7LL7JJL.-.|77
        FLJF-JLJF7|FJ|LJLJLJFJL-7LJ|||||L-7L7|FJF7|L7L-7|F7||||||L7|L7L7F-J|F7F7||FJLJFJL7|||F--7FJLJFJ|LJLFJL7F7FJ|LJLJF7|F7L----7JL|7|-LF.7.JJ7FL7
        LL7L---7|LJL-J7F7F--JF-7L--J||||F-JLLJ|FJ||F|F-J||||LJ|||FJ|FJFJL-7LJ|||||L--7L--J||||F-JL-77L7L-7FJF7LJ|L7L-7F7||LJL7F-7FJL7|LFF.L-L7LF7LJ7
        ..JLF--JL77F---JLJF-7L7L7F7FJ||LJ7F---J||LJFJL-7LJ|L7FJ|||FJ|F|F-7L-7||||L7F-JF-7-LJ||L----JF7|F7|L-J|F-J7|F7LJLJL--7LJF|L---7-|L-|J|7FJ|-L7
        F-.F|F7F7L7|F-7F7FJFJFJFJ|||FJL--7L-7F7L-7FJF--JF7|FJL7|||L7L7|L7|F7|||LJFJL--JFJF7FLJF-----JLJ||L-7FJL--7LJ|F--7F--JF7FJF7F-J7L7JLF|.|.F.||
        F7-7LJLJ|FJ||FJ|||FJFJJL7|||L7F-7L7FJ||F7|L7L-7FJLJ|F7||||-L7||FJ||LJLJF-JF7F7FJJ|L--7L--7F7F7FJ|F-JL7F--JF7|L-7|L---J|L7|LJFLJJ|JLL77L7J7F|
        LJFJJF--J|LLJL7|LJL-J|F|LJ||7LJFJFJL7||||L7|F7|L7F7||LJ|LJF-J||L7|L---7|F7|LJ|L--JF7FJLF7LJ|||L7|L7F7|L---J||F-J|F7F7FJ.LJJJF|FFL-F7|F||FL--
        FJ7.L|F--J--LFJ|F-77F7FF--JL--7L-JF-J|||L-J||LJ|||LJL-7|F7L7FJ|FJ|F--7|||LJ|FJF7F-J||F-JL--J||FJ|FJ|LJF7F-7||L-7||LJ|L-7LLJ-FJF-|JJFJ-77F7F7
        L|LF.LJJ..|-L|FJL7L-JL7L-7F7F7L7F-JF7||L-7|LJLF-JL7F--J||L-JL7|L7|L-7LJLJF--JFJ|L-7||L-7F-7FJ|L7LJ-L-7|LJ.LJ|F7||L-7|F7|7JF7JLL----7J-77|J.L
        |L-F-JJ.|-J7F||LLL7F-7L--J|LJ|FJL7FJ|||F7L-7F7L--7|L7F7|L7F--JL7|L7FJF--7L7F7|||F-J||F-JL7||FJFJF----JL---7FJ|LJL7FJLJLJ7.|L7J.F|7LJL|JFJFLJ
        FL-J.L7-F7||FLJ7LFJ|FJF7F7L-7|L7.|||LJLJL7FJ|||F-JL7LJ||FJL---7LJ7||FJF7|FJ||L7|L7FJ|L7F7|LJL7L7|F---7F-7FJL7L--7|L-77JLL-F.|7FJ7-F---7LJJ.J
        F|JJ7F--7JFJ7JL7L|FJL7|LJL7FJL-JFJL---7F7|L7|L-JF-7|F-J|L-7F7FJF--JLJFJLJL7|L7||FJL7|FJ|LJ7F-JFJLJLF-JL7LJF7L7F-J|F7L-7.J.|FF-J-JLL7F7|7.LJ7
        L|..7-JFJ.FL7.L-7LJ7F||7F7|L-7F-JF7F--J||L-J|F-7L7||L-7L7FJ||L7L7F7F7L7LF7|L7|||L-7LJL7L--7L--JF7F7L7F7L--J|FJL7FJ||F-J7|7.F.|L7JLLF|.F77F|7
        |L--.LFJ|L|F|-F7LLJFFJ|FJLJF7||F7||L---JL-7FJ|L|FJLJF7|FJL-J|FJLLJ||L7L7||L7|||L7FJFF-JF--JLF7FJLJL-J||F--7|L7FJL7|||LF-L.FF---.F7-J|-|F-J.7
        LFJ|7L7LJLL|LFJ|||LLL7||F-7|LJ|||||F-7F7F-J|FJFJL-7FJLJL---7|L7F--JL7L7LJ|FJ|LJF||F-JF-JF---JLJF--7F7||L-7LJFJL-7||||L-JJ7.L|JFFL||LJ.--7-FJ
        |LLLJL|7JLL|L|FF7F-L-LJ||FJL-7LJ|||L7||LJF-JL7L7F7|L--7F--7|L7||F7F7|FJF-JL7L7.LLJL7FJ|LL-7F7F7|F-J||||F-JF7L---J||LJ7LJ.LL-LFF.L.L7LJJ-|-J|
        |-7|77JL7-|J7|||-||7FJF||L-7FJF-J||FJ|L-7L-7FJJ||||F--JL-7LJFJ|||||||L7L--7L7L7||F-JL777F7LJLJLJL7FJ|||L--JL---77LJ-L77.FLL..FJ7JFFL.||.J|J|
        L-7JFL7L|7..F.|JFLF|77-LJF-J|FJF7|LJJ|F-JLF|||||||||F7F7FJF7L7|LJ||||FJF--JJL7L77L-7FJF-JL-7.F---J|FJ||F--7F7F7|-JJ|JJFJ7|.FF|J--JJJ.777.7.F
        LFJF--FF-J7.77F---JJF-JLLL--JL-J|L7J-||FJ-FJL7-LJLJ|||||L-JL7LJF-J|LJL7L-7..|L7L7LLLJ-L-7F7L7L---7|L-J||F7LJLJLJ7..|---LL77FJ|.|||.L-.7--J.J
        FL-F.7F|7.L-LJ|F--..||-.|7||.|JFJFJJLLJJ7LL7FJJ7L||LJLJ|F7F-J.L|F-JF--JF-J-F-JL-J-J-F7JJ||L7L----J|F--JLJL------7FF|.|7L|LF--J77FJ...F|LJL||
        JJ7.--JLJ-7F---J|-7F|L|-L7L--F-JFJLJ7F|-J-LLJJF-7LLLLF-J|||.|7F|L77|F-7L7JFJ77L.LL-FFJ|FLJ-L-7F--7|L---7F-------J-JJ7F-FJ-|JJ-||F7.7FFJ|.FJF
        FLL7J|.L|.F-77|.-.--7-F7|.|.LL--J-LL|-7F|.L|J.FJ77FJ.|F7|LJFLLFL-J-LJFL7|.|LFF..L7FF.|L-7|||.||F-J|F---JL--7F7FF7.|L-JFJ..|7L||F-|-|F||F777|
        L.LJ-F|-LFJ-J7|.|F|JLJLFL.F.|LLJL7.LJF---J-F.F--L-J.F||LJ7F-.F7JLJF|L-FJ|-L-FJ.|.7-.--JL|LF7.|||F-JL-7F7F7FJ|L-J|-|7JL7-FF7J-L--JJ|F7LL|JLF7
        |J.L--F7-L..|FL7LL|JL7|.|FLJ7FLF-J7F--J7..FJ.L|J.LLF-JL7.FLL-LJF-JF-..L-J7|7|77|FL7J7|.---77-LJ||F---J||||L-JF7FJ.LJ7LJ|.LFJ-L-J..J.JLLJLF||
        |.|J.LLJ7L7.||FFL-LJ|LJ--|7JL7F|.LJLFJFLL7|LF||.7.LL---J7L7|LLL7-7LL|.LLJ.-JL|--L-L|-J..L7JL|.LLJL7F7FJ|||F--J|L7.7L--LL7||J.L-LL-J-|....7|F
        .F|.7.--L-FL7-|77FL.F7J-LL7.L7-L-F--JJ|J.|-7.F.J7L-7L|.L|J|7J7.77.FLL.|-J--FL|.|J7LJ7J|JJ.--F7FJ-L||LJFJ||L--7L7L7|FJFL|J|7F-.F7-F|-L---FF-|
        -JJ-L7J77FL-JJ.|7JLF7-7.|.L--|.|-LF|-7L7-|J7.L-7|.L-FLF-J.|J-F-J.L----JJJ.---77|-7..L-L|F|F---|JFLLJF-JFJ|F7FJLL-J-|||.L--7JFF.-7|.F|L--|L7J
        |L.|F|7LFFJ77.FLJ7.7JL77-7.LLL7-JJLL-|-JLJ.L.7.F---J|-||7-|LF-77FJFJ-FJ7.|F|JL7JF|-FL7-|-|7|L-JJFJ..L7FJL|||L--7-|-LF777L7F7F7FL.FF7-F77-J||
        7-7--.FL|JJF---J----JJJLJ|J-J-LJ7-.LJJ.L---L--J..LL77-|-L.-F7-L7-L7J-LJL-L-JF---FJ--.--.LF---JL-----LLJLLLJL---JLL.LJ--JLJL7JJ|-FJLJJLLJLLLJ`,
        {
            tile: TILE.PIPE.BEND_SOUTH_WEST,
            position: {
                x: 9,
                y: 42
            }
        },
        6834]
    ])(`for %s grid expect %s farthest step`, (tiles, startingTile, expectedSteps) => {
        const grid = mapTiles(tiles)

        const previousPosition = findTilePosition(TILE.STARTING, grid)

        const allNextTiles = findAllNextTiles(grid, startingTile, previousPosition)
        const steps = allNextTiles.length
    
        const farthestSteps = computeFarthestSteps(steps)
    
        expect(farthestSteps).toBe(expectedSteps)
    })
})