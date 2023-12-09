const {
    parseMap,
    findNextLeftPosition,
    findNextRightPosition,
    STARTING_POSITION,
    ENDING_POSITION,
    navigate
} = require('./day8.part1')

test('parse map', () => {
    const maps = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`

    const map = parseMap(maps)

    return expect(map).toEqual({
        directions: 'LLR',
        network: {
            AAA: {
                left: 'BBB',
                right: 'BBB'
            },
            BBB: {
                left: 'AAA',
                right: 'ZZZ'
            },
            ZZZ: {
                left: 'ZZZ',
                right: 'ZZZ'
            } 
        }
    })
})

test('find next left position', () => {
    const maps = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `

    const nextPosition = findNextLeftPosition(maps, STARTING_POSITION)

    expect(nextPosition).toBe('BBB')
})

test('find next right position', () => {
    const maps = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `

    const nextPosition = findNextRightPosition(maps, STARTING_POSITION)

    expect(nextPosition).toBe('BBB')
})

test('find all next positions using directions', () => {
    const maps = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `

    const map = parseMap(maps)

    const nextPosition = navigate(
        map.directions,
        map.network,
        STARTING_POSITION,
        ENDING_POSITION
    )

    expect(nextPosition).toBe(6)
})