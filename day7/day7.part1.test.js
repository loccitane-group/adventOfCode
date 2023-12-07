const {
    HAND_STRENGTHS,
    extractHandsAndBids,
    countOccurence,
    countAllOccurence,
    calculateStrength,
    compareHands,
    orderByRank
} = require('./day7.part1')

test('extract hands and bids', () => {
    const input = `32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`

    const extractedHands = extractHandsAndBids(input)

    expect(extractedHands).toEqual([
        {
            hand: '32T3K',
            bid: '765'
        },
        {
            hand: 'T55J5',
            bid: '684'
        },
        {
            hand: 'KK677',
            bid: '28'
        },
        {
            hand: 'KTJJT',
            bid: '220'
        },
        {
            hand: 'QQQJA',
            bid: '483'
        }
    ])
})

test('count occurence of a card in a hand', () => {
    const card = 'T'
    const hand = '32T3K'

    const occurence = countOccurence(card, hand)

    expect(occurence).toEqual(1)
})

test('count occurence of all cards in a hand', () => {
    const hand = '32T3K'

    const expectedOccurencesMap = new Map()
    expectedOccurencesMap.set('3', 2)
    expectedOccurencesMap.set('2', 1)
    expectedOccurencesMap.set('T', 1)
    expectedOccurencesMap.set('K', 1)

    const occurences = countAllOccurence(hand)

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
        ['23456', HAND_STRENGTHS['High Card']]
    ])('calculate strength of hand %s', (hand, expectedStrength) => {
        const strength = calculateStrength(hand)

        expect(strength).toEqual(expectedStrength)
    })
})

test('compare two pair hands', () => { 
    const handA = {
        hand: 'KK677',
    }
    const handB = {
        hand: 'KTJJT',
    }

    const isAGreaterThanB = compareHands(handA, handB) > 0

    expect(isAGreaterThanB).toEqual(true)
})

test('calculate ranks of multiple hands', () => {
    const hands = [
        {
            hand: '32T3K',
        },
        {
            hand: 'T55J5',
        },
        {
            hand: 'KK677',
        },
        {
            hand: 'KTJJT',
        },
        {
            hand: 'QQQJA',
        }
    ]

    const ranks = orderByRank(hands)

    expect(ranks).toEqual([
        {
            hand: '32T3K',
        },
        {
            hand: 'KTJJT',
        },
        {
            hand: 'KK677',
        },
        {
            hand: 'T55J5',
        },
        {
            hand: 'QQQJA',
        }
    ])
})