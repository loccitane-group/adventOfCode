const {
    HAND_STRENGTHS,
    extractHandsAndBids,
    countOccurence,
    countAllOccurence,
    calculateStrength,
    compareHands,
    orderByRank,
    calculateTotalWinnings
} = require('./day7.part2')


test('count occurence of all cards in hand 32T3K', () => {
    const hand = '32T3K'

    const occurences = countAllOccurence(hand)

    const expectedOccurencesMap = new Map()
    expectedOccurencesMap.set('3', 2)
    expectedOccurencesMap.set('2', 1)
    expectedOccurencesMap.set('T', 1)
    expectedOccurencesMap.set('K', 1)

    expect(occurences).toEqual(expectedOccurencesMap)
})

test('count occurence of all cards in hand T55J5', () => {
    const hand = 'T55J5'

    const occurences = countAllOccurence(hand)

    const expectedOccurencesMap = new Map()
    expectedOccurencesMap.set('T', 1)
    expectedOccurencesMap.set('5', 4)

    expect(occurences).toEqual(expectedOccurencesMap)
})

test('count occurence of all cards in hand KTJJT', () => {
    const hand = 'KTJJT'

    const occurences = countAllOccurence(hand)

    const expectedOccurencesMap = new Map()
    expectedOccurencesMap.set('K', 1)
    expectedOccurencesMap.set('T', 4)

    expect(occurences).toEqual(expectedOccurencesMap)
})

test('count occurence of all cards in hand QQQJA', () => {
    const hand = 'QQQJA'

    const occurences = countAllOccurence(hand)

    const expectedOccurencesMap = new Map()
    expectedOccurencesMap.set('Q', 4)
    expectedOccurencesMap.set('A', 1)

    expect(occurences).toEqual(expectedOccurencesMap)
})


describe('Strength calculation', () => {
    it.each([
        ['AAAAA', HAND_STRENGTHS['Five of a Kind']],
        ['AA8AA', HAND_STRENGTHS['Four of a Kind']],
        ['23332', HAND_STRENGTHS['Full House']],
        ['TTT98', HAND_STRENGTHS['Three of a Kind']],
        ['23432', HAND_STRENGTHS['Two Pairs']],
        ['A23A4', HAND_STRENGTHS['One Pair']],
        ['23456', HAND_STRENGTHS['High Card']],
    ])('calculate strength of hand %s', (hand, expectedStrength) => {
        const strength = calculateStrength(hand)

        expect(strength).toEqual(expectedStrength)
    })
})


describe('Strength calculation with Joker cards', () => {
    it.each([
        ['T55J5', HAND_STRENGTHS['Four of a Kind']],
        ['KTJJT', HAND_STRENGTHS['Four of a Kind']],
        ['QQQJA', HAND_STRENGTHS['Four of a Kind']],
    ])('calculate strength of hand %s', (hand, expectedStrength) => {
        const strength = calculateStrength(hand)

        expect(strength).toEqual(expectedStrength)
    })
})

// test('calculate ranks of multiple hands', () => {
//     const hands = [
//         {
//             hand: '32T3K',
//         },
//         {
//             hand: 'T55J5',
//         },
//         {
//             hand: 'KK677',
//         },
//         {
//             hand: 'KTJJT',
//         },
//         {
//             hand: 'QQQJA',
//         }
//     ]

//     const ranks = orderByRank(hands)

//     expect(ranks).toEqual([
//         {
//             hand: '32T3K',
//         },
//         {
//             hand: 'KTJJT',
//         },
//         {
//             hand: 'KK677',
//         },
//         {
//             hand: 'T55J5',
//         },
//         {
//             hand: 'QQQJA',
//         }
//     ])
// })

// test('calculate total winnings of set of hands', () => {
//     const setOfHands = [
//         {
//             hand: '32T3K',
//             bid: '765'
//         },
//         {
//             hand: 'T55J5',
//             bid: '684'
//         },
//         {
//             hand: 'KK677',
//             bid: '28'
//         },
//         {
//             hand: 'KTJJT',
//             bid: '220'
//         },
//         {
//             hand: 'QQQJA',
//             bid: '483'
//         }
//     ]

//     const totalWinnings = calculateTotalWinnings(setOfHands)

//     expect(totalWinnings).toEqual(6440)
// })

