const {
    parseMap,
} = require('./day8.part1')

const {
    findStartingNodes,
    findEndingNodes,
    navigate
} = require('./day8.part2')

test('parse map', () => {
    const maps = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`

    const map = parseMap(maps)

    return expect(map).toEqual({
        directions: 'LR',
        network: {
            '11A': {
                left: '11B',
                right: 'XXX'
            },
            '11B': {
                left: 'XXX',
                right: '11Z'
            },
            '11Z': {
                left: '11B',
                right: 'XXX'
            },
            '22A': {
                left: '22B',
                right: 'XXX'
            },
            '22B': {
                left: '22C',
                right: '22C'
            },
            '22C': {
                left: '22Z',
                right: '22Z'
            },
            '22Z': {
                left: '22B',
                right: '22B'
            },
            'XXX': {
                left: 'XXX',
                right: 'XXX'
            }
        }
    })
})

test('find starting nodes', () => {
    const map = {
        directions: 'LR',
        network: {
            '11A': {
                left: '11B',
                right: 'XXX'
            },
            '11B': {
                left: 'XXX',
                right: '11Z'
            },
            '11Z': {
                left: '11B',
                right: 'XXX'
            },
            '22A': {
                left: '22B',
                right: 'XXX'
            },
            '22B': {
                left: '22C',
                right: '22C'
            },
            '22C': {
                left: '22Z',
                right: '22Z'
            },
            '22Z': {
                left: '22B',
                right: '22B'
            },
            'XXX': {
                left: 'XXX',
                right: 'XXX'
            }
        }
    }

    const startingNodes = findStartingNodes(map.network)

    return expect(startingNodes).toEqual(['11A', '22A'])
})

test('find ending nodes', () => {
    const map = {
        directions: 'LR',
        network: {
            '11A': {
                left: '11B',
                right: 'XXX'
            },
            '11B': {
                left: 'XXX',
                right: '11Z'
            },
            '11Z': {
                left: '11B',
                right: 'XXX'
            },
            '22A': {
                left: '22B',
                right: 'XXX'
            },
            '22B': {
                left: '22C',
                right: '22C'
            },
            '22C': {
                left: '22Z',
                right: '22Z'
            },
            '22Z': {
                left: '22B',
                right: '22B'
            },
            'XXX': {
                left: 'XXX',
                right: 'XXX'
            }
        }
    }

    const startingNodes = findEndingNodes(map.network)

    return expect(startingNodes).toEqual(['11Z', '22Z'])
})

test('navigate with multiple starting positions', () => {
    const maps = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`

    const { directions, network } = parseMap(maps)

    const startingNodes = findStartingNodes(network)
    const endingNodes = findEndingNodes(network)

    const stepsPerPath = navigate(directions, network, startingNodes, endingNodes)

    const expectedMap = new Map()
    expectedMap.set('11A', 2)
    expectedMap.set('22A', 3)

    expect(stepsPerPath).toEqual(expectedMap)  
})

