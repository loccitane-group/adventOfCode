const {
    HAND_STRENGTHS,
    extractHandsAndBids,
    countOccurence,
    countAllOccurence,
    calculateStrength
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

test('caluclate strength of hand', () => {
    const hand = '32T3K'

    const strength = calculateStrength(hand)

    expect(strength).toEqual(HAND_STRENGTHS['One Pair'])
})