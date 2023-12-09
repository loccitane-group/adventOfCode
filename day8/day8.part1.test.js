const {
    parseMap,
    findNextLeftPosition,
    findNextRightPosition
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

    const nextPosition = findNextLeftPosition(maps, 'AAA')

    expect(nextPosition).toBe('BBB')
})

test('find next right position', () => {
    const maps = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `

    const nextPosition = findNextRightPosition(maps, 'AAA')

    expect(nextPosition).toBe('BBB')
})